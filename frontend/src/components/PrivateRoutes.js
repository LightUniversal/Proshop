import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
const {userinfo} = useSelector((state) => state.auth);

  return userinfo ? <Outlet /> : <Navigate to="/login" replace/>
}

export default PrivateRoutes;
