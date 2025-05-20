import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./main/index";
import reportWebVitals from "./reportWebVitals";

import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

reportWebVitals();
