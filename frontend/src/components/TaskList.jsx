function TaskList({ tasks = [] }) {
  if (tasks.length === 0) {
    return <p className="muted">no tasks yet</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>{task.title}</li>
      ))}
    </ul>
  );
}

export default TaskList;
