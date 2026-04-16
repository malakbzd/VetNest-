import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import "./Register.css";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // ✅ declare function before using it
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      await registerUser({ name, email, password });
      alert("Account created ✅");
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Register failed");
    }
  };

 return (
  <div className="register-container">
    <div className="register-card">
      <h2 className="register-title">📝 Create Account</h2>
      <p className="register-subtitle">Join VetNest and care for your pets 🐶</p>

      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register-input"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />

        <button type="submit" className="register-button">
          Register 
        </button>
      </form>

      <p className="register-link">
        Already have an account? <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  </div>
);
};

export default Register;