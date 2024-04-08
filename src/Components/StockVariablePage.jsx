import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StockVariableValue from "./StockVariableValue";
import StockVariableIndicator from "./StockVariableIndicator";

const StockVariable = () => {
  const { id, criteriaId, variableKey } = useParams();
  const [variable, setVariable] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      const response = await fetch(
        `https://fitpage-backend-wegt.onrender.com/api/stocks/${id}`
      );
      const stock = await response.json();
      console.log(stock);
      let variable = stock?.criteria[criteriaId].variable[variableKey];
      setVariable(variable);
    };

    fetchStockData();
  }, []);

  const components = {
    value: StockVariableValue,
    indicator: StockVariableIndicator,
  };

  const renderComponent = () => {
    if (variable === null)
      return <h1 className="absolute top-[30%] right-[50%]">Loading...</h1>;
    if (variable === undefined) return;

    let Component = components[variable.type];
    return <Component variable={variable} />;
  };

  return renderComponent();
};

export default StockVariable;
