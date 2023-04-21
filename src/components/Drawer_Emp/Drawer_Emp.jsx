import Form from "./Form";
import React, { useState } from 'react';
import './Drawer_Emp.css';
import { Button } from 'antd';

import {CloseOutlined} from "@ant-design/icons";
function Drawer_Emp({isOpen,setIsOpen}) {
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <>
    <div className={isOpen ? "overlay": ""} onClick={()=> setIsOpen(false)}></div>
    <div className={ isOpen ? "drawer-wrapper" : "hide-drawer"} >
     
    <button className="btn_close" type="primary" onClick={()=> setIsOpen(false)}> <CloseOutlined /></button>
        <Form/>
     
    </div>
    </>
  );
}

export default Drawer_Emp;