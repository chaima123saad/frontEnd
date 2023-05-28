import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  const handleToggleComplete = () => {
    toggleComplete(task._id);
  };

  return (
    <div className={`Todo ${task.completed ? 'completed' : ''}`}>
      <p onClick={handleToggleComplete}>{task.name}</p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task._id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task._id)} />
      </div>
    </div>
  );
};
