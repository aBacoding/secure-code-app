export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AnalyzeHistory {
  message: string;
  data: AnalyzeHistoryItem[];
}

export interface AnalyzeHistoryItem {
  _id: string;
  prompt: string;
  timestamp: string;
}

export interface GenerateHistory {
  message: string;
  data: GenerateHistoryItem[];
}

export interface GenerateHistoryItem {
  _id: string;
  prompt: string;
  language: string;
  timestamp: string;
}

export interface GenerateHistoryItemById {
  message: string;
  data: GenerateHistoryItemByIdItem;
}

export interface GenerateHistoryItemByIdItem {
  _id: string;
  userId: string;
  prompt: string;
  generatedCode: string;
  language: string;
  model: string;
  timestamp: string;
}

export interface AnalyzeHistoryItemById {
  message: string;
  data: AnalyzeHistoryItemByIdItem;
}

export interface AnalyzeHistoryItemByIdItem {
  _id: string;
  userId: string;
  code: string;
  prompt: string;
  analysisResult: string;
  model: string;
  timestamp: string;
}
