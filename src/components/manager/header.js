import "../../styles/header.css";
import React from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
 <div>
  <header className="header">
  <div className="header-search">
  <input type="text" placeholder="Search projects" />
   </div>
  <div className="header-user">
    <img
      src="https://i.pravatar.cc/50"
      alt="Avatar"
      className="header-avatar"
    />
    <div className="header-user-details">
      <h3 className="header-name">John Doe</h3>
      <span className="header-specialty">Project Manager</span>
    </div>
  </div>
</header>
</div>
 );
}

export default Header;