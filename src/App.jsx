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
      </Routes>
    </Router>
  );
};

export default App;
