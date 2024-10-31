import React, { useState, useContext } from 'react';
import { useNavigate,useParams  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../../context/UserContext';
import CustomPopup from '../../../components/CustomPopUp';
import addIcon from '../../../assets/images/Function/Add.png';
import uploadIcon from '../../../assets/images/Function/TaiFileLen.png';

const AddHoSo = () => {
  const { id } = useParams(); 

  const { name } = useContext(UserContext); 
  const [hoSo, setHoSo] = useState({
    maHoSo: '',
    kyHieuThongTin: '',
    maDinhDanhCoQuan: '',
    nguoiTao: name, // Lấy thông tin người tạo từ context
    mucLucSoNamHS: '',
    ngayTao: new Date().toISOString().split('T')[0], 
    soVaKyHieuHoSo: '',
    tongSoTaiLieu: '',
    tieuDeHoSo: '',
    tongSoTrang: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    cheDoSuDung: '',
    tinhTrangVatLy: '',
    thoiHanBaoQuan: '',
    chuGiai: '',
    donViNopLuu:'',
    trangThai: 'Tạo mới',
    ngonNgu: '',
    keHoachThuThapId: id,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const processedValue = ['tongSoTaiLieu', 'tongSoTrang'].includes(name)
        ? parseInt(value, 10) || 0  
        : value;

    setHoSo({ ...hoSo, [name]: processedValue });
  };

  const handleSubmit = (status) => {
    if (!hoSo.maHoSo || !hoSo.tieuDeHoSo) {
      setError('Vui lòng nhập đầy đủ thông tin các trường bắt buộc');
      return;
    }
    setError(null);

    const updatedHoSo = { ...hoSo, trangThai: status };

    fetch('/api/ho-so', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedHoSo),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        navigate(`/chi-tiet-danh-sach-ke-hoach-da-duyet/${hoSo.keHoachThuThapId}`);      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message); 
      });
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-4">
        <i className="bi bi-info-circle"></i> Thêm mới hồ sơ
      </h5>

      {error && <div className="alert alert-danger">{error}</div>} 

      <div className="row g-3 mb-4">
        {/* Mã hồ sơ */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Mã hồ sơ:</label>
          <input
            type="text"
            className="form-control"
            name="maHoSo"
            value={hoSo.maHoSo}
            onChange={handleChange}
          />
        </div>

        {/* Ký hiệu thông tin */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Ký hiệu thông tin:</label>
          <input
            type="text"
            className="form-control"
            name="kyHieuThongTin"
            value={hoSo.kyHieuThongTin}
            onChange={handleChange}
          />
        </div>

        {/* Mã định danh cơ quan */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Mã định danh cơ quan:</label>
          <input
            type="text"
            className="form-control"
            name="maDinhDanhCoQuan"
            value={hoSo.maDinhDanhCoQuan}
            onChange={handleChange}
          />
        </div>

        {/* Người tạo */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Người tạo:</label>
          <input
            type="text"
            className="form-control"
            name="nguoiTao"
            value={hoSo.nguoiTao}
            onChange={handleChange}
          />
        </div>

        {/* Mục lục số năm HS */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Mục lục số/năm HS:</label>
          <input
            type="text"
            className="form-control"
            name="mucLucSoNamHS"
            value={hoSo.mucLucSoNamHS}
            onChange={handleChange}
          />
        </div>

        {/* Ngày tạo */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Ngày tạo:</label>
          <input
            type="text"
            className="form-control"
            name="ngayTao"
            value={hoSo.ngayTao}
            onChange={handleChange}
          />
        </div>

        {/* Số và ký hiệu hồ sơ */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Số và ký hiệu hồ sơ:</label>
          <input
            type="text"
            className="form-control"
            name="soVaKyHieuHoSo"
            value={hoSo.soVaKyHieuHoSo}
            onChange={handleChange}
          />
        </div>

        {/* Tổng số tài liệu */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Tổng số tài liệu:</label>
          <input
            type="text"
            className="form-control"
            name="tongSoTaiLieu"
            value={hoSo.tongSoTaiLieu}
            onChange={handleChange}
          />
        </div>

        {/* Tiêu đề hồ sơ */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Tiêu đề hồ sơ:</label>
          <input
            type="text"
            className="form-control"
            name="tieuDeHoSo"
            value={hoSo.tieuDeHoSo}
            onChange={handleChange}
          />
        </div>

        {/* Tổng số trang */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Tổng số trang:</label>
          <input
            type="text"
            className="form-control"
            name="tongSoTrang"
            value={hoSo.tongSoTrang}
            onChange={handleChange}
          />
        </div>

        {/* Ngày bắt đầu */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Ngày bắt đầu:</label>
          <input
            type="date"
            className="form-control"
            name="thoiGianBatDau"
            value={hoSo.thoiGianBatDau}
            onChange={handleChange}
          />
        </div>

        {/* Chế độ sử dụng */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Chế độ sử dụng:</label>
          <input
            type="text"
            className="form-control"
            name="cheDoSuDung"
            value={hoSo.cheDoSuDung}
            onChange={handleChange}
          />
        </div>

        {/* Ngày kết thúc */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Ngày kết thúc:</label>
          <input
            type="date"
            className="form-control"
            name="thoiGianKetThuc"
            value={hoSo.thoiGianKetThuc}
            onChange={handleChange}
          />
        </div>

        {/* Tình trạng vật lý */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Tình trạng vật lý:</label>
          <input
            type="text"
            className="form-control"
            name="tinhTrangVatLy"
            value={hoSo.tinhTrangVatLy}
            onChange={handleChange}
          />
        </div>

        {/* Thời gian bảo quản */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Thời gian bảo quản:</label>
          <input
            type="text"
            className="form-control"
            name="thoiHanBaoQuan"
            value={hoSo.thoiHanBaoQuan}
            onChange={handleChange}
          />
        </div>

        {/* Chú giải */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Chú giải:</label>
          <input
            type="text"
            className="form-control"
            name="chuGiai"
            value={hoSo.chuGiai}
            onChange={handleChange}
          />
        </div>

        {/* Đơn vị nộp lưu */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Đơn vị nộp lưu:</label>
          <input
            type="text"
            className="form-control"
            name="donViNopLuu"
            value={hoSo.donViNopLuu}
            onChange={handleChange}
          />
        </div>

        {/* Trạng thái */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Trạng thái:</label>
          <input
            type="text"
            className="form-control"
            name="trangThai"
            value={hoSo.trangThai}
            disabled
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end mb-4">
        {/* Trình duyệt button */}
        <CustomPopup className="btn btn-warning mx-2 flex-grow-1" style={{ maxWidth: '180px' }}
          title="Trình duyệt"
          text="Đồng chí có chắc muốn lưu và trình duyệt hồ sơ này?"
          onConfirm={() => handleSubmit('Đã trình duyệt')}
        />

        {/* Lưu button */}
        <CustomPopup className="btn btn-primary mx-2 flex-grow-1" style={{ maxWidth: '180px' }}
          title="Lưu"
          text="Đồng chí có chắc muốn lưu hồ sơ này?"
          onConfirm={() => handleSubmit('Tạo mới')} 
        />
        
        {/* Đóng button */}
        <CustomPopup className="btn btn-secondary mx-2 flex-grow-1" style={{ maxWidth: '180px' }}
          title="Đóng"
          text="Đồng chí có chắc muốn hủy thêm mới?"
          onConfirm={() => navigate('/ho-so')}
        />
      </div>
    </div>
  );
};

export default AddHoSo;
