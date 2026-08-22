import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://sanatpro-backend.onrender.com";

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const [equipments, setEquipments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("supplierToken");

      if (!token) {
        navigate("/supplier-login");
        return;
      }

      let equipData = [];
      let ordersData = [];
      let hadError = false;

      try {
        const equipRes = await axios.get(`${API_URL}/api/equipments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        equipData = Array.isArray(equipRes.data)
          ? equipRes.data
          : Array.isArray(equipRes.data?.data)
          ? equipRes.data.data
          : [];
      } catch (err) {
        console.error("Equipments fetch error:", err);
        hadError = true;
        if (err.response?.status === 401) {
          localStorage.removeItem("supplierToken");
          navigate("/supplier-login");
          return;
        }
      }

      try {
        const ordersRes = await axios.get(`${API_URL}/api/orders/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        ordersData = Array.isArray(ordersRes.data)
          ? ordersRes.data
          : Array.isArray(ordersRes.data?.data)
          ? ordersRes.data.data
          : [];
      } catch (err) {
        console.error("Orders fetch error:", err);
        hadError = true;
        if (err.response?.status === 401) {
          localStorage.removeItem("supplierToken");
          navigate("/supplier-login");
          return;
        }
      }

      setEquipments(equipData);
      setOrders(ordersData);
      if (hadError) {
        setError("برخی اطلاعات با مشکل مواجه شد. لطفاً صفحه را رفرش کنید یا بعداً دوباره تلاش کنید.");
      }
      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  const updateOrderStatus = async (orderId, status) => {
    const token = localStorage.getItem("supplierToken");
    try {
      await axios.put(
        `${API_URL}/api/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o))
      );
    } catch (err) {
      alert(err.response?.data?.message || "خطا در بروزرسانی وضعیت سفارش");
    }
  };

  const revenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const statusColor = {
    pending: "text-yellow-500",
    completed: "text-green-500",
    cancelled: "text-red-500",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">پنل تامین‌کننده</h1>
        <button
          onClick={() => navigate("/supplier/add-product")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          افزودن محصول
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">تعداد محصولات</h2>
          <p className="text-2xl font-bold">{equipments.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">سفارش‌ها</h2>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">درآمد (سفارش‌های تکمیل‌شده)</h2>
          <p className="text-2xl font-bold">{revenue.toLocaleString("fa-IR")} تومان</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">سفارش‌های اخیر</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-6">هنوز سفارشی ثبت نشده است.</p>
        ) : (
          <table className="w-full text-right">
            <thead>
              <tr className="border-b">
                <th className="py-2">محصول</th>
                <th>خریدار</th>
                <th>تماس</th>
                <th>تعداد</th>
                <th>مبلغ</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-b">
                  <td className="py-2">{o.equipment?.title || "-"}</td>
                  <td>{o.buyerName}</td>
                  <td>{o.buyerPhone}</td>
                  <td>{o.quantity}</td>
                  <td>{o.totalPrice?.toLocaleString("fa-IR")} تومان</td>
                  <td>
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                      className={`bg-transparent border rounded px-2 py-1 ${statusColor[o.status] || ""}`}
                    >
                      <option value="pending">در انتظار</option>
                      <option value="completed">تکمیل‌شده</option>
                      <option value="cancelled">لغو‌شده</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">محصولات من</h2>
        {equipments.length === 0 ? (
          <p className="text-gray-500 text-center py-6">هنوز هیچ محصولی ثبت نکرده‌اید.</p>
        ) : (
          <table className="w-full text-right">
            <thead>
              <tr className="border-b">
                <th className="py-2">نام محصول</th>
                <th>دسته‌بندی</th>
                <th>وضعیت تایید</th>
                <th>تاریخ ثبت</th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="py-2">{item.title || item.name}</td>
                  <td>{item.category?.name || "-"}</td>
                  <td className={item.isApproved ? "text-green-500" : "text-yellow-500"}>
                    {item.isApproved ? "✅ تایید شده" : "⏳ در انتظار تایید ادمین"}
                  </td>
                  <td>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("fa-IR")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SupplierDashboard;