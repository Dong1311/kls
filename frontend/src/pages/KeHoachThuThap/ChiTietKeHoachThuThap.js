import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import addIcon from '../../assets/images/Function/Add.png' 
import uploadIcon from '../../assets/images/Function/TaiFileLen.png'
const ChiTietKeHoachThuThap = () => {
  const { id } = useParams();
  const [keHoachDetail, setKeHoachDetail] = useState(null);

  useEffect(() => {
    fetch(`/api/lap-ke-hoach-thu-thap/${id}`)
      .then((response) => response.json())
      .then((data) => setKeHoachDetail(data))
      .catch((error) => console.error('Error fetching ke hoach:', error));
  }, [id]);

  if (!keHoachDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h5 className="mb-4">
        <i className="bi bi-info-circle"></i> Chi tiết kế hoạch thu thập
      </h5>

      <div className="row g-3 mb-4">
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Số kế hoạch:</label>
          <input type="text" className="form-control" value={keHoachDetail.soKeHoach} disabled />
        </div>

        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Tên kế hoạch:</label>
          <input type="text" className="form-control" value={keHoachDetail.tieuDe} disabled />
        </div>

        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Từ ngày:</label>
          <input type="date" className="form-control" value={new Date(keHoachDetail.ngayBatDau).toISOString().split('T')[0]} disabled />
        </div>

        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Người duyệt:</label>
          <input type="text" className="form-control" value={keHoachDetail.nguoiDuyet} disabled />
        </div>

        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Đến ngày:</label>
          <input type="date" className="form-control" value={new Date(keHoachDetail.ngayKetThuc).toISOString().split('T')[0]} disabled />
        </div>

        <div className="col-md-6 d-flex flex-column mb-3">
          <div className="d-flex align-items-center mb-3">
            <label className="form-label me-2" style={{ minWidth: '120px' }}>Người tạo:</label>
            <input type="text" className="form-control" value="Adminkls" disabled />
          </div>
          <div className="d-flex align-items-center">
            <label className="form-label me-2" style={{ minWidth: '120px' }}>Ngày tạo:</label>
            <input type="text" className="form-control" value="06/10/2024" disabled />
          </div>
        </div>

        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Trạng thái:</label>
          <input type="text" className="form-control" value={keHoachDetail.trangThai} disabled />
        </div>

        <div className="col-md-12 d-flex mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Nội dung:</label>
          <textarea className="form-control" rows="3" value={keHoachDetail.noiDung} disabled></textarea>
        </div>
      </div>

      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-warning mx-2 flex-grow-1" style={{ maxWidth: '150px' }}>Trình duyệt</button>
        <button className="btn btn-primary mx-2 flex-grow-1" style={{ maxWidth: '150px' }}>Lưu</button>
        <button className="btn btn-secondary mx-2 flex-grow-1" style={{ maxWidth: '150px' }}>Đóng</button>
      </div>

      <div style={{ background: '#D9D9D947', borderRadius: '10px', padding: '15px' }}>
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="text-start">Danh sách tài liệu</h6>
        <div style={{
          display: 'flex',
          padding: '8px'
        }}>
          <button style={{ 
            background: 'transparent', 
            border: 'none', 
            marginRight: '10px' 
          }}>
            <img src={addIcon} alt="Thêm" style={{ width: '20px', height: '20px' }} />
          </button>
          <button style={{ 
            background: 'transparent', 
            border: 'none' 
          }}>
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

export default ChiTietKeHoachThuThap;
