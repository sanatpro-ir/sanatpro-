import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function useLangDirection() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === "en" ? "ltr" : "rtl";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
    localStorage.setItem("lang", i18n.language);
  }, [i18n.language]);
}