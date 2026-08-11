import Sidebar from "./components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex" style={{ color: "#1f2937" }}>
      <Sidebar />
      <main className="flex-1 bg-gray-50 min-h-screen" style={{ color: "#1f2937" }}>
        {children}
      </main>
    </div>
  );
}