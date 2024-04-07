import { useState } from "react";

const StockVariableIndicator = ({ variable }) => {
  const [parameter, setParameter] = useState(variable.default_value);

  const getUpperCase = (text) => {
    return text && text.toUpperCase();
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center py-32">
        {variable && (
          <div className="border border-white min-h-64 h-max min-w-[30%] w-max flex gap-4 flex-col px-4 py-4 rounded-xl hover:scale-105 duration-300 ease-in-out">
            <div>
              <div>{getUpperCase(variable.study_type)}</div>
              <div className="stock-list__title">Set Parameters</div>
            </div>
            <div className="bg-white text-black h-20 py-2 px-2">
              <div className="flex justify-between">
                <label>{variable.parameter_name}</label>
                <div>
                  <input
                    type="number"
                    value={parameter}
                    className="border border-black"
                    onChange={(e) => setParameter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StockVariableIndicator;
