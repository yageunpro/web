import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import "./index.css";
import { NavermapsProvider } from "react-naver-maps";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NavermapsProvider ncpClientId="fyrc4xrt6q">
      <RouterProvider router={router} />
    </NavermapsProvider>
  </React.StrictMode>
);
