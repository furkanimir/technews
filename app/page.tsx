import CategoriesList from "@/components/CategoriesList"
import Posts from "@/components/Posts"
import { postsData } from "@/data"

export default function Home() {
  return (
    <>
      <CategoriesList />
      {postsData && postsData.length > 0 ?
        (postsData.map(post => <Posts key={post.id} id={post.id}
          authorEmail={'test@test.com'} date={post.datepublished}
          thumbnail={post.thumbnail} categoty={post.category}
          title={post.title} content={post.content} links={post.links || []} />))
        : (<div>No posts to displayy</div>)}
    </>
  )
}
