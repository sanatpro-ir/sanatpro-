import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "سلام 👋 چطور میتونم کمکت کنم؟", sender: "support" }
  ]);

  const messagesEndRef = useRef(null);

  // اسکرول خودکار
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([...messages, { text: message, sender: "user" }]);
    setMessage("");
  };

  return (
    <>
      {/* دکمه باز کردن چت */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-24 bg-[#ffc000] text-black px-5 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition z-[9999]"
      >
        💬 چت آنلاین
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 w-80 h-[450px] bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl z-[9999] flex flex-col"
          >
            {/* هدر */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <span className="font-bold text-white">پشتیبانی آنلاین</span>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✖
              </button>
            </div>

            {/* پیام‌ها */}
            <div className="flex-1 p-4 overflow-y-auto text-sm space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[75%] px-3 py-2 rounded-xl ${
                    msg.sender === "user"
                      ? "bg-[#ffc000] text-black self-end ml-auto"
                      : "bg-gray-800 text-gray-300"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* ورودی */}
            <div className="p-3 border-t border-gray-800 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="پیام خود را بنویسید..."
                className="flex-1 bg-black border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#ffc000]"
              />

              <button
                onClick={handleSend}
                className="bg-[#ffc000] hover:bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold transition"
              >
                ارسال
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
