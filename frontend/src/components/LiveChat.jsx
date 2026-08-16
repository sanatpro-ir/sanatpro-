import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { FaComments, FaPaperPlane } from "react-icons/fa";

import { API_URL as BASE_URL } from "../config";

const CHAT_URL = `${BASE_URL}/api/chat`;

const WAVE_EMOJIS = ["👋", "🔥", "⚡", "🚀", "💬", "✨"];

// چون بعضی فونت‌های سیستم ایموجی رو رندر نمی‌کنن، فونت مخصوص ایموجی رو صراحتاً ست می‌کنیم
const EMOJI_FONT_STYLE = {
  fontFamily:
    '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif',
};

// ساخت صدای ارسال شبیه آیفون (دو تن کوتاه صعودی) بدون فایل صوتی خارجی
function playSendSound() {
  try {
    const AudioCtx =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioCtx) return;

    const ctx = new AudioCtx();

    const now = ctx.currentTime;

    const playTone = (freq, start, duration, volume) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + start);

      gain.gain.setValueAtTime(0, now + start);
      gain.gain.linearRampToValueAtTime(
        volume,
        now + start + 0.01
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + start + duration
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + start);
      osc.stop(now + start + duration);
    };

    // شبیه صدای "swoosh" ارسال پیام آیفون: دو نت کوتاه صعودی
    playTone(900, 0, 0.09, 0.15);
    playTone(1400, 0.08, 0.12, 0.13);

    setTimeout(() => ctx.close(), 400);
  } catch (err) {
    console.error("خطا در پخش صدا:", err);
  }
}

// لرزش کوتاه روی موبایل (اگه دستگاه پشتیبانی کنه)
function buzz() {
  if (navigator.vibrate) {
    navigator.vibrate(35);
  }
}

