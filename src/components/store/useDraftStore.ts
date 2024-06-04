import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DraftStore {
  title: string;
  description: string;
  location_id: string;
  categoryList: string[];
  deadline: Date | null;
  reset: () => void;
}

export const useDraftStore = create<DraftStore>()(
  persist(
    (set) => ({
      deadline: null,
      title: "",
      description: "",
      location_id: "",
      categoryList: [],
      reset: () =>
        set({
          deadline: null,
          title: "",
          description: "",
          location_id: "",
          categoryList: [],
        }),
    }),
    {
      name: "owl-draft-storage", // name of the item in the storage (must be unique)
      version: 1, // (optional) version of the data, add this if your schema changes
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const draftStore = {
  body: () => {
    const { title, description, location_id, categoryList, deadline } =
      useDraftStore.getState();

    return {
      title,
      description,
      location_id: location_id || undefined,
      categoryList,
      deadline,
    };
  },
};
