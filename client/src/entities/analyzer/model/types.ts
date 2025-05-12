import { type analysisHistorySchema } from '@/entities/analyzer';
import type { z } from 'zod';

export interface AnalyzeCodeResponse {
  message: string;
  data: {
    analysisResult: string;
    historyId: string;
  };
}

export interface AnalyzeCodeRequest {
  code: string;
  prompt: string;
}

export type AnalysisHistoryData = z.infer<typeof analysisHistorySchema>;
