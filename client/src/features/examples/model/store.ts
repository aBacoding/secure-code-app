import { create } from 'zustand';
import { type ExampleResponse } from '@/features/examples/model/types';
import { getExamples } from '@/features/examples/model/api';

export const useExamplesStore = create<{
  examples: ExampleResponse | null;
  loading: boolean;
  error: string | null;
  setExamples: (examples: ExampleResponse) => void;
  fetchExamples: () => Promise<void>;
}>((set) => ({
  examples: null,
  loading: false,
  error: null,
  setExamples: (examples: ExampleResponse): void => set({ examples }),
  fetchExamples: async (): Promise<void> => {
    try {
      set({ loading: true, error: null });
      const { data } = await getExamples();
      set({ examples: data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch examples',
        loading: false,
      });
    }
  },
}));
