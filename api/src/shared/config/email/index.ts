// Sender address for transactional emails (Resend). Override with RESEND_FROM.
const DEFAULT_FROM = 'Reelty <hello@reelty.app>';
const from = process.env.RESEND_FROM || DEFAULT_FROM;

export const EmailConfig = {
    email_addresses: {
        verification: from,
        confirmation: from,
    },
};
