import React, { Fragment, type FC, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/shared/libs';
import { useGenerateStore } from '@/features/generate/model/store';

export const CodeDisplay: FC = () => {
  const generatedCode = useGenerateStore((state) => state.generatedCode);
  const language = useGenerateStore((state) => state.language);
  const copiedCode = useGenerateStore((state) => state.copiedCode);
  const setCopiedCode = useGenerateStore((state) => state.setCopiedCode);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleCopy = (): void => {
    copyToClipboard(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  useEffect(() => {
    if (previewRef.current && ['html', 'jsx', 'tsx'].includes(language.toLowerCase())) {
      previewRef.current.innerHTML = generatedCode;
    }
  }, [generatedCode, language]);

  const renderPreview = (): React.ReactElement => {
    if (['html', 'jsx', 'tsx'].includes(language.toLowerCase())) {
      return (
        <div className="relative rounded-md border p-4 bg-white">
          <div ref={previewRef} className="preview-container" />
        </div>
      );
    } else {
      return (
        <div className="relative rounded-md bg-muted p-4">
          <p className="text-muted-foreground text-sm">
            Preview not available for {language} code. Please check the Code tab.
          </p>
        </div>
      );
    }
  };

  return (
    <Card className="w-full mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Generated Code</CardTitle>
        <Button variant="outline" size="sm" onClick={handleCopy} className="text-xs">
          {copiedCode ? (
            <Fragment>
              <Check className="mr-1 h-3 w-3" />
              Copied
            </Fragment>
          ) : (
            <Fragment>
              <Copy className="mr-1 h-3 w-3" />
              Copy Code
            </Fragment>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-0">
            {renderPreview()}
          </TabsContent>
          <TabsContent value="code" className="mt-0">
            <div className="relative rounded-md bg-muted p-4">
              <pre className={`language-${language} overflow-x-auto`}>
                <code>{generatedCode}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
