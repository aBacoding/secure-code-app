import React, { type FC, useState, useEffect } from 'react';
import { ExamplesCard, CodeBlock } from '@/entities/examples';
import { Input } from '@/shared/components/ui/input';
import { useExamplesStore } from '@/features/examples/model/store';
import { type Example } from '@/features/examples/model/types';
import { setId } from '@/shared/libs';

export const ExamplesMain: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { examples, loading, error, fetchExamples } = useExamplesStore();

  useEffect(() => {
    fetchExamples();
  }, [fetchExamples]);

  const filteredExamples =
    examples?.examples?.filter(
      (example: Example) =>
        example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.analysisResult.vulnerabilityType.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading examples...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!examples) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No examples available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <ExamplesCard examples={examples} />

      <div className="px-3">
        <h2 className="text-2xl font-bold mb-4">Security Vulnerability Examples</h2>

        <div className="mb-6">
          <Input
            placeholder="Search examples..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredExamples.length === 0 ? (
            <p className="text-muted-foreground">No examples found</p>
          ) : (
            filteredExamples.map((example: Example) => <CodeBlock key={setId()} example={example} />)
          )}
        </div>
      </div>
    </div>
  );
};
