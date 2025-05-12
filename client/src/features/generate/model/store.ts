import { type GenerateStore } from '@/features/generate';
import { create } from 'zustand';

export const useGenerateStore = create<GenerateStore>((set) => ({
  copiedCode: false,
  generatedCode: '',
  language: 'javascript',
  setGeneratedCode: (code: string): void => set({ generatedCode: code }),
  setLanguage: (language: string): void => set({ language }),
  setCopiedCode: (value: boolean): void => set({ copiedCode: value }),
}));
