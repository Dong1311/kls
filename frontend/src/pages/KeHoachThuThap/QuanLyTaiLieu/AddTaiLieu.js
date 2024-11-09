// AddTaiLieu.js
import React, { useState,useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../firebaseConfig';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import HoSoSelectInput from '../../../components/HoSoSelectInput';
import addIcon from '../../../assets/images/Function/Add.png';

const AddTaiLieu = () => {
  const navigate = useNavigate();
  const [hoSoList, setHoSoList] = useState([]); // Danh sách hồ sơ để hiển thị trong select input
  const [taiLieu, setTaiLieu] = useState({
    tenTaiLieu: '',
    khungBienMuc: '',
    maDinhDanhVanBan: '',
    sttTrongHoSo: '',
    tenLoaiVanBan: '',
    soVanBan: '',
    kyHieuTaiLieu: '',
    ngayThangNamVB: '',
    tenCoQuanBanHanh: 'Bộ Nội vụ',
    trichYeuNoiDung: '',
    ngonNgu: 'Tiếng Việt',           
    soLuongTrang: '',
    ghiChu: '',
    kyHieuThongTin: '',
    tuKhoa: '',
    butTich: '',
    cheDoSuDung: 'Mật',              
    mucDoTinCay: 'Cao',              
    tinhTrangVatLy: 'Nguyên vẹn',
    ngayTao: new Date().toISOString(), 
    link: '',
    hoSoId: '' // Thêm trường hoSoId để lưu id của hồ sơ đã chọn
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = useRef(null);

  // Lấy danh sách hồ sơ có trạng thái "Tạo mới"
  useEffect(() => {
    fetch('/api/ho-so?trangThai=Tạo mới')
      .then((response) => response.json())
      .then((data) => {
        setHoSoList(data); // Cập nhật danh sách hồ sơ trong select input
      })
      .catch((error) => console.error('Lỗi khi lấy danh sách hồ sơ:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaiLieu({ ...taiLieu, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setTaiLieu((prevTaiLieu) => ({ ...prevTaiLieu, link: '' }));
    setUploadStatus(`Đã chọn tệp: ${file.name}`);
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
          setTaiLieu((prevState) => ({ ...prevState, link: downloadURL }));
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

    fetch(`/api/ho-so/${taiLieu.hoSoId}/tai-lieu`, { // Thêm tài liệu vào hồ sơ đã chọn
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taiLieu),
    })
      .then((response) => response.json())
      .then((data) => {
        setUploadStatus('Tài liệu đã được lưu thành công');
        console.log('Lưu tài liệu thành công:', data);
        window.alert('Tài liệu đã được lưu thành công');
        navigate(-1);
      })
      .catch((error) => {
        console.error('Lỗi khi lưu tài liệu:', error);
        setUploadStatus('Lỗi khi lưu tài liệu');
      });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-4">Thêm mới tài liệu</h5>
      <div className="row g-3">
        <TextInput label="Tên tài liệu" name="tenTaiLieu" value={taiLieu.tenTaiLieu} onChange={handleChange} />
        <TextInput label="Khung biên mục" name="khungBienMuc" value={taiLieu.khungBienMuc} onChange={handleChange} />
        <HoSoSelectInput label="Tên hồ sơ" name="hoSoId" value={taiLieu.hoSoId} onChange={handleChange} options={hoSoList.map(hoSo => ({ value: hoSo.id, label: hoSo.tieuDeHoSo }))} />
        <SelectInput label="Tên cơ quan ban hành" name="tenCoQuanBanHanh" value={taiLieu.tenCoQuanBanHanh} onChange={handleChange} options={['Bộ Nội vụ', 'Bộ Quốc phòng']} />
        <TextInput label="Mã định danh văn bản" name="maDinhDanhVanBan" value={taiLieu.maDinhDanhVanBan} onChange={handleChange} />
        <TextInput label="Trích yếu nội dung" name="trichYeuNoiDung" value={taiLieu.trichYeuNoiDung} onChange={handleChange} />
        <SelectInput label="Ngôn ngữ" name="ngonNgu" value={taiLieu.ngonNgu} onChange={handleChange} options={['VN', 'EN']} />
        <TextInput label="STT trong hồ sơ" name="sttTrongHoSo" value={taiLieu.sttTrongHoSo} onChange={handleChange} />
        <TextInput label="Số lượng trang" name="soLuongTrang" value={taiLieu.soLuongTrang} onChange={handleChange} />
        <TextInput label="Tên loại văn bản" name="tenLoaiVanBan" value={taiLieu.tenLoaiVanBan} onChange={handleChange} />
        <TextInput label="Ghi chú" name="ghiChu" value={taiLieu.ghiChu} onChange={handleChange} />
        <TextInput label="Số văn bản" name="soVanBan" value={taiLieu.soVanBan} onChange={handleChange} />
        <TextInput label="Ký hiệu thông tin" name="kyHieuThongTin" value={taiLieu.kyHieuThongTin} onChange={handleChange} />
        <TextInput label="Ký hiệu tài liệu" name="kyHieuTaiLieu" value={taiLieu.kyHieuTaiLieu} onChange={handleChange} />
        <TextInput label="Từ khóa" name="tuKhoa" value={taiLieu.tuKhoa} onChange={handleChange} />
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2 text-start" style={{ minWidth: '180px' }}>Ngày tháng năm VB:</label>
          <input type="date" className="form-control" name="ngayThangNamVB" value={taiLieu.ngayThangNamVB} onChange={handleChange} />
        </div>
        <TextInput label="Bút tích" name="butTich" value={taiLieu.butTich} onChange={handleChange} />
        <SelectInput label="Chế độ sử dụng" name="cheDoSuDung" value={taiLieu.cheDoSuDung} onChange={handleChange} options={['Mật', 'Không mật']} />
        <SelectInput label="Tình trạng vật lý" name="tinhTrangVatLy" value={taiLieu.tinhTrangVatLy} onChange={handleChange} options={['Bị mốc nhẹ', 'Nguyên vẹn']} />
        <SelectInput label="Mức độ tin cậy" name="mucDoTinCay" value={taiLieu.mucDoTinCay} onChange={handleChange} options={['Cao', 'Thấp']} />
      </div>

      {uploadStatus && <div className="alert alert-info mt-3">{uploadStatus}</div>}

      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-outline-secondary mx-2" onClick={triggerFileInput}>
          <img src={addIcon} alt="Thêm" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
          Chọn tệp
        </button>
        <button className="btn btn-primary mx-2" onClick={handleUpload}>Tải lên</button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
      </div>

      {taiLieu.link && (
        <div className="mt-3">
          <a href={taiLieu.link} target="_blank" rel="noopener noreferrer">Xem tài liệu tại đây</a>
        </div>
      )}

      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-success mx-2" onClick={handleSave}>Lưu</button>
        <button className="btn btn-secondary mx-2" onClick={() => navigate(-1)}>Đóng</button>
      </div>
    </div>
  );
};

export default AddTaiLieu;
