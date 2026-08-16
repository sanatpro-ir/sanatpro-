import { motion } from "framer-motion";

const ads = [
  {
    image: "/videos/hero.gif",
    title: "پیشنهاد ویژه صنعتی",
  },
  {
    image: "/videos/hero2.gif",
    title: "تجهیزات و ماشین‌آلات",
  },
];

export default function ShopAdsLeft() {
  return (
    <aside className="space-y-4">

      {ads.map((ad, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          className="
            relative overflow-hidden
            rounded-2xl
            border border-slate-800
            bg-[#020617]
            shadow-xl
            cursor-pointer
          "
        >

          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-36 object-cover"
          />

          <div className="
            absolute bottom-0 left-0 right-0
            bg-black/75
            px-3 py-2
            text-center
            text-white
            text-sm
            font-bold
          ">
            {ad.title}
          </div>

        </motion.div>
      ))}

    </aside>
  );
}