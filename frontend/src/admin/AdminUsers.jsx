import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://sanatpro-backend.onrender.com";
const API_URL = `${BASE_URL}/api/admin/users`;

const ROLE_LABELS = {
  admin: "ادمین",
  supplier: "تامین‌کننده",
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [impersonatingId, setImpersonatingId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else if (Array.isArray(res.data.users)) {
        setUsers(res.data.users);
      } else if (Array.isArray(res.data.data)) {
        setUsers(res.data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("خطا در دریافت کاربران:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(
        `${API_URL}/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "خطا در تغییر نقش کاربر");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("مطمئنی می‌خوای این کاربر رو حذف کنی؟")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "خطا در حذف کاربر");
    }
  };

  const handleImpersonate = async (id) => {
    if (!window.confirm("وارد پنل این کاربر می‌شوید. ادامه می‌دهید؟")) return;

    setImpersonatingId(id);
    try {
      const res = await axios.post(
        `${API_URL}/${id}/impersonate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // توکن موقت رو به‌جای توکن ساپلایر ذخیره می‌کنیم و وارد پنلش می‌شیم
      localStorage.setItem("supplierToken", res.data.token);
      localStorage.setItem("supplierName", res.data.user.name);
      localStorage.setItem("isImpersonating", "true");

      navigate("/supplier");
    } catch (err) {
      alert(err.response?.data?.message || "خطا در ورود به پنل کاربر");
    } finally {
      setImpersonatingId(null);
    }
  };

  return (
    <div className="p-8" dir="rtl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">مدیریت کاربران</h2>

      {loading ? (
        <p className="text-gray-700">در حال بارگذاری...</p>
      ) : (
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-gray-800">نام</th>
                <th className="p-3 text-gray-800">ایمیل</th>
                <th className="p-3 text-gray-800">شماره تماس</th>
                <th className="p-3 text-gray-800">نقش</th>
                <th className="p-3 text-gray-800">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-3 text-gray-800">{u.name || "-"}</td>
                  <td className="p-3 text-gray-800">{u.email || "-"}</td>
                  <td className="p-3 text-gray-800" dir="ltr">
                    {u.phone ? (
                      <a href={`tel:${u.phone}`} className="text-blue-600 hover:underline">
                        {u.phone}
                      </a>
                    ) : (
                      "ثبت نشده"
                    )}
                  </td>
                  <td className="p-3">
                    <select
                      value={u.role || "supplier"}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="border rounded-lg px-2 py-1 text-gray-900 bg-white"
                    >
                      {Object.entries(ROLE_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 flex gap-3 items-center">
                    <button
                      onClick={() => handleImpersonate(u._id)}
                      disabled={impersonatingId === u._id}
                      className="text-blue-600 hover:text-blue-800 font-bold disabled:opacity-50"
                    >
                      {impersonatingId === u._id ? "در حال ورود..." : "ورود به پنل"}
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    هنوز کاربری ثبت نشده
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