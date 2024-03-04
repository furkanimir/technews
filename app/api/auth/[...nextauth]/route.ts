// import { authOptions } from "@/app/utils/authOptions";
// import NextAuth from "next-auth/next";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/prismadb";
import { Adapter } from "next-auth/adapters";

const authOptions: AuthOptions = {

    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: '/sign-in',
    },
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions }

// GoogleProvider({
//     clientId: '',
//     clientSecret: '',
// }),