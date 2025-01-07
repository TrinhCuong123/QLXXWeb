<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '1000px' }" :header="'Cập nhật nhân viên'" :modal="true"
    :close-on-escape="true">
    <div>
      <div class="col-span-1 px-3 pt-3">
          <div class="col-span-1 min-w-40 mb-4 ">
            <label for="tenNhanVien" class="block font-bold mb-3">Tên nhân viên</label>
            <InputText id="tenNhanVien" v-model="tenNhanVien" placeholder="Nhập tên nhân viên" size="large" class="mr-2 w-full h-[42.72px]" />
          </div>
        <div class="grid grid-cols-2 mb-4 gap-4">
          <div class="col-span-1 min-w-40">
            <label for="ngaySinh" class="block font-bold mb-3">Ngày sinh</label>
            <DatePicker v-model="ngaySinh" :invalid="errors.ngaySinh != null" input-class="h-[42.72px]" date-format="dd/mm/yy" show-icon fluid placeholder="dd/mm/yyyy" input-id="ngaySinh" />
            <span class="text-red-500">{{ errors.ngayNhap }}</span>
          </div>
          <div class="col-span-1 min-w-40">
            <label for="dienThoai" class="block font-bold mb-3">Điện thoại</label>
            <InputText id="dienThoai" v-model="dienThoai" placeholder="Nhập số điện thoại" size="large" class="mr-2 w-full h-[42.72px]" />
          </div>
          <div class="col-span-1 min-w-40">
            <label for="diaChi" class="block font-bold mb-3">Địa chỉ</label>
            <InputText id="diaChi" v-model="diaChi" placeholder="Nhập địa chỉ" size="large" class="mr-2 w-full h-[42.72px]" />
          </div>
          <div class="col-span-1 min-w-40">
            <label for="tienLuong" class="block font-bold mb-3">Tiền lương</label>
            <InputNumber v-model="tienLuong" class="w-full" fluid input-id="tienCong" placeholder="Nhập giá tiền"
            mode="currency" currency="VND" locale="vi-VN" />
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <Button label="Hủy" icon="pi pi-times" class="p-button-danger" @click="close" />
      <Button label="Lưu" icon="pi pi-check" class="p-button-primary" @click="onSubmit" />
    </template>
  </Dialog>
</template>

<script setup>
import { computed } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import {  watchEffect } from 'vue'
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from "primevue/usetoast";
import { NhanVienService } from '~/services/nhan-vien/nhan-vien.service';
// import { NhanVienModel } from '~/models/nhan-vien/nhan-vien.model';
// import { NhanVienModel } from '~/models/nhan-vien/nhan-vien.model';

const confirm = useConfirm();
const emit = defineEmits(['hideModal']);
const toast = useToast();

const props = defineProps({
  isVisible: {
    type: Boolean,
  },
  khachHang: {
    type: Object
  }
});
const internalVisible = computed({
  get() {
    return props.isVisible;
  },
  set() {
    handleHideModal();
  },
});
const internalDataNhanVien = computed({
  get() {
    return props.khachHang;
  },
  set() {},
});
const handleHideModal = () => {
  emit('hideModal');
  resetForm();
};
const schema = yup.object({
  // maPhuTung: yup
  //   .string()
  //   .required('Vui lòng nhập mã phụ tùng!')
  //   .max(100, 'Tối đa 100 ký tự!'),
  // tenPhuTung: yup.string().required('Vui lòng nhập tên phụ tùng!'),
});



const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
});

const close = () => {
  internalVisible.value = false;
}


const [tenNhanVien] = defineField('tenNhanVien');
const [ngaySinh] = defineField('ngaySinh');
const [dienThoai] = defineField('dienThoai');
const [diaChi] = defineField('diaChi');
const [tienLuong] = defineField('tienLuong');

watchEffect(() => {
  if (internalDataNhanVien.value && internalDataNhanVien.value.id > 0) {
    tenNhanVien.value = internalDataNhanVien.value.ten_nhanvien;
    ngaySinh.value = internalDataNhanVien.value.ngay_sinh;
    dienThoai.value = internalDataNhanVien.value.dien_thoai;
    diaChi.value = internalDataNhanVien.value.dia_chi
    tienLuong.value = internalDataNhanVien.value.tien_luong
  }
})

const onSubmit = handleSubmit(() => {
  internalDataNhanVien.value.ten_nhanvien = tenNhanVien.value;
  internalDataNhanVien.value.ngay_sinh = ngaySinh.value;
  internalDataNhanVien.value.dien_thoai = dienThoai.value;
  internalDataNhanVien.value.dia_chi = diaChi.value;
  internalDataNhanVien.value.tien_luong = tienLuong.value;
  confirm.require({
    message: 'Bạn có muốn cập nhật nhân viên không?',
    header: 'Cập nhật',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
        label: 'Thoát',
        severity: 'danger',
        outlined: true
    },
    acceptProps: {
        label: 'Lưu'
    },
    accept: () => {
      NhanVienService.updateNhanVien(internalDataNhanVien.value)
          .then((res) => {
            if (res) {
              handleHideModal();
              toast.add({ severity: 'success', summary: 'Thành công', detail: 'Đã cập nhật thành công', life: 3000 });
            }
            else {
              toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Cập nhật thất bại', life: 3000 });
            }
          })
          .catch(() => {
            toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Cập nhật thất bại', life: 3000 });
          });
    },
    reject: () => {
    }
  });
});
</script>

<style scoped>
.custom-button {
  background-color: #0b5ee7;
  color: white;
  width: 100%;
  margin-top: auto;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #8586ec;
}
</style>