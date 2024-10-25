import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import searchIcon from '../../assets/images/Function/search.png';
import addIcon from '../../assets/images/Function/Add.png';
import gridIcon from '../../assets/images/Function/HanhDong.png';
import deleteIcon from '../../assets/images/Function/DeleteFile.png';
import editIcon from '../../assets/images/Function/ChinhSua.png';
import infoIcon from '../../assets/images/Function/info.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const LapKeHoachThuThap = () => {
  const [keHoachList, setKeHoachList] = useState([]);
  const [tieuDe, setTieuDe] = useState(''); 
  const [nguoiDuyet, setNguoiDuyet] = useState(''); 
  const [tuNgay, setTuNgay] = useState(''); 

  const navigate = useNavigate(); 

  const fetchKeHoachs = () => {
    const query = new URLSearchParams({
      tieuDe,
      nguoiDuyet,
      tuNgay,
    }).toString();
  
    fetch(`/api/lap-ke-hoach-thu-thap?${query}`)
      .then(response => response.json())
      .then(data => setKeHoachList(data)) 
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchKeHoachs();
  }, [tieuDe, nguoiDuyet, tuNgay]);

  const handleDetailClick = (id) => {
    navigate(`/ke-hoach-thu-thap/${id}`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="d-flex align-items-center">
          <img src={infoIcon} alt="add" width="30" className="me-2" />
          Lập kế hoạch thu thập
        </h5>
      </div>

      <h6 className="text-start mb-3">Danh sách kế hoạch</h6>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <input 
            type="text" 
            className="form-control me-2" 
            placeholder="Tìm theo tên kế hoạch..." 
            style={{ width: '250px' }}
            value={tieuDe}
            onChange={(e) => setTieuDe(e.target.value)} 
          />
          
          {/* Ô tìm kiếm theo người duyệt */}
          <input 
            type="text" 
            className="form-control me-2" 
            placeholder="Tìm theo người duyệt..." 
            style={{ width: '250px' }}
            value={nguoiDuyet}
            onChange={(e) => setNguoiDuyet(e.target.value)} 
          />

          {/* Ô tìm kiếm theo ngày bắt đầu */}
          <input
            type="date"
            className="form-control me-2"
            style={{ width: '200px' }}
            value={tuNgay}
            onChange={(e) => setTuNgay(e.target.value)}
          />
        </div>

        {/* Nút thêm */}
        <button className="btn btn-light" onClick={() => navigate('/ke-hoach-thu-thap/add')}>
          <img src={addIcon} alt="add" width="20" />
        </button>

      </div>

      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" />
            </th>
            <th scope="col">STT</th>
            <th scope="col">Tên kế hoạch</th>
            <th scope="col">Người duyệt</th>
            <th scope="col">Từ ngày</th>
            <th scope="col">Đến ngày</th>
            <th scope="col">Tình trạng</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {keHoachList.map((keHoach, index) => (
            <tr key={keHoach.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{index + 1}</td>
              <td><a href="#" onClick={() => handleDetailClick(keHoach.id)}>{keHoach.tieuDe}</a></td>
              <td>{keHoach.nguoiDuyet}</td>
              <td>{new Date(keHoach.ngayBatDau).toLocaleDateString()}</td>
              <td>{new Date(keHoach.ngayKetThuc).toLocaleDateString()}</td>
              <td>{keHoach.trangThai}</td>
              <td>
                <button className="btn btn-light me-2">
                  <img src={editIcon} alt="edit" width="20" />
                </button>
                <button className="btn btn-light">
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

export default LapKeHoachThuThap;
