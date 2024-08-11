import React from "react";
import ReactDOM from "react-dom/client";
import { PriceChartPage } from "../pages/price-chart/PriceChart";

import "./index.scss";

const App = () => <PriceChartPage />;
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
