export interface AnalyzerStore {
  copiedCode: boolean;
  analyzeCode: string;
  prompt: string;
  setAnalyzeCode: (code: string) => void;
  setCopiedCode: (value: boolean) => void;
  setPrompt: (prompt: string) => void;
}
