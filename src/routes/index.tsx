import { createBrowserRouter } from "react-router-dom";

import { Home } from "@/features/home";
import { My } from "@/features/my";
import { Auth } from "@/features/auth";
import { Appointment } from "@/features/appointment";
import {
  AddCategories,
  ExcludedSchedule,
  WhatEvent,
  WhenWillMeet,
} from "@/features/new-appointment/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/appointments/new/1",
    element: <WhenWillMeet />,
  },
  {
    path: "/appointments/new/2",
    element: <ExcludedSchedule />,
  },
  {
    path: "/appointments/new/3",
    element: <WhatEvent />,
  },
  {
    path: "/appointments/new/4",
    element: <AddCategories />,
  },
  {
    path: "/appointments/:appointmentId/editCategory",
    element: <AddCategories />,
  },
  {
    path: "/appointments/:appointmentId",
    element: <Appointment />,
  },
  {
    path: "/my",
    element: <My />,
  },
]);

export default router;
