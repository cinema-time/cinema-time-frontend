import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleLogout = () => {
    logOutUser();
    navigate("/login");  // Redirect to login page after logging out
  };

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/events">
            <button>Events</button>
          </Link>
          <Link to="/filmlist">
            <button>Films</button>
          </Link>

          <button onClick={handleLogout}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
