import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { API_URL as BASE_URL } from "../config";

const API_URL = `${BASE_URL}/api/used-equipments`;

const EMPTY_FORM = {
  title: "",
  brand: "",
  condition: "کارکرده - سالم",
  year: "",
  suggestedPrice: "",
  location: "",
  contactName: "",
  contactPhone: "",
  description: "",
};

export default function AdminUsedEquipment() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("adminToken");

  const config = useMemo(
    () => ({ headers: { Authorization: `Bearer ${token}` } }),
    [token]
  );

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/all`, config);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [config]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleApprove = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}/approve`, {}, config);
      fetchItems();
    } catch {
      alert("خطا در تایید");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("مطمئنی می‌خوای حذف کنی؟")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, config);
      fetchItems();
    } catch {
      alert("خطا در حذف");
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setImages([]);
    setVideo(null);
    setShowForm(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      images.forEach((img) => formData.append("images", img));
      if (video) formData.append("video", video);

      const res = await axios.post(API_URL, formData, {
        headers: {
          ...config.headers,
          "Content-Type": "multipart/form-data",
        },
      });

      // ادمین مستقیم ثبت می‌کنه، پس خودکار تاییدش می‌کنیم
      await axios.put(`${API_URL}/${res.data._id}/approve`, {}, config);

      resetForm();
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || "خطا در ثبت دستگاه");
    }
    setSubmitting(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">مدیریت تجهیزات دست دوم</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-black text-white px-5 py-2 rounded-lg font-bold hover:bg-gray-800 transition"
        >
          {showForm ? "بستن فرم" : "+ افزودن آگهی جدید"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white p-6 rounded-xl shadow border mb-6 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="title"
              value={form.title}
              onChange={handleFormChange}
              required
              placeholder="نام تجهیز"
              className="border rounded-lg px-3 py-2"
            />
            <input
              name="brand"
              value={form.brand}
              onChange={handleFormChange}
              placeholder="برند / مدل"
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              name="condition"
              value={form.condition}
              onChange={handleFormChange}
              className="border rounded-lg px-3 py-2"
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
              onChange={handleFormChange}
              placeholder="سال ساخت"
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="suggestedPrice"
              type="number"
              value={form.suggestedPrice}
              onChange={handleFormChange}
              placeholder="قیمت پیشنهادی"
              className="border rounded-lg px-3 py-2"
            />
            <input
              name="location"
              value={form.location}
              onChange={handleFormChange}
              placeholder="محل دستگاه"
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="contactName"
              value={form.contactName}
              onChange={handleFormChange}
              placeholder="نام تماس"
              className="border rounded-lg px-3 py-2"
            />
            <input
              name="contactPhone"
              value={form.contactPhone}
              onChange={handleFormChange}
              required
              placeholder="شماره تماس"
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleFormChange}
            rows={3}
            placeholder="توضیحات"
            className="w-full border rounded-lg px-3 py-2"
          />

          <div>
            <label className="block text-sm mb-1">عکس‌ها (تا ۵ عکس)</label>
            <input type="file" multiple accept="image/*" onChange={handleImagesChange} />
          </div>

          <div>
            <label className="block text-sm mb-1">ویدیو (اختیاری)</label>
            <input type="file" accept="video/*" onChange={handleVideoChange} />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-black text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50"
            >
              {submitting ? "در حال ثبت..." : "ثبت آگهی"}
            </button>
            <button type="button" onClick={resetForm} className="border px-6 py-2 rounded-lg">
              انصراف
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-gray-600">در حال بارگذاری...</p>
      ) : (
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">عکس</th>
                <th className="p-3">عنوان</th>
                <th className="p-3">تماس</th>
                <th className="p-3">وضعیت</th>
                <th className="p-3">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-3">
                    {item.images?.[0] ? (
                      <img
                        src={`${BASE_URL}${item.images[0]}`}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                    )}
                  </td>

                  <td className="p-3">{item.title}</td>

                  <td className="p-3">{item.contactPhone}</td>

                  <td className="p-3">
                    {item.isApproved ? (
                      <span className="text-green-600 font-bold">تایید شده</span>
                    ) : (
                      <span className="text-yellow-600 font-bold">در انتظار تایید</span>
                    )}
                  </td>

                  <td className="p-3 flex gap-3">
                    {!item.isApproved && (
                      <button onClick={() => handleApprove(item._id)} className="text-green-600">
                        تایید
                      </button>
                    )}
                    <button onClick={() => handleDelete(item._id)} className="text-red-600">
                      حذف
                    </button>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    هنوز آیتمی ثبت نشده
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}