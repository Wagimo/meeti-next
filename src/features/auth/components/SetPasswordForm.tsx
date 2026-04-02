'use client'
import { useTransition } from "react";
import { redirect, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import { Form, FormError, FormInput, FormLabel, FormSubmit } from '@/components/forms'
import { ResetPasswordSchema, ResetPasswordSchemaType } from '../schemas/authSchema';
import { setPasswordAction } from '../actions/setPassword-action';

export const SetPasswordForm = () => {
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition();



    const token = searchParams.get('token') || '';
    if (!token) {
        redirect('/auth/forgot-password');
    }


    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: zodResolver(ResetPasswordSchema),
        mode: 'all'
    });


    const onSubmit = async (data: ResetPasswordSchemaType) => {

        startTransition(async () => {
            const { error, success } = await setPasswordAction(data, token);
            if (error) {
                toast.error(error);
            }
            if (success) {
                toast.success(success);
                reset();
                redirect('/auth/login');
            }
        });
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormLabel htmlFor="password">Password *</FormLabel>
            <FormInput
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                {...register("password")}
            />
            <FormError>{errors.password?.message || ''}</FormError>

            <FormLabel htmlFor="password-confirmation">Confirmar Password *</FormLabel>
            <FormInput
                type="password"
                id="password-confirmation"
                placeholder="Repite tu password"
                {...register("passwordConfirmation")}
            />
            <FormError>{errors.passwordConfirmation?.message || ''}</FormError>

            <FormSubmit
                value={isPending ? "Restableciendo..." : "Restablecer Password"}
                disabled={isPending}
            />
        </Form>
    )
}
