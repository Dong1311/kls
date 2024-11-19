import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import infoIcon from "../../assets/images/Function/info.png";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

const ThongKePhieuYCKTSD = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [trangThaiFilter, setTrangThaiFilter] = useState("");
  const [availableTrangThai, setAvailableTrangThai] = useState([]);
  const tableRef = useRef(null); // Tham chiếu tới bảng
  const navigate = useNavigate();

  const [summary, setSummary] = useState({
    tongSoPhieu: 0,
    tongSoHoSo: 0,
    tongSoTaiLieu: 0,
    tongSoMaPhieu: 0,
    tongSoNguoiKhaiThac: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = new URLSearchParams({
          startDate: startDate || "",
          endDate: endDate || "",
          trangThai: trangThaiFilter || "",
        }).toString();

        const response = await fetch(`/api/phieu-tra/thong-ke?${query}`);
        const result = await response.json();

        setData(result.data || []);
        calculateSummary(result.data || []);

        const uniqueTrangThai = [
          ...new Set(result.data.map((item) => item.trangThai)),
        ];
        setAvailableTrangThai(uniqueTrangThai);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
        calculateSummary([]);
        setAvailableTrangThai([]);
      }
    };

    fetchData();
  }, [startDate, endDate, trangThaiFilter]);

  const calculateSummary = (data) => {
    const tongSoPhieu = data.length;
    const tongSoHoSo = data.reduce((acc, item) => acc + (item.soLuongHoSo || 0), 0);
    const tongSoTaiLieu = data.reduce((acc, item) => acc + (item.soLuongTaiLieu || 0), 0);
    const tongSoMaPhieu = new Set(data.map((item) => item.maPhieuYC)).size;
    const tongSoNguoiKhaiThac = new Set(data.map((item) => item.nguoiKhaiThac)).size;

    setSummary({
      tongSoPhieu,
      tongSoHoSo,
      tongSoTaiLieu,
      tongSoMaPhieu,
      tongSoNguoiKhaiThac,
    });
  };

  const handleExportPDF = async () => {
    const table = tableRef.current;
    if (table) {
      try {
        const imgData = await domtoimage.toPng(table);
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (pdfWidth * table.offsetHeight) / table.offsetWidth;

        pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
        pdf.save("ThongKePhieuYCKTSD.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

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
          Thống kê Phiếu YCKTSD
        </h5>
        <button className="btn btn-primary" onClick={handleExportPDF}>
          Xuất biểu mẫu
        </button>
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
          <option value="ThongKePhieuYCKTSD">Thống kê Phiếu YCKTSD</option>
          <option value="ThongKeHSTL">Thống kê HSTL đưa vào Phiếu YCKTSD</option>
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
        <div className="me-3">
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
        <div>
          <label htmlFor="trangThaiFilter" className="form-label">
            Trạng thái:
          </label>
          <select
            id="trangThaiFilter"
            className="form-select"
            value={trangThaiFilter}
            onChange={(e) => setTrangThaiFilter(e.target.value)}
          >
            <option value="">--Tất cả--</option>
            {availableTrangThai.map((trangThai, index) => (
              <option key={index} value={trangThai}>
                {trangThai}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bảng */}
      <table className="table table-striped table-hover align-middle" ref={tableRef}>
        <thead style={{ backgroundColor: "#2289E7", color: "#fff" }}>
          <tr>
            <th>STT</th>
            <th>Mã phiếu YCKTSD</th>
            <th>Người khai thác</th>
            <th>Số lượng hồ sơ</th>
            <th>Số lượng tài liệu</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.maPhieuYC}</td>
                <td>{item.nguoiKhaiThac}</td>
                <td>{item.soLuongHoSo}</td>
                <td>{item.soLuongTaiLieu}</td>
                <td>{item.trangThai}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
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
            <td>{summary.tongSoMaPhieu}</td>
            <td>{summary.tongSoNguoiKhaiThac}</td>
            <td>{summary.tongSoHoSo}</td>
            <td>{summary.tongSoTaiLieu}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ThongKePhieuYCKTSD;
