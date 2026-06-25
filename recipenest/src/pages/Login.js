import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Please enter username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5269/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password,
          fullName: ""
        })
      });

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        setMessage("Login successful");
        navigate("/dashboard");
      } else {
        setMessage("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  return (
    <div className="container">
      <h1>Chef Login</h1>

      <div className="card" style={{ margin: "auto" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" onClick={handleLogin}>
          Login
        </button>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default Login;