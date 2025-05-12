import { create } from 'zustand';
import { type DocsResponse } from '@/features/docs';
import { getDocs } from '@/features/docs/model/api';

export const useDocsStore = create<{
  docs: DocsResponse | null;
  loading: boolean;
  error: string | null;
  setDocs: (docs: DocsResponse) => void;
  fetchDocs: () => Promise<void>;
}>((set) => ({
  docs: null,
  loading: false,
  error: null,
  setDocs: (docs: DocsResponse): void => set({ docs }),
  fetchDocs: async (): Promise<void> => {
    try {
      set({ loading: true, error: null });
      const { data } = await getDocs();
      set({ docs: data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch documentation',
        loading: false,
      });
    }
  },
}));
