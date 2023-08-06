import PublicNavbar from "./Public/PublicNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import AdminNavbar from "./Admin/AdminNavbar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { userAuth } = useSelector((state) => state.users);
  const isAdmin = userAuth?.isAdmin;

  if (!userAuth) {
    return <PublicNavbar />;
  }

  if (isAdmin) {
    return <AdminNavbar isLogin={userAuth} />;
  }

  return <PrivateNavbar isLoginUser={userAuth} />;
};

export default Navbar;
