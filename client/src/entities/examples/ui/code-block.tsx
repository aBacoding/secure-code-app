import React, { type FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Card, CardContent } from '@/shared/components/ui/card';
import { type Example } from '@/features/examples/model/types';
import { Badge } from '@/shared/components/ui/badge';

interface CodeBlockProps {
  example: Example;
}

export const CodeBlock: FC<CodeBlockProps> = ({ example }) => {
  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-xl font-bold">{example.title}</h3>
            <p className="text-muted-foreground">{example.description}</p>
          </div>

          <Tabs defaultValue="vulnerable" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="vulnerable">Vulnerable Code</TabsTrigger>
              <TabsTrigger value="fixed">Fixed Code</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="vulnerable" className="space-y-4">
              <Card className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                <CardContent className="p-4">
                  <div className="relative">
                    <pre className="p-4 rounded-md bg-slate-950 text-slate-50 overflow-x-auto">
                      <code className="text-sm font-mono">{example.sampleCode}</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-slate-800 text-slate-200 border-slate-700">
                        {example.language}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fixed" className="space-y-4">
              <Card className="border-green-500 bg-green-50 dark:bg-green-950/20">
                <CardContent className="p-4">
                  <div className="relative">
                    <pre className="p-4 rounded-md bg-slate-950 text-slate-50 overflow-x-auto">
                      <code className="text-sm font-mono">{example.fixedCode}</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-slate-800 text-slate-200 border-slate-700">
                        {example.language}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">Vulnerability Type:</span>
                        <span>{example.analysisResult.vulnerabilityType}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">Severity:</span>
                        <Badge
                          variant={
                            example.analysisResult.severity === 'High'
                              ? 'destructive'
                              : example.analysisResult.severity === 'Medium'
                                ? 'warning'
                                : 'secondary'
                          }
                        >
                          {example.analysisResult.severity}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Location:</span>
                      <span>
                        Line {example.analysisResult.location.line}, Column {example.analysisResult.location.column}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="font-semibold">Description:</div>
                      <p className="text-muted-foreground">{example.analysisResult.description}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="font-semibold">Recommendation:</div>
                      <p className="text-muted-foreground">{example.analysisResult.recommendation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
