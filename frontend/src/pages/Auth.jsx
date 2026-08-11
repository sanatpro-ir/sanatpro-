import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserLock, FaUserPlus } from "react-icons/fa";

export default function Auth() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-[#141414] rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 border border-[#2a2a2a]"
      >
        {/* ================= LEFT ================= */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-[#111] to-black relative">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-6">
              Sanat<span className="text-[#FFC000]">Pro</span>
            </h1>
            <p className="text-gray-400 leading-relaxed">
              دسترسی امن، تخصصی و مستقیم  
              <br />
              به تجهیزات معدنی و صنعتی
            </p>
          </div>

          <div className="text-sm text-gray-500">
            © SanatPro Industrial Platform
          </div>

          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#FFC000]/10 rounded-full blur-3xl" />
        </div>

        {/* ================= RIGHT ================= */}
        <div className="p-10 md:p-14">
          {/* Tabs */}
          <div className="flex bg-[#0f0f0f] rounded-xl p-1 mb-10">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-3 rounded-lg font-bold transition ${
                mode === "login"
                  ? "bg-[#FFC000] text-black justify-center"
                  : "text-gray-400"
              }`}
            >
              ورود
            </button>

            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-3 rounded-lg font-bold justify-center transition ${
                mode === "register"
                  ? "bg-[#FFC000] text-black justify-center" 
                  : "text-gray-400"
              }`}
            >
              ثبت‌نام
            </button>
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {mode === "register" && (
                <input
                  type="text"
                  placeholder="نام کامل"
                  className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white focus:border-[#FFC000] outline-none"
                />
              )}

              <input
                type="email"
                placeholder="ایمیل"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white focus:border-[#FFC000] outline-none"
              />

              <input
                type="password"
                placeholder="رمز عبور"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white focus:border-[#FFC000] outline-none"
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-[#FFC000] hover:bg-[#e6ad00] text-black py-4 rounded-xl font-extrabold flex items-center justify-center gap-3"
              >
                {mode === "login" ? (
                  <>
                    <FaUserLock />
                    ورود به حساب
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    ایجاد حساب کاربری
                  </>
                )}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          <p className="text-center text-xs text-gray-500 mt-10">
            SANATpro – پلتفرم تخصصی تجهیزات معدنی
          </p>
        </div>
      </motion.div>
    </div>
  );
}
