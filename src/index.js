import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BudgetsProvider } from "../src/Components/Context/BudgetsContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BudgetsProvider>
      <App />
    </BudgetsProvider>
  </React.StrictMode>
);


