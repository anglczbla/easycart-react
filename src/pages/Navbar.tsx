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
    <nav className="w-full bg-primary shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center ">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="EasyCart Logo" className="h-16 w-auto" />
          </Link>
        </div>

        <div className="flex gap-8 font-semibold text-gray-700 text-secondary ">
          <Link to="/" className="hover:text-emerald-600 transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-emerald-600 transition">
            Product
          </Link>
          <Link to="/#" className="hover:text-emerald-600 transition">
            Deals
          </Link>
          <Link to="/masterData" className="hover:text-emerald-600 transition">
            Master Data
          </Link>
        </div>

        <button
          className="cursor-pointer text-secondary  px-6 py-2 rounded-full font-bold hover:text-red-500 transition"
          onClick={() => logutUser(id)}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
