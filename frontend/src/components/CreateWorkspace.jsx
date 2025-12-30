import { useState } from "react";
import { apiFetch } from "../api/apiFetch";

function CreateWorkspace({ onCreated }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const data = await apiFetch("/workspaces", {
        method: "POST",
        body: JSON.stringify({ name }),
      });

      setName("");
      onCreated(data.createdWorkspace);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="new workspace"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button disabled={loading}>{loading ? "creating..." : "create"}</button>
    </form>
  );
}

export default CreateWorkspace;
