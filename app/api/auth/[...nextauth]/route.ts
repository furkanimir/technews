import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions={
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID as string,
            clientSecret:process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId:'1:18:40ta gugıl bağlantısını gösteriyor ona sonra bakarım',
            clientSecret:'1:18:40ta gugıl bağlantısını gösteriyor ona sonra bakarım',
        }),
    ],
    pages:{
        signIn:'/sign-in',
    },
    secret:process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}