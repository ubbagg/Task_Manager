// frontend/src/components/TaskList.js
import React, { useState } from 'react';

function TaskList({ tasks, onTaskUpdate, setEditTask }) {
  const [deleteError, setDeleteError] = useState('');

  const handleDelete = async (id) => {
    try {
      console.log('Attempting to delete task:', id); // Debug log
      
      const response = await fetch(`http://localhost:5001/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete task');
      }

      console.log('Task deleted successfully'); // Debug log
      onTaskUpdate(); // Refresh the task list
      setDeleteError('');
    } catch (error) {
      console.error('Error deleting task:', error);
      setDeleteError(`Failed to delete task: ${error.message}`);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const response = await fetch(`http://localhost:5001/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          isCompleted: !task.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      onTaskUpdate();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="task-list">
      {deleteError && (
        <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
          {deleteError}
        </div>
      )}
      
      {tasks.map((task) => (
        <div key={task._id} className="task-item">
          <div className="task-content">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleToggleComplete(task)}
              className="task-checkbox"
            />
            <div className={`task-text ${task.isCompleted ? 'completed' : ''}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
          </div>
          <div className="task-actions">
            <button 
              onClick={() => setEditTask(task)}
              className="edit-button"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDelete(task._id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;