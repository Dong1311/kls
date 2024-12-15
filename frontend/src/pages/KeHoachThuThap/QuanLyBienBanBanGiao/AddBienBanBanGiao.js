import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import SelectInput2 from './SelectInput2';
import addIcon from '../../../assets/images/Function/Add.png';

import 'bootstrap/dist/css/bootstrap.min.css';

const AddBienBanBanGiao = () => {
  const { name } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedHoSoList, setSelectedHoSoList] = useState([]);


  const [bienBan, setBienBan] = useState({
    soBienBan: '',
    tieuDe: '',
    ngayLap: new Date().toISOString().split('T')[0],
    canCu: '',
    tenCoQuanThuThap: 'Cục kỹ thuật nghiệp vụ',
    donViNopLuu: '',
    daiDienBenGiaoId: '',
    daiDienBenNhanId: '',
    trangThaiBienBan: 'Tạo mới',
  });

  const [error, setError] = useState(null);
  const [donViOptions, setDonViOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [keHoachOptions, setKeHoachOptions] = useState([]); // Danh sách kế hoạch thu thập
  const [hoSoOptions, setHoSoOptions] = useState([]); // Danh sách hồ sơ liên kết
  const [selectedHoSo, setSelectedHoSo] = useState(null);
  const [selectedHoSoDetails, setSelectedHoSoDetails] = useState({});

  useEffect(() => {
    // Fetch danh sách phòng ban
    fetch('/api/phong-ban')
      .then(response => {
        if (!response.ok) throw new Error('Không lấy được danh sách phòng ban');
        return response.json();
      })
      .then(data => setDonViOptions(data))
      .catch(error => console.error('Lỗi khi lấy phòng ban:', error));

    // Fetch danh sách người dùng
    fetch('/api/users')
      .then(response => {
        if (!response.ok) throw new Error('Không lấy được danh sách người dùng');
        return response.json();
      })
      .then(data => setUserOptions(data))
      .catch(error => console.error('Lỗi khi lấy người dùng:', error));

    // Fetch danh sách kế hoạch thu thập
    fetch('/api/lap-ke-hoach-thu-thap')
      .then(response => {
        if (!response.ok) throw new Error('Không lấy được danh sách kế hoạch thu thập');
        return response.json();
      })
      .then(data => setKeHoachOptions(data))
      .catch(error => console.error('Lỗi khi lấy kế hoạch thu thập:', error));
  }, []);

  // Cập nhật danh sách hồ sơ khi kế hoạch thu thập thay đổi
  useEffect(() => {
    if (bienBan.canCu) {
      fetch(`/api/lap-ke-hoach-thu-thap/${bienBan.canCu}/ho-so?trangThai=Đã nhận NLLS`)
        .then(response => {
          if (!response.ok) throw new Error('Không lấy được danh sách hồ sơ');
          return response.json();
        })
        .then(data => setHoSoOptions(data))
        .catch(error => console.error('Lỗi khi lấy hồ sơ:', error));
    }
  }, [bienBan.canCu]);

  useEffect(() => {
    if (selectedHoSo) {
      const hoSoDetail = hoSoOptions.find(hoSo => hoSo.id === parseInt(selectedHoSo, 10));
      setSelectedHoSoDetails(hoSoDetail || {});
      console.log('hososelected', hoSoDetail); 
    } else {
      setSelectedHoSoDetails({});
    }
  }, [selectedHoSo, hoSoOptions]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBienBan(prevBienBan => ({
      ...prevBienBan,
      [name]: ['donViNopLuu', 'canCu', 'daiDienBenGiaoId', 'daiDienBenNhanId'].includes(name)
      ? parseInt(value, 10) || '' 
      : value
    }));
  };

  const handleHoSoChange = (e, index) => {
    const selectedId = parseInt(e.target.value, 10); // Chuyển đổi sang số nguyên
    const hoSoDetail = hoSoOptions.find(hoSo => hoSo.id === selectedId) || {};
  
    setSelectedHoSoList(prevList => {
      const updatedList = [...prevList];
      updatedList[index] = { id: selectedId, details: hoSoDetail };
      return updatedList;
    });
  };
  

  const handleAddRow = () => {
    setSelectedHoSoList([...selectedHoSoList, { id: '', details: {} }]);
  };
  
  

  const handleSubmit = async (status) => {
    if (!bienBan.soBienBan || !bienBan.tieuDe) {
      setError('Vui lòng nhập đầy đủ thông tin các trường bắt buộc');
      return;
    }
    setError(null);
  
    // Thêm trạng thái và mảng ID hồ sơ vào biên bản
    const updatedBienBan = { 
        ...bienBan, 
        soBienBan: bienBan.soBienBan.toString(),
        tieuDe: bienBan.tieuDe.toString(),
        trangThaiBienBan: status, 
        hoSos: selectedHoSoList.map(hoSo => hoSo.id) 
      };
    
      // Log dữ liệu gửi đi
      console.log('Data to be sent:', updatedBienBan);

      try {
        const response = await fetch('/api/bien-ban-ban-giao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedBienBan),
        });
    
        if (response.ok) {
          const data = await response.json();
          alert('Biên bản đã được lưu thành công.');
          navigate('/danh-sach-bien-ban-ban-giao');
        } else {
          throw new Error('Lỗi khi lưu biên bản');
        }
      } catch (error) {
        console.error('Lỗi khi lưu biên bản:', error);
        setError('Lỗi khi lưu biên bản');
      }
  };

  

  return (
    <div className="container mt-4">
      <h5 className="mb-4">Thêm mới Biên bản bàn giao</h5>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3">
        <TextInput label="Số biên bản" name="soBienBan" value={bienBan.soBienBan} onChange={handleChange} required />
        
        <SelectInput2
          label="Đơn vị thu thập" 
          name="donViNopLuu" 
          value={bienBan.donViNopLuu} 
          onChange={handleChange} 
          options={donViOptions.map(donVi => ({ value: donVi.id, label: donVi.tenPhongBan }))} 
          required 
        />

        
        <TextInput label="Tiêu đề biên bản" name="tieuDe" value={bienBan.tieuDe} onChange={handleChange} required />
        
        <TextInput 
          label="Cơ quan lưu trữ" 
          name="tenCoQuanThuThap" 
          value={bienBan.tenCoQuanThuThap} 
          onChange={handleChange} 
          disabled 
        />
        
        <TextInput label="Ngày lập biên bản" name="ngayLap" type="date" value={bienBan.ngayLap} onChange={handleChange} disabled />
        
        <SelectInput2
          label="Đại diện bên giao" 
          name="daiDienBenGiaoId" 
          value={bienBan.daiDienBenGiaoId} 
          onChange={handleChange} 
          options={userOptions.map(user => ({ value: user.id, label: user.name }))} 
          required 
        />

          <SelectInput2 
            label="Căn cứ" 
            name="canCu" 
            value={bienBan.canCu} 
            onChange={handleChange} 
            //options={keHoachOptions.map(keHoach => ({ value: keHoach.id, label: keHoach.tieuDe }))} 
            options={
              keHoachOptions
                  .filter(keHoach => keHoach.trangThai === "Đã duyệt") // Lọc kế hoạch có trạng thái "Đã duyệt"
                  .map(keHoach => ({ value: keHoach.id, label: keHoach.tieuDe })) // Ánh xạ dữ liệu phù hợp
            } 
            required 
          />

        <SelectInput2
          label="Đại diện bên nhận" 
          name="daiDienBenNhanId" 
          value={bienBan.daiDienBenNhanId} 
          onChange={handleChange} 
          options={userOptions.map(user => ({ value: user.id, label: user.name }))} 
          required 
        />

        
        
        <TextInput label="Trạng thái biên bản" name="trangThaiBienBan" value={bienBan.trangThaiBienBan} disabled />
      </div>

      {/* Giao diện danh sách hồ sơ */}
      <div style={{ background: '#D9D9D947', borderRadius: '10px', padding: '15px' }}>
      <div className="d-flex justify-content-between align-items-center">
          <h6 className="text-start">Danh sách tài liệu</h6>
          <div style={{ display: 'flex', padding: '8px' }}>
            <button style={{ background: 'transparent', border: 'none', marginRight: '10px' }} onClick={handleAddRow}>
              <img src={addIcon} alt="Thêm" style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
        </div>
        
        <table className="table table-striped mt-2" style={{ background: '#D9D9D947' }}>
          <thead>
            <tr >
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
            {selectedHoSoList.map((hoSo, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <select
                    value={hoSo.id}
                    onChange={(e) => handleHoSoChange(e, index)}
                    className="form-control"
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
                <td>
                  {hoSo.details.trangThai || ''}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>


      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-warning mx-2" onClick={() => handleSubmit('Đã gửi duyệt')} style={{ minWidth: '100px' }}>Gửi</button>
        <button className="btn btn-primary mx-2" onClick={() => handleSubmit('Tạo mới')} style={{ minWidth: '100px' }}>Lưu</button>
        <button className="btn btn-secondary mx-2" onClick={() => navigate(-1)} style={{ minWidth: '100px' }}>Đóng</button>
      </div>
    </div>
  );
};

export default AddBienBanBanGiao;
