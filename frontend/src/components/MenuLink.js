import React from 'react';
import arrowIcon from '../assets/images/next.png'
const MenuLink = ({ icon, title, toggleMenu, isOpen, children }) => {
  return (
    <li className="menu-item">
      <div onClick={toggleMenu} className="menu-link">
        <img src={icon} alt={title} className="icon" />
        <span className="menu-text">{title}</span>
        <img
          src={arrowIcon} 
          alt="arrow"
          className={`arrow-icon ${isOpen ? 'rotate-arrow' : ''}`}
        />
      </div>
      {isOpen && (
        <ul className="submenu">
          {children}
        </ul>
      )}
    </li>
  );
};

export default MenuLink;
