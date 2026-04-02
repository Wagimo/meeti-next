import { db } from "@/src/db";
import { UserType } from "../types";


export interface IAuthRepository {
    checkUserExists(email: string): Promise<UserType | null>;
}

class AuthRepository implements IAuthRepository {
    constructor() { }


    async checkUserExists(email: string): Promise<UserType | null> {
        const user = await db.query.users.findFirst({
            where: {
                email
            },
        });
        return user ? user : null;
    }
}

export const authRepository = new AuthRepository();