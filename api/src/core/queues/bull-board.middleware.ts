import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';

const safeEqual = (a: string, b: string) => {
    const ab = Buffer.from(a);
    const bb = Buffer.from(b);
    return ab.length === bb.length && timingSafeEqual(ab, bb);
};

export function bullBoardAuthMiddleware(configService: ConfigService) {
    return (req: Request, res: Response, next: NextFunction) => {
        const adminUser = configService.get('BULL_BOARD_USER');
        const adminPass = configService.get('BULL_BOARD_PASSWORD');

        if (!adminUser || !adminPass) {
            return res.status(500).send('Bull Board credentials not configured');
        }

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            res.setHeader('WWW-Authenticate', 'Basic realm="Bull Board Admin"');
            return res.status(401).send('Authentication required');
        }

        const credentials = Buffer.from(authHeader.slice(6), 'base64').toString();
        const separator = credentials.indexOf(':');
        const user = separator >= 0 ? credentials.slice(0, separator) : credentials;
        const password = separator >= 0 ? credentials.slice(separator + 1) : '';

        if (safeEqual(user, adminUser) && safeEqual(password, adminPass)) {
            return next();
        }

        res.setHeader('WWW-Authenticate', 'Basic realm="Bull Board Admin"');
        return res.status(401).send('Invalid credentials');
    };
}
