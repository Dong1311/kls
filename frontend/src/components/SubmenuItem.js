import React from 'react';
import { Link } from 'react-router-dom';

const SubmenuItem = ({ to, text }) => {
  return (
    <li className="submenu-item">
      <Link to={to} className="submenu-link">
        {text}
      </Link>
    </li>
  );
};

export default SubmenuItem;
