"use client";

import { useEffect, type FC } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import { useLogin, useMe } from "@/features/auth/hooks/use-auth";
import { loginSchema, type LoginFormData } from "@/features/auth/validation-schemas/auth.schema";
import { QueryParams, Routes, getSafeNextPath } from "@/routes/routes";
import { AuthShell } from "@/views/auth/components/auth-shell";

const LoginPage: FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const next = getSafeNextPath(params.get(QueryParams.next), Routes.videos);
  const expired = params.get(QueryParams.expired) === "1";
  const login = useLogin();
  const { data: me } = useMe({ requireSessionHint: true });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (me) router.replace(next);
  }, [me, next, router]);

  const onSubmit = (values: LoginFormData) => {
    login.mutate(values, { onSuccess: () => router.replace(next) });
  };

  return (
    <AuthShell
      title="Welcome back"
      description="Log in to see your videos."
      footer={
        <>
          New here? <Link href={Routes.register} className="font-medium text-primary underline-offset-4 hover:underline">Create an account</Link>
        </>
      }
    >
      {expired ? (
        <Alert className="mb-4 border-hairline bg-notice-warn text-ink">
          <AlertDescription className="text-ink">Your session expired. Please log in again.</AlertDescription>
        </Alert>
      ) : null}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" placeholder="you@agency.com" {...field} />
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
                  <PasswordInput autoComplete="current-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {login.isError ? (
            <Alert variant="destructive" className="border-notice-bad bg-notice-bad">
              <AlertDescription className="text-error">{getApiErrorMessage(login.error)}</AlertDescription>
            </Alert>
          ) : null}
          <Button type="submit" size="lg" disabled={login.isPending}>
            {login.isPending ? <Spinner /> : null}
            Log in
          </Button>
          <Link href={Routes.forgot} className="text-center text-sm font-medium text-primary underline-offset-4 hover:underline">
            Forgot your password?
          </Link>
        </form>
      </Form>
    </AuthShell>
  );
};

export default LoginPage;
