
import React from 'react';
import "./GetStarted.css";
import imgTask from "../assets/hello.png";
const GetStarted = () => {

  return (
   <div className='centerAll'>
    <div className='text_'>
        <p className='titleTask'> Communicate With The Team</p>
<p className='p1'>The team members can communicate quickly to resolve code problems,
 discuss features and improvements to be made, and share ideas. 
 This helps to avoid delays in the project
 and ensures that everyone is working towards the same goals.</p>
    </div>
    <div>
    </div>
    <img style={{height:450}} src={imgTask}/>

   </div>
  )}
  export default GetStarted;