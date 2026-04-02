import { requiredAuth } from "@/src/lib/auth-server.";
import Heading from "@/src/shared/components/typography/Heading";
import { redirect } from "next/navigation";


export default async function DashboardPage() {

    const { isAuthenticated } = await requiredAuth();

    if (!isAuthenticated) {
        redirect('/auth/login');
    }
    return (
        <>
            <Heading className="font-bold uppercase">Panel de Administración</Heading>
        </>
    )
}
