import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockList from "./Components/StockList";
import StockListDetails from "./Components/StockListDetails";
import StockVariable from "./Components/StockVariable";
import { StocksContextProvider } from "./context/context";
import "./App.css";

function App() {
  return (
    <Router>
      <StocksContextProvider>
        <Routes>
          <Route path="/" element={<StockList />}></Route>
          <Route path="/:id" element={<StockListDetails />}></Route>
          <Route
            path="/:id/:criteriaId/:variableKey"
            element={<StockVariable />}
          ></Route>
        </Routes>
      </StocksContextProvider>
    </Router>
  );
}

export default App;
