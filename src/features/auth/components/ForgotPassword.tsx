'use client'

import { useTransition } from "react";
import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms"
import { useForm } from 'react-hook-form'
import { ForgotPasswordSchema, ForgotPasswordSchemaType } from '@/src/features/auth/schemas/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordAction } from "../actions/forgotPassword-actions"
import toast from "react-hot-toast"


export default function ForgotPassword() {

    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        mode: 'all'
    });


    const onSubmit = async (data: ForgotPasswordSchemaType) => {
        startTransition(async () => {
            const { error, success } = await forgotPasswordAction(data);
            if (error) {
                toast.error(error);
            }
            if (success) {
                toast.success(success);
            }
        });
    }

    return (
        <Form className="shadow-sm p-5 space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
                type="email"
                id="email"
                placeholder="Ingresa tu email"
                {...register("email")}
            />
            <FormError>{errors.email?.message || ''}</FormError>


            <FormSubmit value={isPending ? "Enviando Instrucciones..." : "Enviar Instrucciones"} disabled={isPending} />
        </Form>
    )
}
