import { appConfig } from '../app';

// Sender address for transactional emails (Resend).
const from = appConfig.email.from;

export const EmailConfig = {
    email_addresses: {
        verification: from,
        confirmation: from,
    },
};
