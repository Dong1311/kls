const SelectInput2 = ({ label, name, value, onChange, options, disabled = false }) => (
  <div className="col-md-6 d-flex align-items-center mb-3">
      <label className="form-label me-2 text-start" style={{ minWidth: '180px' }}>{label}:</label>
      <select
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled} 
      >
          <option value="">Chọn một giá trị</option>
          {options.map((option, index) => (
              <option key={index} value={option.value}>
                  {option.label}
              </option>
          ))}
      </select>
  </div>
);

export default SelectInput2;
