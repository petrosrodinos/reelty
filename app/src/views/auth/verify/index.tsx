"use client";

import { useEffect, useRef, type FC } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CircleCheckIcon, CircleXIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import { useMe, useResendVerification, useVerifyEmail } from "@/features/auth/hooks/use-auth";
import { QueryParams, Routes } from "@/routes/routes";
import { AuthShell } from "@/views/auth/components/auth-shell";

const VerifyPage: FC = () => {
  const token = useSearchParams().get(QueryParams.token);
  const verify = useVerifyEmail();
  const resend = useResendVerification();
  const { data: me, isPending: mePending } = useMe({ requireSessionHint: true });
  const startedFor = useRef<string | null>(null);

  // Verify once per token (React StrictMode double-invokes effects in development).
  useEffect(() => {
    if (token && startedFor.current !== token) {
      startedFor.current = token;
      verify.mutate({ token });
    }
  }, [token, verify]);

  const resendButton = me ? (
    <Button size="lg" className="w-full" onClick={() => resend.mutate()} disabled={resend.isPending}>
      {resend.isPending ? <Spinner /> : null}
      Resend verification email
    </Button>
  ) : null;

  // 1. Link from the email: verifying / success / failure.
  if (token) {
    if (verify.isSuccess) {
      return (
        <AuthShell title="Email verified" description="You can create videos now.">
          <div className="flex flex-col items-center gap-5 rounded-lg bg-surface-card px-4 py-8 text-center">
            <CircleCheckIcon className="size-12 text-teal" aria-hidden="true" />
            <Button size="lg" render={<Link href={me ? Routes.new : Routes.login} />} nativeButton={false}>
              {me ? "Create a video" : "Log in to continue"}
            </Button>
          </div>
        </AuthShell>
      );
    }
    if (verify.isError) {
      return (
        <AuthShell title="We could not verify your email" description={getApiErrorMessage(verify.error)}>
          <div className="flex flex-col items-center gap-4 rounded-lg bg-surface-card px-4 py-8 text-center">
            <CircleXIcon className="size-12 text-error" aria-hidden="true" />
            <p className="text-sm text-body">The link may have expired (links last 24 hours) or was already used.</p>
            {resendButton ?? (
              <Button size="lg" render={<Link href={Routes.login} />} nativeButton={false}>
                Log in to get a new link
              </Button>
            )}
          </div>
        </AuthShell>
      );
    }
    return (
      <AuthShell title="Verifying your email" description="One moment.">
        <div className="flex flex-col gap-3" aria-busy="true">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-11 w-full" />
        </div>
      </AuthShell>
    );
  }

  // 2. No token: the "check your inbox" state shown after registering.
  if (mePending && !me) {
    return (
      <AuthShell title="Check your inbox">
        <Skeleton className="h-24 w-full" />
      </AuthShell>
    );
  }

  if (me?.email_verified) {
    return (
      <AuthShell title="Email verified" description="You can create videos now.">
        <Button size="lg" className="w-full" render={<Link href={Routes.new} />} nativeButton={false}>
          Create a video
        </Button>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Check your inbox"
      description={
        me ? (
          <>
            We sent a verification link to <strong className="font-medium text-ink">{me.email}</strong>. You need it before your first render. Logging in works without it.
          </>
        ) : (
          "If this email can be registered, we sent a verification link. Open it to finish setting up your account."
        )
      }
      footer={
        me ? (
          <Link href={Routes.videos} className="font-medium text-primary underline-offset-4 hover:underline">
            Continue to My Videos
          </Link>
        ) : (
          <Link href={Routes.login} className="font-medium text-primary underline-offset-4 hover:underline">
            Back to log in
          </Link>
        )
      }
    >
      <div className="flex flex-col items-center gap-4 rounded-lg bg-surface-card px-4 py-8 text-center">
        <span className="grid size-14 place-items-center rounded-md bg-canvas text-brand">
          <MailIcon className="size-7" aria-hidden="true" />
        </span>
        <p className="text-sm text-body">Nothing yet? Check your spam folder. The link expires after 24 hours.</p>
        {resendButton}
      </div>
    </AuthShell>
  );
};

export default VerifyPage;
