import { motion } from "framer-motion";

export default function RevealText({ text }) {
  const words = text.split(" ");

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 2 + index * 0.15,
            duration: 0.7,
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}