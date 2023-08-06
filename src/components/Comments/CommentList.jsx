import { Link } from "react-router-dom";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAction } from "../../redux/slices/comment/commentSlice";

export default function CommentsList({ comments }) {
  const user = useSelector((state) => state.users);
  const { userAuth } = user;
  const isLoginUser = userAuth?._id;
  console.log(isLoginUser);

  const dispatch = useDispatch();
  return (
    <div>
      <ul className="divide-y bg-gray-700 w-96 divide-gray-200 p-3 mt-5">
        <div className="text-gray-400">{comments?.length} Total Comments</div>
        {comments?.length === 0 ? (
          <h1 className="text-yellow-400 text-lg text-center">No comments</h1>
        ) : (
          comments?.map((comment, index) => (
            <li key={index} className="py-4  w-full">
              <div className="flex space-x-3">
                <img
                  className="h-6 w-6 rounded-full"
                  src={comment?.user?.profilePhoto}
                  alt=""
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-green-400">
                      {comment?.user?.firstName} {comment?.user?.lastName}
                    </h3>
                    <p className="text-bold text-yellow-500 text-base ml-5">
                      {formatTimeAgo(comment?.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">
                    {comment?.description}
                  </p>
                  {/* Check if the same user created this comment */}
                  {console.log(comment?.user)}
                  {isLoginUser === comment?.user ? (
                    <p className="flex">
                      <Link
                        to={`/update-comment/${comment?._id}`}
                        className="p-3"
                      >
                        <BsPencilSquare className="h-5 mt-3 text-yellow-300" />
                      </Link>
                      <button className="ml-3">
                        <BsTrash
                          onClick={() =>
                            dispatch(deleteCommentAction(comment?._id))
                          }
                          className="h-5 mt-3 text-red-600"
                        />
                      </button>
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function formatTimeAgo(date) {
  const timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (timeAgoInSeconds < 60) {
    return `${timeAgoInSeconds} seconds ago`;
  } else if (timeAgoInSeconds < 3600) {
    const minutes = Math.floor(timeAgoInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeAgoInSeconds < 86400) {
    const hours = Math.floor(timeAgoInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.floor(timeAgoInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        profilePhoto: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
      createdAt: PropTypes.instanceOf(Date),
      description: PropTypes.string,
    })
  ),
};
