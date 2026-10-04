import { toast as toastManager } from "@/components/ui/toast";

export type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

/** Thin wrapper over the shadcn toast manager so call sites stay `toast({ title, description, variant })`. */
export function toast({ title, description, variant = "success", duration }: ToastOptions) {
  return toastManager.add({
    title,
    description,
    type: variant,
    timeout: duration ?? (variant === "error" ? 7000 : 4000),
  });
}
