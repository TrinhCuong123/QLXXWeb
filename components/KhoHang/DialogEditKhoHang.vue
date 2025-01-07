<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '800px' }" :header="'Thêm hàng nhập'" :modal="true"
    :close-on-escape="true">
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
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
    </div>
    <!-- end form -->
    <template #footer>
      <Button label="Hủy" icon="pi pi-times" severity="danger" @click="handleHideModal" />
      <Button label="Lưu" icon="pi pi-check" type="submit" @click="onSubmit" />
    </template>
  </Dialog>
</template>

<script setup>
import { computed } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';

const emit = defineEmits(['hideModal']);

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
});

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
});

// const [id] = defineField('id');
const [maPhuTung] = defineField('maPhuTung');
const [tenPhuTung] = defineField('tenPhuTung');

const onSubmit = handleSubmit(() => {
  console.log('onSubmit');
});
</script>