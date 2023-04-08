import React, { useState } from 'react';
import './drawer.css';

function Drawer({toggleDrawer,isOpen,setIsOpen}) {
  

  return (
    <>
    <div className={isOpen ? "overlay": ""} onClick={()=> setIsOpen(false)}></div>
    <div className={ isOpen ? "drawer-wrapper" : "hide-drawer"} >
    <p>drawer mon amie </p>
    </div>
    </>
  );
}

export default Drawer;