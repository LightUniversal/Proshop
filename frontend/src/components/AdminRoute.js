import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
const {userinfo} = useSelector((state) => state.auth);

  return userinfo && userinfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace/>
}

export default AdminRoutes;
