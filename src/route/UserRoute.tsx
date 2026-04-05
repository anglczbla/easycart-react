import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

const UserRoute = () => {
  const admin = useAppSelector((state) => state.auth.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      navigate("/");
      return;
    }
  }, [admin]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default UserRoute;
