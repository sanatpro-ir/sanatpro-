import ProductCard from "./ProductCard";
import ShopCategories from "./ShopCategories";
import ShopAdsLeft from "./ShopAdsLeft";

export default function ProductRow({
  title,
  emoji,
  products = [],
  categories = []
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
        {emoji} {title}
      </h2>

      <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">

        {/* LEFT CATEGORY */}
        <div className="col-span-2 hidden md:block">
          <ShopCategories categories={categories} />
        </div>

        {/* PRODUCTS CENTER */}
        <div className="col-span-12 md:col-span-8 relative">

          <div className="rotating-border absolute -inset-2 rounded-xl -z-10" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

        </div>

        {/* RIGHT ADS */}
        <div className="col-span-2 hidden md:block">
          <ShopAdsLeft />
        </div>

      </div>
    </section>
  );
}
