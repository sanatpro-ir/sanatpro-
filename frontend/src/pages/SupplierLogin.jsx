import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://sanatpro-backend.onrender.com";
const AUTH_URL = `${API_URL}/api/auth`;

export default function SupplierLogin() {
  const [searchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState(searchParams.get("mode") === "register");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await axios.post(`${AUTH_URL}/register`, {
          name: form.name,
          email: form.email,
          password: form.password,
          role: "supplier",
        });
        const loginRes = await axios.post(`${AUTH_URL}/login`, {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("supplierToken", loginRes.data.token);
        localStorage.setItem("supplierName", loginRes.data.user.name);
        navigate("/supplier");
      } else {
        const res = await axios.post(`${AUTH_URL}/login`, {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("supplierToken", res.data.token);
        localStorage.setItem("supplierName", res.data.user.name);
        navigate("/supplier");
      }
    } catch (err) {
      setError(err.response?.data?.message || "خطایی رخ داد");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="bg-[#0b1220] border border-gray-800 p-8 rounded-2xl w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          {isRegister ? "ثبت‌نام تامین‌کننده" : "ورود تامین‌کننده"}
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {isRegister && (
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="نام و نام خانوادگی"
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white"
          />
        )}

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="ایمیل"
          className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="رمز عبور"
          className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white"
        />

        <button type="submit" className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold">
          {isRegister ? "ثبت‌نام" : "ورود"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          {isRegister ? "قبلاً ثبت‌نام کردی؟" : "حساب نداری؟"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            className="text-yellow-400 underline"
          >
            {isRegister ? "ورود" : "ثبت‌نام کن"}
          </button>
        </p>
      </form>
    </div>
  );
}