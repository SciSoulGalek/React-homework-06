import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header">
      <NavLink to="/" className="logo">
        <span className="logo-mark">Q</span>
        QUESTLOG
      </NavLink>

      <nav className="navigation">
        <NavLink to="/" end className="nav-link">Home</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        <NavLink to="/games" className="nav-link">Games</NavLink>
        <NavLink to="/library" className="nav-link">Library</NavLink>
        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>

        {!loading && (
          user ? (
            <>
              <NavLink to="/profile" className="nav-link">Profile</NavLink>
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/signup" className="nav-link">Signup</NavLink>
            </>
          )
        )}
      </nav>
    </header>
  );
}
