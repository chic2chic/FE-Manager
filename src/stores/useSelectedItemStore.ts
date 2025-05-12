import { ItemType } from "@/types/ItemType";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ItemStoreState = {
  selectedItem: ItemType | null;
  setSelectedItem: (_item: ItemType) => void;
  updateField: <K extends keyof ItemType>(
    _field: K,
    _value: ItemType[K],
  ) => void;
  resetSelectedItem: () => void;
};

export const useSelectedItemStore = create<ItemStoreState>()(
  persist(
    set => ({
      selectedItem: null,
      setSelectedItem: item => set({ selectedItem: item }),
      updateField: (field, value) =>
        set(state => ({
          selectedItem: state.selectedItem
            ? { ...state.selectedItem, [field]: value }
            : null,
        })),
      resetSelectedItem: () => set({ selectedItem: null }),
    }),
    {
      name: "selected-item-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        selectedItem: state.selectedItem,
      }),
    },
  ),
);
