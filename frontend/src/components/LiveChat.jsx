import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import { useTranslation } from "react-i18next";
import { API_URL as BASE_URL } from "../config";

let socket;

export default function LiveChat() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    if (!socket) {
      socket = io(BASE_URL, { transports: ["websocket", "polling"] });
    }

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("chat:history", (history) => {
      setMessages(history);
    });

    socket.on("chat:message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat:history");
      socket.off("chat:message");
    };
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim() || !socket) return;

    socket.emit("chat:message", {
      name: name.trim() || t("livechat_guest"),
      text: message.trim(),
    });

    setMessage("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-24 bg-[#ffc000] text-black px-5 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition z-[9999]"
      >
        {t("livechat_button")}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 w-80 h-[480px] bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl z-[9999] flex flex-col"
          >
            <div className="p-4 border-b border-gray-800 flex justify-between items-start">
              <div>
                <div className="font-bold text-white">{t("livechat_title")}</div>
                <div className="text-xs text-gray-400 mt-1">{t("livechat_subtitle")}</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto text-sm space-y-3">
              {!connected && (
                <div className="text-center text-gray-500 text-xs">{t("livechat_connecting")}</div>
              )}

              {connected && messages.length === 0 && (
                <div className="text-center text-gray-500 text-xs">{t("livechat_empty")}</div>
              )}

              {messages.map((msg) => (
                <div key={msg._id} className="max-w-[85%] bg-gray-800 rounded-xl px-3 py-2">
                  <div className="text-[#ffc000] text-xs font-bold mb-1">{msg.name}</div>
                  <div className="text-gray-200">{msg.text}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-gray-800 space-y-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("livechat_name_placeholder")}
                className="w-full bg-black border border-gray-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#ffc000]"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  placeholder={t("livechat_message_placeholder")}
                  className="flex-1 bg-black border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#ffc000]"
                />
                <button
                  onClick={handleSend}
                  className="bg-[#ffc000] hover:bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold transition"
                >
                  {t("livechat_send")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}