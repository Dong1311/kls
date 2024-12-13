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

import QuanLyDanhSachHoSoDaTrinhNLLS from './pages/KeHoachThuThap/QuanLyHoSoNopLuuLichSu/QuanLyDanhSachHoSoDaTrinhNLLS';
import QuanLyChiTietHoSoDaTrinhNLLS from './pages/KeHoachThuThap/QuanLyHoSoNopLuuLichSu/QuanLyChiTietHoSoDaTrinhNLLS';
import QuanLyChiTietTaiLieuDaTrinhNLLS from './pages/KeHoachThuThap/QuanLyHoSoNopLuuLichSu/QuanLyChiTietTaiLieuDaTrinhNLLS';

import DanhSachHoSoDaNhanNLLS from './pages/KeHoachThuThap/HoSoDaNhanNopLuuLichSu/DanhSachHoSoDaNhanNLLS';
import ChiTietHoSoDaNhanNLLS from './pages/KeHoachThuThap/HoSoDaNhanNopLuuLichSu/ChiTietHoSoDaNhanNLLS';
import ChiTietTaiLieuDaNhanNLLS from './pages/KeHoachThuThap/HoSoDaNhanNopLuuLichSu/ChiTietTaiLieuDaNhanNLLS';

import DanhSachBienBanBanGiao from './pages/KeHoachThuThap/QuanLyBienBanBanGiao/DanhSachBienBanBanGiao';
import AddBienBanBanGiao from './pages/KeHoachThuThap/QuanLyBienBanBanGiao/AddBienBanBanGiao';
import ChiTietBienBanBanGiao from './pages/KeHoachThuThap/QuanLyBienBanBanGiao/ChiTietBienBanBanGiao';

import DanhSachBienBanBanGiaoDaGuiDuyet from './pages/KeHoachThuThap/DuyetBienBanBanGiao/DanhSachBienBanBanGiaoDaGuiDuyet';
import ChiTietBienBanBanGiaoDaGuiDuyet from './pages/KeHoachThuThap/DuyetBienBanBanGiao/ChiTietBienBanBanGiaoDaGuiDuyet';

import DanhSachBienMucHoSo from './pages/BienMucChinhLy/BienMucHoSoTaiLieu/DanhSachBienMucHoSo';
import AddBienMucHoSo from './pages/BienMucChinhLy/BienMucHoSoTaiLieu/AddBienMucHoSo';
import ChiTietBienMucHoSo from './pages/BienMucChinhLy/BienMucHoSoTaiLieu/ChiTietBienMucHoSo';
import AddTaiLieuBienMucToHoSo from './pages/BienMucChinhLy/BienMucHoSoTaiLieu/AddTaiLieuBienMucToHoSo';

import DanhSachHoSoDaTrinhDuyetLuuKho from './pages/BienMucChinhLy/DuyetLuuKho/DanhSachHoSoDaTrinhDuyetLuuKho';
import ChiTietHoSoDaTrinhDuyetLuuKho from './pages/BienMucChinhLy/DuyetLuuKho/ChiTietHoSoDaTrinhDuyetLuuKho';

import DanhSachHoSoThuocKhoDuLieu from './pages/KhoDuLieu/TraCuuHoSo/DanhSachHoSoThuocKhoDuLieu';
import ChiTietHoSoThuocKhoDuLieu from './pages/KhoDuLieu/TraCuuHoSo/ChiTietHoSoThuocKhoDuLieu';

import DanhSachTaiLieuThuocKhoDuLieu from './pages/KhoDuLieu/TraCuuTaiLieu/DanhSachTaiLieuThuocKhoDuLieu';
import ChiTietTaiLieuThuocKhoDuLieu from './pages/KhoDuLieu/TraCuuTaiLieu/ChiTietTaiLieuThuocKhoDuLieu';

import HienTrangSoHoaKhoDuLieu from './pages/BaoCaoThongKe/HienTrangSoHoaKhoDuLieu';
import ThongKeHopCap from './pages/BaoCaoThongKe/ThongKeHopCap';
import ThongKeHSTL from './pages/BaoCaoThongKe/ThongKeHSTL';
import ThongKePhieuYCKTSD from './pages/BaoCaoThongKe/ThongKePhieuYCKTSD';

