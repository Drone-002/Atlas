import { useEffect, useState } from "react";
import { apiFetch } from "../api/apiFetch";

import WorkspaceList from "../components/WorkspaceList";
import CreateWorkspace from "../components/CreateWorkspace";
import TaskList from "../components/TaskList";
import CreateTask from "../components/CreateTask";

function Dashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch workspaces on mount
  useEffect(() => {
    async function fetchWorkspaces() {
      const data = await apiFetch("/workspaces");
      setWorkspaces(data.workspaces);
      setLoading(false);
    }

    fetchWorkspaces();
  }, []);

  // Fetch tasks when a workspace is selected
  useEffect(() => {
    if (!selected) return;

    async function fetchTasks() {
      const data = await apiFetch(`/workspaces/${selected._id}/tasks`);
      setTasks(data.tasks);
    }

    fetchTasks();
  }, [selected]);

  const handleWorkspaceCreated = (workspace) => {
    setWorkspaces((prev) => [...prev, workspace]);
  };

  const handleTaskCreated = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  if (loading) {
    return <p className="muted">loading...</p>;
  }

  return (
    <div>
      <CreateWorkspace onCreated={handleWorkspaceCreated} />
      <hr />
      <h2>workspaces</h2>

      <WorkspaceList workspaces={workspaces} onSelect={setSelected} />

      {selected && (
        <>
          <h2>{selected.name}</h2>

          <CreateTask
            workspaceId={selected._id}
            onCreated={handleTaskCreated}
          />

          <TaskList tasks={tasks} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
