import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("login");

  return (
    <div>
      {mode === "login" ? (
        <>
          <Login onLogin={onAuth} />
          <p>
            No account?{" "}
            <button onClick={() => setMode("register")}>Register</button>
          </p>
        </>
      ) : (
        <>
          <Register onRegister={onAuth} />
          <p>
            Already have an account?{" "}
            <button onClick={() => setMode("login")}>Login</button>
          </p>
        </>
      )}
    </div>
  );
}

export default AuthPage;
