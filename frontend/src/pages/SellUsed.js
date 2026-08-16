import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const API_URL = "https://sanatpro-backend.onrender.com/api/used-equipments";

export default function SellUsed() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    title: "",
    brand: "",
    condition: "کارکرده - سالم",
    year: "",
    suggestedPrice: "",
    location: "",
    contactName: "",
    contactPhone: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      images.forEach((img) => formData.append("images", img));
      if (video) formData.append("video", video);

      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setForm({
        title: "",
        brand: "",
        condition: "کارکرده - سالم",
        year: "",
        suggestedPrice: "",
        location: "",
        contactName: "",
        contactPhone: "",
        description: "",
      });
      setImages([]);
      setVideo(null);
    } catch (err) {
      alert(err.response?.data?.message || t("sellused_error_default"));
    }
    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-center px-6">
        <div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">{t("sellused_success_title")} ✅</h2>
          <p className="text-gray-300 mb-6">
            {t("sellused_success_desc")}
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
          >
            {t("sellused_new_ad")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-[#0b1220] border border-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">{t("sellused_title")}</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder={t("sellused_name")}
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder={t("sellused_brand")}
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="نو">{t("sellused_condition_new")}</option>
            <option value="کارکرده - سالم">{t("sellused_condition_used")}</option>
            <option value="نیازمند تعمیر">{t("sellused_condition_repair")}</option>
            <option value="بازسازی شده">{t("sellused_condition_refurb")}</option>
            <option value="استوک پروژه">{t("sellused_condition_project")}</option>
          </select>
          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder={t("sellused_year")}
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            name="suggestedPrice"
            type="number"
            value={form.suggestedPrice}
            onChange={handleChange}
            placeholder={t("sellused_price")}
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder={t("sellused_location")}
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
            placeholder={t("sellused_contact_name")}
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            name="contactPhone"
            value={form.contactPhone}
            onChange={handleChange}
            required
            placeholder={t("sellused_contact_phone")}
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">{t("sellused_images_label")}</label>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImagesChange}
            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">{t("sellused_video_label")}</label>
          <input
            type="file"
            accept="video/mp4,video/mov,video/webm"
            onChange={handleVideoChange}
            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder={t("sellused_description")}
          className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-yellow-400 text-black py-4 rounded-xl font-extrabold hover:bg-yellow-500 transition disabled:opacity-50"
        >
          {submitting ? t("sellused_submitting") : t("sellused_submit")}
        </button>
      </form>
    </div>
  );
}