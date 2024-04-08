import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function StockList() {
  const [stocks, setStocks] = useState([]);
  const [serverRestarted, setServerRestarted] = useState(false);
  useEffect(() => {
    const getStocks = async () => {
      try {
        if (stocks.length) return setStocks(stockItems);

        const response = await fetch(
          "https://fitpage-backend-wegt.onrender.com/api/stocks/"
        );
        if (response.status === 200) {
          const data = await response.json();
          setStocks(data);
        }
      } catch (error) {
        console.log("Something went wrong: ", error);
        if (!serverRestarted) {
          try {
            const restartResponse = await fetch(
              "https://api.render.com/v1/services/srv-co9i53djm4es73avovcg/restart",
              {
                method: "POST",
                headers: {
                  Authorization: "Bearer rnd_0je2K7yuwyCzQfEwZxnWiwiB14jq",
                },
              }
            );

            if (restartResponse.ok) {
              console.log("Server restarted successfully.");
              setServerRestarted(true);
              alert("Server has been restarted successfully. Please Refresh.");
            } else {
              console.error(
                "Failed to restart server:",
                restartResponse.statusText
              );
            }
          } catch (error) {
            console.error("Error restarting server:", error);
          }
        }
      }
    };

    getStocks();
  }, [stocks.length, serverRestarted]);
  return (
    <div className="w-screen h-screen flex justify-center py-32">
      <div className="rounded-2xl shadow w-max h-max border py-4 border-white flex flex-col gap-4 px-8 shadow-white hover:scale-105 ease-in-out duration-300">
        {stocks.length === 0 && `Loading`}
        {stocks?.map((stock) => (
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
