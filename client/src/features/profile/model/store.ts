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

export const useAnalyzeHistoryItemStore = create<{
  state: boolean;
  itemId: string | null;
  setState: (state: boolean) => void;
  setItemId: (itemId: string | null) => void;
}>((set) => ({
  state: false,
  itemId: null,
  setState: (state: boolean): void => set({ state }),
  setItemId: (itemId: string | null): void => set({ itemId }),
}));

export const useGenerateHistoryItemStore = create<{
  state: boolean;
  itemId: string | null;
  setState: (state: boolean) => void;
  setItemId: (itemId: string | null) => void;
}>((set) => ({
  state: false,
  itemId: null,
  setState: (state: boolean): void => set({ state }),
  setItemId: (itemId: string | null): void => set({ itemId }),
}));
