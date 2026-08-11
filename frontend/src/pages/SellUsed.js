// import { motion } from "framer-motion";
// import { useState } from "react";
// import { useUsedMarket } from "../context/UsedMarketContext";

// export default function SellUsed() {
//   const { addUsedProduct } = useUsedMarket();

//   const [form, setForm] = useState({
//     title: "",
//     brand: "",
//     year: "",
//     condition: "",
//     location: "",
//     price: "",
//     contact: "",
//     description: "",
//     category: "تجهیزات",
//     img: ""
//   });

//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleChange = (field, value) => {
//     setForm({ ...form, [field]: value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();

//     // چک ساده فیلدهای ضروری
//     if (!form.title || !form.contact) {
//       alert("لطفاً نام تجهیز و شماره تماس را وارد کنید.");
//       return;
//     }

//     addUsedProduct(form);

//     // نمایش modal موفقیت
//     setShowSuccess(true);
//   };

//   const closeModal = () => {
//     setShowSuccess(false);
//     setForm({
//       title: "",
//       brand: "",
//       year: "",
//       condition: "",
//       location: "",
//       price: "",
//       contact: "",
//       description: "",
//       category: "تجهیزات",
//       img: ""
//     });
//   };

//   return (
//     <div className="bg-gray-950 min-h-screen py-24 text-white relative">
//       <div className="max-w-5xl mx-auto px-6">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
//             ثبت <span className="text-yellow-500">تجهیزات دست دوم</span>
//           </h1>
//           <p className="text-gray-400 text-lg">
//             تجهیزات کارکرده خود را ثبت کنید — پس از بررسی فنی منتشر می‌شود
//           </p>
//         </motion.div>

//         {/* Form Card */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white text-gray-800 rounded-2xl shadow-2xl p-10"
//         >
//           <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

//             <input
//               type="text"
//               placeholder="نام تجهیز"
//               className="input"
//               value={form.title}
//               onChange={e => handleChange("title", e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="برند / مدل"
//               className="input"
//               value={form.brand}
//               onChange={e => handleChange("brand", e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="سال ساخت"
//               className="input"
//               value={form.year}
//               onChange={e => handleChange("year", e.target.value)}
//             />

//             <select
//               className="input"
//               value={form.condition}
//               onChange={e => handleChange("condition", e.target.value)}
//             >
//               <option value="">وضعیت دستگاه</option>
//               <option value="سالم">سالم</option>
//               <option value="کارکرده">کارکرده</option>
//               <option value="نیازمند تعمیر">نیازمند تعمیر</option>
//               <option value="بازسازی شده">بازسازی شده</option>
//             </select>

//             <input
//               type="text"
//               placeholder="محل دستگاه"
//               className="input"
//               value={form.location}
//               onChange={e => handleChange("location", e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="قیمت پیشنهادی (اختیاری)"
//               className="input"
//               value={form.price}
//               onChange={e => handleChange("price", e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="نام تماس"
//               className="input"
//               value={form.contactName}
//               onChange={e => handleChange("contactName", e.target.value)}
//             />

//             <input
//               type="tel"
//               placeholder="شماره تماس"
//               className="input"
//               value={form.contact}
//               onChange={e => handleChange("contact", e.target.value)}
//             />

//             <select
//               className="input md:col-span-2"
//               value={form.category}
//               onChange={e => handleChange("category", e.target.value)}
//             >
//               <option value="تجهیزات">تجهیزات</option>
//               <option value="معدن">معدن</option>
//               <option value="فولاد">فولاد</option>
//             </select>

//             <input
//               type="text"
//               placeholder="لینک عکس دستگاه"
//               className="input md:col-span-2"
//               value={form.img}
//               onChange={e => handleChange("img", e.target.value)}
//             />

//             <textarea
//               rows="5"
//               placeholder="توضیحات تکمیلی"
//               className="input md:col-span-2"
//               value={form.description}
//               onChange={e => handleChange("description", e.target.value)}
//             />

//             <button
//               type="submit"
//               className="md:col-span-2 bg-black border border-[#ffc000] text-[#ffc000]
//                 px-12 py-5 rounded-2xl font-extrabold hover:bg-[#ffc000] hover:text-black transition"
//             >
//               ثبت دستگاه
//             </button>

//           </form>
//         </motion.div>
//       </div>

//       {/* Modal موفقیت */}
//       {showSuccess && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.4 }}
//             className="bg-gray-900 text-white rounded-2xl shadow-2xl p-10 max-w-lg mx-4 text-center"
//           >
//             <h2 className="text-3xl font-extrabold mb-4">ثبت موفق!</h2>
//             <p className="text-gray-300 mb-6">
//               تجهیزات شما با موفقیت در سامانه ثبت شد. 🎉
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={closeModal}
//                 className="bg-black border border-[#ffc000] text-[#ffc000] px-6 py-3 rounded-xl font-bold hover:bg-[#ffc000] hover:text-black transition"
//               >
//                 بستن
//               </button>
//               <a
//                 href="/category-two"
//                 className="bg-[#ffc000] text-black px-6 py-3 rounded-xl font-bold hover:bg-[#e6b000] transition"
//               >
//                 مشاهده تجهیزات دست دوم
//               </a>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }





import { useState } from "react";
import axios from "axios";

const API_URL = "https://sanatpro-backend.onrender.com/api/used-equipments";
export default function SellUsed() {
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
      alert(err.response?.data?.message || "خطا در ثبت دستگاه");
    }
    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-center px-6">
        <div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">آگهی شما ثبت شد ✅</h2>
          <p className="text-gray-300 mb-6">
            آگهی شما پس از بررسی و تایید توسط تیم ما، در بازار تجهیزات دست دوم نمایش داده خواهد شد.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
          >
            ثبت آگهی جدید
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-[#0b1220] border border-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">ثبت تجهیزات دست دوم</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="نام تجهیز"
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="برند / مدل"
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
            <option value="نو">نو</option>
            <option value="کارکرده - سالم">کارکرده - سالم</option>
            <option value="نیازمند تعمیر">نیازمند تعمیر</option>
            <option value="بازسازی شده">بازسازی شده</option>
            <option value="استوک پروژه">استوک پروژه</option>
          </select>
          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="سال ساخت"
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            name="suggestedPrice"
            type="number"
            value={form.suggestedPrice}
            onChange={handleChange}
            placeholder="قیمت پیشنهادی (اختیاری)"
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="محل دستگاه"
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
            placeholder="نام تماس"
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            name="contactPhone"
            value={form.contactPhone}
            onChange={handleChange}
            required
            placeholder="شماره تماس"
            className="bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">عکس‌های دستگاه (تا ۵ عکس)</label>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImagesChange}
            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">فیلم دستگاه (اختیاری)</label>
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
          placeholder="توضیحات تکمیلی"
          className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-yellow-400 text-black py-4 rounded-xl font-extrabold hover:bg-yellow-500 transition disabled:opacity-50"
        >
          {submitting ? "در حال ثبت..." : "ثبت دستگاه"}
        </button>
      </form>
    </div>
  );
}