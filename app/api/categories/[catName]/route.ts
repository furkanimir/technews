import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

// {params}:{id:string}}
export async function GET(req: Request, { params }: { params: { catName: string } }) {
    try {
        const catName = params.catName;
        const categories = await prisma.category.findUnique({ where: { catName }, include:{
            posts:{ include:{author:true}, orderBy:{createdAt:"desc"}}
        } });
        return NextResponse.json(categories);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "could not fetch unique cate" });
    }

}
