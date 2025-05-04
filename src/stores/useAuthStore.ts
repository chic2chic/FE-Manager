import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isLogin: boolean;
  setLogin: (_token: string) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: null,
      isLogin: false,
      setLogin: token =>
        set({
          accessToken: token,
          isLogin: true,
        }),
      setLogout: () =>
        set({
          accessToken: null,
          isLogin: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        accessToken: state.accessToken,
      }),
      onRehydrateStorage: state => {
        if (state && state.accessToken) {
          state.isLogin = true;
        }
      },
    },
  ),
);
