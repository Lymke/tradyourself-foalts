import {User} from '../entities';
import {environment} from '../../environments/environment';

const mailer = require('nodemailer');

export class MailerService {
    sendEmail = (user: User, subject: string, content: string) => {
        const transporter = mailer.createTransport({
            // todo: remove credentials from git
            auth: {
                user: environment.mailerUser,
                pass: environment.mailerPassword
            },
            host: environment.mailerHost,
            port: environment.mailerPort,
            secure: true
        });

        return transporter.sendMail({
            from: `"${environment.mailerFromName}" <${environment.mailerFromEmail}>`,
            to: user.email,
            subject: subject,
            html: content
        });
    };
}
