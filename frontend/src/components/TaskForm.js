import React, { useState, useEffect } from 'react';

function TaskForm({ editTask, setEditTask, onTaskUpdate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    
    const taskData = { title, description };
    const url = editTask 
      ? `http://localhost:5001/tasks/${editTask._id}`
      : 'http://localhost:5001/tasks';
    
    try {
      console.log('Submitting task:', taskData); // Debug log
      
      const response = await fetch(url, {
        method: editTask ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save task');
      }

      const result = await response.json();
      console.log('Server response:', result); // Debug log
      
      setTitle('');
      setDescription('');
      setEditTask(null);
      onTaskUpdate();
    } catch (error) {
      console.error('Error saving task:', error);
      setError(error.message || 'Failed to save task. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="form-input"
      />
      
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="form-textarea"
      />
      
      <button type="submit" className="submit-button">
        {editTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;