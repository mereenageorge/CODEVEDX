import { useState, useEffect } from "react";
import "./app.css";

import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import FilterButtons from "./components/FilterButtons";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    if (editId) {
      const updatedTasks = tasks.map((item) =>
        item.id === editId
          ? { ...item, text: task }
          : item
      );

      setTasks(updatedTasks);
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: task,
        completed: false,
      };

      setTasks([...tasks, newTask]);
    }

    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(
      tasks.filter(
        (item) => item.id !== id
      )
    );
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  const editTask = (item) => {
    setTask(item.text);
    setEditId(item.id);
  };

  const filteredTasks = tasks.filter((item) => {
    if (filter === "completed") {
      return item.completed;
    }

    if (filter === "pending") {
      return !item.completed;
    }

    return true;
  });

  return (
    <div className={darkMode ? "dark" : "light"}>
      <div className="container">
        <h1>TaskNest ✨</h1>

        <p className="subtitle">
          Organize your tasks and stay productive ✨
        </p>

        <div className="theme-toggle">
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}
          </button>
        </div>

        <TodoForm
          task={task}
          setTask={setTask}
          addTask={addTask}
        />

        <FilterButtons
          setFilter={setFilter}
        />

        <p className="task-count">
          Total Tasks: {tasks.length}
        </p>

        {filteredTasks.length === 0 ? (
          <p className="empty">
            No tasks found 🚀
          </p>
        ) : (
          <div className="task-list">
            {filteredTasks.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                deleteTask={deleteTask}
                toggleComplete={
                  toggleComplete
                }
                editTask={editTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;