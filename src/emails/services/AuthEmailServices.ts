import { emailConfig } from "../config/config";
import { renderPasswordResetEmail, renderPasswordResetEmailText } from "../templates/PasswordResetEmail";
import { renderVerificationEmail, renderVerificationEmailText } from "../templates/verificationEmail";
import { PasswordResetEmailData, VerificationEmailData } from "../types/emailTypes";
import { EmailService } from "./EmailServices";

export class AuthEmailServices {
    static async sendVerificationEmail(data: VerificationEmailData): Promise<void> {
        const verificationEmail = {
            from: emailConfig.from.verification,
            to: data.email,
            subject: 'Meeti -Verificación de correo electrónico',
            text: renderVerificationEmailText(data),
            html: renderVerificationEmail(data),
        }

        await EmailService.send(verificationEmail);
    }

    static async sendResetPasswordEmail(data: PasswordResetEmailData): Promise<void> {

        await EmailService.send({
            from: emailConfig.from.passwordReset,
            to: data.email,
            subject: 'Meeti - Reestablece tu Password',
            text: renderPasswordResetEmailText(data),
            html: renderPasswordResetEmail(data),
        });


    }
}