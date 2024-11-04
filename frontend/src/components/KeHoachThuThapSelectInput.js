import React from 'react';

const KeHoachThuThapSelectInput = ({ label = "Kế hoạch thu thập", value, onChange, options }) => (
  <div className="col-md-6 d-flex align-items-center mb-3">
    <label className="form-label me-2 text-start" style={{ minWidth: '180px' }}>{label}:</label>
    <div className='custom-select-container'>
      <select
        className="form-control custom-select-arrow"
        name="keHoachThuThapId"
        value={value}
        onChange={onChange}
      >
        <option value="">Chọn kế hoạch thu thập</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default KeHoachThuThapSelectInput;