export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState(
    localStorage.getItem("chatName") || ""
  );
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [justSentId, setJustSentId] = useState(null);

  const messagesBoxRef = useRef(null);
  const firstLoadRef = useRef(true);
  const prevCountRef = useRef(0);

  const loadMessages = async () => {
    try {
      const res = await axios.get(CHAT_URL);

      const data = Array.isArray(res.data)
        ? res.data
        : [];

      setMessages(data);
    } catch (err) {
      console.error("خطا در دریافت پیام‌ها:", err);
    }
  };

  useEffect(() => {
    loadMessages();

    const timer = setInterval(() => {
      loadMessages();
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // فقط خود جعبه پیام را اسکرول کن
  useEffect(() => {
    const box = messagesBoxRef.current;

    if (!box) return;

    if (firstLoadRef.current) {
      box.scrollTop = box.scrollHeight;
      firstLoadRef.current = false;
      prevCountRef.current = messages.length;
      return;
    }

    if (messages.length > prevCountRef.current) {
      box.scrollTop = box.scrollHeight;
    }

    prevCountRef.current = messages.length;
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanMessage = message.trim();

    if (!cleanName) {
      alert("لطفاً نام خود را وارد کنید. 🙂");
      return;
    }

    if (!cleanMessage) {
      return;
    }

    setSending(true);

    try {
      const res = await axios.post(CHAT_URL, {
        name: cleanName,
        message: cleanMessage,
      });

      localStorage.setItem("chatName", cleanName);

      setMessage("");
      setJustSentId(res.data?._id || null);

      // صدا و لرزش لحظه‌ی ارسال موفق، دقیقاً مثل آیفون
      playSendSound();
      buzz();

      await loadMessages();

      setTimeout(() => setJustSentId(null), 1200);
    } catch (err) {
      console.error("خطا در ارسال پیام:", err);

      alert(
        err.response?.data?.message ||
          "ارسال پیام انجام نشد. 😬"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      dir="rtl"
      className="max-w-5xl mx-auto mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="
          relative
          bg-[#020617]
          border border-gray-800
          rounded-3xl
          overflow-hidden
          shadow-2xl
        "
      >
        {/* Glow accent */}
        <div
          className="
            pointer-events-none
            absolute
            -top-24
            -right-24
            w-64
            h-64
            bg-yellow-400/20
            rounded-full
            blur-3xl
          "
        />

        {/* Header */}
        <div
          className="
            relative
            px-6
            py-5
            bg-[#0b1220]
            border-b border-gray-800
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px rgba(250,204,21,0.6)",
                  "0 0 22px rgba(250,204,21,0.6)",
                  "0 0 0px rgba(250,204,21,0.6)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                w-12
                h-12
                rounded-full
                bg-yellow-400
                text-black
                flex
                items-center
                justify-center
                text-lg
              "
            >
              <motion.span
                animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <FaComments />
              </motion.span>
            </motion.div>

            <div>
              <h2 className="text-white text-xl font-extrabold flex items-center gap-2">
                گفت‌وگوی زنده فروشگاه
                <motion.span
                  style={EMOJI_FONT_STYLE}
                  animate={{ rotate: [0, 20, -15, 20, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                  }}
                >
                  🔥
                </motion.span>
              </h2>

              <p
                className="text-gray-500 text-sm mt-1"
                style={EMOJI_FONT_STYLE}
              >
                پیام‌ها برای همه کاربران نمایش داده می‌شود ✨
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/40 border border-gray-800 rounded-full px-3 py-1.5">
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
            <span className="text-green-400 text-xs font-bold">
              آنلاین
            </span>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={messagesBoxRef}
          className="
            h-[330px]
            overflow-y-auto
            p-5
            space-y-4
            bg-black/30
          "
        >
          {messages.length === 0 ? (
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="
                h-full
                flex
                flex-col
                items-center
                justify-center
                text-gray-500
                gap-2
              "
            >
              <span
                className="text-3xl"
                style={EMOJI_FONT_STYLE}
              >
                💬
              </span>
              <span>
                هنوز پیامی ارسال نشده — اولین نفر باش!{" "}
                <span style={EMOJI_FONT_STYLE}>
                  {WAVE_EMOJIS[0]}
                </span>
              </span>
            </motion.div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 18, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.35,
                    ease: "easeOut",
                  }}
                  className="text-right"
                >
                  <div className="text-yellow-400 text-xs font-bold mb-1 flex items-center justify-end gap-1">
                    {item.name}
                    <span style={EMOJI_FONT_STYLE}>
                      {
                        WAVE_EMOJIS[
                          index % WAVE_EMOJIS.length
                        ]
                      }
                    </span>
                  </div>

                  <motion.div
                    animate={
                      item._id === justSentId
                        ? {
                            boxShadow: [
                              "0 0 0px rgba(250,204,21,0.9)",
                              "0 0 18px rgba(250,204,21,0.9)",
                              "0 0 0px rgba(250,204,21,0)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 1.1 }}
                    className="
                      inline-block
                      max-w-[85%]
                      bg-[#111827]
                      border border-gray-800
                      rounded-2xl
                      rounded-tr-sm
                      px-4
                      py-3
                      text-gray-200
                      leading-7
                    "
                  >
                    {item.message}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Send */}
        <form
          onSubmit={handleSend}
          className="
            relative
            border-t
            border-gray-800
            p-4
            space-y-3
          "
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام شما 🙂"
            style={EMOJI_FONT_STYLE}
            className="
              w-full
              bg-black
              border border-gray-800
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              focus:border-yellow-400
              transition
            "
          />

          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="پیام خود را بنویسید... ⚡"
              style={EMOJI_FONT_STYLE}
              className="
                flex-1
                bg-black
                border border-gray-800
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-yellow-400
                transition
              "
            />

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9, rotate: -15 }}
              className="
                w-14
                rounded-xl
                bg-yellow-400
                text-black
                flex
                items-center
                justify-center
                hover:bg-yellow-300
                disabled:opacity-50
                transition
              "
            >
              <AnimatePresence mode="wait">
                {sending ? (
                  <motion.span
                    key="sending"
                    style={EMOJI_FONT_STYLE}
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{
                      opacity: 1,
                      rotate: 360,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      rotate: {
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  >
                    🚀
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaPaperPlane />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}