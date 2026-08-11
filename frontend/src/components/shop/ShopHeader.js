import { motion } from "framer-motion";

export default function Header() {
  return (
    <div className="relative h-[55vh] overflow-hidden">
      <img
        src="/videos/hero.gif"
        className="absolute w-full h-full object-cover"
        alt="hero"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 text-center">
          فروشگاه صنعتی MinePro
        </h1>
      </div>
    </div>
  );
}
