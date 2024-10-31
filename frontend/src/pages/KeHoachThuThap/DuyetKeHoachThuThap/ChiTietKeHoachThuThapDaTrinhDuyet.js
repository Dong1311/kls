import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomPopup from '../../../components/CustomPopUp'

const ChiTietKeHoachThuThap = () => {
  const { id } = useParams();
  const [keHoachDetail, setKeHoachDetail] = useState(null);
  const navigate = useNavigate();
  const [taiLieuList, setTaiLieuList] = useState([]); 
  useEffect(() => {
    fetch(`/api/lap-ke-hoach-thu-thap/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setKeHoachDetail(data);
  
        return fetch(`/api/lap-ke-hoach-thu-thap/${id}/tai-lieu-huong-dan`);
      })
      .then((response) => response.json())
      .then((data) => {
        setTaiLieuList(data);  
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);
  

  if (!keHoachDetail) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0]; 
  };

  const handleUpdateStatus = (newStatus) => {
    fetch(`/api/lap-ke-hoach-thu-thap/${id}/trang-thai`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trangThai: newStatus }),
    })
      .then((response) => response.json())
      .then(() => {
        navigate('/duyet-ke-hoach-thu-thap'); 
      })
      .catch((error) => console.error('Error updating status:', error));
  };
  

  return (
    <div className="container mt-4">
      <h5 className="mb-4">
        <i className="bi bi-info-circle"></i> Chi tiết kế hoạch thu thập
      </h5>

      <div className="row g-3 mb-4">
        {/* Số kế hoạch */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Số kế hoạch:</label>
          <input type="text" className="form-control" value={keHoachDetail.soKeHoach || ''} disabled />
        </div>

        {/* Tên kế hoạch */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Tên kế hoạch:</label>
          <input type="text" className="form-control" value={keHoachDetail.tieuDe || ''} disabled />
        </div>

        {/* Ngày bắt đầu */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Từ ngày:</label>
          <input type="date" className="form-control" value={formatDate(keHoachDetail.ngayBatDau)} disabled />
        </div>

        {/* Người duyệt */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Người duyệt:</label>
          <input type="text" className="form-control" value={keHoachDetail.nguoiDuyet || 'Chưa có người duyệt'} disabled />
        </div>

        {/* Ngày kết thúc */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Đến ngày:</label>
          <input type="date" className="form-control" value={formatDate(keHoachDetail.ngayKetThuc)} disabled />
        </div>

        {/* Người tạo */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Người tạo:</label>
          <input type="text" className="form-control" value={keHoachDetail.nguoiTao || 'N/A'} disabled />
        </div>

        {/* Trạng thái */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Trạng thái:</label>
          <input type="text" className="form-control" value={keHoachDetail.trangThai || ''} disabled />
        </div>

        {/* Nội dung */}
        <div className="col-md-12 d-flex mb-3">
          <label className="form-label me-2" style={{ minWidth: '120px' }}>Nội dung:</label>
          <textarea className="form-control" rows="3" value={keHoachDetail.noiDung || ''} disabled></textarea>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end mb-4">
      <CustomPopup
        className="btn btn-success mx-2 flex-grow-1"
        style={{ maxWidth: '150px' }}
        title="Duyệt"
        text="Đồng chí có chắc muốn duyệt kế hoạch này?"
        onConfirm={() => handleUpdateStatus('Đã duyệt')} 
      />

      <CustomPopup
        className="btn btn-danger mx-2 flex-grow-1"
        style={{ maxWidth: '150px' }}
        title="Từ chối"
        text="Đồng chí có chắc muốn từ chối kế hoạch này?"
        onConfirm={() => handleUpdateStatus('Từ chối')} 
      />

        <button className="btn btn-secondary mx-2 flex-grow-1" style={{ maxWidth: '150px' }} onClick={() => navigate('/duyet-ke-hoach-thu-thap')}>Đóng</button>
      </div>

      {/* Danh sách tài liệu */}
      <div style={{ background: '#D9D9D947', borderRadius: '10px', padding: '15px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Tài liệu hướng dẫn</h6>
        </div>

        <table className="table table-striped mt-3">
          <thead style={{ backgroundColor: '#2289E7', color: '#fff' }}>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã tài liệu</th>
              <th scope="col">Tên tài liệu</th>
              <th scope="col">Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {taiLieuList.length > 0 ? (
              taiLieuList.map((taiLieu, index) => (
                <tr key={taiLieu.id}>
                  <td>{index + 1}</td>
                  <td>TLHD000{taiLieu.id}</td>
                  <td>
                    <a href={taiLieu.link} target="_blank" rel="noopener noreferrer" style={{ color: '#043371' }}>
                      {taiLieu.tenTaiLieu}
                    </a>
                  </td>
                  <td>{formatDate(taiLieu.ngayTao)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Không có tài liệu nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ChiTietKeHoachThuThap;
