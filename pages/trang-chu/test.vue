<template>
  <div>
    <div id="content">
      <h1>Tiêu đề của tài liệu</h1>
      <p>Nội dung mà bạn muốn xuất ra PDF. Đây là một đoạn nội dung dài để kiểm tra việc phân trang.</p>
      <div id="editor" contenteditable="true">Đây là phần có thể chỉnh sửa.</div>
    </div>
    <button @click="generatePDF">Tải xuống PDF</button>
  </div>
</template>

<script setup>
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const generatePDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4', // Sử dụng kích thước A4
  });

  // Thêm tiêu đề
  doc.text('Tiêu đề của tài liệu', 15, 10);
  
  // Dữ liệu để xuất
  const data = [
    { name: 'John Doe', age: 30, city: 'New York' },
    { name: 'Jane Smith', age: 25, city: 'San Francisco' },
    // Thêm nhiều dữ liệu hơn nếu cần
  ];

  // Tạo bảng với autoTable
  autoTable(doc, {
    head: [['Tên', 'Tuổi', 'Thành phố']],
    body: data.map(item => [item.name, item.age, item.city]),
    startY: 20, // Vị trí bắt đầu của bảng
    theme: 'grid',
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
  });

  // Lưu tệp PDF
  doc.save('sample-file.pdf');
};
</script>

<style scoped>
/* Thêm CSS nếu cần */
</style>