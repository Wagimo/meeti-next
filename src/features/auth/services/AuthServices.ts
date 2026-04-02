import { auth } from "@/lib/auth";
import { ForgotPasswordSchemaType, ResetPasswordSchemaType, SignInSchemaType, SignUpSchemaType } from "../schemas/authSchema";
import { authRepository, IAuthRepository } from "./AuthRepository";
import { headers } from "next/headers";
import { APIError } from "better-auth";


class AuthServices {

    constructor(private authRepository: IAuthRepository) { }

    async register(userData: SignUpSchemaType) {

        const { name, email, password } = userData;
        //Validar si el usuario existe en BD
        const userExists = await this.authRepository.checkUserExists(email);
        if (userExists) {
            return {
                error: 'El email ya está en uso',
                success: '',
            }
        }
        //Validación de reglas de negocio para crear el usuario

        //Manejar el registro
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                callbackURL: '/dashboard',
            },
            headers: await headers(), //Para que el servidor pueda acceder a la cookie de la sesión
        })

        return {
            error: '',
            success: 'Usuario creado correctamente',
        }
    }

    async signIn(userData: SignInSchemaType) {
        const { email, password } = userData;


        const userExists = await this.authRepository.checkUserExists(email);
        if (!userExists) {
            return {
                error: 'El usuario no existe',
                success: '',
            }
        }

        try {
            await auth.api.signInEmail({
                body: {
                    email,
                    password,
                    callbackURL: '/dashboard',
                },
                headers: await headers(), //Para que el servidor pueda acceder a la cookie de la sesión
            })

            return {
                error: '',
                success: 'Inicio de sesión exitoso',
            }
        } catch (error) {
            if (error instanceof APIError) {
                const messages: Record<number, string> = {
                    400: 'Petición incorrecta',
                    401: 'Password incorrecto',
                    403: 'Tu cuenta no está verificada. Hemos enviado un nuevo correo de verificación',
                    404: 'No encontrado',
                }
                const message = messages[error.statusCode] || 'Ocurrió un error al iniciar sesión';
                return {
                    error: message,
                    success: '',
                }
            }
        }


        return {
            error: '',
            success: '',
        }
    }

    async requestPasswordReset(data: ForgotPasswordSchemaType) {

        //Validar si el usuario existe en BD
        const userExists = await this.authRepository.checkUserExists(data.email);
        if (!userExists) {
            return {
                error: 'El usuario no existe!',
                success: '',
            }
        }

        await auth.api.requestPasswordReset({
            body: {
                email: data.email,
            }
        })

        return {
            error: '',
            success: 'Se envió un correo a la bandeja de entrada con las instrucciones para recuperar tu password.',
        }

    }

    async confirmPasswordReset(data: ResetPasswordSchemaType, token: string) {

        try {

            const { password: newPassword } = data;
            await auth.api.resetPassword({
                body: {
                    newPassword,
                    token,
                }
            });

            return {
                error: '',
                success: 'Contraseña reiniciada exitosamente'
            }
        } catch (error) {

            if (error instanceof APIError) {
                const messages: Record<number, string> = {
                    400: 'Petición incorrecta',
                    401: 'Token inválido o expirado',
                }
                const message = messages[error.statusCode] || 'Ocurrió un error al reiniciar la contraseña';
                return {
                    error: message,
                    success: '',
                }
            }
        }

        return {
            error: '',
            success: 'Contraseña reiniciada exitosamente'
        }
    }
}
export const authServices = new AuthServices(authRepository);