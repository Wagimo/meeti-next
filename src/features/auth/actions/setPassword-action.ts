'use server'


import { ResetPasswordSchema, ResetPasswordSchemaType } from "../schemas/authSchema";
import { authServices } from "../services/AuthServices";


export async function setPasswordAction(data: ResetPasswordSchemaType, token: string) {


    const result = ResetPasswordSchema.safeParse(data);

    if (!result.success) {
        return {
            error: 'Datos inválidos',
            success: ''
        }
    }

    const response = await authServices.confirmPasswordReset(data, token);
    return response;

}

