'use client'
import { FormInputPost } from "@/types";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormPostProps {
    submit: SubmitHandler<FormInputPost>;
    isEditing: boolean;
}

const FormPost: FC<FormPostProps> = ({ submit, isEditing }) => {
    const { register, handleSubmit } = useForm<FormInputPost>();

    

  return (
    <div>
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

        <select defaultValue={''} className="select select-bordered w-full max-w-lg"  {...register("tag", {required: true})}>
          <option disabled value=''>
            Select Tags
          </option>
          <option>Javascript</option>
          <option>PHP</option>
          <option>Python</option>
        </select>

        <button className="btn btn-primary w-full max-w-lg">
            {isEditing ? 'Edit Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default FormPost;
