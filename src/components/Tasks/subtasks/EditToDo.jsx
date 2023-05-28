import React, { useState,useEffect } from 'react';
import axios from 'axios';

export const EditTodo = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.name);
  const taskId = localStorage.getItem('taskId');
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/subtasks/${taskId}`);
      setTodos(response.data.subTask);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:2000/subtasks/${task._id}`, { name: value });
      editTodo(value, task._id);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};


