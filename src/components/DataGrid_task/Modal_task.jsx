import React from 'react';
import {} from "@ant-design/icons"; 
import "./Modal_task.css";
import SubTask from './SubTask';
const Modal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer card_'
      >
        <div className="card-top">
        <p className='todo'>To Do</p>
        <p className='closeBtn' onClick={onClose}>
            X
          </p>
      </div>   
      <div className="card-header_">
        <h2 className="card-title_">Task Name</h2>
  
      </div>
      <div className="card-subheader_">
        <p className="card-date_">JJ/MM/YYYY</p>
      </div>
      <div className="card-content_">       
        <SubTask/>
      </div>

        </div>
        </div>
   
  );
};

export default Modal;