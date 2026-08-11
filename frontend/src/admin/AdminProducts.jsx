import { useState, useEffect } from "react";
import axios from "axios";
import EquipmentForm from "./components/EquipmentForm";

import { API_URL as BASE_URL } from "../config";
const API_URL = `${BASE_URL}/api/equipments`;
export default function AdminProducts() {
  const [equipments, setEquipments] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const fetchEquipments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setEquipments(res.data.equipments || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

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
      fetchEquipments();
    } catch (err) {
      alert(err.response?.data?.message || "خطا در ذخیره‌سازی");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("مطمئنی می‌خوای این محصول رو حذف کنی؟")) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${API_URL}/${id}`, config);
      fetchEquipments();
    } catch (err) {
      alert("خطا در حذف");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">مدیریت محصولات</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(!showForm);
          }}
          className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold"
        >
          {showForm ? "بستن فرم" : "+ محصول جدید"}
        </button>
      </div>

      {showForm && (
        <EquipmentForm
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
                <th className="p-3 text-gray-800">عکس</th>
                <th className="p-3 text-gray-800">عنوان</th>
                <th className="p-3 text-gray-800">دسته</th>
                <th className="p-3 text-gray-800">قیمت</th>
                <th className="p-3 text-gray-800">برچسب</th>
                <th className="p-3 text-gray-800">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((eq) => (
                <tr key={eq._id} className="border-t">
                  <td className="p-3">
                    {eq.images?.[0] ? (
                      <img
                        src={`https://sanatpro-backend.onrender.com${eq.images[0]}`}
                        alt={eq.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                    )}
                  </td>
                  <td className="p-3 text-gray-800">{eq.title}</td>
                  <td className="p-3 text-gray-800">{eq.category?.name || "-"}</td>
                  <td className="p-3 text-gray-800">{eq.price?.toLocaleString("fa-IR")}</td>
                  <td className="p-3 text-gray-800">{eq.tag}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => {
                        setEditing(eq);
                        setShowForm(true);
                      }}
                      className="text-blue-600"
                    >
                      ویرایش
                    </button>
                    <button onClick={() => handleDelete(eq._id)} className="text-red-600">
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
              {equipments.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-400">
                    هنوز محصولی ثبت نشده
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