import { useState, useEffect } from "react";

const TYPE_LABELS = {
  hero: "متن هیرو (بالای صفحه)",
  industry: "صنعت (کارت‌های صنایع)",
  promo: "پیام تبلیغاتی چرخشی",
  ad: "بنر تبلیغاتی",
  stat: "آمار (مثل ۱۵+ سال تجربه)",
  shop_ad: "تبلیغ ستون فروشگاه",
};

const IMAGE_TYPES = ["hero", "ad", "shop_ad"];

export default function HomeSectionForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    type: "industry",
    title: "",
    description: "",
    icon: "",
    order: 0,
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        type: initialData.type || "industry",
        title: initialData.title || "",
        description: initialData.description || "",
        icon: initialData.icon || "",
        order: initialData.order || 0,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", form.type);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("order", form.order);
    if (IMAGE_TYPES.includes(form.type)) {
      if (file) formData.append("image", file);
    } else {
      formData.append("icon", form.icon);
    }
    onSubmit(formData);
  };

  const showImageUpload = IMAGE_TYPES.includes(form.type);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow border mb-6 space-y-4">
      <h3 className="font-bold text-lg text-gray-900">{initialData ? "ویرایش بخش" : "بخش جدید"}</h3>

      <div>
        <label className="block text-sm mb-1 text-gray-700">نوع بخش</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-gray-900 bg-white"
        >
          {Object.entries(TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1 text-gray-700">عنوان</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-gray-900"
          placeholder="مثلا: تأمین تخصصی تجهیزات معدنی"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-gray-700">توضیحات</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-lg px-3 py-2 text-gray-900"
        />
      </div>

      {showImageUpload ? (
        <div>
          <label className="block text-sm mb-1 text-gray-700">تصویر بنر</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="w-full border rounded-lg px-3 py-2 text-gray-900"
          />
          {initialData?.image && (
            <p className="text-xs text-gray-500 mt-1">
              این بخش از قبل عکس داره. عکس جدید انتخاب کنی، جایگزین قبلی میشه.
            </p>
          )}
        </div>
      ) : (
        <div>
          <label className="block text-sm mb-1 text-gray-700">آیکون (اختیاری، مثلا FaFire)</label>
          <input
            name="icon"
            value={form.icon}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-gray-900"
          />
        </div>
      )}

      <div>
        <label className="block text-sm mb-1 text-gray-700">ترتیب نمایش</label>
        <input
          type="number"
          name="order"
          value={form.order}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-gray-900"
        />
      </div>

      <div className="flex gap-3">
        <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg font-bold">
          ذخیره
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="border px-6 py-2 rounded-lg text-gray-800">
            انصراف
          </button>
        )}
      </div>
    </form>
  );
}