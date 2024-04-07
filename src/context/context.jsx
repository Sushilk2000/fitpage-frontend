import { createContext, useState, useContext } from "react";

const StocksContext = createContext({
  stockItems: [],
});

export const StocksContextProvider = ({ children }) => {
  const [stockItems, setStockItems] = useState([]);

  const getStocks = async () => {
    try {
      if (stockItems.length) return setStockItems(stockItems);

      const response = await fetch(
        "https://fitpage-backend-wegt.onrender.com/api/v1/stocks"
      );
      if (response.status === 200) setStockItems(response.data);
    } catch (error) {
      console.log("ERROR in getStocks", error);
    }
  };

  const getStock = async (id) => {
    try {
      let stock = stockItems.find((stockItem) => stockItem.id == id);
      if (stock) return stock;

      const response = await fetch("");
      if (response.status === 200) return response.data;
    } catch (error) {
      console.log("ERROR in getStock", error);
    }
  };

  const value = {
    stockItems,
    getStocks,
    getStock,
  };

  return (
    <StocksContext.Provider value={value}>{children}</StocksContext.Provider>
  );
};

export function useStocksContext() {
  return useContext(StocksContext);
}
