import { PROFILE_TABS, profileSchema, type ProfileFormData } from '@/entities/profile';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CustomSelect,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components';
import React, { useEffect, useState, type FC } from 'react';
import { useAuthStore, useCountriesStore } from '@/features/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type AxiosError } from 'axios';
import { type ErrorResponse } from '@/shared/types';
import {
  updateProfile,
  useAnalyzeHistoryItemStore,
  useGenerateHistoryItemStore,
  AnalyzeHistoryDetailDialog,
  GenerateHistoryDetailDialog,
} from '@/features/profile';
import { useMutate, useFetch } from '@/shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatDate } from '@/shared/libs/utils';
import { type AnalyzeHistoryItem, type GenerateHistoryItem } from '@/features/profile/model/types';

export const ProfileContent: FC = () => {
  const { countries, fetchCountries, isLoading } = useCountriesStore();
  const [historyTab, setHistoryTab] = useState('analyze');

  const form = useForm<ProfileFormData>({
    defaultValues: {
      country: '',
      full_name: '',
      username: '',
      email: '',
    },
    resolver: zodResolver(profileSchema),
  });
  const { user, setUser } = useAuthStore();
  const { setState: setAnalyzeItemState, setItemId: setAnalyzeItemId } = useAnalyzeHistoryItemStore();
  const { setState: setGenerateItemState, setItemId: setGenerateItemId } = useGenerateHistoryItemStore();

  const { mutate, isPending } = useMutate(updateProfile, {
    onSuccess: (response) => {
      const { user } = response.data;
      toast.success('Profile updated successfully');
      setUser(user);
      form.reset({
        country: user.country,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });

  const { data: analyzeHistoryData, isLoading: isAnalyzeLoading } = useFetch<{
    message: string;
    data: AnalyzeHistoryItem[];
  }>('/analyzer/history');
  const { data: generateHistoryData, isLoading: isGenerateLoading } = useFetch<{
    message: string;
    data: GenerateHistoryItem[];
  }>('/generate/history');

  const onSubmit = (data: ProfileFormData): void => {
    mutate({
      country: data.country,
      full_name: data.full_name,
    });
  };

  const handleAnalyzeItemClick = (id: string): void => {
    setAnalyzeItemId(id);
    setAnalyzeItemState(true);
  };

  const handleGenerateItemClick = (id: string): void => {
    setGenerateItemId(id);
    setGenerateItemState(true);
  };

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  useEffect(() => {
    if (user) {
      form.reset({
        country: user.country,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
      });
    }
  }, [user, countries]);

  return (
    <Tabs defaultValue={PROFILE_TABS[0].value} className="space-y-4">
      <TabsList>
        {PROFILE_TABS.map((tab) => (
          <TabsTrigger className="cursor-pointer" key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={PROFILE_TABS[0].value} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <CustomSelect
                              options={countries.map((country) => ({
                                label: country.name.common,
                                value: country.name.common,
                              }))}
                              placeholder="Select your country"
                              value={field.value}
                              onValueChange={field.onChange}
                              isLoading={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input disabled placeholder="Enter your username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input disabled placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button size="sm" variant="default" type="submit" disabled={isPending} loading={isPending}>
                  Save
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value={PROFILE_TABS[1].value} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
            <CardDescription>Your recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={historyTab} onValueChange={setHistoryTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="analyze">Analyze History</TabsTrigger>
                <TabsTrigger value="generate">Generate History</TabsTrigger>
              </TabsList>

              <TabsContent value="analyze" className="space-y-4">
                {isAnalyzeLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <p className="text-sm text-muted-foreground">Loading analysis history...</p>
                  </div>
                ) : analyzeHistoryData?.data?.length === 0 ? (
                  <div className="flex items-center justify-center py-4">
                    <p className="text-sm text-muted-foreground">No analysis history found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analyzeHistoryData?.data?.map((item: AnalyzeHistoryItem) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 p-4 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => handleAnalyzeItemClick(item._id)}
                      >
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{item.prompt}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(item.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="generate" className="space-y-4">
                {isGenerateLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <p className="text-sm text-muted-foreground">Loading generation history...</p>
                  </div>
                ) : generateHistoryData?.data?.length === 0 ? (
                  <div className="flex items-center justify-center py-4">
                    <p className="text-sm text-muted-foreground">No generation history found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {generateHistoryData?.data?.map((item: GenerateHistoryItem) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 p-4 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => handleGenerateItemClick(item._id)}
                      >
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{item.prompt}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 bg-muted rounded-full">{item.language}</span>
                            <p className="text-xs text-muted-foreground">{formatDate(item.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </TabsContent>

      <AnalyzeHistoryDetailDialog />
      <GenerateHistoryDetailDialog />
    </Tabs>
  );
};
