import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import placeholderImage from "../assets/placeholder.png"; // Optional: use a placeholder avatar

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
    setIsDropdownOpen(false); // close dropdown on logout
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="flex-shrink-0">
            <Link
              to="/"
              className="logo text-xl font-semibold hover:text-gray-300"
            >
              🎬 Cinema Time
            </Link>
          </h1>

          <div className="hidden md:flex space-x-6 items-center">
            {isLoggedIn ? (
              <>
                <Link to="/events" className="hover:text-gray-300 transition">
                  Events
                </Link>
                <Link to="/filmlist" className="hover:text-gray-300 transition">
                  Films
                </Link>
				<Link to="/about" className="hover:text-gray-300 transition">
                 About
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                >
                  Logout
                </button>

                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 cursor-pointer select-none"
                  >
                    <img
                      src={user?.avatar || placeholderImage}
                      alt={user?.name || "User"}
                      className="w-8 h-8 rounded-full object-cover border border-gray-500"
                    />
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded shadow-lg z-10">
                      <Link
                        to="/users/my-profile"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/users"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Friends
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 rounded transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-3 space-y-2 bg-gray-800">
          {isLoggedIn ? (
            <>
              <Link
                to="/events"
                className="block text-white hover:text-gray-300"
              >
                Events
              </Link>
              <Link
                to="/filmlist"
                className="block text-white hover:text-gray-300"
              >
                Films
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
              >
                Logout
              </button>
              <div className="flex items-center space-x-2 pt-2">
                <img
                  src={user?.avatar || placeholderImage}
                  alt={user?.name || "User"}
                  className="w-8 h-8 rounded-full object-cover border border-gray-500"
                />
                <span className="text-sm font-medium text-white">
                  {user?.name}
                </span>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="block border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-2 rounded"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
