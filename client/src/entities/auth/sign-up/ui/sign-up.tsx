import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CustomSelect,
} from '@/shared/components/ui';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/widgets/theme-toggle';
import { useMutate } from '@/shared/hooks';
import { signUp, useCountriesStore } from '@/features/auth/sign-up';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/shared/types';
import { signUpSchema, type SignUpFormData } from '@/entities/auth/sign-up';

export const SignUp = (): React.ReactElement => {
  const navigate = useNavigate();
  const { countries, fetchCountries, isLoading } = useCountriesStore();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      full_name: '',
      country: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useMutate(signUp, {
    onSuccess: () => {
      navigate('/sign/in');
      toast.success('Account created successfully');
      form.reset();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message);
    },
  });

  const onSubmit = (data: SignUpFormData): void => {
    mutate(data);
  };

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return (
    <Card className="w-[600px]">
      <CardHeader className="space-y-1 gap-0 flex flex-col items-center justify-center">
        <div className="flex justify-end w-full">
          <ThemeToggle />
        </div>
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">Enter your information to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isPending} loading={isPending}>
              Sign Up
            </Button>
            <span className="text-center text-sm text-muted-foreground w-full flex justify-center items-center gap-2">
              Already have an account?
              <Button variant="link" onClick={() => navigate('/sign/in')} className="p-0" disabled={isPending}>
                Sign In
              </Button>
            </span>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
