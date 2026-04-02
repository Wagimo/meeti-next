'use server'


import { requiredAuth } from "@/lib/auth-server.";
import { CommunityFormType, CommunitySchema } from "../schemas/communitySchema";
import { communityService } from "../services/CommunityService";


export async function createCommunity(input: CommunityFormType) {


    const result = CommunitySchema.safeParse(input)

    if (!result.success) {
        return {
            success: '',
            error: "Hubo un error al crear la comunidad, por favor verifica los datos e intenta de nuevo"
        }
    }

    const { session } = await requiredAuth()
    if (!session) {
        return {
            success: '',
            error: 'Debes iniciar sesión para crear una comunidad'
        }
    }

    const response = communityService.createCommunity(result.data, session.user.id)
    return response;

}
