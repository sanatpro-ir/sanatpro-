import { useState, useEffect } from "react";
import axios from "axios";
import CategoryForm from "./components/CategoryForm";

import { API_URL as BASE_URL } from "../config";
const API_URL = `${BASE_URL}/api/equipments`;

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);

      // 🔥 اینجا مهم‌ترین فیکس
      console.log("API DATA:", res.data);

      setCategories(
        Array.isArray(res.data)
          ? res.data
          : res.data.categories || [] // اگر آبجکت بود
      );
    } catch (err) {
      console.error("خطا در دریافت دسته‌ها", err);
      setCategories([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (data) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editing) {
        await axios.put(`${API_URL}/${editing._id}`, data, config);
      } else {
        await axios.post(API_URL, data, config);
      }

      setShowForm(false);
      setEditing(null);
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "خطا در ذخیره‌سازی");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("مطمئنی می‌خوای این دسته رو حذف کنی؟")) return;

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${API_URL}/${id}`, config);
      fetchCategories();
    } catch (err) {
      alert("خطا در حذف");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">مدیریت دسته‌بندی‌ها</h2>

        <button
          onClick={() => {
            setEditing(null);
            setShowForm(!showForm);
          }}
          className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold"
        >
          {showForm ? "بستن فرم" : "+ دسته جدید"}
        </button>
      </div>

      {showForm && (
        <CategoryForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">نام</th>
                <th className="p-3">اسلاگ</th>
                <th className="p-3">ترتیب</th>
                <th className="p-3">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <tr key={cat._id} className="border-t">
                    <td className="p-3 text-gray-800">{cat.name}</td>
                    <td className="p-3 text-gray-500">{cat.slug}</td>
                    <td className="p-3">{cat.order}</td>
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => {
                          setEditing(cat);
                          setShowForm(true);
                        }}
                        className="text-blue-600"
                      >
                        ویرایش
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="text-red-600"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}

              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-400">
                    هنوز دسته‌ای ثبت نشده
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