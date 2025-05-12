export interface GenerateStore {
  generatedCode: string;
  language: string;
  copiedCode: boolean;
  setGeneratedCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setCopiedCode: (value: boolean) => void;
}
