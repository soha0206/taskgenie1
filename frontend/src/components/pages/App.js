import React, { useState } from 'react';
import './App.css';
import TaskInputForm from './components/TaskInputForm'; // Import your TaskInputForm component

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="App">
      <h1>Task Management</h1>
      <TaskInputForm onSubmit={handleAddTask} />
      <div className="task-list">
        <h2>Task List</h2>
        {tasks.map((task, index) => (
          <div key={index} className="task">
            <h3>{task.taskTitle}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
