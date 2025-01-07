<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '800px' }" :header="'Thêm lần nhập hàng'" :modal="true"
    :close-on-escape="true">
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
      <div class="min-w-40">
        <label for="tenLanNhap" class="block font-bold mb-3 required">Tên lần nhập hàng</label>
        <InputText id="tenLanNhap" v-model="tenLanNhap" :invalid="errors.tenLanNhap != null" size="large" fluid
          input-class="h-[42.72px]" placeholder="Nhập mã phụ tùng" />
        <span class="text-red-500">{{ errors.tenLanNhap }}</span>
      </div>
      <div class="min-w-40">
        <label for="ngayNhap" class="font-bold block mb-3 required">Ngày nhập hàng</label>
        <DatePicker v-model="ngayNhap" :invalid="errors.ngayNhap != null" input-class="h-[42.72px]" date-format="dd/mm/yy" show-icon fluid placeholder="dd/mm/yyyy" input-id="ngayNhap" />
        <span class="text-red-500">{{ errors.ngayNhap }}</span>
      </div>
    </div>
    <!-- end form -->
    <template #footer>
      <Button label="Hủy" icon="pi pi-times" severity="danger" @click="handleHideModal" />
      <Button label="Lưu" icon="pi pi-check" type="submit" @click="onSubmit" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import type { NhapHangModel } from '~/models/nhap-hang/nhap-hang.model';
import { NhapHangService } from '~/services/nhap-hang/nhap-hang.service';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const emit = defineEmits(['hideModal', 'updateModel']);

const props = defineProps({
  isVisible: {
    type: Boolean,
  },
});
const confirm = useConfirm();
const toast = useToast();
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
  resetForm();
};
const schema = yup.object({
  tenLanNhap: yup
    .string()
    .required('Vui lòng nhập mã phụ tùng!')
    .max(100, 'Tối đa 100 ký tự!'),
  ngayNhap: yup.date()
    .required('Vui lòng nhập ngày nhập hàng!'),
});

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
});

// const [id] = defineField('id');
const [tenLanNhap] = defineField('tenLanNhap');
const [ngayNhap] = defineField('ngayNhap');


const onSubmit = handleSubmit(() => {
  const nhapHangData:NhapHangModel = {
    ten_lannhap: tenLanNhap.value,
    ngay_nhaphang: ngayNhap.value,
    tongtien_hang: 0,
  }  as NhapHangModel;
  confirm.require({
    message: 'Bạn có muốn thêm hàng nhập không?',
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
      NhapHangService.insert(nhapHangData)
        .then((res) => {
          if (res) {
            emit('updateModel');
            handleHideModal();
            toast.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm mới thành công', life: 3000 });
          }
          else {
            toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Thêm mới thất bại', life: 3000 });
          }
        })
    },
    reject: () => {
    }
  });
});
</script>