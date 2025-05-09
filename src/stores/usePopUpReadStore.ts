import { GetPopUpReadResponse } from "@/types/api/ApiResponseType";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PopUpReadStoreType = GetPopUpReadResponse & {
  setPopUp: (_popup: GetPopUpReadResponse) => void;
};

export const usePopUpReadStore = create<PopUpReadStoreType>()(
  persist(
    set => ({
      popupId: 0,
      name: "",
      imageUrl: "",
      setPopUp: ({ popupId, name, imageUrl }) =>
        set({ popupId, name, imageUrl }),
    }),
    {
      name: "popup-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        popupId: state.popupId,
        name: state.name,
      }),
    },
  ),
);
