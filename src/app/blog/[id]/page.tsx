import BackButton from '@/components/BackButton'
import ButtonAction from '@/components/ButtonAction'
import { db } from '@/lib/db'
import React, { FC } from 'react'


interface BlogDetailPageProps {
  params: {
    id: string
  }
}

const getPostById = async (id: string) => {
  const res = await db.post.findFirst({
    where: {
      id: id
    },
    select: {
      id: true,
      title: true,
      content: true,
      tag: true
    }
  })
  return res;
}
const BlogDetailPage:FC<BlogDetailPageProps> = async ({params}) => {
  const post = await getPostById(params.id);
  // console.log(post, "post");
  return (
    <>
    <BackButton/>
        <div className='mb-8' key={post?.id}>
            <h2 className='text-2xl font-bold my-4'>{post?.title}</h2>
            <ButtonAction id={params.id}/>
        </div>
        <div className="badge badge-neutral">{post?.tag.name}</div>
        <p className='text-slate-700'>{post?.content}</p>
    </>
  )
}

export default BlogDetailPage