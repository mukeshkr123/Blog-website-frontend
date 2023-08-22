import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListitem";
import { fetchUsersAction } from "../../../redux/slices/user/userSlices";

const UsersList = () => {
  const dispatch = useDispatch();

  //fetch all users
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, []);

  // select the users
  const users = useSelector((state) => state?.users);
  const { usersList, appErr, serverErr, loading } = users;
  return (
    <>
      <section class="py-8 bg-gray-900 min-h-screen">
        {loading ? (
          <h1>Loading ...</h1>
        ) : appErr || serverErr ? (
          <h3>
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
