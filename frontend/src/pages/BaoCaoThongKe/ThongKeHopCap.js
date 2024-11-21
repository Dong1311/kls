import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import infoIcon from "../../assets/images/Function/info.png";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import RobotoFont from "../../assets/fonts/font-times-new-roman-base64"; 

const ThongKeHopCap = () => {
  const [data, setData] = useState([]);
  const [giaFilter, setGiaFilter] = useState("");
  const [hopCapFilter, setHopCapFilter] = useState("");
  const [summary, setSummary] = useState({
    tongSoGia: 0,
    tongSoHop: 0,
    tongSoHoSo: 0,
    tongSoTaiLieu: 0,
  });

  const tableRef = useRef(null); // Ref để truy cập bảng HTML  

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hop-cap/thong-ke");
        const result = await response.json();
        setData(result.data || []); // Đảm bảo data luôn là mảng
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    return (
      (!giaFilter || item.gia === giaFilter) &&
      (!hopCapFilter || item.hopCap === hopCapFilter)
    );
  });

  useEffect(() => {
    const uniqueGia = new Set(filteredData.map((item) => item.gia));
    const tongSoGia = uniqueGia.size;
    const tongSoHop = filteredData.length;
    const tongSoHoSo = filteredData.reduce(
      (acc, item) => acc + (item.soLuongHoSo || 0),
      0
    );
    const tongSoTaiLieu = filteredData.reduce(
      (acc, item) => acc + (item.soLuongTaiLieu || 0),
      0
    );
  
    setSummary({ tongSoGia, tongSoHop, tongSoHoSo, tongSoTaiLieu });
  }, [data, giaFilter, hopCapFilter]); // Chỉ phụ thuộc vào `data` và bộ lọc
  
  
  // Tính toán tổng kết
  // const calculateSummary = (data) => {
  //   const uniqueGia = new Set(data.map((item) => item.gia)); // Lưu các giá trị "gia" duy nhất
  //   const tongSoGia = uniqueGia.size; // Tổng số giá khác nhau
  //   const tongSoHop = data.length;
  //   const tongSoHoSo = data.reduce((acc, item) => acc + (item.soLuongHoSo || 0), 0);
  //   const tongSoTaiLieu = data.reduce((acc, item) => acc + (item.soLuongTaiLieu || 0), 0);

  //   return { tongSoGia, tongSoHop, tongSoHoSo, tongSoTaiLieu };
  // };

  // Hàm xuất PDF
  const handleExportPDF = async () => {
    const table = tableRef.current;
  
    if (table) {
      try {
        // Chuyển bảng thành ảnh PNG
        const imgData = await domtoimage.toPng(table);
  
        // Khởi tạo file PDF
        const pdf = new jsPDF("p", "mm", "a4");
  
        // Nhúng font Roboto hỗ trợ tiếng Việt
        pdf.addFileToVFS("Roboto-Regular-normal.ttf", RobotoFont);
        pdf.addFont("Roboto-Regular-normal.ttf", "Roboto", "normal");
        pdf.setFont("Roboto");
  
        // Kích thước PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (pdfWidth * table.offsetHeight) / table.offsetWidth;
  
        // Thêm tiêu đề "Thống kê hộp cặp"
        pdf.setFontSize(20); // Đặt kích thước chữ
        pdf.text("Thống kê hộp cặp", pdfWidth / 2, 20, { align: "center" }); // Căn giữa tiêu đề
  
        // Thêm khoảng cách lề
        const topMargin = 30; // Khoảng cách từ tiêu đề đến bảng
  
        // Thêm hình ảnh bảng vào PDF
        pdf.addImage(imgData, "PNG", 0, topMargin, pdfWidth, pdfHeight);
  
        // Lưu file PDF
        pdf.save("ThongKeHopCap.pdf");
      } catch (error) {
        console.error("Error generating PDF with dom-to-image:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      {/* Tiêu đề */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="d-flex align-items-center">
          <img src={infoIcon} alt="add" width="30" className="me-2" />
          Thống kê hộp cặp
        </h5>
        <button className="btn btn-primary" onClick={handleExportPDF}>
          Xuất biểu mẫu
        </button>
      </div>

      {/* Bộ lọc */}
      <div className="d-flex mb-4">
        <div className="me-3">
          <label htmlFor="giaFilter" className="form-label">
            Giá:
          </label>
          <select
            id="giaFilter"
            className="form-select"
            value={giaFilter}
            onChange={(e) => setGiaFilter(e.target.value)}
          >
            <option value="">--Tất cả--</option>
            {Array.from(new Set(data.map((item) => item.gia))).map((gia, index) => (
              <option key={index} value={gia}>
                {gia}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="hopCapFilter" className="form-label">
            Hộp:
          </label>
          <select
            id="hopCapFilter"
            className="form-select"
            value={hopCapFilter}
            onChange={(e) => setHopCapFilter(e.target.value)}
          >
            <option value="">--Tất cả--</option>
            {Array.from(new Set(data.map((item) => item.hopCap))).map((hopCap, index) => (
              <option key={index} value={hopCap}>
                {hopCap}
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
            <th>Giá</th>
            <th>Hộp cặp</th>
            <th>Số lượng hồ sơ</th>
            <th>Số lượng tài liệu</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.stt}</td>
              <td>{item.gia}</td>
              <td>{item.hopCap}</td>
              <td>{item.soLuongHoSo}</td>
              <td>{item.soLuongTaiLieu}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="fw-bold">
            <td colSpan="1" className="text-center">
              Tổng cộng:
            </td>
            <td>{summary.tongSoGia}</td>
            <td>{summary.tongSoHop}</td>
            <td>{summary.tongSoHoSo}</td>
            <td>{summary.tongSoTaiLieu}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ThongKeHopCap;
