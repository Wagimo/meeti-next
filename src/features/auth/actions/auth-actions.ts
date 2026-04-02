'use server'

import { SignUpSchemaType, SignUpSchema } from "../schemas/authSchema";
import { authServices } from "../services/AuthServices";


export async function signUpAction(formData: SignUpSchemaType) {
    const data = SignUpSchema.safeParse(formData);
    if (!data.success) {
        return {
            error: "Ocurrió un error al crear el usuario",
            success: '',
        }
    }
    const { data: userData } = data
    const response = await authServices.register(userData);
    if (response?.error) {
        return {
            error: response.error,
            success: '',
        }
    }
    return {
        error: '',
        success: 'usuario creado correctamente!',
    }
}