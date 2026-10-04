import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 10;

const emailField = z
  .string()
  .trim()
  .min(1, "Enter your email address.")
  .email("Enter a valid email address.");

const newPasswordField = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Use at least ${PASSWORD_MIN_LENGTH} characters.`)
  .max(128, "Use at most 128 characters.");

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Enter your password."),
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: emailField,
  password: newPasswordField,
  accept_terms: z.boolean().refine((value) => value, "Please accept the terms to continue."),
});
export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: emailField,
});
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: newPasswordField,
    confirm_password: z.string().min(1, "Repeat your new password."),
  })
  .refine((value) => value.password === value.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match.",
  });
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
