import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import reactStringReplace from "react-string-replace";
const StockListDetails = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[1];

  const [currentStock, setCurrentStock] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let stock = await fetch(
        `https://fitpage-backend-wegt.onrender.com/api/stocks/${id}`
      );
      stock = await stock.json();
      setCurrentStock(stock);
      console.log(stock);
    };

    fetchData();

    return () => {};
  }, []);

  const getVariableComponent = (variable, match, index) => {
    let value;
    if (variable.type === "value") value = variable.values[0];
    if (variable.type === "indicator") value = variable.default_value;

    return (
      <Link
        className="text-blue-600"
        key={match + index}
        to={`${index}/${match}`}
      >
        ({value})
      </Link>
    );
  };

  const diplaySubCriteria = (subCriteria, index) => {
    if (subCriteria.type === "variable") {
      return reactStringReplace(subCriteria.text, /(\$[0-9]+)/g, (match, i) =>
        getVariableComponent(subCriteria.variable[match], match, index)
      );
    }

    return subCriteria.text;
  };

  const displayCriteria = (criteria) => {
    return criteria?.map((subCriteria, subCriteriaIdx) => (
      <div key={subCriteriaIdx}>
        {subCriteriaIdx > 0 && <div className="text-sm text-gray-600">and</div>}
        <div key={subCriteriaIdx}>
          {diplaySubCriteria(subCriteria, subCriteriaIdx)}
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center py-32">
        {currentStock && (
          <div className="border min-h-64 h-max px-4 py-4 rounded-2xl flex flex-col gap-6 min-w-[30%] hover:scale-105 duration-300 ease-in-out">
            <div className="bg-blue-800 px-4 py-4 ">
              <div className="stock-list-item__name">{currentStock.name}</div>
              <div className="" style={{ color: currentStock.color }}>
                {currentStock.tag}
              </div>
            </div>
            <div className="px-4 py-4">
              <div>{displayCriteria(currentStock.criteria)}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StockListDetails;
