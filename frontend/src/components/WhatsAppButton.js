
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/00989302850915"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 animate-bounce z-50 flex items-center justify-center"
      style={{ animationDuration: "2s" }}
    >
      <FaWhatsapp size={28} />
    </a>
  );
}

export default WhatsAppButton;

