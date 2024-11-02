import React from 'react';
import './SelectInput.css';

const SelectInput = ({ label, name, value, onChange, options, disabled }) => (
  <div className="col-md-6 d-flex align-items-center mb-3">
    <label className="form-label me-2 text-start" style={{ minWidth: '180px' }}>{label}:</label>
    <div className="custom-select-container">
      <select
        className="form-control custom-select-arrow"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled} // Áp dụng thuộc tính disabled
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
