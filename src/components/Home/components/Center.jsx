import React from 'react';
import "./center.css";
import imgTask from "../assets/task.png";
const GetStarted = () => {

  return (
   <div className='centerAll'>
    <img style={{height:450}} src={imgTask}/>
    <div className='text_'>
        <p className='titleTask'>Manage your project to be more organized</p>
<p className='p1'>Whether you are managing your next big project or digitizing task
     management for your team's daily activities, you need to know who is
      doing what and when. Our web application helps you manage tasks in a 
      beautiful customizable
     environment that perfectly adapts to your needs</p>
    </div>
    <div>
        <img />
    </div>
   </div>
  )}
  export default GetStarted;