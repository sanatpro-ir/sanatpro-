import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900 border-b border-white/10">

      <div className="
        max-w-7xl
        mx-auto
        px-6
        h-16
        flex
        items-center
        justify-between
      ">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          onClick={closeMenu}
          className="
            flex
            items-center
            text-xl
            font-extrabold
            whitespace-nowrap
            flex-shrink-0
          "
        >
          <span className="text-white">
            PRO
          </span>

          <span className="text-yellow-500">
            SANAT
          </span>
        </Link>

        {/* ================= DESKTOP MENU ================= */}

        <nav className="
          hidden
          md:flex
          items-center
          gap-6
          text-sm
          text-gray-300
        ">

          <Link
            to="/"
            className="hover:text-yellow-400 transition"
          >
            {t("nav_home")}
          </Link>

          <Link
            to="/shop"
            className="hover:text-yellow-400 transition"
          >
            {t("nav_shop")}
          </Link>

          <Link
            to="/used"
            className="hover:text-yellow-400 transition"
          >
            {t("nav_used")}
          </Link>

          <Link
            to="/sell-used"
            className="hover:text-yellow-400 transition"
          >
            {t("nav_sell_used")}
          </Link>

          <Link
            to="/b2b"
            className="hover:text-yellow-400 transition"
          >
            {t("nav_b2b")}
          </Link>

          <Link
            to="/about"
            className="hover:text-yellow-400 transition"
          >
            {t("nav_about")}
          </Link>

        </nav>

        {/* ================= LANGUAGE + AUTH ================= */}

        <div className="
          hidden
          md:flex
          items-center
          gap-4
          text-sm
        ">

          <LanguageSwitcher />

          <span className="
            w-px
            h-5
            bg-white/10
          " />

          <Link
            to="/supplier-login"
            className="
              text-gray-300
              hover:text-white
              transition
            "
          >
            {t("nav_login")}
          </Link>

          <Link
            to="/supplier-login?mode=register"
            className="
              px-4
              py-1.5
              bg-yellow-500
              text-black
              rounded-lg
              font-bold
              hover:bg-yellow-600
              transition
            "
          >
            {t("nav_register")}
          </Link>

        </div>

        {/* ================= MOBILE ================= */}

        <div className="
          md:hidden
          flex
          items-center
          gap-4
        ">

          <LanguageSwitcher />

          <button
            type="button"
            aria-label="منو"
            className="text-gray-300"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>

      </div>

      {/* ================= MOBILE MENU ================= */}

      {open && (

        <div className="
          md:hidden
          bg-gray-900
          border-t
          border-white/10
          px-6
          py-5
          space-y-4
          text-sm
          text-gray-300
        ">

          <Link
            to="/"
            onClick={closeMenu}
            className="block hover:text-yellow-400"
          >
            {t("nav_home")}
          </Link>

          <Link
            to="/shop"
            onClick={closeMenu}
            className="block hover:text-yellow-400"
          >
            {t("nav_shop")}
          </Link>

          <Link
            to="/used"
            onClick={closeMenu}
            className="
              block
              text-yellow-400
              font-bold
            "
          >
            {t("nav_used")}
          </Link>

          <Link
            to="/sell-used"
            onClick={closeMenu}
            className="block hover:text-yellow-400"
          >
            {t("nav_sell_used")}
          </Link>

          <Link
            to="/b2b"
            onClick={closeMenu}
            className="block hover:text-yellow-400"
          >
            {t("nav_b2b")}
          </Link>

          <Link
            to="/about"
            onClick={closeMenu}
            className="block hover:text-yellow-400"
          >
            {t("nav_about")}
          </Link>

          {/* AUTH */}

          <div className="
            pt-4
            border-t
            border-white/10
            flex
            gap-3
          ">

            <Link
              to="/supplier-login"
              onClick={closeMenu}
              className="
                flex-1
                text-center
                py-2
                border
                border-yellow-500
                text-yellow-500
                rounded-lg
              "
            >
              {t("nav_login")}
            </Link>

            <Link
              to="/supplier-login?mode=register"
              onClick={closeMenu}
              className="
                flex-1
                text-center
                py-2
                bg-yellow-500
                text-black
                rounded-lg
                font-bold
              "
            >
              {t("nav_register")}
            </Link>

          </div>

        </div>

      )}

    </header>
  );
}