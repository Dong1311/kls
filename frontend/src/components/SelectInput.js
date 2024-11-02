import React from 'react';
import './SelectInput.css'; // Thêm đường dẫn tới CSS tùy vào cấu trúc dự án của bạn

const SelectInput = ({ label, name, value, onChange, options }) => (
  <div className="col-md-6 d-flex align-items-center mb-3">
    <label className="form-label me-2 text-start" style={{ minWidth: '180px' }}>{label}:</label>
    <div className="custom-select-container">
      <select
        className="form-control custom-select-arrow" // Thêm lớp CSS cho mũi tên
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default SelectInput;
