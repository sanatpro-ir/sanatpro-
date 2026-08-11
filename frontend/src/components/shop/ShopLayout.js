export default function ShopLayout({ left, center, right }) {
  return (
    <div className="grid grid-cols-12 gap-6 mt-10">
      <div className="col-span-12 md:col-span-2">{left}</div>
      <div className="col-span-12 md:col-span-7">{center}</div>
      <div className="col-span-12 md:col-span-3">{right}</div>
    </div>
  );
}
