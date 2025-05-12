import { CodeDisplay, CodeGenerationForm } from '@/entities/generate';
import { useGenerateStore } from '@/features/generate/model/store';
import React, { type FC } from 'react';

export const GeneratePage: FC = () => {
  const generatedCode = useGenerateStore((state) => state.generatedCode);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-2">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Code Generator</h1>
        <p className="text-muted-foreground">
          Describe what code you want to generate, and our AI will create it for you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-card rounded-lg shadow-sm p-6 border">
          <CodeGenerationForm />
        </div>

        {generatedCode && <CodeDisplay />}
      </div>
    </div>
  );
};
