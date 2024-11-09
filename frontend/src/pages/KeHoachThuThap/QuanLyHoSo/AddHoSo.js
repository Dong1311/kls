import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import CustomPopup from '../../../components/CustomPopUp';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import KeHoachThuThapSelectInput from '../../../components/KeHoachThuThapSelectInput';

const AddHoSo = () => {
  const { name } = useContext(UserContext);
  const [hoSo, setHoSo] = useState({
    maHoSo: '',
    kyHieuThongTin: '',
    maDinhDanhCoQuan: '',
    nguoiTao: name,
    mucLucSoNamHS: '',
    ngayTao: new Date().toISOString().split('T')[0],
    soVaKyHieuHoSo: '',
    tongSoTaiLieu: '',
    tieuDeHoSo: '',
    tongSoTrang: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    cheDoSuDung: 'Hạn chế',
    tinhTrangVatLy: 'Bình thường',
    thoiHanBaoQuan: '1 năm',
    tuKhoa: '',
    chuGiai: '',
    donViNopLuu: '',
    ngonNgu: '',
    trangThai: 'Tạo mới',
    keHoachThuThapId: '', // Sẽ được cập nhật từ KeHoachThuThapSelectInput
  });

  const [keHoachOptions, setKeHoachOptions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Lấy dữ liệu kế hoạch thu thập có trạng thái "Tạo mới"
  useEffect(() => {
    fetch('/api/lap-ke-hoach-thu-thap?trangThai=Đã trình duyệt')
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
      .then(data => setKeHoachOptions(data))
      .catch(error => console.error('Error fetching keHoachThuThap:', error));
  }, []);
  // Cập nhật các trường trong form khi có thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHoSo(prevHoSo => ({
      ...prevHoSo,
      [name]: name === 'tongSoTaiLieu' || name === 'tongSoTrang' ? parseInt(value, 10) || 0 : value
    }));
  };
  console.log(keHoachOptions)

  // Xử lý lưu hồ sơ
  const handleSubmit = (status) => {
    if (!hoSo.maHoSo || !hoSo.tieuDeHoSo) {
      setError('Vui lòng nhập đầy đủ thông tin các trường bắt buộc');
      return;
    }
    setError(null);

    const updatedHoSo = { ...hoSo, trangThai: status };

    fetch('/api/ho-so', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedHoSo),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        navigate('/quan-ly-ho-so');
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
      });
  };

  const thoiHanOptions = ["1 năm", "2 năm", "5 năm", "10 năm", "20 năm", "50 năm", "Vĩnh viễn"];
  const cheDoSuDungOptions = ["Hạn chế", "Không hạn chế"];
  const tinhTrangOptions = ["Bình thường", "Bị hư hỏng", "Bị mốc nhẹ"];
  const ngonNguOptions = ["VN", "EN"];
  return (
    <div className="container mt-4">
      <h5 className="mb-4">
        <i className="bi bi-info-circle"></i> Thêm mới hồ sơ
      </h5>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3 mb-4">
        <TextInput label="Mã hồ sơ" name="maHoSo" value={hoSo.maHoSo} onChange={handleChange} />
        <TextInput label="Ký hiệu thông tin" name="kyHieuThongTin" value={hoSo.kyHieuThongTin} onChange={handleChange} />
        <TextInput label="Mã định danh cơ quan" name="maDinhDanhCoQuan" value={hoSo.maDinhDanhCoQuan} onChange={handleChange} />
        <TextInput label="Người tạo" name="nguoiTao" value={hoSo.nguoiTao} onChange={handleChange} />
        <TextInput label="Mục lục số/năm HS" name="mucLucSoNamHS" value={hoSo.mucLucSoNamHS} onChange={handleChange} />
        <TextInput label="Ngày tạo" name="ngayTao" value={hoSo.ngayTao} onChange={handleChange} />
        <TextInput label="Số và ký hiệu hồ sơ" name="soVaKyHieuHoSo" value={hoSo.soVaKyHieuHoSo} onChange={handleChange} />
        <TextInput label="Tổng số tài liệu" name="tongSoTaiLieu" value={hoSo.tongSoTaiLieu} onChange={handleChange} />
        <TextInput label="Tiêu đề hồ sơ" name="tieuDeHoSo" value={hoSo.tieuDeHoSo} onChange={handleChange} />
        <TextInput label="Tổng số trang" name="tongSoTrang" value={hoSo.tongSoTrang} onChange={handleChange} />
        <div className="col-md-6 d-flex align-items-center mb-3">
            <label className="form-label me-2 text-start" style={{ minWidth: '180px' }}>Ngày bắt đầu:</label>
            <input
                type="date"
                className="form-control"
                name="ngayBatDau"
                value={hoSo.ngayBatDau}
                onChange={handleChange}
            />
        </div>        
        <SelectInput label="Chế độ sử dụng" name="cheDoSuDung" value={hoSo.cheDoSuDung} onChange={handleChange} options={cheDoSuDungOptions} />
        <div className="col-md-6 d-flex align-items-center mb-3">
            <label className="form-label me-2 text-start" style={{ minWidth: '180px' }}>Ngày kết thúc:</label>
            <input
                type="date"
                className="form-control"
                name="ngayKetThuc"
                value={hoSo.ngayKetThuc}
                onChange={handleChange}
            />
        </div>        
        <SelectInput label="Tình trạng vật lý" name="tinhTrangVatLy" value={hoSo.tinhTrangVatLy} onChange={handleChange} options={tinhTrangOptions} />
        <SelectInput label="Thời hạn bảo quản" name="thoiHanBaoQuan" value={hoSo.thoiHanBaoQuan} onChange={handleChange} options={thoiHanOptions} />
        <TextInput label="Từ khóa" name="tuKhoa" value={hoSo.tuKhoa} onChange={handleChange} />
        <TextInput label="Đơn vị nộp lưu" name="donViNopLuu" value={hoSo.donViNopLuu} onChange={handleChange} />
        <TextInput label="Chú giải" name="chuGiai" value={hoSo.chuGiai} onChange={handleChange} />
        <SelectInput label="Ngôn ngữ" name="ngonNgu" value={hoSo.ngonNgu} onChange={handleChange} options={ngonNguOptions} />
        {/* SelectInput cho kế hoạch thu thập */}
        <KeHoachThuThapSelectInput
          value={hoSo.keHoachThuThapId}
          onChange={handleChange}
          options={keHoachOptions.map(option => ({
            value: option.id,
            label: option.tieuDe
          }))}
        />

        <TextInput label="Trạng thái" nahandleChange me="trangThai" value={hoSo.trangThai} onChange={handleChange} disabled />


      </div>

      <div className="d-flex justify-content-end mb-4">
        <CustomPopup className="btn btn-warning mx-2 flex-grow-1" style={{ maxWidth: '180px' }} title="Trình duyệt" text="Đồng chí có chắc muốn lưu và trình duyệt hồ sơ này?" onConfirm={() => handleSubmit('Đã trình duyệt')} />
        <CustomPopup className="btn btn-primary mx-2 flex-grow-1" style={{ maxWidth: '180px' }} title="Lưu" text="Đồng chí có chắc muốn lưu hồ sơ này?" onConfirm={() => handleSubmit('Tạo mới')} />
        <CustomPopup className="btn btn-secondary mx-2 flex-grow-1" style={{ maxWidth: '180px' }} title="Đóng" text="Đồng chí có chắc muốn hủy thêm mới?" onConfirm={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default AddHoSo;
