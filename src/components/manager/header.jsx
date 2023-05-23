import "../../styles/header.css";
import React from 'react';
import MenuDropdown from "../MenuDropDown/MenuDropdown";
import {SearchOutlined} from "@ant-design/icons";
function Header() {
  return (
    <header className="header">
      <div className="header__search">
      <SearchOutlined className="icon1"/>
        <input type="text" placeholder="Search" />
      </div>
   <div className="header__dropdown">
    <MenuDropdown />
    </div>
    </header>
  );
}

export default Header;
