import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { API_URL as BASE_URL } from "../config";

const API_URL = `${BASE_URL}/api/equipments`;

export default function AdminUsedEquipment() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  // ✅ ثابت کردن config
  const config = useMemo(() => ({
    headers: { Authorization: `Bearer ${token}` },
  }), [token]);

  // ✅ گرفتن دیتا
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

  // ✅ تایید
  const handleApprove = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}/approve`, {}, config);
      fetchItems();
    } catch {
      alert("خطا در تایید");
    }
  };

  // ✅ حذف
  const handleDelete = async (id) => {
    if (!window.confirm("مطمئنی می‌خوای حذف کنی؟")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      fetchItems();
    } catch {
      alert("خطا در حذف");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">مدیریت تجهیزات دست دوم</h2>

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
                  
                  {/* عکس */}
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

                  {/* عنوان */}
                  <td className="p-3">{item.title}</td>

                  {/* تماس */}
                  <td className="p-3">{item.contactPhone}</td>

                  {/* وضعیت */}
                  <td className="p-3">
                    {item.isApproved ? (
                      <span className="text-green-600 font-bold">
                        تایید شده
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-bold">
                        در انتظار تایید
                      </span>
                    )}
                  </td>

                  {/* 🔥 این همون قسمتیه که کم داشتی */}
                  <td className="p-3 flex gap-3">
                    {!item.isApproved && (
                      <button
                        onClick={() => handleApprove(item._id)}
                        className="text-green-600"
                      >
                        تایید
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600"
                    >
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