import React, { useState } from 'react';
import axios from 'axios';

export const TodoForm = ({fetchTodos}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTodos();

    if (value) {
      const taskId = localStorage.getItem('taskId');
      const subtask = {
        name: value,
        task: taskId
      };
      fetchTodos();
      axios.post(`http://localhost:2000/subtasks/addSubTask`,subtask);
      fetchTodos();
      setValue('');

      

    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="What is the sub task today?"
      />
      <button type="submit" className="todo-btn">Add Sub Task</button>
    </form>
  );
};

