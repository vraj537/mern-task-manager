import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;
    await axios.post(API, { title, description: desc });
    setTitle('');
    setDesc('');
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(`${API}/${task._id}`, { completed: !task.completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="form">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTask(task)}>{task.title}</span>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
