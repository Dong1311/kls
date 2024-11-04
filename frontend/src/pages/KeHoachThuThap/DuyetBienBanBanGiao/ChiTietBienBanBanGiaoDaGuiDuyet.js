import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import TextInput from '../../../components/TextInput';
import SelectInput2 from './SelectInput2';
import 'bootstrap/dist/css/bootstrap.min.css';
import addIcon from '../../../assets/images/Function/Add.png';
import { Link } from 'react-router-dom';

const ChiTietBienBanBanGiaoDaGuiDuyet = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const { name } = useContext(UserContext);
  const [hoSoList, setHoSoList] = useState([]);
  const navigate = useNavigate();
  const [bienBan, setBienBan] = useState({
    soBienBan: '',
    tieuDe: '',
    ngayLap: '',
    canCu: '',
    tenCoQuanThuThap: 'Cục kỹ thuật nghiệp vụ',
    donViNopLuu: '',
    daiDienBenGiaoId: '',
    daiDienBenNhanId: '',
    trangThaiBienBan: '',
  });
  const [selectedHoSoList, setSelectedHoSoList] = useState([]);
  const [donViOptions, setDonViOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [keHoachOptions, setKeHoachOptions] = useState([]);
  const [hoSoOptions, setHoSoOptions] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  // Lấy thông tin biên bản bàn giao
  useEffect(() => {
    fetch(`/api/bien-ban-ban-giao/${id}`)
      .then(response => response.json())
      .then(data => {
        setBienBan(data);
        setSelectedHoSoList(data.hoSos || []);
        setIsEditable(data.trangThaiBienBan === 'Tạo mới');
      })
      .catch(error => console.error('Lỗi khi tải chi tiết biên bản:', error));
  }, [id]);

  // Lấy các tùy chọn danh sách
  useEffect(() => {
    fetch('/api/phong-ban').then(response => response.json()).then(setDonViOptions);
    fetch('/api/users').then(response => response.json()).then(setUserOptions);
    fetch('/api/lap-ke-hoach-thu-thap').then(response => response.json()).then(setKeHoachOptions);
  }, []);

  useEffect(() => {
    const fetchHoSoList = async () => {
        try {
            const response = await fetch(`/api/bien-ban-ban-giao/${bienBan.id}/ho-so`);
            const data = await response.json();
            setHoSoList(data);
        } catch (error) {
            console.error('Error fetching HoSo list:', error);
        }
    };

    if (bienBan.id) {
        fetchHoSoList();
        console.log("hoSoListed")
    }
  }, [bienBan.id]);

  // Xử lý thay đổi
  const handleChange = e => {
    const { name, value } = e.target;
    setBienBan(prevBienBan => ({
      ...prevBienBan,
      [name]: ['donViNopLuu', 'canCu', 'daiDienBenGiaoId', 'daiDienBenNhanId'].includes(name) ? parseInt(value, 10) || '' : value,
    }));
  };

  const handleAddRow = () => {
    setSelectedHoSoList(prevList => [...prevList, { id: '', details: {} }]);
  };

  useEffect(() => {
    if (bienBan.canCuId) {
      fetch(`/api/lap-ke-hoach-thu-thap/${bienBan.canCuId}/ho-so?trangThai=Đã trình NLLS`)
        .then(response => response.json())
        .then(data => setHoSoOptions(data))
        .catch(error => console.error('Lỗi khi lấy hồ sơ:', error));
    }
  }, [bienBan.canCuId]);
  
  // Đồng bộ `handleHoSoChange` để cập nhật `selectedHoSoList`
  const handleHoSoChange = (e, index) => {
    const selectedId = parseInt(e.target.value, 10);
    const hoSoDetail = hoSoOptions.find(hoSo => hoSo.id === selectedId) || {};
  
    setSelectedHoSoList(prevList => {
      const updatedList = [...prevList];
      updatedList[index] = { id: selectedId, details: hoSoDetail };
      return updatedList;
    });
  };


  const handleSubmit = async (status) => {
    // Tạo bản sao `bienBan` với `hoSos` từ `selectedHoSoList`
    const updatedBienBan = {
      ...bienBan,
      soBienBan: bienBan.soBienBan.toString(),
      tieuDe: bienBan.tieuDe.toString(),
      trangThaiBienBan: status, 
      hoSos: selectedHoSoList.map(hoSo => hoSo.id) 
    };
  
    console.log('Data to be sent:', updatedBienBan); // Log dữ liệu để kiểm tra
  
    try {
      const response = await fetch(`/api/bien-ban-ban-giao/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBienBan),
      });
  
      if (response.ok) {
        alert('Biên bản đã được duyệt thành công.');
        navigate('/danh-sach-bien-ban-ban-giao');
      } else {
        throw new Error('Lỗi khi duyệt biên bản');
      }
    } catch (error) {
      console.error('Lỗi khi duyệt biên bản:', error);
      alert('Lỗi khi duyệt biên bản');
    }
  };
  
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-4">Chi tiết Biên bản bàn giao</h5>

      <div className="row g-3">
        <TextInput label="Số biên bản" name="soBienBan" value={bienBan.soBienBan} onChange={handleChange} required disabled={!isEditable} />
        
        <SelectInput2
          label="Đơn vị thu thập"
          name="donViNopLuuId" // Đổi từ 'donViNopLuu' thành 'donViNopLuuId'
          value={bienBan.donViNopLuuId} // Đảm bảo giá trị là ID
          onChange={handleChange}
          options={donViOptions.map(donVi => ({ value: donVi.id, label: donVi.tenPhongBan }))}
          required
          disabled={!isEditable}
        />
        
        <TextInput label="Tiêu đề biên bản" name="tieuDe" value={bienBan.tieuDe} onChange={handleChange} required disabled={!isEditable} />

        <TextInput label="Cơ quan lưu trữ" name="tenCoQuanThuThap" value={bienBan.tenCoQuanThuThap} onChange={handleChange} disabled />

        <TextInput label="Ngày lập biên bản" name="ngayLap" type="date" value={formatDate(bienBan.ngayLap)} onChange={handleChange} disabled />

        <SelectInput2
          label="Đại diện bên giao"
          name="daiDienBenGiaoId"
          value={bienBan.daiDienBenGiaoId}
          onChange={handleChange}
          options={userOptions.map(user => ({ value: user.id, label: user.name }))}
          required
          disabled={!isEditable}
        />

        <SelectInput2
          label="Căn cứ"
          name="canCuId" // Đổi từ 'canCu' thành 'canCuId'
          value={bienBan.canCuId} // Đảm bảo giá trị là ID
          onChange={handleChange}
          options={keHoachOptions.map(keHoach => ({ value: keHoach.id, label: keHoach.tieuDe }))}
          required
          disabled={!isEditable}
        />

        <SelectInput2
          label="Đại diện bên nhận"
          name="daiDienBenNhanId"
          value={bienBan.daiDienBenNhanId}
          onChange={handleChange}
          options={userOptions.map(user => ({ value: user.id, label: user.name }))}
          required
          disabled={!isEditable}
        />

        <TextInput label="Trạng thái biên bản" name="trangThaiBienBan" value={bienBan.trangThaiBienBan} disabled />
      </div>

      {/* Giao diện danh sách hồ sơ */}
      <div style={{ background: '#D9D9D947', borderRadius: '10px', padding: '15px' }}>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="text-start">Danh sách hồ sơ</h6>
          <div style={{ display: 'flex', padding: '8px' }}>
            <button style={{ background: 'transparent', border: 'none', marginRight: '10px' }} onClick={handleAddRow} disabled={!isEditable}>
              <img src={addIcon} alt="Thêm" style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
        </div>

        <table className="table table-striped mt-2" style={{ background: '#D9D9D947' }}>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã hồ sơ</th>
                    <th>Tiêu đề hồ sơ</th>
                    <th>Người tạo</th>
                    <th>Ngày tạo</th>
                    <th>Số lượng tài liệu</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
              {/* Hiển thị các hồ sơ hiện có trong hoSoList */}
              {hoSoList.map((hoSo, index) => (
                  <tr key={hoSo.id}>
                      <td>{index + 1}</td>
                      <td>{hoSo.maHoSo}</td>
                      <td>
                        <Link to={`/ho-so/${hoSo.id}`} style={{ color: '#043371' }}>
                          {hoSo.tieuDeHoSo}
                        </Link>
                      </td>

                      <td>{hoSo.nguoiTao}</td>
                      <td>{hoSo.ngayTao ? new Date(hoSo.ngayTao).toLocaleDateString() : ''}</td>
                      <td>{hoSo.tongSoTaiLieu}</td>
                      <td>{hoSo.trangThai}</td>
                  </tr>
              ))}

              {/* Hiển thị các hàng trống mới từ selectedHoSoList */}
              {selectedHoSoList.map((hoSo, index) => (
                  <tr key={`new-${index}`}>
                      <td>{hoSoList.length + index + 1}</td>
                      <td>
                          <select
                              value={hoSo.id}
                              onChange={(e) => handleHoSoChange(e, index)}
                              className="form-control"
                              disabled={!isEditable}
                          >
                              <option value="">Chọn mã hồ sơ</option>
                              {hoSoOptions.map(hoSoOption => (
                                  <option key={hoSoOption.id} value={hoSoOption.id}>
                                      {hoSoOption.maHoSo}
                                  </option>
                              ))}
                          </select>
                      </td>
                      <td>{hoSo.details.tieuDeHoSo || ''}</td>
                      <td>{hoSo.details.nguoiTao || ''}</td>
                      <td>{hoSo.details.ngayTao ? new Date(hoSo.details.ngayTao).toLocaleDateString() : ''}</td>
                      <td>{hoSo.details.tongSoTaiLieu || ''}</td>
                      <td>{hoSo.details.trangThai || ''}</td>
                  </tr>
              ))}

              {/* Trường hợp không có hồ sơ nào */}
              {hoSoList.length === 0 && selectedHoSoList.length === 0 && (
                  <tr>
                      <td colSpan="7">Không có hồ sơ nào.</td>
                  </tr>
              )}
          </tbody>

        </table>

      </div>

      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-success mx-2" onClick={() => handleSubmit('Đã nhận')} style={{ minWidth: '180px' }} >
          Duyệt
        </button>
        {/* <button className="btn btn-primary mx-2" onClick={() => handleSubmit('Tạo mới')} style={{ minWidth: '180px' }} disabled={!isEditable}>
          Lưu
        </button> */}
        <button className="btn btn-secondary mx-2" onClick={() => navigate(-1)} style={{ minWidth: '180px' }}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default ChiTietBienBanBanGiaoDaGuiDuyet;
