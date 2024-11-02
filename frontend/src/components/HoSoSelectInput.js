// HoSoSelectInput.js
import React from 'react';

const HoSoSelectInput = ({ label, name, value, onChange, options }) => (
  <div className="col-md-6 d-flex align-items-center mb-3">
    <label className="form-label me-2 text-start" style={{ minWidth: '180px' }}>{label}:</label>
    <select className="form-control" name={name} value={value} onChange={onChange}>
      <option value="">Chọn hồ sơ</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default HoSoSelectInput;
