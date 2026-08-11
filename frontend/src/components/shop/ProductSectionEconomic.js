
export default function ProductSectionEconomic({ products }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
        💰 اقتصادی
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map(p => (
          <ProductCard key={p.id} product={p} type="eco" />
        ))}
      </div>
    </section>
  );
}
