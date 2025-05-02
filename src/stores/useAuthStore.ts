import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isLogin: boolean;
  login: (_token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      isLogin: false,
      login: (token: string) => set({ token, isLogin: true }),
      logout: () => set({ token: null, isLogin: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state: AuthState) => ({ token: state.token }),
    },
  ),
);
