"use client";

import type { FC } from "react";
import Link from "next/link";
import { MailCheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useForgotPassword } from "@/features/auth/hooks/use-auth";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/features/auth/validation-schemas/auth.schema";
import { Routes } from "@/routes/routes";
import { AuthShell } from "@/views/auth/components/auth-shell";

const ForgotPasswordPage: FC = () => {
  const forgot = useForgotPassword();
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const backToLogin = (
    <Link href={Routes.login} className="font-medium text-primary underline-offset-4 hover:underline">
      Back to log in
    </Link>
  );

  if (forgot.isSuccess) {
    return (
      <AuthShell title="Check your inbox" description="If that email has an account, a one-time reset link is on its way. It expires in 1 hour." footer={backToLogin}>
        <div className="flex flex-col items-center gap-4 rounded-lg bg-surface-card px-4 py-8 text-center">
          <span className="grid size-12 place-items-center rounded-md bg-canvas text-brand">
            <MailCheckIcon className="size-6" aria-hidden="true" />
          </span>
          <p className="text-sm text-body">Nothing arrived after a few minutes? Check your spam folder or try again.</p>
          <Button variant="outline" onClick={() => forgot.reset()}>
            Use a different email
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Reset your password" description="We will email a one-time link that expires in 1 hour." footer={backToLogin}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => forgot.mutate(values))} className="flex flex-col gap-4" noValidate>
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
          <Button type="submit" size="lg" disabled={forgot.isPending}>
            {forgot.isPending ? <Spinner /> : null}
            Send reset link
          </Button>
        </form>
      </Form>
    </AuthShell>
  );
};

export default ForgotPasswordPage;
