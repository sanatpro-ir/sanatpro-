import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { API_URL as BASE_URL } from "../config";

const API_URL = `${BASE_URL}/api/equipments`;

export default function AdminPendingProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  // ✅ ثابت کردن config
  const config = useMemo(() => ({
    headers: { Authorization: `Bearer ${token}` },
  }), [token]);

  // ✅ حالا dependency درست شد
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/pending`, config);
      setItems(res.data);
    } catch (err) {
      console.error(err);
      setItems([]);
    }
    setLoading(false);
  }, [config]); // 👈 درست

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
    if (!window.confirm("مطمئنی می‌خوای رد/حذف کنی؟")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      fetchItems();
    } catch {
      alert("خطا در حذف");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">محصولات در انتظار تایید</h2>

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <table className="w-full">
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>
                  <button onClick={() => handleApprove(item._id)}>تایید</button>
                  <button onClick={() => handleDelete(item._id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}