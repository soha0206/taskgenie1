// src/App.js
import React from 'react';
import TaskInputForm from './components/TaskInputForm';

const App = () => {
  const handleAddTask = (taskData) => {
    console.log('New Task Added:', taskData);
    // Add logic to save tasks to state or database
  };

  return (
    <div>
      <h1>TaskGenie</h1>
      <TaskInputForm onSubmit={handleAddTask} />
    </div>
  );
};

export default App;
