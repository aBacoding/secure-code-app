export interface ExampleResponse {
  description: string;
  howToUse: string;
  examples: Example[];
}

export interface Example {
  title: string;
  description: string;
  sampleCode: string;
  language: string;
  analysisResult: AnalysisResult;
  fixedCode: string;
}

export interface AnalysisResult {
  vulnerable: boolean;
  vulnerabilityType: string;
  severity: 'High' | 'Medium' | 'Low';
  location: {
    line: number;
    column: number;
  };
  description: string;
  recommendation: string;
}
