"use client";

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginFormData } from '@/lib/types';
import { loginUser } from '@/app/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Eye, EyeOff } from 'lucide-react';

export function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      mobile: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormData) => {
    setError("");
    startTransition(async () => {
      try {
        const result = await loginUser(values);
        
        if (result?.error) {
          setError(result.error);
          toast({
            title: "Login Failed",
            description: result.error,
            variant: "destructive",
          });
          if (typeof window !== 'undefined') {
            localStorage.removeItem('registeredMobile'); 
          }
        } else if (result?.success && result.mobileForStorage) {
          setError(undefined);
          toast({
            title: "Login Successful",
            description: result.success,
          });
          if (typeof window !== 'undefined') {
            localStorage.setItem('registeredMobile', result.mobileForStorage);
          }
          router.push('/dashboard'); 
        } else {
          const unexpectedError = "An unexpected error occurred during login.";
          setError(unexpectedError);
          toast({
            title: "Login Failed",
            description: unexpectedError,
            variant: "destructive",
          });
           if (typeof window !== 'undefined') {
            localStorage.removeItem('registeredMobile');
          }
        }
      } catch (err) {
        console.error("Error submitting login form:", err);
        const errorMessage = (err instanceof Error) ? err.message : "An unknown system error occurred.";
        setError(errorMessage);
        toast({
          title: "Login System Error",
          description: errorMessage,
          variant: "destructive",
        });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('registeredMobile');
        }
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl bg-muted">
      <CardHeader className="text-center">
        <Leaf className="mx-auto h-12 w-12 text-primary mb-2" />
        <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
        <CardDescription>Login to access your SowSuccess dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="9876543210" type="tel" disabled={isPending} />
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
                    <div className="relative">
                      <Input 
                        {...field} 
                        placeholder="******" 
                        type={showPassword ? "text" : "password"} 
                        disabled={isPending}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={togglePasswordVisibility}
                        disabled={isPending}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col items-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Button variant="link" asChild className="p-0 h-auto text-primary">
            <Link href="/register">Register here</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
