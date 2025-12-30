import { useState } from "react";
import { apiFetch } from "../api/apiFetch";

function CreateTask({ workspaceId, onCreated }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hard guards (prevent all known crashes)
    if (!title.trim()) return;
    if (!workspaceId) return;

    setLoading(true);

    try {
      const data = await apiFetch(`/workspaces/${workspaceId}/tasks`, {
        method: "POST",
        body: JSON.stringify({ title }),
      });

      // Normalize backend response (defensive boundary)
      const task = data.createdTask || data.task || data;

      if (!task) return;

      setTitle("");
      onCreated(task);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button disabled={loading}>{loading ? "adding..." : "add"}</button>
    </form>
  );
}

export default CreateTask;
