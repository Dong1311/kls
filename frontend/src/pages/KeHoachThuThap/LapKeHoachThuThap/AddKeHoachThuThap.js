import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import addIcon from '../../../assets/images/Function/Add.png';
import uploadIcon from '../../../assets/images/Function/TaiFileLen.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../../context/UserContext';
import CustomPopup from '../../../components/CustomPopUp';
import InputField from './InputField2'; // Import InputField component
import SelectInput2 from './SelectInput2'; // Import SelectInput2 component
import SelectInputNguoiDuyet from './SelectInputNguoiDuyet';
const AddKeHoachThuThap = () => {
  const { name } = useContext(UserContext);
  const [keHoach, setKeHoach] = useState({
    soKeHoach: '',
    tieuDe: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    trangThai: 'Tạo mới',
    noiDung: '',
    nguoiTao: name,
    nguoiDuyet:'',
    donViNopLuuId: '' // Thay đổi thành donViNopLuuId
  });
  const [phongBanOptions, setPhongBanOptions] = useState([]); // State để lưu options của phòng ban
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const [nguoiDuyetOptions, setNguoiDuyetOptions] = useState([]); // State để lưu danh sách người duyệt

  useEffect(() => {
    // Fetch dữ liệu từ API /api/phong-ban để lấy danh sách phòng ban
    fetch('/api/phong-ban')
      .then(response => response.json())
      .then(data => {
        const options = data.map((phongBan) => ({
          value: phongBan.id,
          label: phongBan.tenPhongBan,
        }));
        setPhongBanOptions(options); // Cập nhật danh sách options
      })
      .catch(error => {
        console.error('Error fetching phong ban:', error);
        setError('Không thể tải danh sách phòng ban');
      });
  }, []);

  useEffect(() => {
    // Fetch danh sách người duyệt
    fetch('/api/users?role=Lanh dao CQ bao quan')
      .then(response => response.json())
      .then(data => {
        const options = data.map((user) => ({
          value: user.name, // Sử dụng tên người duyệt
          label: user.name, // Hiển thị tên người duyệt
        }));
        setNguoiDuyetOptions(options); // Cập nhật danh sách tùy chọn
      })
      .catch(error => {
        console.error('Error fetching nguoi duyet:', error);
        setError('Không thể tải danh sách người duyệt');
      });
  }, []);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name}, Value: ${value}`);
    setKeHoach({ ...keHoach, [name]: value });
  };

  const handleSubmit = (status) => {
    console.log('Ke Hoach:', keHoach);
    if (!keHoach.soKeHoach || !keHoach.tieuDe || !keHoach.ngayBatDau || !keHoach.ngayKetThuc || !keHoach.noiDung || !keHoach.donViNopLuuId) {
      setError('Vui lòng nhập đầy đủ thông tin các trường bắt buộc');
      return;
    }
    setError(null);

    const updatedKeHoach = { ...keHoach, trangThai: status };
      
    fetch('/api/lap-ke-hoach-thu-thap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedKeHoach),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || 'Đã xảy ra lỗi');
        });
      }
      return response.json();
    })
    .then(data => {
      navigate('/lap-ke-hoach-thu-thap');
    })
    .catch((error) => {
      setError(error.message); 
    });
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-4">
        <i className="bi bi-info-circle"></i> Thêm kế hoạch thu thập
      </h5>

      {error && <div className="alert alert-danger">{error}</div>} 

      <div className="row g-3 mb-4">
        <InputField label="Số kế hoạch:" name="soKeHoach" value={keHoach.soKeHoach} onChange={handleChange} />
        <InputField label="Tên kế hoạch:" name="tieuDe" value={keHoach.tieuDe} onChange={handleChange} />
        <InputField label="Từ ngày:" type="date" name="ngayBatDau" value={keHoach.ngayBatDau} onChange={handleChange} />
        <InputField label="Đến ngày:" type="date" name="ngayKetThuc" value={keHoach.ngayKetThuc} onChange={handleChange} />
        <InputField label="Trạng thái:" name="trangThai" value={keHoach.trangThai} onChange={handleChange} disabled />
        <InputField label="Người tạo:" name="nguoiTao" value={keHoach.nguoiTao} onChange={handleChange} disabled />

        
        {/* Đơn vị nộp lưu */}
        <SelectInput2 
          label="Đơn vị nộp lưu"
          name="donViNopLuuId"
          value={keHoach.donViNopLuuId}
          onChange={handleChange}
          options={phongBanOptions}
        />

        <SelectInputNguoiDuyet
          label="Người duyệt"
          name="nguoiDuyet"
          value={keHoach.nguoiDuyet} // Binding với `nguoiDuyet` (string)
          onChange={handleChange} // Sử dụng logic handleChange đã có
          options={nguoiDuyetOptions} // Danh sách tên người duyệt
          required
        />


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
        <CustomPopup className="btn btn-warning mx-2 flex-grow-1" style={{ maxWidth: '150px' }}
          title="Trình duyệt"
          text="Đồng chí có chắc muốn lưu và trình duyệt kế hoạch này?"
          onConfirm={() => handleSubmit('Đã trình duyệt')}
        />
        <CustomPopup className="btn btn-primary mx-2 flex-grow-1" style={{ maxWidth: '150px' }}
          title="Lưu"
          text="Đồng chí có chắc muốn lưu kế hoạch này?"
          onConfirm={() => handleSubmit('Tạo mới')} 
        />
        <CustomPopup className="btn btn-secondary mx-2 flex-grow-1" style={{ maxWidth: '150px' }}
          title="Đóng"
          text="Đồng chí có chắc muốn hủy thêm mới?"
          onConfirm={() => navigate('/lap-ke-hoach-thu-thap')} 
        />
      </div>
    </div>
  );
};

export default AddKeHoachThuThap;
