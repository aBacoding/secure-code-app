import React, { type FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Textarea } from '@/shared/components/ui/textarea';
import { analysisHistorySchema, type AnalysisHistoryData } from '@/entities/analyzer';
import { useMutate } from '@/shared/hooks';
import { analyzeCode, useAnalyzerStore } from '@/features/analyzer';
import { toast } from 'sonner';

export const CodeAnalyzerForm: FC = () => {
  const { setAnalyzeCode, setPrompt } = useAnalyzerStore();
  const form = useForm<AnalysisHistoryData>({
    resolver: zodResolver(analysisHistorySchema),
    defaultValues: {
      code: '',
      prompt: 'Analyze this code for security vulnerabilities',
    },
  });

  const { mutate, isPending } = useMutate(analyzeCode, {
    onSuccess: (response) => {
      toast.success('Code analyzed successfully');
      setAnalyzeCode(response.data.data.analysisResult);
      setPrompt(form.getValues().prompt);
    },
    onError: () => {
      toast.error('Failed to analyze code');
    },
  });

  const handleSubmit = (data: AnalysisHistoryData): void => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code to Analyze</FormLabel>
              <FormControl>
                <Textarea placeholder="Paste your code here..." className="min-h-[200px] font-mono" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Analysis Prompt</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your analysis instructions..." className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending} loading={isPending}>
          Analyze Code
        </Button>
      </form>
    </Form>
  );
};
