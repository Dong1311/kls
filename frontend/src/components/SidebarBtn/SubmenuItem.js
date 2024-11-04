import React from 'react';
import { NavLink } from 'react-router-dom';
import './SubmenuItem.css';

const SubmenuItem = ({ to, text }) => (
  <li className="submenu-item">
    <NavLink 
      to={to} 
      className={({ isActive }) => `submenu-link ${isActive ? 'active' : ''}`} 
    >
      {text}
    </NavLink>
  </li>
);

export default SubmenuItem;
