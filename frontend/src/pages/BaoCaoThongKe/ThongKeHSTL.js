import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Thêm điều hướng
import "bootstrap/dist/css/bootstrap.min.css";
import infoIcon from "../../assets/images/Function/info.png";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
const ThongKeHSTL = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [summary, setSummary] = useState({
    tongSoHoSo: 0,
    tongSoLuotKhaiThac: 0,
    tongSoMaHoSo: 0, // Thêm tổng mã hồ sơ
  });
  const tableRef = useRef(null); 
  const navigate = useNavigate(); // Hook điều hướng

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = new URLSearchParams({
          startDate: startDate || "",
          endDate: endDate || "",
        }).toString();

        const response = await fetch(`/api/ctphieuyc/thong-ke?${query}`);
        const result = await response.json();

        // Đảm bảo data luôn là một mảng
        setData(result.data || []);
        calculateSummary(result.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Đặt data thành mảng rỗng nếu có lỗi
        calculateSummary([]);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const handleExportPDF = async () => {
    const table = tableRef.current;
  
    if (table) {
      try {
        const imgData = await domtoimage.toPng(table);
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (pdfWidth * table.offsetHeight) / table.offsetWidth;
  
        pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
        pdf.save("ThongKeHSTL.pdf");
      } catch (error) {
        console.error("Error generating PDF with dom-to-image:", error);
      }
    }
  };

  // Tính toán tổng cộng
  const calculateSummary = (data) => {
    const tongSoHoSo = data.length;
    const tongSoLuotKhaiThac = data.reduce(
      (acc, item) => acc + (item.soLuotKhaiThac || 0),
      0
    );
    const tongSoMaHoSo = new Set(data.map((item) => item.maHoSo)).size; // Đếm mã hồ sơ duy nhất

    setSummary({ tongSoHoSo, tongSoLuotKhaiThac, tongSoMaHoSo });
  };

  // Hàm điều hướng khi chọn mục trong picklist
  const handlePicklistChange = (event) => {
    const value = event.target.value;
    if (value === "ThongKeHSTL") {
      navigate("/thong-ke-hstl");
    } else if (value === "ThongKePhieuYCKTSD") {
      navigate("/thong-ke-phieu-ycktsd");
    }
  };

  return (
    <div className="container mt-4">
      {/* Tiêu đề */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="d-flex align-items-center">
          <img src={infoIcon} alt="info" width="30" className="me-2" />
          Thống kê khai thác
        </h5>
        
        <button className="btn btn-primary" onClick={handleExportPDF}>Xuất biểu mẫu</button>
      </div>
      <div>
          <select
            className="form-select mt-4 mb-4"
            style={{
              width: "400px",
              fontSize: "18px", 
              fontWeight: "600", 
              color: "#043371",
            }}
            onChange={handlePicklistChange}
          >
            <option value="ThongKeHSTL">
              Thống kê HSTL đưa vào Phiếu YCKTSD
            </option>
            <option value="ThongKePhieuYCKTSD">
              Thống kê Phiếu YCKTSD
            </option>
          </select>
        </div>
      {/* Bộ lọc */}
      <div className="d-flex mb-4">
        <div className="me-3">
          <label htmlFor="startDate" className="form-label">
            Từ ngày:
          </label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="form-label">
            Đến ngày:
          </label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Bảng */}
      <table className="table table-striped table-hover align-middle"  ref={tableRef}>
        <thead style={{ backgroundColor: "#2289E7", color: "#fff" }}>
          <tr>
            <th>STT</th>
            <th>Mã hồ sơ</th>
            <th>Tiêu đề hồ sơ</th>
            <th>Số lượt khai thác</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.stt}</td>
                <td>{item.maHoSo}</td>
                <td>{item.tieuDeHoSo}</td>
                <td>{item.soLuotKhaiThac}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>

        <tfoot>
          <tr className="fw-bold">
            <td colSpan="1" className="text-center">
              Tổng cộng:
            </td>
            <td>{summary.tongSoMaHoSo}</td> {/* Tổng mã hồ sơ */}
            <td>{summary.tongSoHoSo}</td> {/* Tổng tiêu đề hồ sơ */}
            <td>{summary.tongSoLuotKhaiThac}</td> {/* Tổng số lượt khai thác */}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ThongKeHSTL;
