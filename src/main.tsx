import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { NavermapsProvider } from "react-naver-maps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>
        <NavermapsProvider ncpClientId="fyrc4xrt6q">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NavermapsProvider>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);
