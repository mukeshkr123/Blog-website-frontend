import React from "react";
// import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Dropzone from "react-dropzone";

import CategoryDropDown from "../Categories/CategoryDropDown";
import { createpostAction } from "../../redux/slices/posts/postSlices";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
  image: Yup.string().required("Image is required"),
});
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
border-color:'red'
  transition: border 0.24s ease-in-out;
`;
export default function CreatePost() {
  const dispatch = useDispatch();

  const post = useSelector((state) => state?.post);
  const { loading, appErr, serverErr } = post;

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, touchedFields },
    setValue,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    const postData = {
      category: data?.category?.label,
      title: data?.title,
      description: data?.description,
      image: data?.image,
    };
    dispatch(createpostAction(postData));
  };

  // if (isCreated) return <Redirect to="/posts" />;

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Create Post
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-green-600 hover:text-indigo-500">
              Share your ideas to the word. Your post must be free from
              profanity
            </p>
          </p>

          {appErr || serverErr ? (
            <p className="mt-2 text-center text-lg text-red-600">
              {serverErr} {appErr}
            </p>
          ) : null}
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  {/* Title */}
                  <input
                    {...register("title", { required: "Title is required" })}
                    id="title"
                    type="title"
                    autoComplete="title"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">{errors?.title?.message}</div>
              </div>
              {/* Category input goes here */}
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Select Category
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <CategoryDropDown
                    value={field?.value?.label}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption)
                    }
                    onBlur={() => field.onBlur(true)}
                    error={errors?.category?.message}
                    touched={touchedFields?.category}
                  />
                )}
              />
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                {/* Description */}
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                ></textarea>
                {/* Image component */}
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mt-3 mb-2 text-gray-700"
                >
                  Select image to upload
                </label>
                <Container className="container bg-gray-700">
                  <Dropzone
                    onBlur={() => {}}
                    accept="image/jpeg, image/png"
                    onDrop={(acceptedFiles) => {
                      setValue("image", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="container">
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: (event) => event.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                            Click here to select image
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </Container>
                {/* Err msg */}
                <div className="text-red-500">
                  {errors?.description?.message}
                </div>
              </div>
              <div>
                {/* Submit btn */}
                {loading ? (
                  <button
                    disabled
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Loading please wait...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
