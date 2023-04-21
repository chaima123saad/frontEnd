import React, { useState } from 'react';
import './drawer.css';

function Drawer({toggleDrawer,isOpen,setIsOpen}) {
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
    </div>
    </>
  );
}

export default Drawer;