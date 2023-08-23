import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListitem";
import { fetchUsersAction } from "../../../redux/slices/user/userSlices";

const UsersList = () => {
  const dispatch = useDispatch();

  // select the users
  const users = useSelector((state) => state?.users);
  const { usersList, userBlocked, userUnBlocked, appErr, serverErr, loading } =
    users;

  //fetch all users
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [userBlocked, userUnBlocked]);

  return (
    <>
      <section class="py-8 px-8 bg-gray-900 min-h-screen">
        {loading ? (
          <h1 className="text-center text-yellow-50">Loading ...</h1>
        ) : appErr || serverErr ? (
          <h3 className="text-yellow-600 text-center text-lg">
            {serverErr}
            {appErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No user Found</h2>
        ) : (
          usersList?.map((user) => (
            <div key={user?._id}>
              <UsersListItem user={user} />
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default UsersList;
