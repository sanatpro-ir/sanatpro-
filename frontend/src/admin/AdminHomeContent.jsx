import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import HomeSectionForm from "./components/HomeSectionForm";
import { API_URL as BASE_URL } from "../config";

const API_URL = `${BASE_URL}/api/equipments`;

export default function AdminHomeContent() {
  const [sections, setSections] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  // ✅ useCallback برای جلوگیری از Warning
  const fetchSections = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);

      console.log(res.data);

      setSections(res.data.data || res.data.equipments || []);
    } catch (err) {
      console.error(err);
      setSections([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]); // ✅ بدون Warning

  const handleSubmit = async (formData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editing) {
        await axios.put(`${API_URL}/${editing._id}`, formData, config);
      } else {
        await axios.post(API_URL, formData, config);
      }

      setShowForm(false);
      setEditing(null);
      fetchSections();
    } catch (err) {
      alert(err.response?.data?.message || "خطا در ذخیره‌سازی");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("مطمئنی می‌خوای حذف کنی؟")) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.delete(`${API_URL}/${id}`, config);
      fetchSections();
    } catch (err) {
      alert("خطا در حذف");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">مدیریت محتوای صفحه اصلی</h1>

      <button
        onClick={() => {
          setEditing(null);
          setShowForm(!showForm);
        }}
        className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold mb-4"
      >
        {showForm ? "بستن فرم" : "+ بخش جدید"}
      </button>

      {showForm && (
        <HomeSectionForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {loading ? (
        <p className="text-gray-700">در حال بارگذاری...</p>
      ) : (
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">عکس</th>
                <th className="p-3">نوع</th>
                <th className="p-3">عنوان</th>
                <th className="p-3">ترتیب</th>
                <th className="p-3">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {sections.map((s) => (
                <tr key={s._id} className="border-t">
                  <td className="p-3">
                    {s.image ? (
                      <img
                        src={`${BASE_URL}${s.image}`}
                        alt={s.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                    )}
                  </td>

                  <td className="p-3">{s.type}</td>
                  <td className="p-3">{s.title}</td>
                  <td className="p-3">{s.order}</td>

                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => {
                        setEditing(s);
                        setShowForm(true);
                      }}
                      className="text-blue-600"
                    >
                      ویرایش
                    </button>

                    <button
                      onClick={() => handleDelete(s._id)}
                      className="text-red-600"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}

              {sections.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    هنوز محتوایی ثبت نشده
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