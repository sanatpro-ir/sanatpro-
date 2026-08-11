import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center text-xl font-extrabold">
         <span className="text-white ml-1">PRO</span>
          <span className="text-yellow-500">SANAT</span>
         
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-300">
          <Link to="/" className="hover:text-yellow-400">خانه</Link>
          <Link to="/shop" className="hover:text-yellow-400">فروشگاه</Link>
          <Link to="/category-two" className="hover:text-yellow-400">دست دوم</Link>
          <Link to="/sell-used" className="hover:text-yellow-400">ثبت تجهیزات</Link>
          <Link to="/b2b" className="hover:text-yellow-400">B2B</Link>
          <Link to="/about" className="hover:text-yellow-400">درباره ما</Link>
        </nav>

        {/* AUTH */}
        <div className="hidden md:flex gap-3 text-sm">
          <Link to="/supplier-login" className="text-gray-300 hover:text-white">
            ورود
          </Link>
          <Link
            to="/supplier-login?mode=register"
            className="px-4 py-1.5 bg-yellow-500 text-black rounded-lg font-bold hover:bg-yellow-600"
          >
            ثبت‌نام
          </Link>
        </div>

        {/* MOBILE */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-white/10 px-6 py-5 space-y-4 text-sm text-gray-300">
          <Link to="/" onClick={() => setOpen(false)}>خانه</Link>
          <Link to="/shop" onClick={() => setOpen(false)}>فروشگاه</Link>
          <Link to="/category-two" onClick={() => setOpen(false)}>دست دوم</Link>
          {/* <Link to="/sell-used" onClick={() => setOpen(false)}>ثبت تجهیزات</Link> */}
          <Link to="/b2b" onClick={() => setOpen(false)}>B2B</Link>
          <Link to="/about" onClick={() => setOpen(false)}>درباره ما</Link>

          <div className="pt-4 border-t border-white/10 flex gap-3">
            <Link to="/supplier-login" className="flex-1 text-center py-2 border border-yellow-500 text-yellow-500 rounded-lg">
              ورود
            </Link>
            <Link to="/supplier-login?mode=register" className="flex-1 text-center py-2 bg-yellow-500 text-black rounded-lg font-bold">
              ثبت‌نام
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}