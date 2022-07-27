import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [newTask, setNewTask] = useState({});
  const [allTasks, setAllTasks] = useState([]);

  const handleChange = event => {
    const { name, value } = event.target;
    setNewTask(prev => ({ ...prev, [name]: value, id: Date.now() }));
    console.log(newTask);
  };

  const handleSubmit = event => {
    console.log('submitted');
    event.preventDefault();
    if (!newTask.title) return;
    setAllTasks(prev => [...prev, newTask]);
    setNewTask({});
  };

  const handleDelete = id => {
    setAllTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className='body-container'>
      <h1>Tasks</h1>
      <div className='task-container'>
        <form onSubmit={handleSubmit}>
          <div className='add-task-container'>
            <input
              name='title'
              className='input-bar'
              placeholder='Add New Task'
              value={newTask.title || ''}
              onChange={handleChange}
            />
          </div>

          {!newTask.title ? null : (
            <textarea
              name='description'
              placeholder='Details...'
              value={newTask.description || ''}
              onChange={handleChange}
            />
          )}
          <button type='submit' className='add-button'>
            Add Task
          </button>
        </form>
      </div>

      <div>
        <ul>
          {allTasks.map(({ title, description, id }) => (
            <li className='task-list' key={id}>
              <div onClick={() => handleDelete(id)}>
                <h2>{title}</h2>
              </div>
              {!description ? null : <p>{description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
