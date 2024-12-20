import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5001/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm 
        editTask={editTask}
        setEditTask={setEditTask}
        onTaskUpdate={fetchTasks}
      />
      <TaskList 
        tasks={tasks}
        onTaskUpdate={fetchTasks}
        setEditTask={setEditTask}
      />
    </div>
  );
}

export default App;