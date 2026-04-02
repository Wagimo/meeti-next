'use client'


import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/components/forms"
import { SignInSchema, SignInSchemaType } from "../schemas/authSchema";
import { signInAction } from "../actions/signIn-action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";


export default function LoginForm() {
    const [isPending, startTransition] = useTransition();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(SignInSchema),
        mode: "all",
    });

    const onSubmit = async (data: SignInSchemaType) => {
        startTransition(async () => {

            const { error, success } = await signInAction(data);
            if (success) {
                toast.success(success);
                reset();
                redirect('/dashboard');
            } else {
                toast.error(error);
            }
        })
    }


    return (
        <Form className="shadow-sm p-5 space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="email" >Email</FormLabel>
            <FormInput
                type="email"
                id="email"

                placeholder="Ingresa tu email"
                {...register("email")}
            />
            <FormError>{errors.email?.message || ''}</FormError>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                {...register("password")}
            />
            <FormError>{errors.password?.message || ''}</FormError>
            <FormSubmit value={isPending ? "Iniciando Sesión..." : "Iniciar Sesión"} disabled={isPending} />

        </Form>
    )
}
