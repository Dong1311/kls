import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import addIcon from '../../assets/images/Function/Add.png';
import uploadIcon from '../../assets/images/Function/TaiFileLen.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddKeHoachThuThap = () => {
  const [keHoach, setKeHoach] = useState({
    soKeHoach: '',
    tieuDe: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    trangThai: 'Tạo mới',
    noiDung: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKeHoach({ ...keHoach, [name]: value });
  };

  const handleSubmit = () => {
    // Gửi dữ liệu lên server
    fetch('/api/lap-ke-hoach-thu-thap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(keHoach),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      navigate('/lap-ke-hoach-thu-thap');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-4">
        <i className="bi bi-info-circle"></i> Thêm kế hoạch thu thập
      </h5>

      <div className="row g-3 mb-4">
        {/* Số kế hoạch */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Số kế hoạch:</label>
          <input
            type="text"
            className="form-control"
            name="soKeHoach"
            value={keHoach.soKeHoach}
            onChange={handleChange}
          />
        </div>

        {/* Tên kế hoạch */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Tên kế hoạch:</label>
          <input
            type="text"
            className="form-control"
            name="tieuDe"
            value={keHoach.tieuDe}
            onChange={handleChange}
          />
        </div>

        {/* Từ ngày */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Từ ngày:</label>
          <input
            type="date"
            className="form-control"
            name="ngayBatDau"
            value={keHoach.ngayBatDau}
            onChange={handleChange}
          />
        </div>

        {/* Đến ngày */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Đến ngày:</label>
          <input
            type="date"
            className="form-control"
            name="ngayKetThuc"
            value={keHoach.ngayKetThuc}
            onChange={handleChange}
          />
        </div>
        
        {/* Trạng thái */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Trạng thái:</label>
          <input
            type="text" disabled
            className="form-control"
            name="trangThai"
            value={keHoach.trangThai}
            onChange={handleChange}
          />
        </div>

        {/* Nội dung */}
        <div className="col-md-12 d-flex mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Nội dung:</label>
          <textarea
            className="form-control"
            name="noiDung"
            rows="3"
            value={keHoach.noiDung}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-primary mx-2 flex-grow-1" style={{ maxWidth: '150px' }} onClick={handleSubmit}>
          Lưu
        </button>
        <button className="btn btn-secondary mx-2 flex-grow-1" style={{ maxWidth: '150px' }} onClick={() => navigate('/lap-ke-hoach-thu-thap')}>
          Đóng
        </button>
      </div>

      {/* Danh sách tài liệu */}
      <div style={{ background: '#D9D9D947', borderRadius: '10px', padding: '15px' }}>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="text-start">Danh sách tài liệu</h6>
          <div style={{ display: 'flex', padding: '8px' }}>
            <button style={{ background: 'transparent', border: 'none', marginRight: '10px' }}>
              <img src={addIcon} alt="Thêm" style={{ width: '20px', height: '20px' }} />
            </button>
            <button style={{ background: 'transparent', border: 'none' }}>
              <img src={uploadIcon} alt="Tải lên" style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
        </div>

        <table className="table table-striped mt-2" style={{ background: '#D9D9D947' }}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên tài liệu</th>
              <th>Nội dung</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {/* Hiển thị tài liệu ở đây */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddKeHoachThuThap;
