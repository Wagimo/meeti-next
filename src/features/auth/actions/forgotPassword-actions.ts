
'use server'

import { ForgotPasswordSchema, ForgotPasswordSchemaType } from "../schemas/authSchema";
import { authServices } from "../services/AuthServices";


export async function forgotPasswordAction(formData: ForgotPasswordSchemaType) {

    const data = ForgotPasswordSchema.safeParse(formData);
    if (!data.success) {
        return {
            error: "Email inválido",
            success: '',
        }
    }
    const { data: emailData } = data
    const response = await authServices.requestPasswordReset(emailData);
    return response;
}