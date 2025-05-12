import React, { type FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type CodeGenerationRequest, generateCodeSchema, PROGRAMMING_LANGUAGES } from '@/entities/generate';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  Textarea,
} from '@/shared/components';
import { useMutate } from '@/shared/hooks';
import { generateCode, useGenerateStore } from '@/features/generate';
import { toast } from 'sonner';

export const CodeGenerationForm: FC = () => {
  const { setGeneratedCode, setLanguage } = useGenerateStore();

  const form = useForm<CodeGenerationRequest>({
    resolver: zodResolver(generateCodeSchema),
    defaultValues: {
      prompt: '',
      language: 'javascript',
    },
  });

  const { mutate, isPending } = useMutate(generateCode, {
    onSuccess: (response) => {
      toast.success('Code generated successfully');
      setGeneratedCode(response.data.data.generatedCode);
      const language = form.getValues().language || 'javascript';
      setLanguage(language);
    },
    onError: () => {
      toast.error('Failed to generate code');
    },
  });

  const handleSubmit = (values: CodeGenerationRequest): void => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What would you like to generate?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="E.g., Create a React component that shows a counter with increment and decrement buttons"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programming Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROGRAMMING_LANGUAGES.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending} loading={isPending}>
          Generate Code
        </Button>
      </form>
    </Form>
  );
};
