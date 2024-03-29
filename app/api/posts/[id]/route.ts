import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

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
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({error:"not authenticated"}, {status:401});
    }

    const id=params.id;
    const{title,content,links,selectedCategory,imageUrl,publicId} = await req.json();

    try {
        const post = await prisma.post.update({
            where:{id},
            data:{
                title,content,links, catName:selectedCategory,imageUrl,publicId
            }
        })
        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Editing error."});
    }

}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({error:"not authenticated"}, {status:401});
    }

    const id=params.id;
    
    try {
        const post = await prisma.post.delete({where:{id}});
        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"post couldn't deleted"})
    }
    
}