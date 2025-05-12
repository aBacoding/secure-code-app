import React, { Fragment, type FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Copy, Check, Info } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { useAnalyzerStore } from '@/features/analyzer';
import { copyToClipboard } from '@/shared';

export const AnalysisDisplay: FC = () => {
  const { analyzeCode, setCopiedCode, prompt, copiedCode } = useAnalyzerStore();

  const handleCopyAnalysis = (): void => {
    copyToClipboard(analyzeCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const truncatedPrompt = prompt.length > 50 ? `${prompt.substring(0, 47)}...` : prompt;

  return (
    <Card className="w-full mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-500" />
          <CardTitle>Analysis Results</CardTitle>
          <Badge variant="outline" className="ml-2" title={prompt}>
            {truncatedPrompt}
          </Badge>
        </div>
        <Button variant="outline" size="sm" onClick={handleCopyAnalysis} className="text-xs">
          {copiedCode ? (
            <Fragment>
              <Check className="mr-1 h-3 w-3" />
              Copied
            </Fragment>
          ) : (
            <Fragment>
              <Copy className="mr-1 h-3 w-3" />
              Copy Analysis
            </Fragment>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="formatted" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="formatted">Formatted</TabsTrigger>
            <TabsTrigger value="raw">Raw</TabsTrigger>
          </TabsList>
          <TabsContent value="formatted" className="mt-0">
            <div className="relative rounded-md bg-muted p-4 prose prose-sm max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap">{analyzeCode}</div>
            </div>
          </TabsContent>
          <TabsContent value="raw" className="mt-0">
            <div className="relative rounded-md bg-muted p-4">
              <pre className="overflow-x-auto">
                <code>{analyzeCode}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
