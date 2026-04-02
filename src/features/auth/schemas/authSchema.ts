import { z } from "zod";

export const BaseSchema = z.object({
    name: z.string().trim().min(3, { error: "El nombre debe tener al menos 3 caracteres" }),
    email: z.string().email({ error: "Email inválido" }),
    password: z.string().trim().min(8, { error: "La contraseña debe tener al menos 8 caracteres" }),
    passwordConfirmation: z.string().trim().min(1, { error: "La confirmación de contraseña es requerida" }),
});

export const SignInSchema = BaseSchema.pick({
    email: true,
}).extend({
    password: z.string().trim().min(1, { error: "El password no puede estar vacío" }),
});

export const SignUpSchema = BaseSchema.pick({
    name: true,
    email: true,
    password: true,
    passwordConfirmation: true,
}).refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Las contraseñas no coinciden",
});


export const ForgotPasswordSchema = BaseSchema.pick({
    email: true,
});

export const ResetPasswordSchema = BaseSchema.pick({
    passwordConfirmation: true,
}).extend({
    password: z.string().trim().min(8, { error: "La contraseña debe tener al menos 8 caracteres" }),
}).refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Las contraseñas no coinciden",
});



export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type SignInSchemaType = z.infer<typeof SignInSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;