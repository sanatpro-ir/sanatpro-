 import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL as BASE_URL } from "../config";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("خطایی رخ داد. دوباره تلاش کنید.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="bg-[#0b1220] border border-gray-800 p-8 rounded-2xl w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-white text-center mb-4">بازیابی رمز عبور</h2>

        {message && <p className="text-yellow-400 text-sm text-center">{message}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="ایمیل ثبت‌شده"
          className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold disabled:opacity-50"
        >
          {loading ? "در حال ارسال..." : "ارسال لینک بازیابی"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          <Link to="/supplier-login" className="text-yellow-400 underline">
            بازگشت به ورود
          </Link>
        </p>
      </form>
    </div>
  );
}