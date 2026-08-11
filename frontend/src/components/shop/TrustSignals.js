import { motion } from "framer-motion";

export default function TrustSignals({ logos = [] }) {
  return (
    <div className="my-28 flex justify-center gap-10 flex-wrap">
      {logos.map((logo, i) => (
        <motion.img
          key={i}
          src={logo}
          className="h-16 grayscale hover:grayscale-0"
          whileHover={{ scale: 1.1 }}
        />
      ))}
    </div>
  );
}
