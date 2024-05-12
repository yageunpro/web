import { useEffect } from "react";
import useHashRouter from "./useHashRouter";
import { WhenWillMeet } from "./pages/WhenWillMeet";
import { ExcludedSchedule } from "./pages/ExcludedSchedule";
import { WhatEvent } from "./pages/WhatEvent";
import { AddCategories } from "./pages/AddCategories";

export function NewAppointment() {
  const currentHash = useHashRouter();

  useEffect(() => {
    if (!currentHash) {
      window.location.replace("#1");
    }
  }, [currentHash]);

  return (
    <>
      {currentHash === "1" && <WhenWillMeet />}
      {currentHash === "2" && <ExcludedSchedule />}
      {currentHash === "3" && <WhatEvent />}
      {currentHash === "4" && <AddCategories />}
    </>
  );
}
