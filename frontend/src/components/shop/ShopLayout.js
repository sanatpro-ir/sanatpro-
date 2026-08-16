export default function ShopLayout({
  categories,
  ads,
  children,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">

      {/* Main shop layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* SIDEBAR */}
        <aside className="lg:col-span-3 space-y-6">

          {categories}

          {ads}

        </aside>

        {/* PRODUCTS */}
        <main className="lg:col-span-9 min-w-0">
          {children}
        </main>

      </div>
    </div>
  );
}