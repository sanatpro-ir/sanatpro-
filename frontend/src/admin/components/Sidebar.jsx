import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_URL as BASE_URL } from "../../config";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);

  const token = localStorage.getItem("adminToken");

  // ✅ تابع تمیز شده
  const fetchPendingCount = useCallback(async () => {
    if (!token) return;

    try {
      const res = await axios.get(
        `${BASE_URL}/api/equipments/admin/pending`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPendingCount(res.data.length || 0);
    } catch (err) {
      console.error(err);
      setPendingCount(0);
    }
  }, [token]);

  // ✅ وابستگی درست
  useEffect(() => {
    fetchPendingCount();
  }, [fetchPendingCount, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  const links = [
    { to: "/admin", label: "داشبورد" },
    { to: "/admin/categories", label: "دسته‌بندی‌ها" },
    { to: "/admin/products", label: "محصولات" },
    { to: "/admin/used-equipment", label: "تجهیزات دست دوم" },
    { to: "/admin/users", label: "کاربران" },
    {
      to: "/admin/pending-products",
      label: "تایید محصولات",
      badge: pendingCount,
    },
    { to: "/admin/home-content", label: "محتوای صفحه اصلی" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">پنل ادمین MinePro</h2>

        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex justify-between items-center px-4 py-2 rounded-lg ${
                location.pathname === link.to
                  ? "bg-yellow-500 text-black font-bold"
                  : "hover:bg-gray-800"
              }`}
            >
              <span>{link.label}</span>

              {link.badge > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full text-right px-4 py-2 rounded-lg text-red-400 hover:bg-gray-800 border-t border-gray-800 pt-4"
      >
        خروج از پنل
      </button>
    </aside>
  );
}