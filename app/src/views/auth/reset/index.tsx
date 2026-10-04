"use client";

import type { FC } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CircleCheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import { useResetPassword } from "@/features/auth/hooks/use-auth";
import {
  PASSWORD_MIN_LENGTH,
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/features/auth/validation-schemas/auth.schema";
import { QueryParams, Routes } from "@/routes/routes";
import { AuthShell } from "@/views/auth/components/auth-shell";

const ResetPasswordPage: FC = () => {
  const token = useSearchParams().get(QueryParams.token);
  const reset = useResetPassword();
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirm_password: "" },
  });

  const requestNewLink = (
    <Link href={Routes.forgot} className="font-medium text-primary underline-offset-4 hover:underline">
      Request a new reset link
    </Link>
  );

  if (!token) {
    return (
      <AuthShell title="This link is not valid" description="The reset link is missing its token. Open the link from your email again, or request a new one." footer={requestNewLink}>
        <Button size="lg" className="w-full" render={<Link href={Routes.login} />} nativeButton={false}>
          Back to log in
        </Button>
      </AuthShell>
    );
  }

  if (reset.isSuccess) {
    return (
      <AuthShell title="Password updated" description="You can now log in with your new password. Other devices were signed out.">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-surface-card px-4 py-8 text-center">
          <CircleCheckIcon className="size-10 text-teal" aria-hidden="true" />
          <Button size="lg" render={<Link href={Routes.login} />} nativeButton={false}>
            Log in
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Choose a new password" description="This link is valid for 1 hour and works once." footer={requestNewLink}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => reset.mutate({ token, password: values.password }))}
          className="flex flex-col gap-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <PasswordInput autoComplete="new-password" {...field} />
                </FormControl>
                <FormDescription>At least {PASSWORD_MIN_LENGTH} characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat new password</FormLabel>
                <FormControl>
                  <PasswordInput autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {reset.isError ? (
            <Alert variant="destructive" className="border-notice-bad bg-notice-bad">
              <AlertDescription className="text-error">{getApiErrorMessage(reset.error)}</AlertDescription>
            </Alert>
          ) : null}
          <Button type="submit" size="lg" disabled={reset.isPending}>
            {reset.isPending ? <Spinner /> : null}
            Update password
          </Button>
        </form>
      </Form>
    </AuthShell>
  );
};

export default ResetPasswordPage;
