import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom'; 
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import KeHoachThuThap from './pages/KeHoachThuThap/LapKeHoachThuThap';
import DuyetKeHoachThuThap from './pages/KeHoachThuThap/DuyetKeHoachThuThap';
import ChiTietKeHoachThuThap from './pages/KeHoachThuThap/ChiTietKeHoachThuThap';  
import AddKeHoachThuThap from './pages/KeHoachThuThap/AddKeHoachThuThap'; 

function App() {
  // Kiểm tra trạng thái đăng nhập từ localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true'); 
  const location = useLocation();

  useEffect(() => {
    // Mỗi khi đăng nhập thành công, lưu trạng thái vào localStorage
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  if (!isLoggedIn && location.pathname !== '/login') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />

        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1">
                  <Header />
                  <div className="content">
                    <Routes> 
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/lap-ke-hoach-thu-thap" element={<KeHoachThuThap />} />
                      <Route path="/duyet-ke-hoach-thu-thap" element={<DuyetKeHoachThuThap />} />
                      <Route path="/ke-hoach-thu-thap/:id" element={<ChiTietKeHoachThuThap />} />
                      <Route path="/ke-hoach-thu-thap/add" element={<AddKeHoachThuThap />} />
                    </Routes>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
