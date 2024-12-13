import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../firebaseConfig'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomPopup from '../../../components/CustomPopUp';

import addIcon from '../../../assets/images/Function/Add.png';
import editIcon from '../../../assets/images/Function/ChinhSua.png';
import deleteIcon from '../../../assets/images/Function/DeleteFile.png';

import InputField from './InputField'; 
import SelectInput2 from './SelectInput2';
import InputFieldDate from './InputFieldDate';
import ButtonGroup from './ButtonGroup';  

const ChiTietKeHoachThuThap = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [filePath, setFilePath] = useState('');
  const { id } = useParams(); 
  const [keHoachDetail, setKeHoachDetail] = useState(null);
  const [taiLieuList, setTaiLieuList] = useState([]); 
  const navigate = useNavigate();
  const [phongBanOptions, setPhongBanOptions] = useState([]); // Lưu danh sách phòng ban

  const fileInputRef = useRef(null); 

  useEffect(() => {
    fetch(`/api/lap-ke-hoach-thu-thap/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setKeHoachDetail(data);
        setFilePath(data.taiLieuHD);
        return fetch(`/api/lap-ke-hoach-thu-thap/${id}/tai-lieu-huong-dan`);
      })
      .then((response) => response.json())
      .then((data) => {
        setTaiLieuList(data); 
      })
      .catch((error) => console.error('Error fetching data:', error));

    fetch('/api/phong-ban')
      .then(response => response.json())
      .then(data => {
        const options = data.map(phongBan => ({
          value: phongBan.id,
          label: phongBan.tenPhongBan,
        }));
        setPhongBanOptions(options);
      })
      .catch(error => console.error('Error fetching phong ban:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKeHoachDetail(prevState => ({
      ...prevState,
      [name]: value,  
    }));
  };  
  

  const handleUpdateKeHoach = (status) => {
    if (!keHoachDetail.soKeHoach || !keHoachDetail.tieuDe || !keHoachDetail.ngayBatDau || !keHoachDetail.ngayKetThuc || !keHoachDetail.noiDung) {
      setUploadStatus('Vui lòng nhập đầy đủ thông tin các trường bắt buộc');
      return;
    }
    
    setUploadStatus(null); 
    
    const updatedKeHoach = { ...keHoachDetail, trangThai: status };
  
    fetch(`/api/lap-ke-hoach-thu-thap/${id}`, {
      method: 'PUT',
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
      console.log('Cập nhật thành công:', data);
      navigate('/lap-ke-hoach-thu-thap'); // Điều hướng lại trang danh sách sau khi cập nhật
    })
    .catch((error) => {
      console.error('Lỗi cập nhật:', error.message);
      setUploadStatus(error.message); // Hiển thị lỗi nếu xảy ra
    });
  };
  
  const handleDeleteTaiLieu = (taiLieuId) => {
    if (window.confirm('Đồng chí có chắc muốn xóa tài liệu này không?')) {
      fetch(`/api/lap-ke-hoach-thu-thap/tai-lieu-huong-dan/${taiLieuId}`, {
        method: 'DELETE',
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Xóa tài liệu thất bại');
        }
        return response.json();
      })
      .then(() => {
        // Cập nhật danh sách tài liệu sau khi xóa
        setTaiLieuList(taiLieuList.filter((taiLieu) => taiLieu.id !== taiLieuId));
        setUploadStatus('Đã xóa tài liệu thành công');
      })
      .catch((error) => {
        console.error('Lỗi khi xóa tài liệu:', error);
        setUploadStatus('Lỗi khi xóa tài liệu');
      });
    }
  };
  

  // Xử lý khi chọn file
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Lưu file được chọn vào state
    setSelectedFile(file);
    setUploadStatus(`Đã chọn tệp: ${file.name}`);
  };

  // Nút Upload: Upload file lên Firebase
  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus('Vui lòng chọn tệp trước');
      return;
    }

    const storageRef = ref(storage, `files/${selectedFile.name}`); // Tạo ref đến Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, selectedFile); // Bắt đầu tải lên

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadStatus(`Tải lên: ${progress}%`);
      },
      (error) => {
        setUploadStatus('Lỗi khi tải lên tệp');
        console.error('Error:', error);
      },
      () => {
        // Khi tải lên hoàn thành, lấy URL để xem file đã tải lên
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadStatus('Tải lên thành công');
          setFilePath(downloadURL);
        });
      }
    );
  };

  // Nút Lưu: Lưu đường dẫn tài liệu vào Postgres
  const handleSaveLink = () => {
    if (!filePath) {
      setUploadStatus('Chưa có tài liệu để lưu');
      return;
    }
  
    fetch(`/api/lap-ke-hoach-thu-thap/${id}/tai-lieu`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taiLieuHD: filePath }), 
    })
      .then((response) => response.json())
      .then((data) => {
        setUploadStatus('Đường dẫn tài liệu đã được lưu vào Postgres');
        console.log('Cập nhật tài liệu thành công:', data);
  
        return fetch('/api/lap-ke-hoach-thu-thap/tai-lieu-huong-dan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tenTaiLieu: selectedFile.name,
            link: filePath,
            keHoachThuThapId: parseInt(id, 10),
          }),
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Tạo tài liệu hướng dẫn thành công:', data);
  
        // Gọi lại API để cập nhật danh sách tài liệu
        fetch(`/api/lap-ke-hoach-thu-thap/${id}/tai-lieu-huong-dan`)
          .then((response) => response.json())
          .then((updatedList) => {
            setTaiLieuList(updatedList); // Cập nhật danh sách tài liệu
            setUploadStatus('Danh sách tài liệu đã được cập nhật');
          });
      })
      .catch((error) => {
        console.error('Lỗi khi lưu tài liệu:', error);
        setUploadStatus('Lỗi khi lưu tài liệu');
      });
  };
  
  // Kích hoạt input file
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0]; 
  };

  if (!keHoachDetail) {
    return <div>Loading...</div>;  
  }

  return (

    <div className="container mt-4">
      
      <h5 className="mb-4">
        <i className="bi bi-info-circle"></i> Chi tiết kế hoạch thu thập
      </h5>
      
      <div className="row g-3 mb-4">
        <InputField onChange={handleChange} label="Số kế hoạch" name="soKeHoach" value={keHoachDetail.soKeHoach} disabled={keHoachDetail.trangThai !== 'Tạo mới'} />
        
        <InputField onChange={handleChange} label="Tên kế hoạch" name="tieuDe" value={keHoachDetail.tieuDe} disabled={keHoachDetail.trangThai !== 'Tạo mới'} />

        <InputFieldDate onChange={handleChange} label="Từ ngày" name="ngayBatDau"  value={formatDate(keHoachDetail.ngayBatDau)} disabled={keHoachDetail.trangThai !== 'Tạo mới'} />

        <InputField onChange={handleChange} label="Người duyệt" name="nguoiDuyet"   value={keHoachDetail.nguoiDuyet || 'Chưa có người duyệt'} disabled={true} />

        <InputFieldDate onChange={handleChange} label="Đến ngày" name="ngayKetThuc"   value={formatDate(keHoachDetail.ngayKetThuc)} disabled={keHoachDetail.trangThai !== 'Tạo mới'} />

        <InputField onChange={handleChange} label="Người tạo" name="nguoiTao"  value={keHoachDetail.nguoiTao || 'N/A'} disabled={keHoachDetail.trangThai !== 'Tạo mới'} />

        <InputFieldDate onChange={handleChange} label="Ngày tạo" name="ngayTao" value={formatDate(keHoachDetail.ngayTao)}disabled={keHoachDetail.trangThai !== 'Tạo mới'} />

        <InputField onChange={handleChange} label="Trạng thái" name="trangThai"  value={keHoachDetail.trangThai} disabled />

        <SelectInput2 
          label="Đơn vị thu thập"
          name="donViNopLuuId"
          value={keHoachDetail.donViNopLuuId || ''} 
          onChange={handleChange}
          options={phongBanOptions}
          disabled={keHoachDetail.trangThai !== 'Tạo mới'} 
        />


        {/* Nội dung */}
        <div className="col-md-12 d-flex mb-3">
          <label className="form-label me-2 text-start" style={{ minWidth: '150px' }}>Nội dung:</label>
          <textarea className="form-control" name="noiDung" rows="3" value={keHoachDetail.noiDung || ''} onChange={handleChange} disabled={keHoachDetail.trangThai !== 'Tạo mới'} ></textarea>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end mb-4">
        {keHoachDetail.trangThai === 'Tạo mới' && (
          <CustomPopup 
            className="btn btn-warning mx-2 flex-grow-1" 
            style={{ maxWidth: '150px' }} 
            title="Trình duyệt"
            text="Đồng chí có chắc muốn trình duyệt kế hoạch này không?"
            onConfirm={() => handleUpdateKeHoach('Đã trình duyệt')}
          />
        )}
        {keHoachDetail.trangThai === 'Tạo mới' && (
        <CustomPopup 
          disabled={keHoachDetail.trangThai !== 'Tạo mới'}
          className="btn btn-primary mx-2 flex-grow-1" 
          style={{ maxWidth: '150px', backgroundColor: '#2289E7' }} 
          title="Lưu"
          text="Đồng chí có chắc muốn lưu kế hoạch này không?"
          onConfirm={() => handleUpdateKeHoach('Tạo mới')}
        />
        )}
        <CustomPopup 
          className="btn btn-secondary mx-2 flex-grow-1" 
          style={{ maxWidth: '150px' }} 
          title="Đóng"
          text="Đồng chí có chắc muốn hủy thao tác và đóng không?"
          onConfirm={() => navigate('/lap-ke-hoach-thu-thap')}
        />
      </div>

      {uploadStatus && <div className="alert alert-info">{uploadStatus}</div>}

      {/* Danh sách tài liệu */}
      <div style={{ background: '#D9D9D947', borderRadius: '10px', padding: '15px' }}>
        {/* Dòng đầu tiên: Tài liệu hướng dẫn và nút "+" */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Tài liệu hướng dẫn</h6>
          <button 
            style={{ background: 'transparent', border: 'none' }} 
            onClick={triggerFileInput} 
            disabled={keHoachDetail.trangThai !== 'Tạo mới'}
          >
            <img src={addIcon} alt="Thêm" style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Dòng thứ hai: Bảng hiển thị tài liệu */}
        <table className="table table-striped mt-3">
          <thead style={{ backgroundColor: '#2289E7', color: '#fff' }}>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã tài liệu</th>
              <th scope="col">Tên tài liệu</th>
              <th scope="col">Ngày tạo</th>
              <th scope="col">Hành động</th>
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
                  <td>
                    <button className="btn btn-sm me-2">
                      <img src={editIcon} alt="edit" width="20" /> 
                    </button>
                    <button className="btn btn-sm" onClick={() => handleDeleteTaiLieu(taiLieu.id)}>
                      <img src={deleteIcon} alt="delete" width="20" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Không có tài liệu nào</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Dòng thứ ba: Thẻ "Xem tài liệu" */}
        {/* {filePath && taiLieuList.length === 0 && (
          <a href={filePath} target="_blank" rel="noopener noreferrer" className="btn btn-link" style={{ color: '#043371' }}>
            Xem tài liệu 
          </a>
        )} */}

        {/* Dòng cuối cùng: Nút Upload File và Lưu */}
        <div className="d-flex justify-content-end mt-3">
          <button 
            className="btn btn-success mx-2" 
            onClick={handleUpload} 
            disabled={keHoachDetail.trangThai !== 'Tạo mới'}
          >
            Upload File
          </button>
          <button 
            className="btn btn-primary mx-2" 
            onClick={handleSaveLink} 
            style={{ width: '100px', backgroundColor:'#2289E7' }} 
            disabled={keHoachDetail.trangThai !== 'Tạo mới'}
          >
            Lưu
          </button>
        </div>

        {/* Input file (ẩn) */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
        />
      </div>


    </div>
  );
};

export default ChiTietKeHoachThuThap;
