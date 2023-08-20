import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostPostAction,
  fetchSinglePostsAction,
} from "../../redux/slices/posts/postSlices";
import AddComment from "../Comments/Comments";
import CommentsList from "../Comments/CommentList";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const state = useSelector((state) => state.post);
  const { postDetails: post, loading, appErr, serverErr, isDeleted } = state;

  //comment list
  const comments = useSelector((state) => state.comment);

  const { commentCreated, commentDeleted } = comments;

  useEffect(() => {
    dispatch(fetchSinglePostsAction(id));
  }, [dispatch, id, commentCreated, commentDeleted]);

  if (isDeleted) navigate("/posts");

  //get login user
  const user = useSelector((state) => state.users);
  const { userAuth } = user;
  const _id = userAuth?._id;

  const isCreatedBy = post?.user?.id === _id;

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : appErr || serverErr ? (
        <h1 className="h-screen text-red-400 text-xl">
          {appErr} {serverErr}
        </h1>
      ) : (
        <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
          <div className="container px-4 mx-auto">
            {/* Post Image */}
            <img
              className="mb-24 w-full h-96 object-cover"
              src={post?.image}
              alt="Post"
            />
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
                {post?.title}
              </h2>

              {/* User */}
              <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                <img
                  className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  src={post?.user?.profilePhoto}
                  alt="User"
                />
                <div className="text-left">
                  <Link to={`/profile/${post?.user?._id}`}>
                    <h4 className="mb-1 text-2xl font-bold text-gray-50">
                      <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                        {post?.user?.firstName} {post?.user?.lastName}
                      </span>
                    </h4>
                  </Link>
                  <p className="text-gray-500">{post?.createdAt} created At</p>
                </div>
              </div>
              {/* Post description */}
              <div className="max-w-xl mx-auto">
                <p className="mb-6 text-left text-xl text-gray-200">
                  {post?.description}
                </p>

                {/* Show delete and update btn if by the user created user */}
                {isCreatedBy ? (
                  <div className="flex">
                    <Link to={`/update-post/${post?._id}`} className="p-3">
                      <BsPencilSquare className="h-8 mt-3 text-yellow-300" />
                    </Link>
                    <button className="ml-3">
                      <BsTrash
                        onClick={() =>
                          dispatch(deletePostPostAction(post?._id))
                        }
                        className="h-8 mt-3 text-red-600"
                      />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* Add comment Form component here */}
          {userAuth ? <AddComment postId={id} /> : null}

          <div className="flex justify-center items-center">
            {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
            <CommentsList comments={post?.comments} />
          </div>
        </section>
      )}
    </>
  );
};

export default PostDetails;
