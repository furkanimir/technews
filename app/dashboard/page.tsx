import Posts from "@/components/Posts"
import { postsData } from "@/data"
import Link from "next/link"

export default function Dashboard() {
    return (
        <div>
            <h1>My Po2sts</h1>

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
