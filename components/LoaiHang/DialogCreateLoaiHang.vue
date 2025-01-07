<template>
    <Dialog v-model:visible="internalVisible" :style="{ width: '800px' }" :header="'Thêm mới loại phụ tùng'" :modal="true"
    :close-on-escape="true">
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-3">
      <div class="min-w-40">
        <label for="maPhuTung" class="block font-bold mb-3 required">Mã phụ tùng</label>
        <InputText id="maPhuTung" v-model="maPhuTung" :invalid="errors.maPhuTung != null" size="large" fluid
          input-class="h-[42.72px]" placeholder="Nhập mã phụ tùng" />
        <span class="text-red-500">{{ errors.maPhuTung }}</span>
      </div>
      <div class="min-w-40">
        <label for="tenPhuTung" class="block font-bold mb-3 required">Tên phụ tùng</label>
        <InputText id="tenPhuTung" v-model="tenPhuTung" :invalid="errors.tenPhuTung != null" size="large" fluid
          input-class="h-[42.72px]" placeholder="Nhập tên phụ tùng" />
        <span class="text-red-500">{{ errors.tenPhuTung }}</span>
      </div>
      <div class="min-w-40">
        <label for="donVi" class="block font-bold mb-3 required">Đơn vị</label>
        <InputText id="donVi" v-model="donVi" :invalid="errors.donVi != null" size="large" fluid
          input-class="h-[42.72px]" placeholder="Nhập tên phụ tùng" />
        <span class="text-red-500">{{ errors.donVi }}</span>
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
import { LoaiPhuTungModel } from '~/models/loai-phu-tung/loai-phu-tung.model';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { LoaiPhuTungService } from '~/services/loai-phu-tung/loai-phu-tung.service';

const emit = defineEmits(['hideModal', 'updateModel']);

const confirm = useConfirm();
const toast = useToast();
const props = defineProps({
  isVisible: {
    type: Boolean,
  },
});
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
  maPhuTung: yup
    .string()
    .required('Vui lòng nhập mã phụ tùng!')
    .max(100, 'Tối đa 100 ký tự!'),
  tenPhuTung: yup.string().required('Vui lòng nhập tên phụ tùng!'),
  donVi: yup.string().required('Vui lòng nhập đơn vị!'),
});

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
});

// const [id] = defineField('id');
const [maPhuTung] = defineField('maPhuTung');
const [tenPhuTung] = defineField('tenPhuTung');
const [donVi] = defineField('donVi');


const onSubmit = handleSubmit(() => {
  const dataPhuTung: LoaiPhuTungModel = {
    ma_phutung: maPhuTung.value,
    ten_phutung: tenPhuTung.value,
    don_vi: donVi.value,
  }
  confirm.require({
    message: 'Bạn có muốn cập nhật loại hàng không?',
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
      LoaiPhuTungService.insertLoaiPhuTung(dataPhuTung)
        .then((res) => {
          if (res) {
            if (res.status == '200') {
              emit('updateModel');
              handleHideModal();
              toast.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm mới thành công', life: 3000 });
            }
            else if (res.status == '400') {
              toast.add({ severity: 'error', summary: 'Thất bại', detail: `${res.message}`, life: 3000 });
            }
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