import { type AnalyzerStore } from '@/features/analyzer';
import { create } from 'zustand';

export const useAnalyzerStore = create<AnalyzerStore>((set) => ({
  copiedCode: false,
  analyzeCode: '',
  prompt: '',
  setAnalyzeCode: (code: string): void => set({ analyzeCode: code }),
  setCopiedCode: (value: boolean): void => set({ copiedCode: value }),
  setPrompt: (prompt: string): void => set({ prompt }),
}));
