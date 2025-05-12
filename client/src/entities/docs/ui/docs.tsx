import React, { type FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { type DocsResponse } from '@/features/docs';

export const DocsCard: FC<{ docs: DocsResponse }> = ({ docs }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{docs.name}</CardTitle>
          <Badge variant="outline">{docs.version}</Badge>
        </div>
        <CardDescription className="text-md mt-2">{docs.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold">Base URL:</span> {docs.baseUrl}
        </div>
        <div className="mt-4">
          <p className="font-semibold mb-2">Endpoints: {docs.endpoints.length}</p>
        </div>
      </CardContent>
    </Card>
  );
};
