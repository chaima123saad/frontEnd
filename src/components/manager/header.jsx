import "../../styles/header.css";
import React from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faSearch } from '@fortawesome/free-solid-svg-icons';



function Header() {
  return (
    <header className="header">
      <div className="header__search">
        <input type="text" placeholder="Search" />
        <i className="fa fa-search"></i>
      </div>
   <div className="header__dropdown">
      <img
      src="https://i.pravatar.cc/50"
      alt="Avatar"
      className="header-avatar"
    />
    <div className="user__details">
      <h3 className="header-name">John Doe</h3>
      <p className="header-specialty"> Manager</p>
    </div>
    </div>
    </header>
  );
}

export default Header;
