import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://sanatpro-backend.onrender.com";
const AUTH_URL = `${API_URL}/api/auth`;

export default function SupplierLogin() {
  const [searchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState(searchParams.get("mode") === "register");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (isRegister && !form.name.trim()) errs.name = "نام و نام خانوادگی الزامی است";
    if (isRegister && !form.phone.trim()) errs.phone = "شماره تماس الزامی است";
    if (!form.email.trim()) errs.email = "ایمیل الزامی است";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "فرمت ایمیل صحیح نیست";
    if (!form.password.trim()) errs.password = "رمز عبور الزامی است";
    else if (form.password.length < 6) errs.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      if (isRegister) {
        await axios.post(`${AUTH_URL}/register`, {
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
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
      const msg = err.response?.data?.message;
      if (err.response?.status === 401) {
        setError("ایمیل یا رمز عبور اشتباه است");
      } else if (err.response?.status === 409 || msg?.includes("exist")) {
        setError("این ایمیل قبلاً ثبت‌نام کرده است");
      } else {
        setError(msg || "خطایی رخ داد. لطفاً دوباره تلاش کنید");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6" dir="rtl">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0b1220] border border-gray-800 p-8 rounded-2xl w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          {isRegister ? "ثبت‌نام تامین‌کننده" : "ورود تامین‌کننده"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded">
            {error}
          </p>
        )}

        {isRegister && (
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="نام و نام خانوادگی"
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white text-right"
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
            )}
          </div>
        )}

        {isRegister && (
          <div>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="شماره تماس (مثال: 09121234567)"
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white text-right"
              dir="ltr"
            />
            {fieldErrors.phone && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
            )}
          </div>
        )}

        <div>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ایمیل"
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white text-right"
            dir="ltr"
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="رمز عبور"
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white text-right"
            dir="ltr"
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold disabled:opacity-50"
        >
          {submitting ? "در حال ارسال..." : isRegister ? "ثبت‌نام" : "ورود"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          {isRegister ? "قبلاً ثبت‌نام کردی؟" : "حساب نداری؟"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
              setFieldErrors({});
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