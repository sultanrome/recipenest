import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav>
      <h2>👨‍🍳 RecipeNest</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/chefs">Chefs</Link>
        <Link to="/profile">Profile</Link>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
        {isLoggedIn && (
          <button className="btn" onClick={handleLogout} style={{ padding: "8px 14px", marginTop: "0" }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;