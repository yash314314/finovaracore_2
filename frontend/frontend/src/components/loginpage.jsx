import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockLogin = async (email, password) => {
  if (email === "admin@site.com" && password === "admin123") {
    return { role: "admin", token: "admin-token" };
  }
  if (email === "user@site.com" && password === "user123") {
    return { role: "user", token: "user-token" };
  }
  throw new Error("Invalid credentials");
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await mockLogin(email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      if (res.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Login
        </button>
      </form>
    </div>
  );
}
