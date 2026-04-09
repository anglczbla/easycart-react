import { Menu, Package, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../hooks/auth/useAuth";
import { useGlobalSearch } from "../../hooks/search/useGlobalSearch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { removeToken } from "../../store/authSlice";
import Button from "../ui/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useAppSelector((state) => state.auth.idUser);
  const logout = useLogoutMutation();
  const admin = useAppSelector((state) => state.auth.admin);
  const token = useAppSelector((state) => state.auth.token);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { updateSearch, data, inputValue, isFetching, resetSearch } =
    useGlobalSearch(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };

  const cart = useAppSelector((state) => state.cart.cart.length);

  const logoutUser = (id: string) => {
    if (!id) return;
    logout.mutate(id, {
      onSuccess: () => {
        toast.success("Successfully logged out");
        navigate("/");
        dispatch(removeToken());
        localStorage.removeItem("userData");
      },
      onError: () => {
        toast.error("Logout failed");
      },
    });
  };

  const NavLinks = () => (
    <>
      {!admin && (
        <Link
          to="/"
          className="hover:text-primary-light transition-elegant font-semibold"
        >
          Home
        </Link>
      )}
      <Link
        to="/products"
        className="hover:text-primary-light transition-elegant font-semibold"
      >
        Products
      </Link>
      {admin && (
        <>
          <Link
            to="/masterData"
            className="hover:text-primary-light transition-elegant font-semibold"
          >
            Master Data
          </Link>
          <Link
            to="/all-orders"
            className="hover:text-primary-light transition-elegant font-semibold"
          >
            Orders
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-primary shadow-lg border-b border-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="shrink-0">
            <Link
              to="/"
              className="flex items-center"
              onClick={(e) => admin && e.preventDefault()}
            >
              <img
                src="/logo.png"
                alt="EasyCart"
                className="h-12 w-auto invert brightness-0"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 text-secondary/90">
            <NavLinks />
          </div>

          <div className="hidden lg:block relative max-w-xs w-full">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/50 group-focus-within:text-secondary transition-elegant" />
              <input
                type="text"
                value={inputValue}
                onChange={handleSearch}
                placeholder="Search products..."
                className="w-full bg-primary-dark/40 text-secondary border border-transparent rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-light/30 focus:bg-primary-dark/60 transition-elegant placeholder:text-secondary/40"
              />
            </div>
            {inputValue && inputValue.length > 0 && (
              <div className="absolute top-full mt-2 left-0 w-full bg-white text-primary shadow-2xl rounded-2xl z-50 p-2 overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-top-2">
                {isFetching ? (
                  <p className="p-3 text-sm text-center text-muted animate-pulse">
                    Searching...
                  </p>
                ) : data?.length === 0 ? (
                  <p className="p-3 text-sm text-center text-muted">
                    No products found
                  </p>
                ) : (
                  data?.map((item) => (
                    <Link
                      key={item.id}
                      to={`/products/${item.id}`}
                      className="block p-3 hover:bg-surface rounded-xl transition-elegant text-sm font-medium border-b last:border-0 border-gray-50"
                      onClick={resetSearch}
                    >
                      {item.name}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-6 text-secondary/90">
            {token ? (
              <div className="flex gap-5 items-center">
                <Link
                  to="/profile"
                  className="hover:text-primary-light transition-elegant flex items-center gap-2"
                >
                  <User className="h-5 w-5" />
                </Link>
                {!admin && (
                  <div className="flex gap-5">
                    <Link
                      to="/cart"
                      className="hover:text-primary-light transition-elegant relative"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {cart > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-error text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-primary">
                          {cart}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/order-history"
                      className="hover:text-primary-light transition-elegant"
                    >
                      <Package className="h-5 w-5" />
                    </Link>
                  </div>
                )}
                <Button
                  variant="ghost"
                  className="text-secondary hover:text-error px-2"
                  onClick={() => logoutUser(id)}
                  name="Logout"
                />
              </div>
            ) : (
              <div className="flex gap-5 items-center">
                <Link
                  to="/login"
                  className="text-secondary hover:text-primary-light transition-elegant font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-secondary hover:text-primary-light transition-elegant font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            {!admin && (
              <Link to="/cart" className="relative text-secondary">
                <ShoppingCart className="h-6 w-6" />
                {cart > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-primary">
                    {cart}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary p-1 focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-primary-dark border-t border-primary/20 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <div className="flex flex-col gap-4 text-secondary/80 font-medium py-4">
              {token ? (
                <div>
                  <Link
                    to="/profile"
                    className="hover:text-primary-light transition-elegant"
                  >
                    Profile
                  </Link>
                  {!admin && (
                    <Link
                      to="/order-history"
                      className="hover:text-primary-light transition-elegant"
                    >
                      My Orders
                    </Link>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-5 items-center">
                  <NavLinks />

                  <Link
                    to="/login"
                    className="text-secondary hover:text-primary-light transition-elegant font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-secondary hover:text-primary-light transition-elegant font-semibold"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Search - Mobile */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/50" />
              <input
                type="text"
                value={inputValue}
                onChange={handleSearch}
                placeholder="Search products..."
                className="w-full bg-primary-dark/40 text-secondary border border-transparent rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-light/30 focus:bg-primary-dark/60 transition-elegant placeholder:text-secondary/40"
              />
              {inputValue && inputValue.length > 0 && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white text-primary shadow-2xl rounded-2xl z-50 p-2 overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-top-2">
                  {isFetching ? (
                    <p className="p-3 text-sm text-center text-muted animate-pulse">
                      Searching...
                    </p>
                  ) : data?.length === 0 ? (
                    <p className="p-3 text-sm text-center text-muted">
                      No products found
                    </p>
                  ) : (
                    data?.map((item) => (
                      <Link
                        key={item.id}
                        to={`/products/${item.id}`}
                        className="block p-3 hover:bg-surface rounded-xl transition-elegant text-sm font-medium border-b last:border-0 border-gray-50"
                        onClick={resetSearch}
                      >
                        {item.name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {token && (
              <Button
                variant="danger"
                className="w-full justify-center rounded-xl mt-6"
                onClick={() => logoutUser(id)}
                name="Logout"
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
