"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, CSRF_COOKIE, readCookie } from "@/config/api/axios";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics.utils";
import { toast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import {
  forgotPassword,
  getMe,
  login,
  logout,
  register,
  resendVerification,
  resetPassword,
  verifyEmail,
} from "@/features/auth/services/auth.services";

export const ME_QUERY_KEY = "me";

/** Current user. 401 is an expected "signed out" result and is never retried. */
export const useMe = (options: { enabled?: boolean; requireSessionHint?: boolean } = {}) => {
  // Public pages pass requireSessionHint so signed-out visitors do not fire a pointless /auth/me + refresh.
  // The readable reelty_csrf cookie exists only while a session does.
  const hinted = !options.requireSessionHint || (typeof document !== "undefined" && !!readCookie(CSRF_COOKIE));
  return useQuery({
    queryKey: [ME_QUERY_KEY],
    queryFn: getMe,
    enabled: (options.enabled ?? true) && hinted,
    staleTime: 30_000,
    retry: (failureCount, error) => !(error instanceof ApiError && error.status === 401) && failureCount < 2,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (me) => {
      queryClient.setQueryData([ME_QUERY_KEY], me);
      trackEvent(AnalyticsEvents.LOGIN, { method: "email" });
      queryClient.invalidateQueries({ queryKey: [ME_QUERY_KEY] });
      toast({ title: "Welcome back", description: "You are logged in.", duration: 2000 });
    },
    onError: (error) => {
      toast({ title: "Could not log in", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      trackEvent(AnalyticsEvents.SIGN_UP, { method: "email" });
      queryClient.invalidateQueries({ queryKey: [ME_QUERY_KEY] });
      toast({ title: "Account created", description: data.message });
    },
    onError: (error) => {
      toast({ title: "Could not create your account", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      trackEvent(AnalyticsEvents.LOGOUT);
      queryClient.clear();
      toast({ title: "Logged out", description: "See you soon.", duration: 2000 });
    },
    onError: (error) => {
      toast({ title: "Could not log out", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      trackEvent(AnalyticsEvents.EMAIL_VERIFIED);
      queryClient.invalidateQueries({ queryKey: [ME_QUERY_KEY] });
      toast({ title: "Email verified", description: "You can create videos now." });
    },
    onError: (error) => {
      toast({ title: "Could not verify your email", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: resendVerification,
    onSuccess: () => {
      toast({ title: "Verification email sent", description: "Check your inbox (and your spam folder)." });
    },
    onError: (error) => {
      toast({ title: "Could not send the email", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast({ title: "Check your email", description: "If that email has an account, a reset link is on its way." });
    },
    onError: (error) => {
      toast({ title: "Could not send the reset link", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast({ title: "Password updated", description: "Please log in with your new password." });
    },
    onError: (error) => {
      toast({ title: "Could not update your password", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};
