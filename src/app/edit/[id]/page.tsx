'use client'

import FormPost from '@/components/FormPost'
import { FormInputPost } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, use } from 'react';
import { SubmitHandler } from 'react-hook-form';

// interface EditPostPageProps {
//     params: {
//         id: string
//     }
// }

interface EditPostPageProps {
  params: Promise<{
      id: string;
  }>;
}

const EditPostPage:FC<EditPostPageProps> = ({params}) => {
    // const {id} = params;
    const { id } = use(params);
    const router = useRouter();

    const {data: dataPost, isLoading: isLoadingPost} = useQuery({
      queryKey: ['posts', id],
      queryFn: async () => {
        const res = await axios.get(`/api/posts/${id}`);
        return res.data;
      }
    })


    const { mutate: updatePost, isPending: isPendingUpdatePost } = useMutation({
      mutationFn: async (newPost: FormInputPost) => {
        const response = await axios.patch(`/api/posts/${id}`, newPost);
        return response.data;
      },
      onError: (error) => {
        console.error("Error creating post:", error);
      },
      onSuccess: (data) => {
        console.log("Post created successfully:", data);
        router.push('/');
        router.refresh();
      },
    });

    // console.log(dataPost, "dataPost");

    const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
        // console.log(data);
        updatePost(data);
    }

    if(isLoadingPost) return (
      <div className='text-center h-full flex justify-center items-center'>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  return (
    <>
        <div>
            <h1 className="text-2xl font-bold my-4 text-center">Edit Post</h1>
            <FormPost submit={handleEditPost} isEditing initialValue={dataPost} isPendingUpdatePost={isPendingUpdatePost}/>
        </div>
    </>
  )
}

export default EditPostPage