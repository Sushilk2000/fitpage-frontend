import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockList from "./Components/StockList";
import StockListDetails from "./Components/StockListDetails";
import StockVariable from "./Components/StockVariablePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StockList />}></Route>
        <Route path="/:id" element={<StockListDetails />}></Route>
        <Route
          path="/:id/:criteriaId/:variableKey"
          element={<StockVariable />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
