import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSinglePostsAction,
  updatePostAction,
} from "../../redux/slices/posts/postSlices";
import { useEffect } from "react";

const PostSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
});

export default function UpdatePost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetch the post data
  useEffect(() => {
    dispatch(fetchSinglePostsAction(id));
  }, [id, dispatch]);

  // dispatch
  const onSubmit = (values) => {
    const data = {
      title: values.title,
      description: values.description,
      id,
    };
    dispatch(updatePostAction(data));
  };

  // select the post data
  const postData = useSelector((state) => state.post);
  const { postDetails } = postData;

  // select the upadeted post data
  const postUpdate = useSelector((state) => state.post);
  const { loading, appErr, serverErr, isUpdated } = postUpdate;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: postDetails?.title,
      description: postDetails?.description,
    },
    resolver: zodResolver(PostSchema),
  });

  // update the field details after getting the post detailsd
  useEffect(() => {
    reset({
      title: postDetails?.title,
      description: postDetails?.description,
    });
  }, [postDetails, reset]);

  //redirect to
  if (isUpdated) navigate("/posts");

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Are you sure you want to edit{" "}
          <span className="text-green-300">{postDetails?.title}</span>
        </h2>
        {appErr || serverErr ? (
          <h1 className="text-red-400 text-xl text-center">
            {appErr} {serverErr}
          </h1>
        ) : null}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  {...register("title")}
                  id="title"
                  type="text"
                  autoComplete="title"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="text-red-500">{errors?.title?.message}</div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  {...register("description")}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                ></textarea>
              </div>
              <div className="text-red-500">{errors?.description?.message}</div>
            </div>

            {/* <CategoriesOptions
              value={formik.values.category?.categoryTitle}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.category}
              touched={formik.touched.category}
            /> */}

            <div>
              {loading ? (
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm disabled font-medium text-white bg-gray-400"
                >
                  Please wait Updating....
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