import TrangChu from './pages/TrangChu/TrangChu';
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
                      <Route path="/" element={<TrangChu />} />
                      <Route path="/trang-chu" element={<HienTrangSoHoaKhoDuLieu />} />
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

                      <Route path = "/quan-ly-danh-sach-ho-so-da-trinh-nlls" element={<QuanLyDanhSachHoSoDaTrinhNLLS/>} />
                      <Route path = "/quan-ly-chi-tiet-ho-so-da-trinh-nlls/:id" element={<QuanLyChiTietHoSoDaTrinhNLLS/>} />
                      <Route path = "/quan-ly-chi-tiet-ho-so-da-trinh-nlls/:hoSoId/tai-lieu/:taiLieuId" element={<QuanLyChiTietTaiLieuDaTrinhNLLS/>} />

                      <Route path='danh-sach-ho-so-da-nhan-nlls' element={<DanhSachHoSoDaNhanNLLS/>} />
                      <Route path="/ho-so-da-nhan-nlls/:id" element={<ChiTietHoSoDaNhanNLLS />} />
                      <Route path="/ho-so-da-nhan-nlls/:hoSoId/tai-lieu/:taiLieuId" element={<ChiTietTaiLieuDaNhanNLLS />} />

                      <Route path='/danh-sach-bien-ban-ban-giao' element={<DanhSachBienBanBanGiao/>} />
                      <Route path='/bien-ban-ban-giao/add' element={<AddBienBanBanGiao/>} />
                      <Route path='/bien-ban-ban-giao/:id' element={<ChiTietBienBanBanGiao/>} />

                      <Route path='/danh-sach-bien-ban-ban-giao-da-gui-duyet' element={<DanhSachBienBanBanGiaoDaGuiDuyet/>} />
                      <Route path='/bien-ban-ban-giao-da-gui-duyet/:id' element={<ChiTietBienBanBanGiaoDaGuiDuyet/>} />

                      <Route path='/danh-sach-bien-muc-ho-so' element={<DanhSachBienMucHoSo/>} />
                      <Route path="/bien-muc-ho-so/add" element={<AddBienMucHoSo />} />
                      <Route path="/bien-muc-ho-so/:id" element={<ChiTietBienMucHoSo />} />
                      <Route path="/bien-muc-ho-so/:id/add-tai-lieu" element={<AddTaiLieuBienMucToHoSo />} />

                      <Route path='/danh-sach-ho-so-da-trinh-duyet-luu-kho' element={<DanhSachHoSoDaTrinhDuyetLuuKho/>} />
                      <Route path="/ho-so-da-trinh-duyet-luu-kho/:id" element={<ChiTietHoSoDaTrinhDuyetLuuKho />} />

                      <Route path='/danh-sach-ho-so-thuoc-kho-du-lieu' element={<DanhSachHoSoThuocKhoDuLieu/>} />
                      <Route path='/chi-tiet-ho-so-thuoc-kho-du-lieu/:id' element={<ChiTietHoSoThuocKhoDuLieu/>} />

                      <Route path='/danh-sach-tai-lieu-thuoc-kho-du-lieu' element={<DanhSachTaiLieuThuocKhoDuLieu/>} />
                      <Route path='/chi-tiet-tai-lieu-thuoc-kho-du-lieu/:taiLieuId' element={<ChiTietTaiLieuThuocKhoDuLieu/>} />

                      <Route path = 'hien-trang-so-hoa-kho-du-lieu' element={<HienTrangSoHoaKhoDuLieu/>}/>
                      <Route path = 'thong-ke-hop-cap' element={<ThongKeHopCap/>}/>
                      <Route path = 'thong-ke-hstl' element={<ThongKeHSTL/>}/>
                      <Route path = 'thong-ke-phieu-ycktsd' element={<ThongKePhieuYCKTSD/>}/>

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
