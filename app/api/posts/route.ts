import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {

    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({error:"not authenticated"}, {status:401});
    }


    const { title, content, links, selectedCategory, imageUrl, publicId } =
        await req.json();

    const authorEmail = session?.user?.email as string;

    if (!title || !content ) {
        return NextResponse.json(
            { error: "Title and content are required bruh." },
            { status: 500 }
        );
    }
    try {
        const newPost = await prisma.post.create({
            data: {
                title, content, links, imageUrl, publicId, catName: selectedCategory, authorEmail
            },
        });

        console.log("post created..");
        return NextResponse.json(newPost);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "post couldn't created." })
    }

}

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: { author: { select: { name: true, image: true }, } },
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "error" },
            { status: 500 }
        );

    }
}

