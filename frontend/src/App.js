import { useState } from "react";
import IntroLoader from "./components/IntroLoader";
import { Routes, Route, useLocation } from "react-router-dom";
import "./i18n";
import useLangDirection from "./hooks/useLangDirection";

/* سایت */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
// import LiveChat from "./components/LiveChat";

/* صفحات */
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import B2B from "./pages/B2B";
import Categories from "./pages/Categories";
import CategoryTwo from "./pages/CategoryTwo";
import SellUsed from "./pages/SellUsed";
import UsedProductDetails from "./pages/UsedProductDetails";
import UsedMarket from "./pages/UsedMarket";
import About from "./pages/About";
import Inquiry from "./pages/Inquiry";
import Compare from "./pages/Compare";
import PaymentCallback from "./pages/PaymentCallback";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

/* تامین‌کننده */
import SupplierLogin from "./pages/SupplierLogin";
import SupplierDashboard from "./pages/SupplierDashboard";

/* ادمین */
import AdminRoute from "./admin/AdminRoute";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminCategories from "./admin/AdminCategories";
import AdminProducts from "./admin/AdminProducts";
import AdminUsers from "./admin/AdminUsers";
import AdminHomeContent from "./admin/AdminHomeContent";
import AdminUsedEquipment from "./admin/AdminUsedEquipment";
import AdminPendingProducts from "./admin/AdminPendingProducts";
import AddProduct from "./pages/AddProduct";


function AppLayout() {
  useLangDirection();

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isHomeRoute = location.pathname === "/";

  // فقط صفحاتی که هدر دارن و صفحه اصلی نیستن، فاصله بالا می‌گیرن
  const needsTopPadding = !isAdminRoute && !isHomeRoute;

  return (
    <>
      {/* اگر ادمین نیست → سایت کامل */}
      {!isAdminRoute && <Navbar />}

      {/* محتوای اصلی */}
      <div className={needsTopPadding ? "pt-16" : ""}>
        <Routes>
          {/* سایت */}
          
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/b2b" element={<B2B />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category-two" element={<CategoryTwo />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/sell-used" element={<SellUsed />} />
          <Route path="/used" element={<UsedMarket />} />
          <Route path="/product/used/:id" element={<UsedProductDetails />} />
          <Route path="/payment/callback" element={<PaymentCallback />} />
          <Route path="/about" element={<About />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/supplier/add-product" element={<AddProduct />} />
          

          {/* بازیابی رمز عبور */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* پنل تامین‌کننده */}
          <Route path="/supplier-login" element={<SupplierLogin />} />
          <Route path="/supplier" element={<SupplierDashboard />} />

          {/* ادمین */}
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminCategories />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/used-equipment"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminUsedEquipment />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/home-content"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminHomeContent />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/pending-products"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminPendingProducts />
                </AdminLayout>
              </AdminRoute>
            }
          />
        </Routes>
      </div>

      {/* فقط سایت */}
      {!isAdminRoute && (
        <>
          <WhatsAppButton />
         
          <Footer />
        </>
      )}
    </>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <IntroLoader onFinish={() => setShowIntro(false)} />;
  }

  return <AppLayout />;
}