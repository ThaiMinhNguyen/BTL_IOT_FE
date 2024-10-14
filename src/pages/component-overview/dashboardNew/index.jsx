import React, { useState, useEffect } from 'react';
import { Col, Row, Card, message } from 'antd';
import Chart from './components/Chart'; // Import component Chart
import ControlPanel from './components/ControlPanel'; // Import component ControlPanel
import InfoCards from './components/InfoCards'; // Import component InfoCards
import "./dashboardNew.scss";

export default function DashboardNew() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sensor_data'); // URL của API
        const result = await response.json();
        // Giả định API trả về danh sách các bản ghi, cập nhật state data
        setData(result.slice(-60)); // Chỉ lấy 60 bản ghi mới nhất
      } catch (error) {
        message.error('Lỗi khi lấy dữ liệu từ API');
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Gọi API khi component render

    const intervalId = setInterval(() => {
      fetchData(); // Gọi API định kỳ mỗi 5 giây để cập nhật dữ liệu mới
    }, 5000); // Cập nhật mỗi 5 giây

    return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
  }, []);

  const latestData = data[data.length - 1] || { temperature: 0, humidity: 0, light: 0 };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className='dashboardNew'>
      <InfoCards
        temperature={latestData.temperature}
        humidity={latestData.humidity}
        light={latestData.light}
      /> {/* Truyền dữ liệu vào InfoCards */}
      <Row gutter={20} className='chart-button'>
        <Col span={16}>
          <Card bordered={false} className="chart-container">
            <Chart data={data} /> {/* Sử dụng component Chart */}
          </Card>
        </Col>
        <Col span={8}>
          <ControlPanel onChange={onChange} /> {/* Sử dụng component ControlPanel */}
        </Col>
      </Row>
    </div>
  );
}
