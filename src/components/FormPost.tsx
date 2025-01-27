'use client'
import { FormInputPost } from "@/types";
import { Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormPostProps {
    submit: SubmitHandler<FormInputPost>;
    isEditing: boolean;
    initialValue?: FormInputPost;
    isPendingUpdatePost?: boolean;
}

const FormPost: FC<FormPostProps> = ({ submit, isEditing, initialValue, isPendingUpdatePost }) => {

    const { register, handleSubmit } = useForm<FormInputPost>({
      defaultValues: initialValue 
    });

    // fetch tag list
    const { data: dataTags, isLoading: isLoadingTags, isError: isErrorTags } = useQuery<Tag[]>({
      queryKey: ['tags'],
      queryFn: async () => {
        const res = await axios.get('/api/tags')
        return res.data
      }
    })
    // console.log(dataTags, "dataTags");

     // Avoid rendering the form until tags are fetched
  if (isLoadingTags) {
    return <span className="loading loading-ring loading-md"></span>;
  }
  return (
    <>
      <form className="flex flex-col itemms-center justify-center gap-4 mt-10" onSubmit={handleSubmit(submit)}>
        <input
          type="text"
          placeholder="Post Title..."
          {...register("title", {required: true})}
          className="input input-bordered w-full max-w-lg"
        />
        <textarea 
          className="textarea textarea-bordered w-full max-w-lg" 
          placeholder="POst Content..." 
          {...register("content", {required: true})}
        />

        {
          isLoadingTags ? (
            // <p>Loading Tags...</p>
            <span className="loading loading-ring loading-md"></span>
          ) : (
            <select defaultValue={''} className="select select-bordered w-full max-w-lg"  {...register("tagId", {required: true})}>
              <option disabled value=''>
                Select Tags
              </option>
              {
                dataTags?.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))
              }
            </select>
          )
        }

        <button className="btn btn-primary w-full max-w-lg">
          {
            isPendingUpdatePost && <span className="loading loading-spinner"></span>
          }
            {isEditing ? (isPendingUpdatePost ? 'Updating...' : 'Update') : (isPendingUpdatePost ? 'Creating' : 'Create Post')}
        </button>
      </form>
    </>
  );
};

export default FormPost;
