import "../../styles/sidebar.css";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTasks, faCheck ,faUsers, faArchive, faHistory} from '@fortawesome/free-solid-svg-icons';
import img from "../../images/dd.jpg";

function Sidebar() {
  return (
    <div className="sidebar-container">
      
    <nav className="sidebar">
    <div className="sidebar-logo">
        <img src={img} alt="Logo" />
      </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item active">
            <a href="/" className="sidebar-link">
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span className="sidebar-text">Dashboard</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="/" className="sidebar-link">
              <FontAwesomeIcon icon={faTasks} />
              <span className="sidebar-text">Manage Projects</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="/" className="sidebar-link">
              <FontAwesomeIcon icon={faCheck} />
              <span className="sidebar-text">Check Projects</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="/" className="sidebar-link">
              <FontAwesomeIcon icon={faUsers} />
              <span className="sidebar-text">Employee</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="/" className="sidebar-link">
              <FontAwesomeIcon icon={faUsers} />
              <span className="sidebar-text">Teams</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="/" className="sidebar-link">
              <FontAwesomeIcon icon={faTasks} />
              <span className="sidebar-text">Tasks</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="/" className="sidebar-link">
              <FontAwesomeIcon icon={faArchive} />
              <span className="sidebar-text">Explore Archive</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="/" className="sidebar-link">
              <FontAwesomeIcon icon={faHistory} />
              <span className="sidebar-text">Check History</span>
            </a>
          </li>
        </ul>
      </nav>
      </div>
  );
}

export default Sidebar;
