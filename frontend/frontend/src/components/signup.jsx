import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const mockSignup = async (email, password, role) => {
  // Simulate successful signup response
  try {
    const response = await axios.post("https://finovaracore-2.onrender.com/api/auth/signup", {
      username: email,
      password,
      role,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await mockSignup(email, password, role);
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.user.role);

      if (res.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (res.user.role === "retailer") {
        navigate("/retailer-dashboard");
      }
      else if (res.user.role === "user") {
        navigate("/user-dashboard");
      }
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="retailer">Retailer</option>
        </select>
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
