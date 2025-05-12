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
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components';
import React, { useEffect, type FC } from 'react';
import { useAuthStore, useCountriesStore } from '@/features/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type AxiosError } from 'axios';
import { type ErrorResponse } from '@/shared/types';
import { updateProfile } from '@/features/profile';
import { useMutate } from '@/shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod'

export const ProfileContent: FC = () => {
  const { countries, fetchCountries, isLoading } = useCountriesStore();

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

  const onSubmit = (data: ProfileFormData): void => {
    mutate({
      country: data.country,
      full_name: data.full_name,
    });
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
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <p className="text-sm font-medium">Profile Updated</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-medium">Password Changed</p>
                  <p className="text-sm text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
