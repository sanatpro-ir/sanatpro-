import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "fa", flagUrl: "https://flagcdn.com/w40/ir.png", alt: "فارسی" },
  { code: "ar", flagUrl: "https://flagcdn.com/w40/sa.png", alt: "العربية" },
  { code: "en", flagUrl: "https://flagcdn.com/w40/gb.png", alt: "English" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      {LANGS.map((lang, i) => (
        <motion.button
          key={lang.code}
          type="button"
          onClick={() => i18n.changeLanguage(lang.code)}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 0.25,
          }}
          whileHover={{ scale: 1.25, y: -6 }}
          whileTap={{ scale: 0.9 }}
          className={`w-6 h-6 rounded-full overflow-hidden border-2 flex-shrink-0 transition ${
            i18n.language === lang.code
              ? "border-yellow-500"
              : "border-transparent opacity-60 hover:opacity-100"
          }`}
        >
          <img
            src={lang.flagUrl}
            alt={lang.alt}
            className="w-full h-full object-cover"
          />
        </motion.button>
      ))}
    </div>
  );
}