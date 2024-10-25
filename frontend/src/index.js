import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';  
import AuthProvider from './context/AuthContext'; 
import { UserProvider } from './context/UserContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> 
      <UserProvider> 
        <Router>  
          <App />
        </Router>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
