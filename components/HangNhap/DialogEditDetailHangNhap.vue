<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '1000px' }" :header="'Cập nhật hàng nhập'" :modal="true"
    :close-on-escape="true">
    <!-- <div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
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
    </div> -->
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
      <div class="min-w-40">
        <label for="maPhuTung" class="block font-bold mb-3">Mã phụ tùng</label>
        <Select id="maPhuTung" v-model="maPhuTung" :options="internalPhuTung" option-label="ma_phutung" option-value="id"
          placeholder="Chọn tên phụ tùng" size="large" disabled class="mr-2 w-full h-[42.72px]" />
      </div>
      <div class="min-w-40">
        <label for="maPhuTung" class="block font-bold mb-3">Tên phụ tùng</label>
        <Select id="maPhuTung" v-model="maPhuTung" :options="internalPhuTung" option-label="ten_phutung" option-value="id"
          placeholder="Chọn tên phụ tùng" size="large" disabled class="mr-2 w-full h-[42.72px]" />
      </div>
      <!-- <div class="min-w-40">
        <label for="ngayNhap" class="font-bold block mb-3 required">Ngày nhập hàng</label>
        <DatePicker v-model="ngayNhap" :invalid="errors.ngayNhap != null" input-class="h-[42.72px]"
          date-format="dd/mm/yy" show-icon fluid placeholder="dd/mm/yyyy" input-id="ngayNhap" />
        <span class="text-red-500">{{ errors.ngayNhap }}</span>
      </div> -->
      <!-- <div class="min-w-40">
        <label for="tenPhuTung" class="block font-bold mb-3 required">Thêm phụ tùng</label>
        <div>
          <Button icon="pi pi-plus" severity="warn" class="mr-2 w-full h-[42.72px]" @click="onOpenModal()" />
        </div>
      </div> -->
    </div>
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div class="min-w-40">
        <label for="ngaySanXuat" class="font-bold block mb-3 required">Ngày sản xuất</label>
        <DatePicker v-model="ngaySanXuat" :invalid="errors.ngaySanXuat != null" input-class="h-[42.72px]"
          date-format="dd/mm/yy" show-icon fluid placeholder="dd/mm/yyyy" input-id="ngaySanXuat" />
        <span class="text-red-500">{{ errors.ngaySanXuat }}</span>
      </div>
      <div class="min-w-40">
        <label for="hanSuDung" class="font-bold block mb-3 required">Hạn sử dụng</label>
        <DatePicker v-model="hanSuDung" :invalid="errors.hanSuDung != null" input-class="h-[42.72px]"
          date-format="dd/mm/yy" show-icon fluid placeholder="dd/mm/yyyy" input-id="hanSuDung" />
        <span class="text-red-500">{{ errors.hanSuDung }}</span>
      </div>
      <div class="min-w-40">
        <label for="soLuong" class="block font-bold mb-3 required">Số lượng</label>
        <InputNumber id="soLuong" v-model="soLuong" :invalid="errors.soLuong != null" class="h-[42.72px]" size="large"
          fluid placeholder="Nhập số lượng" />
        <span class="text-red-500">{{ errors.soLuong }}</span>
      </div>

    </div>
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-2 mt-5">
      <div class="min-w-40">
        <label for="giaNhap" class="block font-bold mb-3 required">Giá nhập</label>
        <InputNumber v-model="giaNhap" fluid input-id="giaNhap" placeholder="Nhập giá nhập" mode="currency"
          currency="VND" locale="vi-VN" :invalid="errors.giaNhap != null" />
        <span class="text-red-500">{{ errors.giaNhap }}</span>
      </div>
      <div class="min-w-40">
        <label for="giaBan" class="block font-bold mb-3 required">Giá bán</label>
        <InputNumber v-model="giaBan" fluid input-id="giaBan" placeholder="Nhập giá nhập" mode="currency" currency="VND"
          locale="vi-VN" :invalid="errors.giaBan != null" />
        <span class="text-red-500">{{ errors.giaBan }}</span>
      </div>
    </div>
    <div class="min-w-40 mt-5">
      <label for="ghiChu" class="block font-bold mb-3">Ghi chú</label>
      <Textarea v-model="ghiChu" fluid input-id="ghiChu" rows="5" placeholder="Nhập giá nhập" mode="currency" currency="VND"
        locale="vi-VN" />
    </div>
    <!-- end form -->
    <template #footer>
      <Button label="Hủy" icon="pi pi-times" severity="danger" @click="handleHideModal" />
      <Button label="Lưu" icon="pi pi-check" type="submit" @click="onSubmit" />
    </template>
  </Dialog>


