'use client'

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/components/forms";
import { SignUpSchema, SignUpSchemaType } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpAction } from "../actions/auth-actions";
import toast from "react-hot-toast";


export default function RegisterForm() {

    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(SignUpSchema),
        mode: "all",
    });

    const onSubmit = async (data: SignUpSchemaType) => {
        startTransition(async () => {
            const { error, success } = await signUpAction(data);
            if (success) {
                toast.success(success);
                reset();
            } else {
                toast.error(error);
            }
        });
    }

    return (
        <>
            <Form className="shadow-sm p-5 space-y-2" onSubmit={handleSubmit(onSubmit)}>
                <FormLabel htmlFor="name">Nombre *</FormLabel>
                <FormInput
                    id="name"
                    type="text"
                    placeholder="Ingresa tu nombre"
                    {...register("name")}
                />
                <FormError>{errors.name?.message || ''}</FormError>

                <FormLabel htmlFor="email">Email *</FormLabel>
                <FormInput
                    type="email"
                    id="email"
                    placeholder="Ingresa tu email"
                    {...register("email")}
                />
                <FormError>{errors.email?.message || ''}</FormError>

                <FormLabel htmlFor="password">Password *</FormLabel>
                <FormInput
                    type="password"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    {...register("password")}
                />
                <FormError>{errors.password?.message || ''}</FormError>

                <FormLabel htmlFor="password_confirmation">Confirmar Password *</FormLabel>
                <FormInput
                    type="password"
                    id="password_confirmation"
                    placeholder="Confirma tu contraseña"
                    {...register("passwordConfirmation")}
                />
                <FormError>{errors.passwordConfirmation?.message || ''}</FormError>

                <FormSubmit value={isPending ? "Creando Cuenta..." : "Crear Cuenta"} disabled={isPending} />
            </Form>

        </>
    )
}
