import { useState } from "react";
import { loginUser } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Declare before usage
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent form submission

    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);

      window.location.href = "/doctors"; // redirect
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div id="login-section" style={{ padding: "2rem" }}>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px" }}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          style={{ padding: "0.6rem", backgroundColor: "#3498db", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;