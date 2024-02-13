import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

// {params}:{id:string}}
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const post = await prisma.post.findUnique({ where: { id } });
        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "could not fetch unique post" });
    }

}

export async function PUT(req: Request, { params }: { params: { id: string } }) {

    const id=params.id;
    const{title,content,links,selectedCategory,imageUrl,publicId} = await req.json();

}