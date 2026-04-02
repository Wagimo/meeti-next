import { db } from "@/src/db"
import { InsertCommunity, SelectCommunity } from "../types/community-types"
import { community } from "@/src/db/schema"



export interface ICommunityRepository {

    createCommunity(data: InsertCommunity): Promise<SelectCommunity>

}

export class CommunityRepository implements ICommunityRepository {

    async createCommunity(data: InsertCommunity): Promise<SelectCommunity> {
        const [response] = await db.insert(community).values(data).returning()
        return response
    }
}

export const communityRepository = new CommunityRepository()