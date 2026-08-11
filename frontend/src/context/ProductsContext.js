// import { createContext, useContext, useState } from "react";

// const ProductsContext = createContext();

// export function ProductsProvider({ children }) {

//   const [products, setProducts] = useState([
//     { id: 1, title: "دستگاه حفاری X900", price: "950,000,000", category: "VIP", image: "/images/products/drill.png" },
//     { id: 2, title: "سنگ شکن VIP", price: "1,200,000,000", category: "VIP", image: "/images/products/crusher.png" },
//     { id: 3, title: "تیرآهن سنگین", price: "75,000,000", category: "HOT", image: "/images/products/beam.png" },
//     { id: 4, title: "پروفیل اقتصادی", price: "28,000,000", category: "ECO", image: "/images/products/profile2.png" },
//   ]);

//   // ➕ افزودن محصول
//   const addProduct = (product) => {
//     setProducts(prev => [...prev, { ...product, id: Date.now() }]);
//   };

//   // ❌ حذف محصول
//   const deleteProduct = (id) => {
//     setProducts(prev => prev.filter(p => p.id !== id));
//   };

//   // ✏️ ویرایش محصول
//   const updateProduct = (updatedProduct) => {
//     setProducts(prev =>
//       prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
//     );
//   };

//   return (
//     <ProductsContext.Provider
//       value={{ products, addProduct, deleteProduct, updateProduct }}
//     >
//       {children}
//     </ProductsContext.Provider>
//   );
// }

// export const useProducts = () => useContext(ProductsContext);








import { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // ➕ افزودن محصول
  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };

  // ✏️ ویرایش
  const updateProduct = (id, updated) => {
    setProducts(prev =>
      prev.map(p => p.id === id ? { ...p, ...updated } : p)
    );
  };

  // 🗑 حذف
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);