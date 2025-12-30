import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/DashBoard";

function App() {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const handleAuth = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="app">
      <h1>Atlas</h1>

      {token ? (
        <>
          <button onClick={handleLogout} className="muted">
            logout
          </button>
          <Dashboard />
        </>
      ) : (
        <AuthPage onAuth={handleAuth} />
      )}
    </div>
  );
}

export default App;
