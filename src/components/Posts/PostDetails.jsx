import { Link } from "react-router-dom";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const PostDetails = () => {
  return (
    <>
      <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
        <div className="container px-4 mx-auto">
          {/* Post Image */}
          <img
            className="mb-24 w-full h-96 object-cover"
            src="https://cdn.pixabay.com/photo/2021/02/24/23/43/boy-6047786_960_720.jpg"
            alt=""
          />
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
              {/* {post?.title} */}Title
            </h2>

            {/* User */}
            <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
              <img
                className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                src="https://cdn.pixabay.com/photo/2021/02/24/23/43/boy-6047786_960_720.jpg"
                alt=""
              />
              <div className="text-left">
                <h4 className="mb-1 text-2xl font-bold text-gray-50">
                  <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                    {/* {post?.user?.fullName} */}Fullname
                  </span>
                </h4>
                <p className="text-gray-500">
                  {/* <DateFormatter date={post?.createdAt} /> */}
                  created At
                </p>
              </div>
            </div>
            {/* Post description */}
            <div className="max-w-xl mx-auto">
              <p className="mb-6 text-left  text-xl text-gray-200">
                {/* {post?.description} */}
                um has been the industrys standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not
                only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letrase
                {/* Show delete and update btn if created user */}
                <p className="flex">
                  <Link className="p-3">
                    <BsPencilSquare className="h-8 mt-3 text-yellow-300" />
                  </Link>
                  <button className="ml-3">
                    <BsTrash className="h-8 mt-3 text-red-600" />
                  </button>
                </p>
              </p>
            </div>
          </div>
        </div>
        {/* Add comment Form component here */}

        <div className="flex justify-center  items-center">
          {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
          CommentsList
        </div>
      </section>
    </>
  );
};

export default PostDetails;
