import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isLogin: boolean;
  login: (_token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: null,
      isLogin: false,
      login: token =>
        set({
          accessToken: token,
          isLogin: true,
        }),
      logout: () =>
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
      onRehydrateStorage: () => state => {
        if (state && state.accessToken) {
          state.isLogin = true;
        }
      },
    },
  ),
);
