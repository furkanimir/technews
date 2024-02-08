import Posts from "@/components/Posts"
import { postsData } from "@/data"
import Link from "next/link"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/sign-in');
    }
    return (
        <div>
            <h1>My Dashboard</h1>

            {postsData && postsData.length > 0 ? (
                postsData.map((post) => (<Posts key={post.id} id={post.id} author={post.author}
                    authorEmail={'test@test.com'} date={post.datepublished}
                    thumbnail={post.thumbnail} category={post.category}
                    title={post.title} content={post.content} links={post.links || []} />)
                )) : (
                <div className="py-6">
                    No posts created.
                    <Link className="underline" href={'/create-post'}>Create New Post</Link>
                </div>
            )}
        </div>
    );
}
