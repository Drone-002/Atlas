import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div>
      <h1>Atlas</h1>

      {token ? (
        <>
          <p>Logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
