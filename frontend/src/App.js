import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom'; 
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';

import KeHoachThuThap from './pages/KeHoachThuThap/LapKeHoachThuThap/LapKeHoachThuThap';
import AddKeHoachThuThap from './pages/KeHoachThuThap/LapKeHoachThuThap/AddKeHoachThuThap'; 
import ChiTietKeHoachThuThap from './pages/KeHoachThuThap/LapKeHoachThuThap/ChiTietKeHoachThuThap';  

import DuyetKeHoachThuThap from './pages/KeHoachThuThap/DuyetKeHoachThuThap/DuyetKeHoachThuThap';
import ChiTietKeHoachThuThapDaTrinhDuyet from './pages/KeHoachThuThap/DuyetKeHoachThuThap/ChiTietKeHoachThuThapDaTrinhDuyet';

import DanhSachKeHoachDaDuyet from './pages/KeHoachThuThap/DanhSachKeHoachDaDuyet/DanhSachKeHoachDaDuyet'
import ChiTietKeHoachDaDuyet from './pages/KeHoachThuThap/DanhSachKeHoachDaDuyet/ChiTietKeHoachDaDuyet'
import AddHoSoToKeHoach from './pages/KeHoachThuThap/DanhSachKeHoachDaDuyet/AddHoSoToKeHoach';
import ChiTietHoSo from './pages/KeHoachThuThap/DanhSachKeHoachDaDuyet/ChiTietHoSo';
import AddTaiLieuToHoSo from './pages/KeHoachThuThap/DanhSachKeHoachDaDuyet/AddTaiLieuToHoSo';
import ChiTietTaiLieu from './pages/KeHoachThuThap/DanhSachKeHoachDaDuyet/ChiTietTaiLieu';

import DanhSachHoSo from './pages/KeHoachThuThap/QuanLyHoSo/DanhSachHoSo';
import AddHoSo from './pages/KeHoachThuThap/QuanLyHoSo/AddHoSo';

import DanhSachTaiLieu from './pages/KeHoachThuThap/QuanLyTaiLieu/DanhSachTaiLieu';
import AddTaiLieu from './pages/KeHoachThuThap/QuanLyTaiLieu/AddTaiLieu';

import DanhSachHoSoDaTrinhDuyet from './pages/KeHoachThuThap/DuyetVaGuiHoSoNopLuu/DanhSachHoSoDaTrinhDuyet';
import ChiTietHoSoDaTrinhDuyet from './pages/KeHoachThuThap/DuyetVaGuiHoSoNopLuu/ChiTietHoSoDaTrinhDuyet';
import ChiTietTaiLieuDaTrinhDuyet from './pages/KeHoachThuThap/DuyetVaGuiHoSoNopLuu/ChiTietTaiLieuDaTrinhDuyet';

import DanhSachHoSoDaTrinhNLLS from './pages/KeHoachThuThap/DanhSachHoSoDaNopLuu/DanhSachHoSoDaTrinhNLLS';
import ChiTietHoSoDaTrinhNLLS from './pages/KeHoachThuThap/DanhSachHoSoDaNopLuu/ChiTietHoSoDaTrinhNLLS';
import ChiTietTaiLieuDaTrinhNLLS from './pages/KeHoachThuThap/DanhSachHoSoDaNopLuu/ChiTietTaiLieuDaTrinhNLLS';

import DanhSachHoSoTuChoiNLLS from './pages/KeHoachThuThap/TiepNhanHoSoTraLai/DanhSachHoSoTuChoiNLLS';
import ChiTietHoSoTuChoiNLLS from './pages/KeHoachThuThap/TiepNhanHoSoTraLai/ChiTietHoSoTuChoiNLLS';
import ChiTietTaiLieuTuChoiNLLS from './pages/KeHoachThuThap/TiepNhanHoSoTraLai/ChiTietTaiLieuTuChoiNLLS';
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
                      <Route path="/ke-hoach-thu-thap/:id/" element={<ChiTietKeHoachThuThap />} />
                      <Route path="/ke-hoach-thu-thap/add" element={<AddKeHoachThuThap />} />

                      <Route path="/duyet-ke-hoach-thu-thap" element={<DuyetKeHoachThuThap />} />
                      <Route path="ke-hoach-thu-thap-da-trinh-duyet/:id" element={<ChiTietKeHoachThuThapDaTrinhDuyet/>}/>

                      <Route path="/danh-sach-ke-hoach-da-duyet" element={<DanhSachKeHoachDaDuyet />} />
                      <Route path="chi-tiet-danh-sach-ke-hoach-da-duyet/:id" element={<ChiTietKeHoachDaDuyet/>} />
                      <Route path="ke-hoach-thu-thap/:id/them-moi-ho-so" element={<AddHoSoToKeHoach />} />
                      <Route path="/ho-so/:id" element={<ChiTietHoSo />} />

                      <Route path="/ho-so/:id/add-tai-lieu" element={<AddTaiLieuToHoSo />} />
                      <Route path="/tai-lieu/:taiLieuId" element={<ChiTietTaiLieu />} />

                      <Route path="/quan-ly-ho-so" element={<DanhSachHoSo />} />
                      <Route path="/ho-so/add" element={<AddHoSo />} />

                      <Route path="/quan-ly-tai-lieu" element={<DanhSachTaiLieu />} />
                      <Route path="/tai-lieu/add" element={<AddTaiLieu />} />

                      <Route path='danh-sach-ho-so-da-trinh-duyet' element={<DanhSachHoSoDaTrinhDuyet/>} />
                      <Route path="/ho-so-da-trinh-duyet/:id" element={<ChiTietHoSoDaTrinhDuyet />} />
                      <Route path="/ho-so-da-trinh-duyet/:hoSoId/tai-lieu/:taiLieuId" element={<ChiTietTaiLieuDaTrinhDuyet />} />

                      <Route path='danh-sach-ho-so-da-trinh-nlls' element={<DanhSachHoSoDaTrinhNLLS/>} />
                      <Route path="/ho-so-da-trinh-nlls/:id" element={<ChiTietHoSoDaTrinhNLLS />} />
                      <Route path="/ho-so-da-trinh-nlls/:hoSoId/tai-lieu/:taiLieuId" element={<ChiTietTaiLieuDaTrinhNLLS />} />

                      <Route path='danh-sach-ho-so-tu-choi-nlls' element={<DanhSachHoSoTuChoiNLLS/>} />
                      <Route path="/ho-so-tu-choi-nlls/:id" element={<ChiTietHoSoTuChoiNLLS />} />
                      <Route path="/ho-so-tu-choi-nlls/:hoSoId/tai-lieu/:taiLieuId" element={<ChiTietTaiLieuTuChoiNLLS />} />




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
