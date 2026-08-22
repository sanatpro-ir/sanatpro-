import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://sanatpro-backend.onrender.com";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("supplierToken");
    if (!token) {
      navigate("/supplier-login");
      return;
    }

    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];
        setCategories(data);
      })
      .catch((err) => {
        console.error("Categories fetch error:", err);
      });
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setFieldErrors({ ...fieldErrors, images: "حداکثر ۵ تصویر می‌توانید انتخاب کنید" });
      return;
    }
    setImages(files);
    setFieldErrors({ ...fieldErrors, images: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "نام محصول الزامی است";
    if (!form.description.trim()) errs.description = "توضیحات محصول الزامی است";
    if (!form.price || Number(form.price) <= 0) errs.price = "قیمت معتبر وارد کنید";
    if (!form.category) errs.category = "انتخاب دسته‌بندی الزامی است";
    if (images.length === 0) errs.images = "حداقل یک تصویر الزامی است";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("supplierToken");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      images.forEach((img) => formData.append("images", img));

      await axios.post(`${API_URL}/api/equipments`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("محصول با موفقیت ثبت شد و برای تایید به ادمین ارسال شد.");
      setTimeout(() => navigate("/supplier"), 1500);
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      if (status === 401) {
        localStorage.removeItem("supplierToken");
        navigate("/supplier-login");
      } else if (status === 403) {
        setError(msg || "اشتراک شما فعال نیست. لطفاً ابتدا هزینه اشتراک را پرداخت کنید.");
      } else {
        setError(msg || "خطا در ثبت محصول. لطفاً دوباره تلاش کنید.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6">افزودن محصول جدید</h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              نام محصول <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="مثال: دستگاه سنگ‌شکن فکی"
            />
            {fieldErrors.title && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.title}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              توضیحات <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="مشخصات فنی، وضعیت، سال ساخت و..."
            />
            {fieldErrors.description && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.description}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              قیمت (تومان) <span className="text-red-500">*</span>
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="مثال: 15000000"
            />
            {fieldErrors.price && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.price}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              دسته‌بندی <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white"
            >
              <option value="">انتخاب کنید</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {fieldErrors.category && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.category}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              تصاویر محصول (حداکثر ۵ عدد) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full border rounded-lg px-4 py-2 bg-white"
            />
            {images.length > 0 && (
              <p className="text-gray-500 text-xs mt-1">{images.length} تصویر انتخاب شد</p>
            )}
            {fieldErrors.images && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.images}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50"
            >
              {submitting ? "در حال ثبت..." : "ثبت محصول"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/supplier")}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;