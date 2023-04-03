import React from 'react';
import './drawer.css';

const RightDrawer = ({ isOpen, setIsOpen, children }) => {


  return (
    <div className={`right-drawer ${isOpen ? 'open' : ''}`}>
      {/* <div className="overlay" onClick={setIsOpen(false)} /> */}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default RightDrawer;



