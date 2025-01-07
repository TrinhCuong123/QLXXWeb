<template>
  <div class="bg-white m-5 rounded-lg">
    <div class="m-5">
      <Button label="Quay lại" icon="pi pi-arrow-left" severity="danger" class="my-5 "
        title="Quay lại" @click="onBack" />
      <div class="grid grid-cols-1 gap-1">
        <div class="col-span-1">
          <div class="flex justify-content-between ">
            <h5 class="font-bold m-1 text-xl mb-2" style="line-height: 2; color: #0b5ee7">I. Tổng chi phí nhập hàng</h5>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex justify-content-between">
            <h5 class="font-bold m-1 text-xl mb-2" style="line-height: 2; color: #0b5ee7">II. Tổng doanh thu sửa chữa</h5>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex justify-content-between">
            <h5 class="font-bold m-1 text-xl mb-2" style="line-height: 2; color: #0b5ee7">III. Tổng dư nợ</h5>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex justify-content-between">
            <h5 class="font-bold m-1 text-xl mb-2" style="line-height: 2; color: #0b5ee7">IV. Chi phí phát sinh</h5>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex justify-content-between">
            <h5 class="font-bold m-1 text-xl mb-2" style="line-height: 2; color: #0b5ee7">V. Tổng lợi nhuận</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { reactive, computed, ref } from 'vue';
import { setTitleHeader } from '~/composables/globalTitleHeader';

setTitleHeader("Doanh thu tháng 9");

const props = defineProps({
  isVisible: {
    type: Boolean,
  },
});


const router = useRouter()
const onBack = () => {
  router.push('/doanh-thu');
};

const customerInfo = reactive(
  {
    tenKhachHang: 'Nguyễn Văn A',
    dia_chi: 'Hà Nội, Việt Nam',
    dien_thoai: '0123456789',
    thuongHieu: 'Honda',
    bienSoXe: '29A-12345',
    soKm: 15000,
    soVin: '1HGCM82633A123456',
    ngaySua: '2023-10-10',
    kinhDo: 105.8542,
    viDo: 21.0285,
    phuTungThay: [
      {
        tenPhuTung: 'PT-001 - Lọc gió',
        donVi: "Lít",
        soLuong: 2,
        giaBan: 200000,
      },
      {
        tenPhuTung: 'PT-002 - Lọc dầu',
        donVi: "Can",
        soLuong: 1,
        giaBan: 200000,
      },
      {
        tenPhuTung: 'PT-003 - Lốp',
        donVi: "Thùng",
        soLuong: 5,
        giaBan: 500000,
      },
      {
        tenPhuTung: 'PT-004 - Gương',
        donVi: "Cái",
        soLuong: 2,
        giaBan: 150000,
      }
    ],
    tienCong: [
      {
        tenTienCong: 'Công số 1',
        giaCong: 2000000,
      },
      {
        tenTienCong: 'Công số 2',
        giaCong: 2600000,
      },
      {
        tenTienCong: 'Công số 3',
        giaCong: 3500000,
      },
      {
        tenTienCong: 'Công số 4',
        giaCong: 650000,
      },
    ],
    tongChiPhi: 900000,
    daThanhToan: false,
    ghiChu: "Đã kiểm tra"
  },
);

const emit = defineEmits(['hideModal']);

const internalVisible = computed({
  get() {
    return props.isVisible;
  },
  set() {
    handleHideModal();
  },
});

const getRowSTT = (index: number) => {
  return index + 1;
}

const handleHideModal = () => {
  emit('hideModal');
};

</script>

<style scoped>
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  text-align: left;
  border-color: #000000;
}

.styled-table thead tr {
  background-color: #f3f3f3;
  color: #000000;
  text-align: center;
  font-weight: bold;
}

.styled-table th,
.styled-table td {
  border: 1px solid #dddddd;
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

/* .styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
} */

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #ffffff;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>