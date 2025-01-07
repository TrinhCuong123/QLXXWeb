<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '1000px' }" :header="'Hiển thị thông tin in'" :modal="true"
    :close-on-escape="true">
    <div>
      <div class="flex justify-end gap-3 mb-3">
        <Button label="Tải thông tin" icon="pi pi-download" severity="warn" @click="generatePDF()" />
        <Button label="In thông tin" icon="pi pi-print" severity="info" @click="printById('printSection')" />
      </div>
      <div class="border border-black">
        <div id="printSection" class="m-3">
          <div class="grid grid-cols-3">
            <div class="col-span-1 ml-5">
              <img src="assets/fonts/qr.jpg" alt="" width="90px" height="90px" class="m-3">
              <div class="font-bold mt-1">
                <div>
                  STK:4510428362 <br />
                  Trịnh Ngọc Tiến - NH BIDV
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <div class="flex flex-col items-center justify-center text-center h-full ">
                <div class="font-bold text-[32px] ">
                  GARA Ô TÔ TIẾN NGA
                </div>
                <div class="font-normal">
                  Đ/c:Tổ 13 TTNT VL - Vị Xuyên - Hà Giang
                </div>
                <div class="font-normal">
                  ĐT: (Tiến) 0333 271 688
                </div>
              </div>
              <div class="mr-5 flex justify-end italic text-[18px]">
                Ngày {{ dateNow.getDay() }} tháng {{ dateNow.getMonth() }} năm {{ dateNow.getFullYear() }}
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center text-center mt-8 mb-6">
            <div class="font-bold text-[32px]">
              HÓA ĐƠN THANH TOÁN
            </div>
          </div>
          <div class="ml-3">
            <div class="grid grid-cols-2 ">
              <div class=" text-[20px]">Chủ xe: {{ internalKhachHang.ten_khachhang }}</div>
              <div class=" text-[20px]">Biển số: {{ internalKhachHang.bienso_xe }}</div>
            </div>
            <div class="grid grid-cols-2 ">
              <div class=" text-[20px]">Hiện xe: {{ internalKhachHang.thuong_hieu }}</div>
              <div class=" text-[20px]">Số km: {{ internaldataPhuTung.so_km }} km</div>
            </div>
          </div>
          <div>
            <div class="text-[18px] font-bold mt-5 mb-3">
              1. Phụ tùng thay thế
            </div>
            <div class="flex justify-center">
              <table class="styled-table">
                <thead>
                  <tr>
                    <th class="w-5">STT</th>
                    <th>Tên Phụ Tùng</th>
                    <th>Đơn vị</th>
                    <th>Số Lượng</th>
                    <th>Giá Bán</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr v-for="(item, index) in internaldataPhuTung.tungSuaChua" :key="index">
                    <td class="w-5">{{ index + 1 }}</td>
                    <!-- <td>{{ item.hangHoa.ma_phutung }}</td> -->
                    <td>{{ item.hangHoa.loaiPhuTung.ten_phutung }}</td>
                    <td>{{ item.hangHoa.loaiPhuTung.don_vi }}</td>
                    <td>{{ item.soluong_sudung }}</td>
                    <td>{{ NumberUtils.formatNumber(item.hangHoa.gia_ban) }} VND</td>
                    <td>{{ NumberUtils.formatNumber(item.hangHoa.gia_ban * item.soluong_sudung) }} VND</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div class="text-[18px] font-bold mt-5 mb-3">
              2. Tiền công sửa chữa
            </div>
            <div class="flex justify-center">
              <table class="styled-table">
                <thead>
                  <tr>
                    <th class="w-5">STT</th>
                    <th>Nội dung sửa chữa</th>
                    <th>Đơn giá</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr v-for="(item, index) in internaldataPhuTung.tienCongSuaChua" :key="index">
                    <td class="w-5">{{ index + 1 }}</td>
                    <td>{{ item.noidung_suachua }}</td>
                    <td>{{ NumberUtils.formatNumber(item.giathanh_suachua) }} VND</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- <div class="m-3"> -->
          <!-- <div class="w-full font-normal text-md"> -->
          <!-- <span>Ghi chú: </span> -->
          <!-- <span>{{ customerInfo.tongChiPhi.toLocaleString('vi-VN') }} VND</span> -->
          <!-- <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro deserunt enim soluta, quibusdam commodi accusantium saepe ratione, unde ab officiis ad atque quisquam quaerat? Nobis ex unde dolorum non hic?</span>
            </div>
          </div> -->
          <div class="mt-3">
            <span class="font-bold">
              Ghi chú:
            </span>
            <span>
              {{ internaldataPhuTung.ghi_chu }}
            </span>
          </div>
          <div class="flex flex-col items-end m-6">
            <div class="flex justify-between w-full font-bold text-2xl">
              <span>Tổng:</span>
              <span> {{ NumberUtils.formatNumber(internaldataPhuTung.tong_chiphi) }} VND</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { computed } from 'vue';
