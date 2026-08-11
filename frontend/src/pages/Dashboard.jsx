import { useAuth } from "../context/AuthContext.ts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{opacity:0,y:40}}
          animate={{opacity:1,y:0}}
          className="flex items-center gap-6 mb-16"
        >
          <img src={user.avatar} className="w-20 h-20 rounded-full border-2 border-[#ffc000]"/>
          <div>
            <h2 className="text-3xl font-extrabold">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "تجهیزات ثبت شده", value: 3 },
            { title: "در انتظار بررسی", value: 2 },
            { title: "تایید شده", value: 1 },
          ].map((item,i)=>(
            <motion.div key={i}
              whileHover={{scale:1.05}}
              className="bg-gray-900/80 border border-gray-800 rounded-3xl p-8 text-center shadow-2xl"
            >
              <p className="text-gray-400">{item.title}</p>
              <h3 className="text-5xl font-extrabold text-[#ffc000] mt-3">
                {item.value}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
