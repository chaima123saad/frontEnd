import React from 'react';
import { Link } from 'react-router-dom';
import "./actionLink.css";


const ActionLink = ({ label, icon, className, url, onClickAction }) => {
  return (
    <Link
      to={url || '#'}
      className={`action-link${className != null ? ` ${className}` : ''}`}
      onClick={onClickAction}
    >
      <div className="user__options">
        {icon && <span className="material-icons">{icon}</span>}
        <span>{label}</span>
      </div>
    </Link>
  );
};

ActionLink.propTypes = {};

export default ActionLink;
