import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { requiredAuth } from "@/src/lib/auth-server.";
import { redirect } from "next/navigation";


export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { isAuthenticated } = await requiredAuth();
    if (isAuthenticated) {
        redirect('/dashboard');
    }

    return (
        <>
            <div className="flex justify-center pt-10">
                <Link href='/' className="w-48">
                    <Logo />
                </Link>
            </div>
            <main className="max-w-2xl mx-auto py-16 px-5">
                {children}
            </main>
        </>
    );
}