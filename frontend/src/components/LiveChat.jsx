import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaComments, FaPaperPlane } from "react-icons/fa";

import { API_URL as BASE_URL } from "../config";

const CHAT_URL = `${BASE_URL}/api/chat`;

export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState(
    localStorage.getItem("chatName") || ""
  );
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const messagesBoxRef = useRef(null);
  const firstLoadRef = useRef(true);

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
      return;
    }

    box.scrollTop = box.scrollHeight;
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanMessage = message.trim();

    if (!cleanName) {
      alert("لطفاً نام خود را وارد کنید.");
      return;
    }

    if (!cleanMessage) {
      return;
    }

    setSending(true);

    try {
      await axios.post(CHAT_URL, {
        name: cleanName,
        message: cleanMessage,
      });

      localStorage.setItem("chatName", cleanName);

      setMessage("");

      await loadMessages();
    } catch (err) {
      console.error("خطا در ارسال پیام:", err);

      alert(
        err.response?.data?.message ||
          "ارسال پیام انجام نشد."
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
      <div className="
        bg-[#020617]
        border border-gray-800
        rounded-3xl
        overflow-hidden
        shadow-2xl
      ">
        {/* Header */}
        <div className="
          px-6
          py-5
          bg-[#0b1220]
          border-b border-gray-800
          flex
          items-center
          gap-4
        ">
          <div className="
            w-12
            h-12
            rounded-full
            bg-yellow-400
            text-black
            flex
            items-center
            justify-center
          ">
            <FaComments />
          </div>

          <div>
            <h2 className="
              text-white
              text-xl
              font-extrabold
            ">
              گفت‌وگوی زنده فروشگاه
            </h2>

            <p className="
              text-gray-500
              text-sm
              mt-1
            ">
              پیام‌ها برای همه کاربران نمایش داده می‌شود
            </p>
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
            <div className="
              h-full
              flex
              items-center
              justify-center
              text-gray-600
            ">
              هنوز پیامی ارسال نشده است.
            </div>
          ) : (
            messages.map((item) => (
              <div
                key={item._id}
                className="text-right"
              >
                <div className="
                  text-yellow-400
                  text-xs
                  font-bold
                  mb-1
                ">
                  {item.name}
                </div>

                <div className="
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
                ">
                  {item.message}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Send */}
        <form
          onSubmit={handleSend}
          className="
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
            placeholder="نام شما"
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
            "
          />

          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="پیام خود را بنویسید..."
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
              "
            />

            <button
              type="submit"
              disabled={sending}
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
              <FaPaperPlane />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}