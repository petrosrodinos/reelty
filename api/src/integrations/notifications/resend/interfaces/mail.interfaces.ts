export interface CreateEmail {
  to: string;
  subject: string;
  text?: string;
  from?: string;
  html?: any;
  attachments?: any[];
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
  headers?: Record<string, string>;
  template_id?: string;
  dynamic_template_data?: Record<string, any>;
}

export interface EmailFromAddress {
  verification: string;
  confirmation: string;
}

/** Handlebars templates in `integrations/notifications/templates/<name>.hbs`. */
export const EmailTemplates = {
  VERIFY_EMAIL: 'verify-email',
  RESET_PASSWORD: 'reset-password',
  VIDEO_READY: 'video-ready',
  VIDEO_FAILED: 'video-failed',
} as const;

export type EmailTemplate = (typeof EmailTemplates)[keyof typeof EmailTemplates];
