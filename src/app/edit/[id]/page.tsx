'use client'

import FormPost from '@/components/FormPost'
import { FormInputPost } from '@/types';
import { SubmitHandler } from 'react-hook-form';

const EditPostPage = () => {
    const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
        console.log(data);
    }
  return (
    <>
        <div>
            <h1 className="text-2xl font-bold my-4 text-center">Edit Post</h1>
            <FormPost submit={handleEditPost} isEditing/>
        </div>
    </>
  )
}

export default EditPostPage