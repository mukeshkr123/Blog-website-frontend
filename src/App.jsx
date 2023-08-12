import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/User/Register/Register";
import Login from "./components/User/Login/Login";
import Navbar from "./components/Navbar/Navbar";
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

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-category" element={<AddNewCategory />} />
        <Route path="/update-category/:id" element={<UpdateCategory />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/category-list" element={<CatgoriesLists />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/update-post/:id" element={<UpdatePost />} />
        <Route path="/update-comment/:id" element={<UpdateComment />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/upload-profile-photo" element={<UploadProfilePhoto />} />
        <Route path="/update-profile" element={<UpdateProfileForm />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
    </Router>
  );
};

export default App;
