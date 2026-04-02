import Link from 'next/link'
import { Metadata } from 'next'
import Heading from '@/src/shared/components/typography/Heading'
import { generatePageTitle } from '@/src/shared/utils/metadata'
import { SetPasswordForm } from '@/src/features/auth/components/SetPasswordForm'


export const metadata: Metadata = {
    title: generatePageTitle("Reiniciar Password")
}

export default function ResetPasswordPage() {

    return (
        <>
            <Heading level={1} className="uppercase font-black">Reiniciar Password</Heading>

            <SetPasswordForm />
            <nav className="flex justify-between items-center gap-4 mt-5 md:mt-0">
                <Link className="font-bold" href="/auth/login" >Iniciar Sesión</Link>
                <Link className="font-bold" href="/auth/create-account" >Crear Cuenta</Link>
            </nav>
        </>
    );
}
