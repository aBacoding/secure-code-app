import React, { type FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { type ExampleResponse } from '@/features/examples/model/types';

interface ExamplesCardProps {
  examples: ExampleResponse;
}

export const ExamplesCard: FC<ExamplesCardProps> = ({ examples }) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Security Examples</CardTitle>
        <CardDescription>{examples.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <p>{examples.howToUse}</p>
        </div>
      </CardContent>
    </Card>
  );
};
