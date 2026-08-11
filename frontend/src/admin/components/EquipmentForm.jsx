import { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "https://sanatpro-backend.onrender.com";

const TAG_LABELS = {
  vip: "ویژه (VIP)",
  hot: "پرفروش",
  eco: "اقتصادی",
  normal: "عادی",
};

export default function EquipmentForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tag: "normal",
    stock: 0,
  });

  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);

  // ✅ درست
  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        category:
          initialData.category?._id ||
          initialData.category ||
          "",
        tag: initialData.tag || "normal",
        stock: initialData.stock || 0,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("tag", form.tag);
    formData.append("stock", form.stock);

    files.forEach((file) =>
      formData.append("images", file)
    );

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-lg font-bold">
        {initialData ? "ویرایش محصول" : "محصول جدید"}
      </h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-3 py-2"
        placeholder="عنوان محصول"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={3}
        className="w-full border rounded-lg px-3 py-2"
      />

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-3 py-2"
      />

      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">انتخاب دسته</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        name="tag"
        value={form.tag}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
      >
        {Object.entries(TAG_LABELS).map(
          ([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          )
        )}
      </select>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="w-full"
      />

      <div className="flex gap-2">
        <button className="bg-black text-white px-4 py-2 rounded">
          ذخیره
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border px-4 py-2 rounded"
          >
            انصراف
          </button>
        )}
      </div>
    </form>
  );
}