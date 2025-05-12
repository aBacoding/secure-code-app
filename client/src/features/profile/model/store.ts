import { create } from 'zustand';

export const useProfilePasswordStore = create<{
  state: boolean;
  setState: (state: boolean) => void;
}>((set) => ({
  state: false,
  setState: (state: boolean): void => set({ state }),
}));

export const useProfileAvatarStore = create<{
  state: boolean;
  setState: (state: boolean) => void;
}>((set) => ({
  state: false,
  setState: (state: boolean): void => set({ state }),
}));
