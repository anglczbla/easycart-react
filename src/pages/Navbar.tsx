import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useLogoutMutation } from "../hooks/useAuth";
import { removeToken } from "../store/authSlice";
const Navbar = () => {
  const logout = useLogoutMutation();
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.auth.idUser);
  console.log("id", id);

  const dispatch = useDispatch();

  const logutUser = (id: string) => {
    logout.mutate(id, {
      onSuccess: () => {
        alert("success logout");
        navigate("/login");
        dispatch(removeToken());
      },
      onError: () => {
        alert("error logout");
      },
    });
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/product">Product</Link>
      <button onClick={() => logutUser(id)}>Logout</button>
    </div>
  );
};

export default Navbar;
