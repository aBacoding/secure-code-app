export interface GenerateCodeResponse {
  message: string;
  data: {
    generatedCode: string;
    historyId: string;
  };
}

export interface CodeGenerationRequest {
  prompt: string;
  language?: string;
}

export type ProgrammingLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'c#'
  | 'c++'
  | 'go'
  | 'rust'
  | 'php'
  | 'ruby'
  | 'html'
  | 'jsx'
  | 'tsx';
