import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../hooks/auth/useAuth";
import { useAppSelector } from "../hooks/useAppSelector";
import { removeToken } from "../store/authSlice";
const Navbar = () => {
  const logout = useLogoutMutation();
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.auth.idUser);
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  const logutUser = (id: string) => {
    logout.mutate(id, {
      onSuccess: () => {
        alert("success logout");
        navigate("/login");
        dispatch(removeToken());
        localStorage.removeItem("userData");
      },
      onError: () => {
        alert("error logout");
      },
    });
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/products">Product</Link>
      <Link to="/masterData">Master Data</Link>
      <button onClick={() => logutUser(id)}>Logout</button>
    </div>
  );
};

export default Navbar;
