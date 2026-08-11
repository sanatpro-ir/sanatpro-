import { useState, useEffect } from "react";

export default function CategoryForm({ initialData, onSubmit, onCancel }) {
  const API_URL = process.env.REACT_APP_API_URL || "https://sanatpro-backend.onrender.com";

  const [form, setForm] = useState({ name: "", slug: "", icon: "", order: 0 });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow border mb-6 space-y-4">
      <h3 className="font-bold text-lg">{initialData ? "ویرایش دسته" : "دسته جدید"}</h3>

      <div>
        <label className="block text-sm mb-1">نام دسته</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
          placeholder="مثلا: فولاد"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">اسلاگ (انگلیسی، بدون فاصله)</label>
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
          placeholder="steel"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">آیکون (اختیاری)</label>
        <input
          name="icon"
          value={form.icon}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="FaFire"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">ترتیب نمایش</label>
        <input
          type="number"
          name="order"
          value={form.order}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="flex gap-3">
        <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg font-bold">
          ذخیره
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="border px-6 py-2 rounded-lg">
            انصراف
          </button>
        )}
      </div>
    </form>
  );
}