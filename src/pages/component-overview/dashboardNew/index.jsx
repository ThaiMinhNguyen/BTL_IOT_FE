import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Switch, message } from 'antd';
import ControlPanel from './components/ControlPanel'; // Import component ControlPanel
import Chart from './components/Chart';
import InfoCards from './components/InfoCards';
import "./dashboardNew.scss";

export default function DashboardNew() {
  const [data, setData] = useState([]);
  const [isAutoMode, setIsAutoMode] = useState(true); // Chế độ tự động

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/sensor_data');
  //       const result = await response.json();
  //       setData(result.slice(-60));
  //     } catch (error) {
  //       message.error('Lỗi khi lấy dữ liệu từ API');
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();

  //   const intervalId = setInterval(() => {
  //     fetchData();
  //   }, 5000);

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    const generateFakeData = () => {
      const fakeData = Array.from({ length: 60 }, (_, i) => ({
        time: new Date().toLocaleTimeString(),
        temperature: Math.floor(Math.random() * 10) + 20, // Nhiệt độ từ 20-30
        humidity: Math.floor(Math.random() * 50) + 50, // Độ ẩm từ 50-100
        light: Math.floor(Math.random() * 1000) + 200, // Ánh sáng từ 200-1200
      }));
      setData(fakeData);
    };
  
    generateFakeData();
  
    const intervalId = setInterval(() => {
      generateFakeData();
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, []);
  

  const latestData = data[data.length - 1] || { temperature: 0, humidity: 0 };

  return (
    <div className="dashboardNew">
      <InfoCards
        temperature={latestData.temperature}
        humidity={latestData.humidity}
        light={latestData.light}
      /> {/* Truyền dữ liệu vào InfoCards */}s

      {/* Khối điều khiển thiết bị và hiển thị chất */}
      <Row gutter={20} className="control-and-quality">
        <Col span={16}>
          <ControlPanel /> {/* Sử dụng component ControlPanel */}
        </Col>
        <Col span={8}>
          <Card className="quality-list">
            <h3>Các chất</h3>
            <ul>
              <li>NH₃: 50</li>
              <li>NOx: 30</li>
              <li>C₆H₆: 70</li>
              <li>C₂H₅OH: 90</li>
              <li>CO₂: 10</li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ */}
      <Row className="chart-section">
        <Col span={24}>
          <Card className="chart-container">
            <Chart data={data} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
