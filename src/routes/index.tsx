import { createBrowserRouter } from "react-router-dom";
import { Home } from "../features/home";
import { My } from "../features/my";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <div>Auth</div>,
  },
  {
    path: "/appointments",
    element: <div>Appointments</div>,
  },
  {
    path: "/my",
    element: <My />,
  },
]);

export default router;
