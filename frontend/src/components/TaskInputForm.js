import React, { useState } from 'react';
import axios from 'axios';
import '../styles/TaskInputForm.css';

const TaskInputForm = ({ onSubmit }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState({
    taskTitle: '',
    description: '',
    general: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Event handler for task title input change
  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  // Event handler for description input change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Event handler for due date input change
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  // Event handler for priority select change
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  // Function to sanitize the input data (basic sanitization)
  const sanitizeInput = (input) => {
    return input.trim(); // Remove extra spaces and trim the input
  };

  // Form submission logic with validation and sanitization
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Sanitize input data
    const sanitizedTaskTitle = sanitizeInput(taskTitle);
    const sanitizedDescription = sanitizeInput(description);

    let valid = true;
    let errors = {
      taskTitle: '',
      description: '',
      general: '',
    };

    // Validation checks after sanitization
    if (!sanitizedTaskTitle) {
      errors.taskTitle = 'Task title is required.';
      valid = false;
    }
    if (!sanitizedDescription) {
      errors.description = 'Description is required.';
      valid = false;
    }

    // If form is valid, submit the data to the backend API
    if (valid) {
      setIsLoading(true); // Set loading to true when API call starts
      try {
        // Send POST request to the backend API
        const response = await axios.post('http://localhost:5000/api/tasks', {
          taskTitle: sanitizedTaskTitle,
          description: sanitizedDescription,
          dueDate,
          priority,
        });

        // Handle successful response
        setTaskTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Medium');
        setError({ taskTitle: '', description: '', general: '' });
        setSuccessMessage('Task successfully added!');
      } catch (error) {
        // Handle error response
        setError({ general: 'Failed to create task. Please try again.' });
        setSuccessMessage('');
      } finally {
        setIsLoading(false); // Set loading to false when API call completes
      }
    } else {
      // If there are validation errors, set them
      setError(errors);
      setSuccessMessage('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>

      {/* Display success message if task is added successfully */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Task Title */}
      <label>Task Title*</label>
      <input
        type="text"
        value={taskTitle}
        onChange={handleTaskTitleChange}
        placeholder="Enter task title"
        required
        title="Enter the title for the task (e.g., 'Finish report')"
      />
      {error.taskTitle && <div className="error">{error.taskTitle}</div>}

      {/* Description */}
      <label>Description*</label>
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter task description"
        required
        title="Provide a brief description of the task (e.g., 'Complete the project report')"
      ></textarea>
      {error.description && <div className="error">{error.description}</div>}

      {/* Due Date */}
      <label>Due Date</label>
      <input
        type="date"
        value={dueDate}
        onChange={handleDueDateChange}
        title="Select the due date for the task"
      />

      {/* Priority */}
      <label>Priority</label>
      <select
        value={priority}
        onChange={handlePriorityChange}
        title="Select the priority of the task"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* General Error Message */}
      {error.general && <div className="error-message">{error.general}</div>}

      {/* Display loading indicator when API is in progress */}
      {isLoading ? <div className="loading-indicator">Loading...</div> : null}

      {/* Submit Button */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding Task...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskInputForm;
