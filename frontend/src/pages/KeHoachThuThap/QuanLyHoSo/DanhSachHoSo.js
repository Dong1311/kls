import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import addIcon from '../../../assets/images/Function/Add.png';
import deleteIcon from '../../../assets/images/Function/DeleteFile.png';
import editIcon from '../../../assets/images/Function/ChinhSua.png';
import infoIcon from '../../../assets/images/Function/info.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const DanhSachHoSo = () => {
  const [hoSoList, setHoSoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchHoSos = () => {
  fetch(`/api/ho-so?search=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      // Lọc các hồ sơ theo trạng thái yêu cầu
      const filteredData = data.filter(hoSo =>
        ["Tạo mới", "Đã trình duyệt", "Cần thu thập lại", "Từ chối NLLS"].includes(hoSo.trangThai)
      );
      setHoSoList(filteredData);
    })
    .catch(error => console.error('Error fetching data:', error));
};


  useEffect(() => {
    fetchHoSos();
  }, [searchTerm]);

  // Hàm xử lý khi nhấn vào nút chỉnh sửa
  const handleEditHoSo = (hoSoId) => {
    navigate(`/ho-so/${hoSoId}`);
  };

  const handleDeleteHoSo = (hoSoId) => {
    if (window.confirm('Bạn có chắc muốn xóa hồ sơ này không?')) {
      fetch(`/api/ho-so/${hoSoId}`, { method: 'DELETE' })
        .then(() => {
          setHoSoList(hoSoList.filter(hoSo => hoSo.id !== hoSoId));
        })
        .catch(error => console.error('Lỗi khi xóa hồ sơ:', error));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="d-flex align-items-center">
          <img src={infoIcon} alt="info" width="30" className="me-2" />
          Quản lý hồ sơ
        </h5>
      </div>

      <h6 className="text-start mb-3">Danh sách Hồ sơ</h6>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <input 
            type="text" 
            className="form-control me-2" 
            placeholder="Tìm kiếm..." 
            style={{ width: '300px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="btn btn-light" onClick={() => navigate('/ho-so/add')}>
          <img src={addIcon} alt="add" width="20" />
        </button>
      </div>

      <table className="table table-striped table-hover align-middle">
        <thead style={{ backgroundColor: '#2289E7', color: '#fff' }}>
          <tr>
            <th scope="col">
              <input type="checkbox" />
            </th>
            <th scope="col">STT</th>
            <th scope="col">Mã hồ sơ</th>
            <th scope="col">Tiêu đề hồ sơ</th>
            <th scope="col">Tên kế hoạch</th>
            <th scope="col">Người tạo</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Số lượng tài liệu</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {hoSoList.map((hoSo, index) => (
            <tr key={hoSo.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{index + 1}</td>
              <td>{hoSo.maHoSo}</td>
              <td>
                <Link to={`/ho-so/${hoSo.id}`} style={{ color: '#043371' }}>
                  {hoSo.tieuDeHoSo}
                </Link>
              </td>
              <td>{hoSo.tenKeHoach}</td>
              <td>{hoSo.nguoiTao}</td>
              <td>{new Date(hoSo.ngayTao).toLocaleDateString()}</td>
              <td>{hoSo.tongSoTaiLieu}</td>
              <td>
                <span style={getTrangThaiStyle(hoSo.trangThai)}>
                  {hoSo.trangThai}
                </span>
              </td>
              <td>
                <button className="btn btn-light me-2" onClick={() => handleEditHoSo(hoSo.id)}>
                  <img src={editIcon} alt="edit" width="20" />
                </button>
                <button className="btn btn-light" onClick={() => handleDeleteHoSo(hoSo.id)}
                disabled={!(hoSo.trangThai === 'Tạo mới' )}>
                  <img src={deleteIcon} alt="delete" width="20" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getTrangThaiStyle = (trangThai) => {
  let backgroundColor = '';
  let color = '#fff';
  switch (trangThai) {
    case 'Tạo mới':
      backgroundColor = '#2289E7';
      break;
    case 'Đã trình duyệt':
      backgroundColor = '#ffc107';
      break;
    case 'Đã duyệt':
      backgroundColor = '#28a745';
      break;
    case 'Từ chối NLLS':
      backgroundColor = '#dc3545';
      break;
    default:
      backgroundColor = '#6c757d';
      break;
  }

  return {
    backgroundColor,
    color,
    padding: '5px 10px',
    borderRadius: '8px',
    display: 'inline-block',
    fontWeight: '400',
    fontSize: '14px',
    minWidth: '110px',
    textAlign: 'center',
  };
};

export default DanhSachHoSo;
