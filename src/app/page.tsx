import PostCard from "@/components/PostCard";
import { db } from "@/lib/db";


const getPosts = async () => {
  const res = await db.post.findMany(
    {
      select: {
        id: true,
        title: true,
        content: true,
        tag: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    }
  )
  return res;
}

export default async function Home() {

  const posts = await getPosts();
  // console.log(posts, "posts");

  return (
    <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {
        posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      }
    </div>
  );
}
