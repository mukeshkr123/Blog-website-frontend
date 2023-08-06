import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleCommentAction,
  updateCommentAction,
} from "../../redux/slices/comment/commentSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

//Form schema
const formSchema = z.object({
  description: z.string().nonempty("Description is required"),
});

const UpdateComment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useParams();

  // get the store
  const comment = useSelector((state) => state.comment);
  const { commentDetail, isUpdated } = comment;

  useEffect(() => {
    dispatch(fetchSingleCommentAction(id));
  }, [dispatch, id]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: commentDetail?.des,
    },
    resolver: zodResolver(formSchema),
  });

  // redirect to the
  if (isUpdated) navigate("/posts");

  const onSubmit = (data) => {
    const newData = {
      id,
      description: data.description,
    };
    dispatch(updateCommentAction(newData));
  };

  return (
    <div className="h-96 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-1 flex max-w-sm m-auto"
        >
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <textarea
                {...field}
                type="text"
                className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 rounded-md"
              />
            )}
          />

          <button
            type="submit"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        <div className="text-red-400 mb-2 mt-2">
          {errors?.description?.message}
        </div>
      </div>
    </div>
  );
};

export default UpdateComment;

// 24 minute
