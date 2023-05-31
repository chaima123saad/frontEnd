import "../../styles/header.css";
import React from 'react';
import MenuDropdown from "../MenuDropDown/MenuDropdown";
function Header() {
  return (
    <header className="header">
     
   <div className="header__dropdown">
    <MenuDropdown />
    </div>
    </header>
  );
}

export default Header;
