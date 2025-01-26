'use client'

import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost"
import { FormInputPost } from "@/types";
import { SubmitHandler } from "react-hook-form";

const CreatePage = () => {
    const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
        console.log(data);
    }
  return (
    <div>
        <BackButton/>
        <h1 className="text-2xl font-bold my-4 text-center">Add New Post</h1>
        <FormPost submit={handleCreatePost} isEditing={false}/>
    </div>
  )
}

export default CreatePage