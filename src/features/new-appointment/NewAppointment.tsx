import { useEffect } from "react";
import useHashRouter from "./useHashRouter";
import {
  WhenWillMeet,
  ExcludedSchedule,
  WhatEvent,
  AddCategories,
} from "./pages";
import { useDraftStore } from "@/components/store/useDraftStore";

export function NewAppointment() {
  const currentHash = useHashRouter();

  useEffect(() => {
    if (!currentHash || !useDraftStore.getState().deadline) {
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
