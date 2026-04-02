'use server'

import { SignInSchema, SignInSchemaType } from "../schemas/authSchema";
import { authServices } from "../services/AuthServices";

export async function signInAction(formData: SignInSchemaType) {
    const data = SignInSchema.safeParse(formData);
    if (!data.success) {
        return {
            error: "Ocurrió un error al iniciar sesión",
            success: '',
        }
    }

    const { data: userData } = data
    const response = await authServices.signIn(userData);
    console.log(response);
    if (response?.error) {
        return {
            error: response.error,
            success: '',
        }
    }
    return {
        error: '',
        success: 'Inicio de sesión exitoso',
    }

}