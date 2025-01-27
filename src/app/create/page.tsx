'use client'

import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost"
import { FormInputPost } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

const CreatePage = () => {
  const router = useRouter()
  
  const { mutate: createPost, isPending: isPendingUpdatePost } = useMutation({
    mutationFn: async (newPost: FormInputPost) => {
      const response = await axios.post('/api/posts/create', newPost);
      return response.data;
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
    onSuccess: () => {
      // console.log("Post created successfully:", data);
      router.push('/');
      router.refresh();
    },
  });
  
    const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
        createPost(data);
        // console.log(data);
    }

  return (
    <div>
        <BackButton/>
        <h1 className="text-2xl font-bold my-4 text-center">Add New Post</h1>
        <FormPost submit={handleCreatePost} isEditing={false} isPendingUpdatePost={isPendingUpdatePost}/>
    </div>
  )
}

export default CreatePage