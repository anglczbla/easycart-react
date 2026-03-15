import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

const HomePage = () => {
  const token = useAppSelector((state) => state.auth.token);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });
  return <div>HomePage</div>;
};

export default HomePage;
