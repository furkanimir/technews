import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

// {params}:{id:string}}
export async function GET(req: Request, { params }: { params: { email: string } }) {
    try {
        const email = params.email;
        const authors = await prisma.user.findUnique({
            where: { email }, include: {
                posts: { orderBy: { createdAt: "desc" } }
            }
        });
        return NextResponse.json(authors);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "could not fetch unique autho" });
    }

}
