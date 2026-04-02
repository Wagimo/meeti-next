import { auth } from "@/src/lib/auth";



export type UserType = typeof auth.$Infer.Session.user;