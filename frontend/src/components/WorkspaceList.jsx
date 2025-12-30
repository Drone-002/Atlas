function WorkspaceList({ workspaces = [], onSelect }) {
  if (workspaces.length === 0) {
    return <p className="muted">no workspaces yet</p>;
  }

  return (
    <ul>
      {workspaces.map((ws) => (
        <li key={ws._id}>
          <button onClick={() => onSelect(ws)}>{ws.name}</button>
        </li>
      ))}
    </ul>
  );
}

export default WorkspaceList;
