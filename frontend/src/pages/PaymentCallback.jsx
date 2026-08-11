import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://sanatpro-backend.onrender.com";

export default function PaymentCallback() {
  const [status, setStatus] = useState("در حال بررسی پرداخت...");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authority = params.get("Authority");
    const zpStatus = params.get("Status");

    const token = localStorage.getItem("supplierToken");

    if (!token) {
      setStatus("لطفاً دوباره وارد شوید.");
      return;
    }

    if (zpStatus !== "OK") {
      setStatus("پرداخت لغو شد.");
      return;
    }

    axios
      .post(
        `${API_URL}/api/payment/verify`,
        { authority },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setStatus("پرداخت با موفقیت انجام شد! در حال انتقال...");
        setTimeout(() => navigate("/supplier"), 2000);
      })
      .catch(() => {
        setStatus("پرداخت تایید نشد. لطفاً دوباره تلاش کنید.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-xl">{status}</p>
    </div>
  );
} 