import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/prismadb";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
    ],
    pages: {
        signIn: '/sign-in',
    },
    secret: process.env.NEXTAUTH_SECRET
};