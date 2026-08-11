import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaWhatsapp, FaInstagram, FaYoutube 
} from "react-icons/fa";
import { SiAparat } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="relative bg-[#0b0f14] text-gray-300 overflow-hidden">

      {/* 🔶 Decorative Industrial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,192,0,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.03),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-4 md:grid-cols-2 gap-12">

        {/* 🏭 Brand */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-4">
            SANAT<span className="text-[#ffc000]">Pro</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            تأمین تخصصی تجهیزات معدنی، فولادی و صنعتی  
            با تمرکز بر قراردادهای B2B و پروژه‌های EPC
          </p>

          <div className="flex gap-4 mt-6">
            {/* لینک‌های شبکه اجتماعی با لینک واقعی */}
            <a 
              href="https://www.linkedin.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-xl bg-gray-800 hover:bg-[#ffc000] hover:text-black transition"
            >
              <FaLinkedin />
            </a>

            <a 
              href="https://wa.me/989302850915" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-xl bg-gray-800 hover:bg-[#25D366] transition"
            >
              <FaWhatsapp />
            </a>

            <a 
              href="https://www.instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-xl bg-gray-800 hover:bg-[#E1306C] transition"
            >
              <FaInstagram />
            </a>

            <a 
              href="https://www.youtube.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-xl bg-gray-800 hover:bg-[#FF0000] transition"
            >
              <FaYoutube />
            </a>

            <a 
              href="https://www.aparat.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-xl bg-gray-800 hover:bg-[#FF5A00] transition"
            >
              <SiAparat />
            </a>
          </div>
        </div>

        {/* 🔗 Links */}
        <div>
          <h3 className="text-white font-bold mb-6">دسترسی سریع</h3>
          <ul className="space-y-3">
            <li><a href="/" className="hover:text-[#ffc000] transition">صفحه اصلی</a></li>
            <li><a href="/shop" className="hover:text-[#ffc000] transition">فروشگاه</a></li>
            <li><a href="/inquiry" className="hover:text-[#ffc000] transition">استعلام B2B</a></li>
            <li><a href="/about" className="hover:text-[#ffc000] transition">درباره ما</a></li>
          </ul>
        </div>

        {/* 📞 Contact */}
        <div>
          <h3 className="text-white font-bold mb-6">ارتباط با ما</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex gap-3 items-center">
              <FaPhone className="text-[#ffc000]" />
              <span>09302850915</span>
            </li>
            <li className="flex gap-3 items-center">
              <FaEnvelope className="text-[#ffc000]" />
              <span>info@sanatpro.ir</span>
            </li>
            <li className="flex gap-3 items-start">
              <FaMapMarkerAlt className="text-[#ffc000] mt-1" />
              <span>
                ایران، تهران  
                <br /> دفتر مرکزی MinePro
              </span>
            </li>
          </ul>
        </div>

        {/* 🗺 Google Map */}
        <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
          <iframe
            title="MinePro Location"
            src="https://www.google.com/maps?q=Tehran&output=embed"
            className="w-full h-64 grayscale hover:grayscale-0 transition duration-700"
            loading="lazy"
          />
        </div>

      </div>

      {/* ⚙️ Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MinePro — Industrial Solutions & B2B Supply
      </div>
    </footer>
  );
}
