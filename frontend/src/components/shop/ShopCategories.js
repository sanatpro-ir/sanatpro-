function CategoryBox({ categories }) {
  return (
    <div className="bg-[#020617] rounded-xl p-4 text-white sticky top-24">
      <h3 className="font-bold mb-3">⚙️ دسته‌بندی</h3>
      {categories.map((c) => (
        <div key={c.name} className="py-2 hover:text-yellow-400 cursor-pointer">
          ▸ {c.name}
        </div>
      ))}
    </div>
  );
}
