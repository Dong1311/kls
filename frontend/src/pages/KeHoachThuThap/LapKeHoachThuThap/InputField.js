import React from 'react';

const InputField = ({ label, value, disabled }) => (
  <div className="col-md-6 d-flex align-items-center mb-3">
    <label className="form-label me-2" style={{ minWidth: '120px' }}>{label}:</label>
    <input type="text" className="form-control" value={value || ''} disabled={disabled} />
  </div>
);

export default InputField;
