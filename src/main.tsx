import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import "./index.css";
import { NavermapsProvider } from "react-naver-maps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
          <RouterProvider router={router} />
        </NavermapsProvider>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);
