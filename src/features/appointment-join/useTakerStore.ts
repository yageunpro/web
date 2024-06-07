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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set) => ({
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
