import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
