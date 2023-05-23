import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
export const Todo = ({task, deleteTodo, editTodo, toggleComplete}) => {
 
  return (
    <div className="Todo">
        <p className={`${task.completed ? 'yes' : ""}`} onClick={() => toggleComplete(task._id)}>{task.name}</p>
        <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task._id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task._id)} />
        </div>
    </div>
  )
}