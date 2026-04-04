import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";
import "./Login.css";
function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await loginUser({ identifier, password });

    const user = res.data.user;

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    setError("Invalid email/name or password");
  }
};
  return (
  <div className="login-container">
    <div className="login-card">
      <h2 className="login-title">🐾 Welcome Back</h2>
      <p className="login-subtitle">Login to your VetNest account</p>

      {error && <div className="login-error">{error}</div>}

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="login-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />

        <button type="submit" className="login-button">
          Login 
        </button>
      </form>

      <p className="login-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  </div>
);
}
export default Login;