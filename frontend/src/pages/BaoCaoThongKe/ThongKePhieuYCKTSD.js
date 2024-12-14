import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import { Doughnut } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import infoIcon from "../../assets/images/Function/info.png";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import RobotoFont from "../../assets/fonts/font-times-new-roman-base64";

const ThongKePhieuYCKTSD = () => {
  const [summary, setSummary] = useState({
    tongSoPhieuYCKTSD: 0,
    tongSoHoSo: 0,
    tongSoTaiLieu: 0,
    tongSoPhieuTraDungHan: 0,
    tongSoPhieuTraQuaHan: 0,
    tongSoPhieuTraChuaTra: 0,
  });
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const contentRef = useRef(null);
  const handlePicklistChange = (event) => {
    const value = event.target.value;
    if (value === "ThongKeHSTL") {
      navigate("/thong-ke-hstl");
    } else if (value === "ThongKePhieuYCKTSD") {
      navigate("/thong-ke-phieu-ycktsd");
    }
  };
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
        setSummary(result || {});
      } catch (error) {
        console.error("Error fetching data:", error);
        setSummary({
          tongSoPhieuYCKTSD: 0,
          tongSoHoSo: 0,
          tongSoTaiLieu: 0,
          tongSoPhieuTraDungHan: 0,
          tongSoPhieuTraQuaHan: 0,
          tongSoPhieuTraChuaTra: 0,
        });
      }
    };

    fetchData();
  }, [startDate, endDate]);

  // Dữ liệu cho biểu đồ Doughnut
  const doughnutData = {
    labels: [
      `Đúng hạn (${summary.tongSoPhieuTraDungHan})`,
      `Quá hạn (${summary.tongSoPhieuTraQuaHan})`,
      `Chưa trả (${summary.tongSoPhieuTraChuaTra})`,
    ],
    datasets: [
      {
        data: [
          summary.tongSoPhieuTraDungHan,
          summary.tongSoPhieuTraQuaHan,
          summary.tongSoPhieuTraChuaTra,
        ],
        backgroundColor: ["#A4CF82", "#DA7073", "#B8B8B8"],
      },
    ],
  };

  const doughnutOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
  };

  const handleExportPDF = async () => {
    const content = contentRef.current;

    if (content) {
      try {
        const imgData = await domtoimage.toPng(content);

        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addFileToVFS("Roboto-Regular-normal.ttf", RobotoFont);
        pdf.addFont("Roboto-Regular-normal.ttf", "Roboto", "normal");
        pdf.setFont("Roboto");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const contentHeight =
          (pdfWidth * content.offsetHeight) / content.offsetWidth;

        pdf.setFontSize(20);
        pdf.text("Thống kê Phiếu YCKTSD", pdfWidth / 2, 20, { align: "center" });

        const topMargin = 30;

        pdf.addImage(imgData, "PNG", 0, topMargin, pdfWidth, contentHeight);

        pdf.save("ThongKePhieuYCKTSD.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  return (
    <div className="container mt-4" >
      {/* Header */}
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
            <option value="ThongKePhieuYCKTSD">
              Thống kê Phiếu YCKTSD
            </option>
            <option value="ThongKeHSTL">
              Thống kê HSTL đưa vào Phiếu YCKTSD
            </option>
            
          </select>
        </div>

      {/* Bộ lọc */}
      {/* <div className="d-flex mb-4">
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
      </div> */}

      {/* Nội dung */}
      <div ref={contentRef}
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        {/* Biểu đồ Doughnut */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              backgroundColor: "#044D82",
              padding: "10px",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            Báo cáo phiếu yêu cầu khai thác sử dụng
          </div>
          <div style={{ height: "400px", padding: "20px" }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* Thống kê tổng hợp */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              backgroundColor: "#044D82",
              padding: "10px",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            Thống kê tổng hợp
          </div>
          <div style={{ padding: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#ddd",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <span>Tổng số phiếu YCKTSD:</span>
              <span>{summary.tongSoPhieuYCKTSD}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#ddd",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <span>Tổng số hồ sơ:</span>
              <span>{summary.tongSoHoSo}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#ddd",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <span>Tổng số tài liệu:</span>
              <span>{summary.tongSoTaiLieu}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThongKePhieuYCKTSD;
