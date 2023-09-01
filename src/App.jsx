import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/User/Register/Register";
import Login from "./components/User/Login/Login";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CatgoriesLists from "./components/Categories/CatgoriesLists";
import UpdateCategory from "./components/Categories/UpdateCategories ";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostList";
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/UpdatePost";
import UpdateComment from "./components/Comments/UpdateComponent";
import Profile from "./components/User/Profile/Profile";
import UploadProfilePhoto from "./components/User/Profile/UpdateProfile";
import UpdateProfileForm from "./components/User/Profile/UpdateProfileForm";
import UpdatePassword from "./components/User/Forms/UpdatePassword";
import SendEmail from "./components/Email/SendEmail";
import AccountVerified from "./components/User/AccountVerification/AccountVerified";
import UsersList from "./components/User/UserList/UserList";
import PrivateNavbar from "./components/Navbar/Private/PrivateNavbar";
import PublicNavbar from "./components/Navbar/Public/PublicNavbar";
import { useSelector } from "react-redux";
import ProctedRoute from "./components/AuthRoute/ProtectedRoute";
import AdminNavbar from "./components/Navbar/Admin/AdminNavbar";

const App = () => {
  //! Get the login user from store
  const { userAuth } = useSelector((state) => state?.users);
  const isLogin = userAuth?.token;
  const isAdmin = userAuth?.isAdmin;

  return (
    <Router>
      {/* Navabar  */}
      {isAdmin ? (
        <AdminNavbar />
      ) : isLogin ? (
        <PrivateNavbar />
      ) : (
        <PublicNavbar />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Profile  */}
        <Route
          path="/profile/:id"
          element={
            <ProctedRoute>
              <Profile />
            </ProctedRoute>
          }
        />

        {/* Create post  */}
        <Route
          path="/create-post"
          element={
            <ProctedRoute>
              <CreatePost />
            </ProctedRoute>
          }
        />

        {/* Post details  */}
        <Route
          path="/posts/:id"
          element={
            <ProctedRoute>
              <PostDetails />
            </ProctedRoute>
          }
        />

        {/* Update Profile  */}
        <Route
          path="/update-profile"
          element={
            <ProctedRoute>
              <UpdateProfileForm />
            </ProctedRoute>
          }
        />

        {/* Forgot password  */}

        <Route
          path="/add-category"
          element={
            <ProctedRoute>
              <AddNewCategory />
            </ProctedRoute>
          }
        />
        <Route
          path="/update-category/:id"
          element={
            <ProctedRoute>
              <UpdateCategory />
            </ProctedRoute>
          }
        />
        <Route
          path="/category-list"
          element={
            <ProctedRoute>
              <CatgoriesLists />
            </ProctedRoute>
          }
        />

        <Route
          path="/posts"
          element={
            <ProctedRoute>
              <PostsList />
            </ProctedRoute>
          }
        />
        <Route
          path="/update-post/:id"
          element={
            <ProctedRoute>
              <UpdatePost />
            </ProctedRoute>
          }
        />
        <Route
          path="/update-comment/:id"
          element={
            <ProctedRoute>
              <UpdateComment />
            </ProctedRoute>
          }
        />
        <Route
          path="/upload-profile-photo"
          element={
            <ProctedRoute>
              <UploadProfilePhoto />
            </ProctedRoute>
          }
        />
        <Route
          path="/update-password"
          element={
            <ProctedRoute>
              <UpdatePassword />
            </ProctedRoute>
          }
        />
        <Route
          path="/send-email/:id"
          element={
            <ProctedRoute>
              <SendEmail />
            </ProctedRoute>
          }
        />
        <Route
          path="/verify-account/:token"
          element={
            <ProctedRoute>
              <AccountVerified />
            </ProctedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProctedRoute>
              <UsersList />
            </ProctedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
