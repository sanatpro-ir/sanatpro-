export default function ProductSectionBestSeller({ products }) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-2">
        🔥 پرفروش‌ترین‌ها
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map(p => (
          <ProductCard key={p.id} product={p} type="hot" />
        ))}
      </div>
    </section>
  );
}
