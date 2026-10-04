"use client";

import type { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import { useRegister } from "@/features/auth/hooks/use-auth";
import {
  PASSWORD_MIN_LENGTH,
  registerSchema,
  type RegisterFormData,
} from "@/features/auth/validation-schemas/auth.schema";
import { Routes } from "@/routes/routes";
import { AuthShell } from "@/views/auth/components/auth-shell";

const RegisterPage: FC = () => {
  const router = useRouter();
  const register = useRegister();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", accept_terms: false },
  });

  const onSubmit = (values: RegisterFormData) => {
    register.mutate(
      { email: values.email, password: values.password },
      { onSuccess: () => router.push(Routes.verify) },
    );
  };

  return (
    <AuthShell
      title="Create your account"
      description="3 free videos a month while in beta."
      footer={
        <>
          Already registered? <Link href={Routes.login} className="font-medium text-primary underline-offset-4 hover:underline">Log in</Link>
        </>
      }
    >
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
                  <PasswordInput autoComplete="new-password" {...field} />
                </FormControl>
                <FormDescription>At least {PASSWORD_MIN_LENGTH} characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accept_terms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                      onBlur={field.onBlur}
                      className="mt-0.5 size-5"
                    />
                  </FormControl>
                  <FormLabel className="items-start text-sm font-normal leading-snug text-body">
                    <span>
                      I agree to the{" "}
                      <Link href={Routes.terms} className="font-medium text-primary underline-offset-4 hover:underline">
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link href={Routes.privacy} className="font-medium text-primary underline-offset-4 hover:underline">
                        Privacy Policy
                      </Link>
                      , and I understand that output is AI-generated.
                    </span>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {register.isError ? (
            <Alert variant="destructive" className="border-notice-bad bg-notice-bad">
              <AlertDescription className="text-error">{getApiErrorMessage(register.error)}</AlertDescription>
            </Alert>
          ) : null}
          <Button type="submit" size="lg" disabled={register.isPending}>
            {register.isPending ? <Spinner /> : null}
            Create account
          </Button>
        </form>
      </Form>
    </AuthShell>
  );
};

export default RegisterPage;
