import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div> Hi</div>,
  },
  {
    path: "/auth",
    element: <div>Auth</div>,
  },
  {
    path: "/appointments",
    element: <div>Appointments</div>,
  },
]);

export default router;
