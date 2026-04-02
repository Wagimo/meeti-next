import Link from 'next/link'
import { Metadata } from 'next'
import ForgotPassword from '@/src/features/auth/components/ForgotPassword'
import Heading from '@/src/shared/components/typography/Heading'
import { generatePageTitle } from '@/src/shared/utils/metadata'


export const metadata: Metadata = {
    title: generatePageTitle("Recuperar Password")
}

export default function ForgotPasswordPage() {

    return (
        <>
            <Heading level={1} className="uppercase font-black">Recuperar Password</Heading>
            <ForgotPassword />

            <nav className="flex justify-between items-center gap-4 mt-5 md:mt-0">
                <Link className="font-bold" href="/auth/login" >Iniciar Sesión</Link>
                <Link className="font-bold" href="/auth/create-account" >Crear Cuenta</Link>
            </nav>
        </>
    );
}
