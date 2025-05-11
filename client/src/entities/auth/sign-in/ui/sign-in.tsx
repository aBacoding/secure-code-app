import React from 'react';
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
} from '@/shared/components/ui';
import { signInFormSchema, type SignInFormValues } from '@/entities/auth/sign-in';
import { useMutate } from '@/shared/hooks';
import { signIn } from '@/features/auth/sign-in';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ThemeToggle } from '@/widgets/theme-toggle';

export const SignIn = (): React.JSX.Element => {
  const navigate = useNavigate();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutate(signIn, {
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data;
      Cookies.set('token', accessToken);
      Cookies.set('refreshToken', refreshToken);
      navigate('/');
      toast.success('Successfully signed in');
      form.reset();
    },
    onError: () => {
      toast.error('Credentials are incorrect');
    },
  });

  const onSubmit = (data: SignInFormValues): void => {
    mutate(data);
  };

  return (
    <Card className="w-[500px]">
      <CardHeader className="space-y-1 gap-0 flex flex-col items-center justify-center">
        <div className="flex justify-end w-full">
          <ThemeToggle />
        </div>
        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">Enter your credentials to sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username or email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button className="w-full" type="submit" disabled={isPending} loading={isPending}>
              Sign In
            </Button>
            <span className="text-center text-sm text-muted-foreground w-full flex justify-center items-center gap-2">
              Don&apos;t have an account?
              <Button variant="link" onClick={() => navigate('/sign/up')} className="p-0" disabled={isPending}>
                Sign Up
              </Button>
            </span>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
