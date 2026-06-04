function TodoItem({
  item,
  deleteTask,
  toggleComplete,
  editTask,
}) {
  return (
    <div className="task-card">
      <h3
        className={
          item.completed ? "completed" : ""
        }
      >
        {item.text}
      </h3>

      <div className="task-buttons">
        <button
          className="complete-btn"
          onClick={() =>
            toggleComplete(item.id)
          }
        >
          {item.completed
            ? "Completed"
            : "Complete"}
        </button>

        <button
          className="edit-btn"
          onClick={() => editTask(item)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() =>
            deleteTask(item.id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;