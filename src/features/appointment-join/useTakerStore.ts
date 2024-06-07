import { Schedule } from "@/types/Schedule";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AnonymouseSchedule = Omit<Schedule, "id">;

interface TakerStore {
  isMember: boolean;
  userName: string;
  scheduleList: AnonymouseSchedule[];
}

export const useTakerStore = create<TakerStore>()(
  persist(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    // @ts-expect-error aasdf
    (set, get) => ({
      isMember: false,
      userName: "",
      scheduleList: [],
    }),
    {
      name: "owl-taker-storage",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
