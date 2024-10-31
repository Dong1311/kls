import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputField from '../../../components/InputField'

const ChiTietHoSo = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [hoSo, setHoSo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/ho-so/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu hồ sơ');
        }
        return response.json();
      })
      .then((data) => {
        setHoSo(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  if (!hoSo) {
    return <div>Không tìm thấy hồ sơ</div>;
  }

  return (
    <div className="container mt-4">
      <h5 className="mb-4">
        <i className="bi bi-info-circle"></i> Chi tiết hồ sơ: {hoSo.tieuDeHoSo}
      </h5>

      <div className="row g-3 mb-4">
        {/* Mã hồ sơ */}
        <InputField label="Mã hồ sơ" value={hoSo.maHoSo} disabled={hoSo.trangThai !== 'Tạo mới'} />
        <InputField label="Ký hiệu thông tin" value={hoSo.kyHieuThongTin} disabled={hoSo.trangThai !== 'Tạo mới'} />
        <InputField label="Mã định danh cơ quan" value={hoSo.maDinhDanhCoQuan} disabled={hoSo.trangThai !== 'Tạo mới'} />
        <InputField label="Người tạo" value={hoSo.nguoiTao} disabled />
        <InputField label="Mục lục số/năm HS" value={hoSo.mucLucSoNamHS} disabled={hoSo.trangThai !== 'Tạo mới'} />
        <InputField 
          label="Ngày tạo" 
          value={hoSo.ngayTao ? new Date(hoSo.ngayTao).toISOString().split('T')[0] : ''} 
          disabled={hoSo.trangThai !== 'Tạo mới'} 
        />
        <InputField label="Số và ký hiệu hồ sơ" value={hoSo.soVaKyHieuHoSo} disabled={hoSo.trangThai !== 'Tạo mới'} />
        <InputField label="Tổng số tài liệu" value={hoSo.tongSoTaiLieu} disabled={hoSo.trangThai !== 'Tạo mới'} />
        <InputField label="Tiêu đề hồ sơ" value={hoSo.tieuDeHoSo} disabled={hoSo.trangThai !== 'Tạo mới'} />
        <InputField label="Tổng số trang" value={hoSo.tongSoTrang} disabled={hoSo.trangThai !== 'Tạo mới'} />
        <InputField label="Chế độ sử dụng" value={hoSo.cheDoSuDung} disabled={hoSo.trangThai !== 'Tạo mới'} />
        <InputField label="Tình trạng vật lý" value={hoSo.tinhTrangVatLy} disabled={hoSo.trangThai !== 'Tạo mới'} />
        <InputField label="Thời gian bảo quản" value={hoSo.thoiHanBaoQuan} disabled={hoSo.trangThai !== 'Tạo mới'} />
        <InputField label="Chú giải" value={hoSo.chuGiai} disabled={hoSo.trangThai !== 'Tạo mới'} />
        <InputField label="Đơn vị nộp lưu" value={hoSo.donViNopLuu} disabled={hoSo.trangThai !== 'Tạo mới'} />
        {/* Ngày bắt đầu */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Ngày bắt đầu:</label>
          <input
            type="date"
            className="form-control"
            value={hoSo.thoiGianBatDau ? new Date(hoSo.thoiGianBatDau).toISOString().split('T')[0] : ''}
            disabled={hoSo.trangThai !== 'Tạo mới'}
          />
        </div>

        {/* Ngày kết thúc */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Ngày kết thúc:</label>
          <input
            type="date"
            className="form-control"
            value={hoSo.thoiGianKetThuc ? new Date(hoSo.thoiGianKetThuc).toISOString().split('T')[0] : ''}
            disabled={hoSo.trangThai !== 'Tạo mới'}
          />
        </div>

        {/* Trạng thái */}
        <InputField label="Trạng thái" value={hoSo.trangThai} disabled />
      </div>

      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-secondary mx-2" onClick={() => navigate(-1)}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default ChiTietHoSo;
