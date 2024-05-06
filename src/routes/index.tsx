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
    children: [
      {
        path: "/new",
        element: <div>New</div>,
      },
      {
        path: "/:id",
        element: <div>Appointment</div>,
      },
    ],
  },
]);

export default router;
