import { Link } from "react-router-dom";
import { useStocksContext } from "../context/context";
import { useEffect, useState } from "react";
function StockList() {
  const [stockItems, setStockItems] = useState([]);
  useEffect(() => {
    const getStocks = async () => {
      try {
        if (stockItems.length) return setStockItems(stockItems);

        const response = await fetch(
          "https://fitpage-backend-wegt.onrender.com/api/stocks/"
        );
        if (response.status === 200) {
          const data = await response.json();
          setStockItems(data);
        }
      } catch (error) {
        console.log("ERROR in getStocks", error);
      }
    };
    getStocks();
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center py-32">
      <div className="rounded-2xl shadow w-max h-max border py-4 border-white flex flex-col gap-4 px-8 shadow-white hover:scale-105 ease-in-out duration-300">
        {stockItems.map((stock) => (
          <Link to={`/${stock.id}`}>
            <div className="cursor-pointer hover:underline hover:border-b pb-2">
              <p className="text-xl">{stock.name}</p>
              <p style={{ color: stock.color }}>{stock.tag}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StockList;
