import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AddComment = ({ postId }) => {
  const Schema = z.object({
    description: z.string().min(5, "Please enter a comment"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(Schema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-1 flex max-w-sm m-auto"
      >
        <input
          {...register("description")}
          type="text"
          name="text"
          id="text"
          className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md"
          placeholder="Add New comment"
        />
        {errors?.description && (
          <div className="text-red-400 mt-1">{errors.description.message}</div>
        )}
        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddComment;
