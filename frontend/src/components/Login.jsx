import { useState } from "react";
import { apiFetch } from "../api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.prventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await apiFetch("/auth/Login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token, data.token");
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
    </form>
  );
}

export default Login;
