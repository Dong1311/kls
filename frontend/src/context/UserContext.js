import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setName] = useState(localStorage.getItem('name') || ''); // Chỉ quản lý 'name'

  const updateName = (newName) => {
    setName(newName);
    localStorage.setItem('name', newName); // Lưu vào localStorage
  };

  return (
    <UserContext.Provider value={{ name, updateName }}>
      {children}
    </UserContext.Provider>
  );
};
