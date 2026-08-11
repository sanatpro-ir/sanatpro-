import { createContext, useContext, useState } from "react";

const UsedMarketContext = createContext();



export function UsedMarketProvider({ children }) {
  const [usedProducts, setUsedProducts] = useState([
    {
      id: 1,
      title: "دریل واگن Atlas Copco",
      category: "معدن",
      condition: "کارکرده – سالم",
      description: "دریل واگن معدنی مناسب پروژه‌های روباز و زیرزمینی",
      brand: "Atlas Copco",
      price: "تماس بگیرید",
      contact: "989121234567",
      img: "https://images.unsplash.com/photo-1597004891225-6e3c2c7a407e"
    }
  ]);

  const addUsedProduct = (product) => {
    setUsedProducts(prev => [
      { ...product, id: Date.now() },
      ...prev
    ]);
  };

  return (
    <UsedMarketContext.Provider value={{ usedProducts, addUsedProduct }}>
      {children}
    </UsedMarketContext.Provider>
  );
}

export const useUsedMarket = () => useContext(UsedMarketContext);
