import Link from "next/link";
import { Metadata } from "next";
import LoginForm from "@/src/features/auth/components/LoginForm";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";



export const metadata: Metadata = {
    title: generatePageTitle("Iniciar Sesión")
}

export default function LoginPage() {

    return (
        <>
            <Heading className="uppercase font-black">Iniciar Sesión</Heading>
            <Heading level={4} className="Capitalize">Bienvenido de nuevo</Heading>
            <LoginForm />
            <nav className="flex justify-between items-center gap-4 mt-5 md:mt-0">
                <Link className="font-bold" href="/auth/create-account" >Crear Cuenta</Link>
                <Link className="font-bold" href="/auth/forgot-password" >Olvidé mi contraseña</Link>
            </nav>
        </>
    )
}