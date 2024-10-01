const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

const generateRandomDate = (daysBack) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date;
};

const generateFakeData = (id) => {
  const randomDate = generateRandomDate(30); // Ngày ngẫu nhiên trong 30 ngày gần đây
  return {
    id: id,
    temperature: (Math.random() * 10 + 20).toFixed(2), // Nhiệt độ từ 20°C đến 30°C
    light: (Math.random() * 100).toFixed(2),           // Ánh sáng từ 0 đến 100 lux
    humidity: (Math.random() * 30 + 50).toFixed(2),    // Độ ẩm từ 50% đến 80%
    time: formatDate(randomDate),                      // Thời gian ngẫu nhiên với định dạng ngày-tháng-năm
  };
};

// Tạo mảng dữ liệu giả gồm 30 bản ghi
const fakeData = Array.from({ length: 30 }, (_, index) => generateFakeData(index + 1));

export default fakeData;
