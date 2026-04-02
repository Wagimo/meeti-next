import Link from "next/link";
import { Metadata } from "next";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import RegisterForm from "@/src/features/auth/components/RegisterForm";

export const metadata: Metadata = {
    title: generatePageTitle("Crear Cuenta")
}

export default function RegisterPage() {
    return (
        <>
            <Heading
                level={1}
                className="uppercase font-black"
            >Crear Cuenta</Heading>
            <RegisterForm />

            <nav className="flex justify-between items-center gap-4 mt-5 md:mt-0">
                <Link className="font-bold" href="/auth/login" >Iniciar Sesión</Link>
                <Link className="font-bold" href="/auth/forgot-password" >Olvidé mi contraseña</Link>
            </nav>
        </>
    )
}