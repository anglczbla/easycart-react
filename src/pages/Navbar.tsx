import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/Register">Register</Link>
    </div>
  );
};

export default Navbar;
