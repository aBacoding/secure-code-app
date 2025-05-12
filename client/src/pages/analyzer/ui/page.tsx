import { AnalysisDisplay, CodeAnalyzerForm } from '@/entities/analyzer';
import { useAnalyzerStore } from '@/features/analyzer';
import React, { type FC } from 'react';

export const AnalyzerPage: FC = () => {
  const { analyzeCode } = useAnalyzerStore();
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-2">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Code Analyzer</h1>
        <p className="text-muted-foreground">Paste your code and enter a prompt to analyze it.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-card rounded-lg shadow-sm p-6 border">
          <CodeAnalyzerForm />
        </div>

        {analyzeCode && <AnalysisDisplay />}
      </div>
    </div>
  );
};
