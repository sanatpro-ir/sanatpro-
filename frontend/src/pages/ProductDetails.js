import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaPhoneAlt, FaWhatsapp, FaArrowRight } from "react-icons/fa";

import { API_URL as BASE_URL } from "../config";
const API_URL = `${BASE_URL}/api/equipments`;

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API_URL + "/" + id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">در حال بارگذاری...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h2 className="text-3xl font-bold text-red-500">محصول مورد نظر یافت نشد</h2>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [];
  const contactNumber = "989121234567";
  const phoneLink = "tel:" + contactNumber;
  const whatsappLink = "https://wa.me/" + contactNumber;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Link to="/shop" className="inline-flex items-center gap-2 text-[#ffc000] mb-10 hover:opacity-80">
          <FaArrowRight />
          <span>بازگشت به فروشگاه</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-14 items-center"
        >
          <div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative rounded-3xl overflow-hidden border border-[#ffc000]/40 shadow-2xl bg-gray-900"
            >
              {images.length > 0 ? (
                <img
                  src={"https://sanatpro-backend.onrender.com" + images[activeImage]}
                  alt={product.title}
                  className="w-full h-[420px] object-cover"
                />
              ) : (
                <div className="w-full h-[420px] flex items-center justify-center text-gray-500">
                  بدون تصویر
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent pointer-events-none"></div>
            </motion.div>

            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {images.map(function (img, i) {
                  return (
                    <button
                      key={i}
                      onClick={function () {
                        setActiveImage(i);
                      }}
                      className={
                        "w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 " +
                        (i === activeImage ? "border-[#ffc000]" : "border-gray-700")
                      }
                    >
                      <img
                        src={"https://sanatpro-backend.onrender.com" + img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{product.title}</h1>

            {product.category && product.category.name ? (
              <p className="text-gray-400">
                دسته‌بندی:
                <span className="text-[#ffc000] font-bold mr-2">{product.category.name}</span>
              </p>
            ) : null}

            <p className="text-gray-300 leading-relaxed">
              {product.description ? product.description : "توضیحاتی برای این محصول ثبت نشده است."}
            </p>

            <p className="text-2xl font-extrabold text-[#ffc000]">
              قیمت: {product.price ? product.price.toLocaleString("fa-IR") : "0"} تومان
            </p>

            {product.stock !== undefined ? (
              <p className="text-gray-400">
                موجودی:
                <span className="text-white font-bold mr-2">
                  {product.stock > 0 ? product.stock + " عدد" : "تماس بگیرید"}
                </span>
              </p>
            ) : null}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/80 backdrop-blur border border-gray-700 rounded-2xl p-6 space-y-4"
            >
              <p className="font-bold text-lg">ارتباط مستقیم با فروش</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={phoneLink} className="flex-1 flex items-center justify-center gap-2 bg-[#ffc000] text-black py-3 rounded-xl font-extrabold hover:bg-[#e6b000] transition">
                  <FaPhoneAlt />
                  <span>تماس تلفنی</span>
                </a>

                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-extrabold hover:bg-green-600 transition">
                  <FaWhatsapp />
                  <span>واتساپ</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetails;