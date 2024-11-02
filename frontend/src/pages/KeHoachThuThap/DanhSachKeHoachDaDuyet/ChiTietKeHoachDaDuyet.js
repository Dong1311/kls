import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,Link  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import addIcon from '../../../assets/images/Function/Add.png';
import editIcon from '../../../assets/images/Function/ChinhSua.png';
import deleteIcon from '../../../assets/images/Function/DeleteFile.png';

const ChiTietKeHoachDaDuyet = () => {
  const { id } = useParams();
  const [keHoachDetail, setKeHoachDetail] = useState(null);
  const navigate = useNavigate();
  const [taiLieuList, setTaiLieuList] = useState([]); 
  const [hoSoList , setHoSoList ] = useState([]); 

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
  
    // Fetch danh sách hồ sơ liên quan đến kế hoạch thu thập
    fetch(`/api/lap-ke-hoach-thu-thap/${id}/ho-so`)
      .then((response) => response.json())
      .then((data) => {
        setHoSoList(data); // Lưu danh sách hồ sơ vào state
      })
      .catch((error) => console.error('Error fetching ho so:', error));
  }, [id]);
  
  

  if (!keHoachDetail) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0]; 
  };

  const handleNavigateToAddHoSo = () => {
    navigate(`/ke-hoach-thu-thap/${id}/them-moi-ho-so`); // Điều hướng đến trang thêm mới hồ sơ
  };

  const handleEditHoSo = (hoSoId) => {
    navigate(`/ho-so/${hoSoId}`);
  };
  
  const handleDeleteHoSo = (hoSoId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hồ sơ này không?')) {
      fetch(`/api/ho-so/${hoSoId}`, { method: 'DELETE' })
        .then((response) => {
          if (!response.ok) throw new Error('Xóa hồ sơ thất bại');
          setHoSoList(hoSoList.filter((hoSo) => hoSo.id !== hoSoId));
        })
        .catch((error) => console.error('Lỗi khi xóa hồ sơ:', error));
    }
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

        <button className="btn btn-secondary mx-2 flex-grow-1" style={{ maxWidth: '150px' }} onClick={() => navigate('/danh-sach-ke-hoach-da-duyet')}>Đóng</button>
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
        {/* Danh sách hồ sơ được thu thập */}
        <div style={{ background: '#D9D9D947', borderRadius: '10px', padding: '15px', marginTop: '20px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">Danh sách hồ sơ được thu thập</h6>
            {/* Nút thêm mới hồ sơ */}
          <button 
            className="btn btn-light" 
            onClick={handleNavigateToAddHoSo} // Gọi hàm chuyển trang khi click
            style={{ background: 'transparent', border: 'none' }}
          >
            <img src={addIcon} alt="Thêm hồ sơ" style={{ width: '25px', height: '25px' }} />
          </button>
        </div>

        <table className="table table-striped mt-3">
            <thead style={{ backgroundColor: '#2289E7', color: '#fff' }}>
            <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã hồ sơ</th>
                <th scope="col">Tiêu đề hồ sơ</th>
                <th scope="col">Người tạo</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Số lượng tài liệu</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Hành động</th>
            </tr>
            </thead>
            <tbody>
            {hoSoList.length > 0 ? (
                hoSoList.map((hoSo, index) => (
                <tr key={hoSo.id}>
                    <td>{index + 1}</td>
                    <td>{hoSo.maHoSo}</td>
                    <td>
                      <Link to={`/ho-so/${hoSo.id}`} style={{ color: '#043371', textDecoration: 'none' }}>
                          {hoSo.tieuDeHoSo}
                      </Link>
                    </td>
                    <td>{hoSo.nguoiTao}</td>
                    <td>{formatDate(hoSo.ngayTao)}</td>
                    <td>{hoSo.soLuongTaiLieu}</td>
                    <td>{hoSo.trangThai}</td>
                    <td>
                      <button className="btn btn-sm btn-light me-2" onClick={() => handleEditHoSo(hoSo.id)}>
                        <img src={editIcon} alt="edit" width="20" />
                      </button>
                      <button className="btn btn-sm btn-light" onClick={() => handleDeleteHoSo(hoSo.id)} 
                      disabled={!(hoSo.trangThai === 'Tạo mới' )}>
                        <img src={deleteIcon} alt="delete" width="20" />
                      </button>
                    </td>

                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="8">Không có hồ sơ nào</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>

    </div>
  );
};

export default ChiTietKeHoachDaDuyet;
