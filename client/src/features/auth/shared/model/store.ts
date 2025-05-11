import type { AuthStore } from '@/features/auth/shared';
import type { User } from '@/shared/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User | null): void => set({ user }),
      setIsAuthenticated: (isAuthenticated: boolean): void => set({ isAuthenticated }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
