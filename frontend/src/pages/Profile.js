import { motion } from "framer-motion";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-950 text-white pt-28 px-6">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-3xl p-10 border border-white/10"
        >
          <div className="flex items-center gap-6 mb-10">
            <img
              src="https://i.pravatar.cc/150"
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-yellow-500"
            />

            <div>
              <h2 className="text-2xl font-extrabold">کاربر MinePro</h2>
              <p className="text-gray-400 text-sm">user@minepro.ir</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/40 rounded-xl p-6">
              <h3 className="font-bold mb-2">تجهیزات ثبت شده</h3>
              <p className="text-3xl font-extrabold text-yellow-500">3</p>
            </div>

            <div className="bg-black/40 rounded-xl p-6">
              <h3 className="font-bold mb-2">وضعیت حساب</h3>
              <p className="text-green-400 font-bold">فعال</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
