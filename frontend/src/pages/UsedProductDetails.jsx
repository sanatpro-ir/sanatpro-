import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { API_URL as BASE_URL } from "../config";

const API_URL = `${BASE_URL}/api/used-equipments`;

export default function UsedProductDetails() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-gray-400">{t("usedproduct_loading")}</p>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-3xl font-bold text-red-500">{t("usedproduct_not_found")}</h2>
      </div>
    );
  }

  const image = product.images && product.images[0] ? `${BASE_URL}${product.images[0]}` : "https://images.unsplash.com/photo-1581092580504-8987c1d9d4d6";
  const contactPhone = (product.contactPhone || "").replace(/^0/, "98");

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-24">
      <div className="max-w-6xl mx-auto px-6">

        <Link to="/" className="inline-flex items-center gap-3 text-gray-400 hover:text-[#ffc000] mb-10 transition">
          <FaArrowRight />
          {t("usedproduct_back_home")}
        </Link>

        <div className="grid md:grid-cols-2 gap-16 items-center">

          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
            <img src={image} alt={product.title} className="w-full h-[420px] object-cover" />
            {product.condition && (
              <span className="absolute top-6 right-6 bg-[#ffc000] text-black px-5 py-2 rounded-full text-sm font-extrabold">
                {product.condition}
              </span>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="bg-gray-900/80 backdrop-blur-xl p-10 rounded-3xl border border-gray-800 shadow-xl">
            <h1 className="text-4xl font-extrabold mb-6">{product.title}</h1>

            {product.description && (
              <p className="text-gray-300 leading-relaxed mb-6">{product.description}</p>
            )}

            <div className="space-y-3 mb-8 text-sm text-gray-400">
              {product.brand && <p>{t("usedproduct_brand")}: <span className="text-white">{product.brand}</span></p>}
              {product.condition && <p>{t("usedproduct_condition")}: <span className="text-white">{product.condition}</span></p>}
              {product.year && <p>{t("usedproduct_year")}: <span className="text-white">{product.year}</span></p>}
              {product.location && <p>{t("usedproduct_location")}: <span className="text-white">{product.location}</span></p>}
            </div>

            <p className="text-2xl font-extrabold text-[#ffc000] mb-10">
              {product.suggestedPrice ? `${Number(product.suggestedPrice).toLocaleString("fa-IR")} تومان` : t("usedproduct_price_contact")}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <a href={`tel:${product.contactPhone}`} className="flex items-center justify-center gap-3 bg-[#ffc000] hover:bg-[#e6b000] text-black py-4 rounded-xl font-extrabold transition">
                <FaPhoneAlt />
                {t("usedproduct_call")}
              </a>

              <a href={`https://wa.me/${contactPhone}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-extrabold transition">
                <FaWhatsapp />
                {t("usedproduct_whatsapp")}
              </a>
            </div>

            {product.video && (
              <div className="mt-8">
                <p className="text-sm text-gray-400 mb-3">{t("usedproduct_video_label")}</p>
                <video src={`${BASE_URL}${product.video}`} controls className="w-full rounded-xl border border-gray-800" />
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}