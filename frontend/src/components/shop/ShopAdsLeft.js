import { motion } from "framer-motion";

export default function ShopAdsLeft() {
  const gifs = [
    "/videos/hero.gif",
    "/videos/hero2.gif",
    "/videos/hero3.gif"
  ];

  return (
    <aside className="flex flex-col gap-6 sticky top-24">
      {gifs.map((gif, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="relative rounded-xl overflow-hidden shadow-2xl"
        >
          <img
            src={gif}
            className="w-full h-[160px] object-cover"
            alt="ad"
          />

          <div className="absolute bottom-0 w-full bg-black/60 text-white text-center py-1">
            پیشنهاد ویژه صنعتی
          </div>
        </motion.div>
      ))}
    </aside>
  );
}
