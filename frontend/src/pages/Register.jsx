import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // 🔥 مهم

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ name, email, password, role });

      alert("Account created");
      navigate("/login");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Register failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      {/* 🔥 ROLE SELECT */}
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="user">Patient Owner</option>
        <option value="doctor">Doctor</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;