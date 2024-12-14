import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../firebaseConfig';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import addIcon from '../../../assets/images/Function/Add.png';

const ChiTietTaiLieu = () => {
  const { taiLieuId } = useParams();
  const navigate = useNavigate();
  const [taiLieu, setTaiLieu] = useState({
    tenTaiLieu: '',
    khungBienMuc: '',
    maDinhDanhTL: '',
    maDinhDanhVanBan: '',
    hoSoId: '',
    sttTrongHoSo: '',
    tenLoaiVanBan: '',
    soVanBan: '',
    kyHieuTaiLieu: '',
    ngayThangNamVB: '',
    tenCoQuanBanHanh: 'Bộ Nội vụ',
    trichYeuNoiDung: '',
    ngonNgu: 'VN',
    soLuongTrang: '',
    ghiChu: '',
    kyHieuThongTin: '',
    tuKhoa: '',
    butTich: '',
    cheDoSuDung: 'Mật',
    mucDoTinCay: 'Cao',
    tinhTrangVatLy: 'Nguyên vẹn',
    ngayTao: '',
    link: ''
  });
  const [hoSoTrangThai, setHoSoTrangThai] = useState(''); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch(`/api/tai-lieu/${taiLieuId}`)
      .then(response => response.json())
      .then(data => {
        setTaiLieu(data);
        return fetch(`/api/ho-so/${data.hoSoId}/name-status`);
      })
      .then(response => response.json())
      .then(data => {
        setTaiLieu(prevState => ({
          ...prevState,
          hoSoTen: data.tenHoSo 
        }));
        setHoSoTrangThai(data.trangThai); 
      })
      .catch(error => console.error('Lỗi khi lấy chi tiết tài liệu hoặc trạng thái hồ sơ:', error));
  }, [taiLieuId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setTaiLieu(prevTaiLieu => ({ ...prevTaiLieu, link: '' }));
    setUploadStatus(`Đã chọn tệp: ${file.name}`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target; // Lấy tên và giá trị từ trường input
    setTaiLieu((prevTaiLieu) => ({
      ...prevTaiLieu,
      [name]: value, // Cập nhật trường tương ứng trong state
    }));
  };
  

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus('Vui lòng chọn tệp trước');
      return;
    }

    const storageRef = ref(storage, `files/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadStatus(`Tải lên: ${progress.toFixed(2)}%`);
      },
      (error) => {
        setUploadStatus('Lỗi khi tải lên tệp');
        console.error('Error:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setTaiLieu(prevState => ({ ...prevState, link: downloadURL }));
          setUploadStatus('Tải lên thành công');
        });
      }
    );
  };

  const handleSave = () => {
    if (!taiLieu.link) {
      setUploadStatus('Chưa có link tài liệu. Vui lòng tải lên tệp.');
      return;
    }

    fetch(`/api/tai-lieu/${taiLieuId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taiLieu),
    })
      .then(response => response.json())
      .then(() => {
        setUploadStatus('Tài liệu đã được lưu thành công');
        window.alert('Tài liệu đã được lưu thành công');
        navigate(-1); 
      })
      .catch(error => {
        console.error('Lỗi khi lưu tài liệu:', error);
        setUploadStatus('Lỗi khi lưu tài liệu');
      });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleBack = () => navigate(-1);

  const isEditable = ['Tạo mới', 'Từ chối nộp lưu', 'Cần thu thập lại'].includes(hoSoTrangThai);

  return (
    <div className="container mt-4">
      <h5 className="mb-4">Chi tiết tài liệu</h5>
      <div className="row g-3">
        {/* <TextInput label="Tên tài liệu" name="tenTaiLieu" value={taiLieu.tenTaiLieu} disabled={!isEditable} onChange={handleChange}/> */}
        <SelectInput label="Khung biên mục" name="khungBienMuc" value={taiLieu.khungBienMuc} onChange={handleChange} options={['Văn bản', 'Tài liệu phim ảnh', 'Tài liệu phim âm thanh']} disabled={!isEditable} />
        <TextInput onChange={handleChange} label="Trích yếu nội dung" name="trichYeuNoiDung" value={taiLieu.trichYeuNoiDung} disabled={!isEditable} />
        <TextInput onChange={handleChange} label="Tên hồ sơ" name="hoSoTen" value={taiLieu.hoSoTen} disabled />

        <SelectInput onChange={handleChange} label="Tên cơ quan ban hành" name="tenCoQuanBanHanh" value={taiLieu.tenCoQuanBanHanh} options={['Bộ Nội vụ', 'Bộ Quốc phòng']} disabled={!isEditable} />
        <TextInput onChange={handleChange} label="Mã định danh văn bản" name="maDinhDanhVanBan" value={taiLieu.maDinhDanhVanBan} disabled={!isEditable} />

        <SelectInput onChange={handleChange} label="Ngôn ngữ" name="ngonNgu" value={taiLieu.ngonNgu} options={['VN', 'EN']} disabled={!isEditable} />
        <TextInput onChange={handleChange} label="STT trong hồ sơ" name="sttTrongHoSo" value={taiLieu.sttTrongHoSo} disabled={!isEditable} />
        <TextInput onChange={handleChange} label="Số lượng trang" name="soLuongTrang" value={taiLieu.soLuongTrang} disabled={!isEditable} />
        <TextInput onChange={handleChange} label="Tên loại văn bản" name="tenLoaiVanBan" value={taiLieu.tenLoaiVanBan} disabled={!isEditable} />
        <TextInput onChange={handleChange} label="Ghi chú" name="ghiChu" value={taiLieu.ghiChu} disabled={!isEditable} />
        <TextInput onChange={handleChange} label="Số văn bản" name="soVanBan" value={taiLieu.soVanBan} disabled={!isEditable} />
        <TextInput onChange={handleChange} label="Ký hiệu thông tin" name="kyHieuThongTin" value={taiLieu.kyHieuThongTin} disabled={!isEditable} />
        <TextInput onChange={handleChange} label="Ký hiệu tài liệu" name="kyHieuTaiLieu" value={taiLieu.kyHieuTaiLieu} disabled={!isEditable} />
        <TextInput onChange={handleChange} label="Từ khóa" name="tuKhoa" value={taiLieu.tuKhoa} disabled={!isEditable} />
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2 text-start" style={{ minWidth: '180px' }}>Ngày tháng năm VB:</label>
          <input type="date" className="form-control" name="ngayThangNamVB" value={taiLieu.ngayThangNamVB ? new Date(taiLieu.ngayThangNamVB).toISOString().split('T')[0] : ''} disabled={!isEditable} />
        </div>
        <TextInput onChange={handleChange} label="Bút tích" name="butTich" value={taiLieu.butTich} disabled={!isEditable} />
        <SelectInput onChange={handleChange} label="Chế độ sử dụng" name="cheDoSuDung" value={taiLieu.cheDoSuDung} options={['Hạn chế', 'Không hạn chế']} disabled={!isEditable}/>
        <SelectInput onChange={handleChange} label="Tình trạng vật lý" name="tinhTrangVatLy" value={taiLieu.tinhTrangVatLy} options={['Bị mốc nhẹ', 'Bình thường', 'Bị hư hỏng']} disabled={!isEditable} />
        <SelectInput onChange={handleChange} label="Mức độ tin cậy" name="mucDoTinCay" value={taiLieu.mucDoTinCay} options={['Bản sao', 'Bản chính']} disabled={!isEditable} />
      </div>

      {uploadStatus && <div className="alert alert-info mt-3">{uploadStatus}</div>}

      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-outline-secondary mx-2" onClick={triggerFileInput}>
          <img src={addIcon} alt="Thêm" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
          Chọn tệp
        </button>
        <button className="btn btn-primary mx-2" onClick={handleUpload}>
          Tải lên
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
      </div>

      {taiLieu.link && (
        <div className="mt-3">
          <a href={taiLieu.link} target="_blank" rel="noopener noreferrer">
            Xem tài liệu tại đây
          </a>
        </div>
      )}

      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-success mx-2" onClick={handleSave}>Lưu</button>
        <button className="btn btn-secondary mx-2" onClick={handleBack}>Đóng</button>
      </div>
    </div>
  );
};

export default ChiTietTaiLieu;
