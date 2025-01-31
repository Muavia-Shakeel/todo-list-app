import React, { useState } from "react";
import TaskForm from "../components/TaskForm";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    // Simulate adding a task locally for now
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h1>To-Do List App</h1>
      <TaskForm addTask={addTask} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
