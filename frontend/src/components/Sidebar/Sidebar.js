import React, { useState } from 'react';
import MenuLink from '../MenuLink';  // Import MenuLink
import SubmenuItem from '../SubmenuItem'; // Import SubmenuItem
import trangchuIcon from '../../assets/images/Module/TrangChu.png';

import quanlykehoachIcon from '../../assets/images/Module/QuanLyKehoach.png';
import bienmucchinlyIcon from '../../assets/images/Module/BienMucChinhLy.png';
import khaithacsudungIcon from '../../assets/images/Module/KhaiThacSuDung.png';
import kholichsuIcon from '../../assets/images/Module/KhoLichSu.png';
import quanlydanhmucIcon from '../../assets/images/Module/QuanLyDanhMuc.png';
import tieuhuyhosoIcon from '../../assets/images/Module/TieuHuyHoSo.png';
import baocaothongkeIcon from '../../assets/images/Module/BaoCaoThongKe.png';

import './Sidebar.css'; 

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);  // Trạng thái chung cho tất cả các submenu

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);  // Đóng nếu nhấn lại, hoặc mở menu khác
  };

  return (
    <div className="sidebar">
      <ul className="menu">
        <MenuLink
          icon={trangchuIcon}
          title="Trang chủ"
          toggleMenu={() => toggleMenu('trangChu')}
          isOpen={activeMenu === 'trangChu'}
        />

        <MenuLink
          icon={quanlykehoachIcon}
          title="Quản lý kế hoạch thu thập"
          toggleMenu={() => toggleMenu('keHoach')}
          isOpen={activeMenu === 'keHoach'}
        >
          <SubmenuItem to="/lap-ke-hoach-thu-thap" text="Lập kế hoạch thu thập" />
          <SubmenuItem to="/duyet-ke-hoach-thu-thap" text="Duyệt kế hoạch thu thập" />
          <SubmenuItem to="/danh-sach-ke-hoach-da-duyet" text="Danh sách kế hoạch đã duyệt" />
          <SubmenuItem to="/quan-ly-ho-so" text="Quản lý hồ sơ" />
          <SubmenuItem to="/quan-ly-tai-lieu" text="Quản lý tài liệu" />
        </MenuLink>

        <MenuLink
          icon={bienmucchinlyIcon}
          title="Biên mục chỉnh lý"
          toggleMenu={() => toggleMenu('bienMuc')}
          isOpen={activeMenu === 'bienMuc'}
        >
          <SubmenuItem to="/bien-muc-ho-so-tai-lieu" text="Biên mục hồ sơ tài liệu" />
          <SubmenuItem to="/duyet-luu-kho" text="Duyệt lưu kho" />
          <SubmenuItem to="/yeu-cau-bmcl-bo-sung" text="Yêu cầu BMCL bổ sung" />
          <SubmenuItem to="/duyet-bmcl-bo-sung" text="Duyệt BMCL bổ sung" />
        </MenuLink>

        <MenuLink
          icon={khaithacsudungIcon}
          title="Khai thác sử dụng"
          toggleMenu={() => toggleMenu('khaiThac')}
          isOpen={activeMenu === 'khaiThac'}
        >
          <SubmenuItem to="/quan-ly-phieu-yeu-cau" text="Quản lý phiếu yêu cầu" />
          <SubmenuItem to="/duyet-phieu-yeu-cau" text="Duyệt phiếu yêu cầu" />
          <SubmenuItem to="/quan-ly-phieu-tra" text="Quản lý phiếu trả" />
          <SubmenuItem to="/tra-cuu-ho-so-pyc" text="Tra cứu hồ sơ đưa vào PYC" />
          <SubmenuItem to="/tra-cuu-tai-lieu-pyc" text="Tra cứu tài liệu đưa vào PYC" />
        </MenuLink>

        <MenuLink
          icon={kholichsuIcon}
          title="Kho dữ liệu"
          toggleMenu={() => toggleMenu('kho')}
          isOpen={activeMenu === 'kho'}
        >
          <SubmenuItem to="/tra-cuu-ho-so" text="Tra cứu hồ sơ" />
          <SubmenuItem to="/tra-cuu-tai-lieu" text="Tra cứu tài liệu" />
          <SubmenuItem to="/di-chuyen-ho-so" text="Di chuyển hồ sơ" />
          <SubmenuItem to="/sap-xep-hop-cap" text="Sắp xếp hộp cặp" />
          <SubmenuItem to="/dong-bang-ho-so" text="Đóng băng hồ sơ" />
        </MenuLink>

        <MenuLink
          icon={tieuhuyhosoIcon}
          title="Tiêu hủy hồ sơ"
          toggleMenu={() => toggleMenu('tieuHuy')}
          isOpen={activeMenu === 'tieuHuy'}
        >
          <SubmenuItem to="/danh-sach-cho-ho-so-tieu-huy" text="Danh sách chờ hồ sơ tiêu hủy" />
          <SubmenuItem to="/danh-sach-quyet-dinh-tieu-huy" text="Danh sách quyết định tiêu hủy" />
          <SubmenuItem to="/duyet-quyet-dinh-tieu-huy" text="Duyệt quyết định tiêu hủy" />
          <SubmenuItem to="/danh-sach-quyet-dinh-da-duyet" text="Danh sách quyết định đã duyệt" />
        </MenuLink>

        <MenuLink
          icon={quanlydanhmucIcon}
          title="Danh mục"
          toggleMenu={() => toggleMenu('danhMuc')}
          isOpen={activeMenu === 'danhMuc'}
        >
          <SubmenuItem to="/phong-luu-tru" text="Phông lưu trữ" />
          <SubmenuItem to="/danh-sach-muc-luc" text="Danh sách mục lục" />
          <SubmenuItem to="/gia-ke" text="Giá kệ" />
          <SubmenuItem to="/hop-cap" text="Hộp cặp" />
        </MenuLink>

        <MenuLink
          icon={baocaothongkeIcon}
          title="Báo cáo thống kê"
          toggleMenu={() => toggleMenu('baoCao')}
          isOpen={activeMenu === 'baoCao'}
        >
          <SubmenuItem to="/hien-trang-so-hoa-kho-du-lieu" text="Hiện trạng số hóa kho dữ liệu" />
          <SubmenuItem to="/thong-ke-khai-thac" text="Thống kê khai thác" />
          <SubmenuItem to="/tra-cuu-ho-so" text="Tra cứu hồ sơ" />
          <SubmenuItem to="/tra-cuu-tai-lieu" text="Tra cứu tài liệu" />
        </MenuLink>
      </ul>
    </div>
  );
};

export default Sidebar;
