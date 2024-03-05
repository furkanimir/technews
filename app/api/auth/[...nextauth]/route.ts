import { authOptions } from "@/app/utils/deneme";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };

// import NextAuth, { AuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// // import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";

// import prisma from "@/lib/prismadb";
// import { Adapter } from "next-auth/adapters";

// export const authOptions: AuthOptions = {

//     adapter: PrismaAdapter(prisma) as Adapter,
//     providers: [
//         GithubProvider({
//             clientId: process.env.GITHUB_CLIENT_ID as string,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//         }),
//     ],
//     pages: {
//         signIn: '/sign-in',
//     },
//     secret: process.env.NEXTAUTH_SECRET
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }

// GoogleProvider({
//     clientId: '',
//     clientSecret: '',
// }),