import { KhachHangModel, LichSuThayTheModel } from '~/models/khach-hang/khach-hang.model';


const props = defineProps({
  isVisible: {
    type: Boolean,
  },
  dataInfo: {
    type: Object,  // Thay đổi type thành Object
    default: () => {
      return new KhachHangModel();
    },
  },
  dataPhuTung: {
    type: Object,  // Thay đổi type thành Object
    default: () => {
      return new LichSuThayTheModel();
    },
  },
});
const internalKhachHang = computed({
  get() {
    return props.dataInfo;
  },
  set() {
  },
});
const internaldataPhuTung = computed({
  get() {
    return props.dataPhuTung;
  },
  set() {
  },
});

const dateNow = new Date();;

const emit = defineEmits(['hideModal']);

const internalVisible = computed({
  get() {
    return props.isVisible;
  },
  set() {
    handleHideModal();
  },
});


const handleHideModal = () => {
  emit('hideModal');
};

// const data = new Date(customerInfo.ngaySua);

function printById(elementId: string) {
  const content = document.getElementById(elementId).innerHTML; // Lấy nội dung cần in

  // Tạo iframe ẩn
  const printWindow = document.createElement("iframe");
  printWindow.style.position = "absolute";
  printWindow.style.width = "0";
  printWindow.style.height = "0";
  printWindow.style.border = "none";

  // Gắn vào body
  document.body.appendChild(printWindow);

  // Lấy toàn bộ CSS từ tài liệu chính
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map(style => style.outerHTML)
    .join('');

  // Ghi nội dung vào iframe
  const doc = printWindow.contentWindow.document;
  doc.open();
  doc.write(`
    <html>
      <head>
        <title>In Nội Dung</title>
        ${styles} 
      </head>
      <body>${content}</body>
    </html>
  `);
  doc.close();

  // Đảm bảo tất cả ảnh trong iframe được tải trước khi in
  const images = printWindow.contentWindow?.document.images;
  const imageLoadPromises = Array.from(images).map((img) => {
    return new Promise((resolve) => {
      if (img.complete) {
        resolve(null); // Ảnh đã tải xong
      } else {
        img.onload = img.onerror = () => resolve(null); // Đợi tải xong
      }
    });
  });

  Promise.all(imageLoadPromises).then(() => {
    // Thực hiện in và xóa iframe sau đó
    printWindow.contentWindow?.focus();
    printWindow.contentWindow?.print();
    document.body.removeChild(printWindow); // Xóa iframe sau khi in
  });
}



const generatePDF = async () => {
  // Khởi tạo với kích thước trang tùy chỉnh
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [210, 320], // Chiều rộng: 210mm, chiều dài: 320mm (tùy chỉnh)
  });

  const content = document.getElementById('printSection');

  // Sử dụng html2canvas để chụp ảnh nội dung HTML
  const canvas = await html2canvas(content);
  const imgData = canvas.toDataURL('image/png');

  // Thêm hình ảnh vào PDF và xử lý phân trang
  const imgWidth = 180; // Chiều rộng hình ảnh
  const imgHeight = ((canvas.height * imgWidth) / canvas.width); // Tính chiều cao tương ứng

  let heightLeft = imgHeight;
  let position = 15; // Vị trí y ban đầu

  const pageHeight = doc.internal.pageSize.height;

  if (heightLeft >= pageHeight) { // Giảm bớt không gian cho lề dưới
    while (heightLeft >= 0) {
      doc.addImage(imgData, 'PNG', 15, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      position -= pageHeight;
      if (heightLeft >= 0) {
        doc.addPage();
        position = 15; // Reset vị trí y cho trang mới
      }
    }
  } else {
    doc.addImage(imgData, 'PNG', 15, position, imgWidth, imgHeight);
  }

  doc.save(`${internalKhachHang.value.bienso_xe}_${internalKhachHang.value.ten_khachhang}.pdf`); // Lưu tệp PDF
};
</script>

<style scoped>
.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  font-family: 'Arial', sans-serif;
  text-align: left;
  border: 1px solid #000;
  /* Đường viền bao quanh bảng */
}

.styled-table thead tr {
  background-color: #f3f3f3;
  color: #000000;
  text-align: center;
  font-weight: bold;
}

.styled-table th,
.styled-table td {
  border: 1px solid #000;
  /* Đường viền ô trong bảng */
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #000;
  /* Đường viền giữa các hàng */
}

.styled-table tbody tr:last-of-type {
  border-bottom: 1px solid #000;
  /* Đường viền cuối bảng */
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>