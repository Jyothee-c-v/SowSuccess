"use client";

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type RegisterFormData } from '@/lib/types';
import { registerUser } from '@/app/actions';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { Leaf, Eye, EyeOff } from 'lucide-react';

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterFormData) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const result = await registerUser(values);
        
        if (result?.error) {
          setError(result.error);
          setSuccess(undefined);
          toast({
            title: "Registration Failed",
            description: result.error,
            variant: "destructive",
          });
        } else if (result?.success) {
          setSuccess(result.success);
          setError(undefined);
          toast({
            title: "Registration Successful",
            description: result.success,
          });
          router.push('/login');
        } else {
          const unexpectedError = "An unexpected error occurred. Please try again.";
          setError(unexpectedError);
          setSuccess(undefined);
          toast({
            title: "Registration Failed",
            description: unexpectedError,
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Error submitting registration form:", err);
        const errorMessage = (err instanceof Error) ? err.message : "An unknown system error occurred.";
        setError(errorMessage);
        setSuccess(undefined);
        toast({
          title: "Registration System Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card className="w-full max-w-md shadow-2xl bg-muted">
      <CardHeader className="text-center">
        <Leaf className="mx-auto h-12 w-12 text-primary mb-2" />
        <CardTitle className="text-3xl font-bold">Join SowSuccess</CardTitle>
        <CardDescription>Create your account to start your journey.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="First Name" type="text" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Last name" type="text" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isPending}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
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
                    <div className="relative">
                      <Input 
                        {...field} 
                        placeholder="******" 
                        type={showConfirmPassword ? "text" : "password"} 
                        disabled={isPending} 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isPending}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            {success && <p className="text-sm font-medium text-green-600">{success}</p>}
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isPending}>
              {isPending ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col items-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" asChild className="p-0 h-auto text-primary">
            <Link href="/login">Login here</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
