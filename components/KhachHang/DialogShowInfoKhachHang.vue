<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '1000px' }" :header="'Thông tin khách hàng'" :modal="true"
    :close-on-escape="true">
    <div class="grid grid-cols-1 gap-1">
      <div class="col-span-1">
        <div class="flex justify-between ">
          <h5 class="font-bold mb-1 text-xl" style="line-height: 2; color: #0b5ee7">I. Thông tin khách hàng</h5>
          <Button class="mr-10" label="Xem trước" icon="pi pi-spinner-dotted" severity="info"
            @click="onOpenShowModel" />
        </div>
        <p>Tên khách hàng: <span class="font-bold">{{ internalKhachHang.ten_khachhang }}</span></p>

        <p>Số điện thoại: <span class="font-bold">{{ internalKhachHang.dien_thoai }}</span></p>

        <p>Địa chỉ: <span class="font-bold">{{ internalKhachHang.dia_chi }}</span></p>

        <p>Thương hiệu: <span class="font-bold">{{ internalKhachHang.thuong_hieu }}</span></p>

        <p>Biển số xe: <span class="font-bold">{{ internalKhachHang.bienso_xe }}</span></p>

        <p>Số km: <span class="font-bold">{{ NumberUtils.formatNumber(internalKhachHang.lichSuThayThe[0].so_km) }}</span></p>

        <p>Số vin: <span class="font-bold">{{ internalKhachHang.so_vin }}</span></p>

        <p>Ngày sửa: <span class="font-bold">{{ DateUtils.formatDate( internalDataShow.ngay_sua) }}</span></p>

        <p>Kinh độ: <span class="font-bold">{{ internalKhachHang.kinh_do }}</span></p>

        <p>Vĩ độ: <span class="font-bold">{{ internalKhachHang.vi_do }}</span></p>
        
        <p>Ghi chú: <span class="font-bold">{{ internalDataShow.ghi_chu }}</span></p>

      </div>
      <div class="col-span-1">
        <div class="flex justify-content-between">
          <h5 class="font-bold m-1 text-xl mb-2" style="line-height: 2; color: #0b5ee7">II. Thông tin sửa chữa</h5>
        </div>
        <div>
          <h6 class="font-bold m-1 text-md mb-2">1. Phụ tùng thay thế </h6>
        </div>
        <DataTable :value="internalDataShow.tungSuaChua" tableStyle="min-width: 50rem;  " showGridlines>
          <template #loading>
            Đang tải lên dữ liệu, vui lòng chờ đợi!.
          </template>
          <template #empty>
            <div class="text-center">
              <span class="font-bold">Không có thông tin dữ liệu!</span>
            </div>
          </template>
          <Column class="text-center" body-style="text-align: center; width: 12px">
            <template #header>
              <span class="m-auto"><b>STT</b></span>
            </template>
            <template #body="slotPros">
              {{ getRowSTT(slotPros.index) }}
            </template>
          </Column>
          <Column field="hangHoa.loaiPhuTung.ten_phutung" header="Tên phụ tùng" style="min-width: 10rem"></Column> 
          <Column field="hangHoa.loaiPhuTung.ten_phutung" header="Tên phụ tùng" style="min-width: 10rem"></Column> 
          <Column field="hangHoa.loaiPhuTung.don_vi" header="Đơn vị"></Column>
          <Column field="soluong_sudung" header="Số lượng"></Column>
          <Column field="hangHoa.gia_ban" header="Giá bán">
            <template #body="slotProps">
              {{ slotProps.data.hangHoa.gia_ban.toLocaleString('vi-VN') }} VNĐ
            </template>
          </Column>
        </DataTable>  
        <h6 class="font-bold m-1 text-md mt-5">2. Tiền công sửa chữa </h6>
        <DataTable :value="internalDataShow.tienCongSuaChua" tableStyle="min-width: 50rem;  " showGridlines>
          <template #loading>
            Đang tải lên dữ liệu, vui lòng chờ đợi!.
          </template>
          <template #empty>
            <div class="text-center">
              <span class="font-bold">Không có thông tin dữ liệu!</span>
            </div>
          </template>
          <Column class="text-center" body-style="text-align: center; width: 12px">
            <template #header>
              <span class="m-auto"><b>STT</b></span>
            </template>
            <template #body="slotPros">
              {{ getRowSTT(slotPros.index) }}
            </template>
          </Column>
          <Column field="noidung_suachua" header="Nội dung sửa chữa" style="min-width: 10rem"></Column>
          <Column field="giathanh_suachua" header="Đơn giá">
            <template #body="slotProps">
              {{ NumberUtils.formatNumber(slotProps.data.giathanh_suachua) }} VNĐ
            </template>
          </Column>
        </DataTable>
        <div class="mt-5 text-md">
          <p>Tổng chi phí: <span class="font-bold">{{ internalDataShow.tong_chiphi ? NumberUtils.formatNumber(internalDataShow.tong_chiphi): '' }} VNĐ</span></p>
          <p>Tình trạng thanh toán:
            <span class="font-bold">
              {{ internalDataShow.da_thanhtoan ? "Đã thanh toán" : "Chưa thanh toán" }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </Dialog>
  <KhachHangDialogShowPrintKhachHang :is-visible="isOpenShowModel" :data-info="internalKhachHang" :data-phu-tung="internalDataShow" @hide-modal="isOpenShowModel = false" />
</template>
<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import { KhachHangModel, LichSuThayTheModel } from '~/models/khach-hang/khach-hang.model';

const props = defineProps({
  isVisible: {
    type: Boolean,
  },
  customerList: {
    type: Object,  // Thay đổi type thành Object
    default: () => {
      return new KhachHangModel();
    },
  },
  dataShow: {
    type: Object,  // Thay đổi type thành Object
    default: () => {
      return new LichSuThayTheModel();
    },
  },
});

const internalKhachHang = computed({
  get() {
    return props.customerList;
  },
  set() {
  },
});
const internalDataShow = computed({
  get() {
    return props.dataShow;
  },
  set() {
  },
});

const isOpenShowModel = ref();

const dataLichSuSuaChua = ref();
watchEffect(() => {
  dataLichSuSuaChua.value = internalKhachHang.value.lichSuThayThe
})
const onOpenShowModel = () => {
  isOpenShowModel.value = true;
};

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