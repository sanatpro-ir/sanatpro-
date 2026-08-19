import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useTranslation } from "react-i18next";

import {
  FaPhoneAlt,
  FaWhatsapp,
  FaArrowRight,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTools,
  FaUser,
} from "react-icons/fa";

import { API_URL as BASE_URL } from "../config";

const API_URL = `${BASE_URL}/api/used-equipments`;

function UsedProductDetails() {
  const { id } = useParams();
  const { t } = useTranslation();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${API_URL}/${id}`);

        console.log("USED PRODUCT:", res.data);

        setProduct(res.data);
      } catch (err) {
        console.error("UsedProductDetails error:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div
            className="
              w-12
              h-12
              border-4
              border-gray-700
              border-t-[#ffc000]
              rounded-full
              animate-spin
              mx-auto
              mb-6
            "
          />

          <p className="text-gray-400">
            {t("usedDetails.loading")}
          </p>
        </div>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-8">
            {t("usedDetails.notFound")}
          </h2>

          <Link
            to="/used"
            className="
              inline-flex
              items-center
              gap-3
              bg-[#ffc000]
              text-black
              px-7
              py-3
              rounded-xl
              font-bold
              hover:bg-[#e6b000]
              transition
            "
          >
            <FaArrowRight />

            <span>
              {t("usedDetails.backToUsedMarket")}
            </span>
          </Link>
        </div>
      </div>
    );
  }

  /* ================= IMAGES ================= */

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [];

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http://")) {
      return image;
    }

    if (image.startsWith("https://")) {
      return image;
    }

    return `${BASE_URL}${image}`;
  };

  /* ================= CONTACT ================= */

  // شماره فقط برای لینک‌ها استفاده می‌شود و روی صفحه نمایش داده نمی‌شود.

  const contactNumber = "09302850915";
  const phoneNumber = contactNumber;
  const whatsappNumber = "989302850915";

  const phoneLink = `tel:${phoneNumber}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  /* ================= RETURN ================= */

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-black
        via-gray-900
        to-black
        text-white
        py-24
        px-6
      "
    >
      <div className="max-w-6xl mx-auto">

        {/* ================= BACK ================= */}

        <Link
          to="/used"
          className="
            inline-flex
            items-center
            gap-2
            text-[#ffc000]
            mb-10
            hover:opacity-80
            transition
          "
        >
          <FaArrowRight />

          <span>
            {t("usedDetails.backToUsedMarket")}
          </span>
        </Link>

        {/* ================= MAIN ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            grid
            md:grid-cols-2
            gap-14
            items-start
          "
        >

          {/* ================= IMAGES ================= */}

          <div>
            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              className="
                relative
                rounded-3xl
                overflow-hidden
                border
                border-[#ffc000]/40
                shadow-2xl
                bg-gray-900
              "
            >
              {images.length > 0 ? (
                <img
                  src={getImageUrl(images[activeImage])}
                  alt={product.title || t("usedDetails.noImage")}
                  className="
                    w-full
                    h-[420px]
                    object-cover
                  "
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div
                  className="
                    w-full
                    h-[420px]
                    flex
                    items-center
                    justify-center
                    text-gray-500
                  "
                >
                  {t("usedDetails.noImage")}
                </div>
              )}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/70
                  via-transparent
                  pointer-events-none
                "
              />
            </motion.div>

            {/* ================= THUMBNAILS ================= */}

            {images.length > 1 && (
              <div
                className="
                  flex
                  gap-3
                  mt-4
                  overflow-x-auto
                "
              >
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`
                      w-20
                      h-20
                      rounded-xl
                      overflow-hidden
                      border-2
                      flex-shrink-0
                      ${
                        index === activeImage
                          ? "border-[#ffc000]"
                          : "border-gray-700"
                      }
                    `}
                  >
                    <img
                      src={getImageUrl(img)}
                      alt={`${product.title || t("usedDetails.noImage")} ${index + 1}`}
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= INFORMATION ================= */}

          <div className="space-y-6">

            {/* ================= TITLE ================= */}

            <h1
              className="
                text-4xl
                md:text-5xl
                font-extrabold
                leading-tight
              "
            >
              {product.title}
            </h1>

            {/* ================= CONDITION ================= */}

            {product.condition && (
              <div>
                <span
                  className="
                    inline-block
                    bg-[#ffc000]
                    text-black
                    px-5
                    py-2
                    rounded-full
                    font-extrabold
                    text-sm
                  "
                >
                  {product.condition}
                </span>
              </div>
            )}

            {/* ================= DETAILS ================= */}

            <div
              className="
                bg-gray-900/80
                border
                border-gray-800
                rounded-2xl
                p-6
                space-y-4
              "
            >

              {/* BRAND */}

              {product.brand && (
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    text-gray-300
                  "
                >
                  <FaTools className="text-[#ffc000]" />

                  <span>
                    {t("usedDetails.brand")}:
                  </span>

                  <strong className="text-white">
                    {product.brand}
                  </strong>
                </div>
              )}

              {/* YEAR */}

              {product.year && (
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    text-gray-300
                  "
                >
                  <FaCalendarAlt className="text-[#ffc000]" />

                  <span>
                    {t("usedDetails.year")}:
                  </span>

                  <strong className="text-white">
                    {product.year}
                  </strong>
                </div>
              )}

              {/* LOCATION */}

              {product.location && (
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    text-gray-300
                  "
                >
                  <FaMapMarkerAlt className="text-[#ffc000]" />

                  <span>
                    {t("usedDetails.location")}:
                  </span>

                  <strong className="text-white">
                    {product.location}
                  </strong>
                </div>
              )}

              {/* SELLER */}

              {product.contactName && (
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    text-gray-300
                  "
                >
                  <FaUser className="text-[#ffc000]" />

                  <span>
                    {t("usedDetails.seller")}:
                  </span>

                  <strong className="text-white">
                    {product.contactName}
                  </strong>
                </div>
              )}

            </div>

            {/* ================= DESCRIPTION ================= */}

            <div>
              <h3
                className="
                  text-xl
                  font-extrabold
                  mb-3
                "
              >
                {t("usedDetails.description")}
              </h3>

              <p
                className="
                  text-gray-300
                  leading-8
                "
              >
                {product.description
                  ? product.description
                  : t("usedDetails.noDescription")}
              </p>
            </div>

            {/* ================= PRICE ================= */}

            <div
              className="
                text-2xl
                font-extrabold
                text-[#ffc000]
              "
            >
              {t("usedDetails.price")}:

              <span className="mr-2">
                {t("usedDetails.priceOnRequest")}
              </span>
            </div>

            {/* ================= CONTACT BOX ================= */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.3,
              }}
              className="
                bg-gray-900/80
                backdrop-blur
                border
                border-gray-700
                rounded-2xl
                p-6
                space-y-5
              "
            >

              {/* CONTACT TEXT */}

              <div>
                <p
                  className="
                    font-bold
                    text-lg
                    mb-2
                  "
                >
                  {t("usedDetails.contactSeller")}
                </p>

                <p className="text-gray-400">
                  {t("usedDetails.contactDescription")}
                </p>
              </div>

              {/* ================= BUTTONS ================= */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-4
                "
              >

                {/* ================= PHONE ================= */}

                <a
                  href={phoneLink}
                  className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-[#ffc000]
                    text-black
                    py-4
                    rounded-xl
                    font-extrabold
                    hover:bg-[#e6b000]
                    transition
                  "
                >
                  <FaPhoneAlt />

                  <span>
                    {t("usedDetails.callDirect")}
                  </span>
                </a>

                {/* ================= WHATSAPP ================= */}

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-green-500
                    text-white
                    py-4
                    rounded-xl
                    font-extrabold
                    hover:bg-green-600
                    transition
                  "
                >
                  <FaWhatsapp />

                  <span>
                    {t("usedDetails.whatsapp")}
                  </span>
                </a>

              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* ================= VIDEO ================= */}

        {product.video && (
          <div className="mt-16">
            <h2
              className="
                text-2xl
                font-extrabold
                mb-6
              "
            >
              {t("usedDetails.videoLabel")}
            </h2>

            <video
              controls
              className="
                w-full
                max-w-4xl
                mx-auto
                rounded-3xl
                border
                border-gray-800
              "
            >
              <source
                src={getImageUrl(product.video)}
                type="video/mp4"
              />

              {t("usedDetails.videoNotSupported")}
            </video>
          </div>
        )}

      </div>
    </div>
  );
}

export default UsedProductDetails;