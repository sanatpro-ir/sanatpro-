import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { slug } = useParams();

  return (
    <div className="bg-black min-h-screen text-white p-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        {slug === "steel" && "🧱 محصولات فولاد"}
        {slug === "mine" && "⛏️ محصولات معدن"}
        {slug === "equipment" && "⚙️ تجهیزات صنعتی"}
      </h1>

      {/* اینجا محصولات مربوط به همون دسته نمایش داده میشن */}
    </div>
  );
}
