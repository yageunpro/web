import { Route, Routes } from "react-router-dom";

import { Home } from "@/features/home";
import { Me } from "@/features/me";
import { Auth } from "@/features/auth";
import { Appointment } from "@/features/appointment";
import {
  AddCategories,
  ExcludedSchedule,
  WhatEvent,
  WhenWillMeet,
} from "@/features/new-appointment/pages";
import { EditCategories } from "@/features/appointment/EditCategories";
import { EditAppointment } from "./features/appointment/EditAppointment";
import { Toaster } from "sonner";

export function App() {
  return (
    <>
      {/* <header className="flex justify-between items-center p-4 bg-gray-800 text-white sticky top-0">
        <Link to="/">Home</Link>
      </header> */}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/me" element={<Me />} />

        <Route path="/login" element={<Auth />} />

        <Route path="/appointments/new">
          <Route path="1" element={<WhenWillMeet />} />
          <Route path="2" element={<ExcludedSchedule />} />
          <Route path="3" element={<WhatEvent />} />
          <Route path="4" element={<AddCategories />} />
        </Route>

        <Route
          path="/appointments/:appointmentId/edit/location"
          element={<EditCategories />}
        />
        <Route
          path="/appointments/:appointmentId/edit"
          element={<EditAppointment />}
        />
        <Route path="/appointments/:appointmentId" element={<Appointment />} />
      </Routes>

      <Toaster />
    </>
  );
}
