import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';

function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then((res) => setList(res.data))
      .catch((err) => console.log('Error fetching tasks:', err));
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const addingTasks = (e) => {
    e.preventDefault();
    const newTask = { task: input };

    axios.post('http://localhost:5000/api/tasks', newTask)
      .then((res) => {
        setList([...list, res.data]);
        setInput('');
      })
      .catch((err) => console.error('Error adding task:', err.message));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => setList(list.filter((task) => task._id !== id)))
      .catch((err) => console.log('Error deleting task:', err));
  };

  const handleEdit = (id, newTask) => {
    const updatedTask = { task: newTask };

    axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask)
      .then((res) => {
        setList(list.map((task) => (task._id === id ? res.data : task)));
      })
      .catch((err) => console.log('Error updating task:', err));
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#f4f4f4', padding: '20px' }}>
      <h1 style={{ color: '#333' }}>Todo Application</h1>
      <form onSubmit={addingTasks}>
        <input
          style={{ padding: '10px', width: '200px' }}
          value={input}
          placeholder="Enter a task"
          type="text"
          onChange={handleInput}
        />
        <button style={{ padding: '10px', marginLeft: '10px', backgroundColor: '#28a745', color: 'white' }} type="submit">Add Task</button>
      </form>
      <h2 style={{ color: '#666' }}>Added Tasks</h2>
      <TaskList
        list={list}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
