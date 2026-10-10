"use client";

import { useMutation } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import { sendContactMessage } from "@/features/contact/services/contact.services";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics.utils";
import { toast } from "@/hooks/use-toast";

export const useSendContactMessage = () =>
  useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => trackEvent(AnalyticsEvents.CONTACT_SENT),
    onError: (error) => {
      toast({ title: "Could not send your message", description: getApiErrorMessage(error), variant: "error" });
    },
  });
