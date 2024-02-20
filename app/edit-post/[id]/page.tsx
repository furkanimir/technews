import { TPost } from "@/app/types";
import EditFormPost from "@/components/EditFormPost";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const getpost = async (id: string): Promise<TPost | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
            cache: "no-cache",
        });
        if (res.ok) {
            const post = await res.json();
            return post;
        }

    } catch (error) {
        console.log(error);
    }

    return null;
}

export default async function EditPost({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/sign-in');
    }
    const id = params.id;
    console.log("id: ",id);
    return (
        <EditFormPost />
    )
}