</template>
<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { ChiTietHangNhapModel } from '~/models/chi-tiet-hang-nhap/chi-tiet-hang-nhap.model';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { ChiTietNhapHangService } from '~/services/chi-tiet-nhap-hang/chi-tiet-nhap-hang.service';

const emit = defineEmits(['hideModal', 'updateModel']);

const props = defineProps({
  isVisible: {
    type: Boolean,
  },
  phuTungList: {
    type: Array,
    default: () => [],
  },
  nhapHangId: {
    type: Number,
    default: () => 0,
  },
  dataNhapHang: {
    type: Object,
    default: () => new ChiTietHangNhapModel(),
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
const internalPhuTung = computed({
  get() {
    return props.phuTungList;
  },
  set() {},
});
const internalNhapHangID = computed({
  get() {
    return props.nhapHangId;
  },
  set() {},
});
const internalDataNhapHang = computed({
  get() {
    return props.dataNhapHang;
  },
  set() {},
});
const confirm = useConfirm();
const toast = useToast();
const handleHideModal = () => {
  emit('hideModal');
  internalDataNhapHang.value.id = 0;
  resetForm();
};
const schema = yup.object({
  maPhuTung: yup
    .string()
    .required('Vui lòng nhập mã phụ tùng!')
    .max(100, 'Tối đa 100 ký tự!'),
  ngaySanXuat: yup.string()
    .required('Vui lòng nhập sản xuất!'),
  hanSuDung: yup.string()
    .required('Vui lòng nhập hạn sử dụng!'),
  soLuong: yup
    .number()
    .required('Vui lòng nhập số lượng!')
    .max(100, 'Tối đa 100 ký tự!')
    .min(0, 'Không được nhập số âm'),
  giaNhap: yup
    .number()
    .required('Vui lòng nhập giá nhập!')
    .min(0, 'Không được nhập số âm'),
  giaBan: yup
    .number()
    .required('Vui lòng nhập giá nhập!')
    .min(0, 'Không được nhập số âm'),
});
const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
});
const [id] = defineField('id');
const [maPhuTung] = defineField('maPhuTung');
const [ngaySanXuat] = defineField('ngaySanXuat');
const [hanSuDung] = defineField('hanSuDung');
const [soLuong] = defineField('soLuong');
const [giaNhap] = defineField('giaNhap');
const [giaBan] = defineField('giaBan');
const [ghiChu] = defineField('ghiChu');

watchEffect(() => {
  if (internalDataNhapHang.value.id) {
    id.value = internalDataNhapHang.value.id;
    maPhuTung.value = internalDataNhapHang.value.loaiphutung_id;
    ngaySanXuat.value = internalDataNhapHang.value.ngay_sanxuat;
    hanSuDung.value = internalDataNhapHang.value.han_sudung;
    soLuong.value = internalDataNhapHang.value.soluong_nhap;
    giaNhap.value = internalDataNhapHang.value.gia_nhap;
    giaBan.value = internalDataNhapHang.value.gia_ban;
    ghiChu.value = internalDataNhapHang.value.ghi_chu;
  }
})

const onSubmit = handleSubmit(() => {
  const customerData:ChiTietHangNhapModel  = {
    id: id.value,
    ngay_sanxuat: ngaySanXuat.value,
    han_sudung: hanSuDung.value,
    soluong_nhap: soLuong.value,
    gia_nhap: giaNhap.value,
    gia_ban: giaBan.value,
    ghi_chu: ghiChu.value,
    loaiphutung_id: maPhuTung.value,
    hangnhap_id: internalNhapHangID.value,
  } as ChiTietHangNhapModel;

  confirm.require({
    message: 'Bạn có muốn thêm mới hàng nhập không?',
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
      ChiTietNhapHangService.update(customerData)
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
          // .catch(() => {
          //   toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Thêm mới thất bại', life: 3000 });
          // });
    },
    reject: () => {
    }
  });
});
</script>