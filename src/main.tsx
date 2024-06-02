import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import "./index.css";
import { NavermapsProvider } from "react-naver-maps";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function Main() {
  useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const response = await fetch(
        "/api/calendar/schedule/list?start=2024-05-02T06%3A33%3A56.251Z&end=2024-06-22T06%3A33%3A56.251Z&limit=10"
      );
      return response.json();
    },
  });

  return null;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NavermapsProvider ncpClientId="fyrc4xrt6q">
        <RouterProvider router={router} />

        <Main />
      </NavermapsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
