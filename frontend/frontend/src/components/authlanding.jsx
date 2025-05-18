import { useNavigate } from "react-router-dom";

export default function AuthLandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",

      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Welcome to the Portal</h1>

      <button
        onClick={() => navigate("/login")}
        style={{
          padding: "1rem 2rem",
          marginBottom: "1rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      <button
        onClick={() => navigate("/signup")}
        style={{
          padding: "1rem 2rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Sign Up
      </button>
    </div>
  );
}
