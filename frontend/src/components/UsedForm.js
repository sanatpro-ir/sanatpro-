import { useState } from "react";
import { motion } from "framer-motion";

function UsedForm() {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    year: "",
    condition: "",
    qty: "",
    city: "",
    price: "",
    desc: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("✅ درخواست شما ثبت شد. کارشناسان SANATPro با شما تماس می‌گیرند.");

    // بعداً:
    // fetch("/api/used-equipments", { method: "POST", body: JSON.stringify(form) })
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-xl rounded-2xl p-10 border"
    >

      <div className="grid md:grid-cols-2 gap-6">

        <Input name="name" label="نام تجهیز" onChange={handleChange} required />
        <Input name="brand" label="برند" onChange={handleChange} />

        <Input name="year" label="سال ساخت" onChange={handleChange} />
        <Input name="qty" label="تعداد" onChange={handleChange} />

        <Select name="condition" label="وضعیت فنی" onChange={handleChange} />

        <Input name="city" label="شهر" onChange={handleChange} />
        <Input name="price" label="قیمت پیشنهادی (اختیاری)" onChange={handleChange} />

        <Input name="phone" label="شماره تماس / واتساپ" onChange={handleChange} required />
      </div>

      <Textarea name="desc" label="توضیحات فنی" onChange={handleChange} />

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ پس از بررسی فنی، تجهیزات در MinePro منتشر می‌شود
      </p>

      <button
        type="submit"
        className="mt-8 w-full bg-yellow-500 hover:bg-yellow-600 text-black py-4 rounded-xl font-bold text-lg transition"
      >
        ثبت تجهیزات
      </button>

    </motion.form>
  );
}

/* ===== Components ===== */

const Input = ({ label, name, ...props }) => (
  <div>
    <label className="block mb-2 font-bold text-sm">{label}</label>
    <input
      name={name}
      {...props}
      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  </div>
);

const Textarea = ({ label, name, ...props }) => (
  <div className="mt-6">
    <label className="block mb-2 font-bold text-sm">{label}</label>
    <textarea
      name={name}
      {...props}
      rows="4"
      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  </div>
);

const Select = ({ label, name, ...props }) => (
  <div>
    <label className="block mb-2 font-bold text-sm">{label}</label>
    <select
      name={name}
      {...props}
      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
    >
      <option value="">انتخاب وضعیت</option>
      <option value="used">کارکرده</option>
      <option value="refurbished">بازسازی شده</option>
      <option value="stock">استوک</option>
    </select>
  </div>
);

export default UsedForm;
