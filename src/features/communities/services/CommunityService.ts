import { CommunityFormType } from "../schemas/communitySchema";
import { communityRepository, ICommunityRepository } from "./CommunityRepository";


class CommunityService {

    constructor(
        private readonly communityRepository: ICommunityRepository
    ) { }


    async createCommunity(data: CommunityFormType, userId: string) {

        const response = await this.communityRepository.createCommunity(
            {
                ...data,
                createdBy: userId
            }
        )
    }

}

export const communityService = new CommunityService(communityRepository)