const StockVariableValue = ({ variable }) => {
  return (
    <>
      <div className="w-screen h-screen flex justify-center py-36">
        {variable && (
          <div className="border h-max min-h-64 w-max min-w-[30%] rounded-xl px-4 py-4 flex flex-col gap-3 hover:scale-105 duration-300 ease-in-out">
            {variable.values.map((value, valueIdx) => {
              return (
                <div
                  key={valueIdx}
                  className="w-full border-b border-dotted pb-1"
                >
                  <div className="w-full">{value}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default StockVariableValue;
