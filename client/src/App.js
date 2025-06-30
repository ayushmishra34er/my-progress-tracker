import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from backend on mount
  useEffect(() => {
    fetch('/api/progress')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask }),
      });
      const data = await res.json();
      setTasks(prev => [...prev, data]);
      setNewTask('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Progress Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new task..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
