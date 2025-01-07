<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-white m-5 rounded-lg">
    <Toolbar class="mb-5">
      <template #start>
        <div class="flex flex-column justify-center gap-4">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="keyWords" placeholder="Tìm kiếm" class="w-full" />
          </IconField>
        </div>
      </template>

      <template #end>
        <div class="mx-4">
          <Button type="button" icon="pi pi-filter" label="Tìm kiếm" class="w-full" @click="timKiem" />
        </div>
        <div class="">
          <Button type="button" icon="pi pi-filter-slash" label="Bỏ lọc" outlined severity="danger" class="w-full"
            @click="clearFilter()" />
        </div>
      </template>
    </Toolbar>
    <div style="display: flex; justify-content: flex-end;">
      <Button label="Thêm mới" icon="pi pi-plus" class="flex mr-4 justify-items-end" title="Thêm mới"
        @click="onOpenModal" />
    </div>

    <div class="m-4" style="padding-bottom: 16px;">
        <DataTable :value="listKhachHang" tableStyle="min-width: 50rem" showGridlines>
        <template #loading>
          Đang tải lên dữ liệu, vui lòng chờ đợi!.
        </template>
        <template #empty>
          <div class="text-center">
            <span class="font-bold">Không có thông tin dữ liệu!</span>
          </div>
        </template>
        <Column class="text-center" body-style="text-align: center; width:10px">
          <template #header>
            <span class="m-auto"><b>STT</b></span>
          </template>
          <template #body="slotPros">
            {{ getRowSTT(slotPros.index) }}
          </template>
        </Column>
        <Column field="ten_nhanvien" header="Tên nhân viên"></Column>
        <Column field="ngay_sinh" header="Ngày sinh">
          <template #body="slotProps">
            {{ DateUtils.formatDate(slotProps.data.ngay_sinh) }}
          </template>
        </Column>
        <Column field="dien_thoai" header="Số điện thoại"></Column>
        <Column field="dia_chi" header="Địa chỉ" style="width:500px"></Column>
        <Column field="tien_luong" header="Tiền lương">
          <template #body="slotProps">
            <span>{{ NumberUtils.formatNumber(slotProps.data.tien_luong) }} &#8363;</span>
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 9rem" :frozen="true" align-frozen="right">
          <template #header>
            <span class="m-auto"><b>Thao tác</b></span>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <Button icon="pi pi-pencil" outlined rounded severity="success" class="mr-2" title="chỉnh sửa"
                @click="onOpenEditModal(slotProps.data)" />
              <Button icon="pi pi-trash" outlined rounded severity="danger" title="Xóa"
                @click="confirmDeleteProject()" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <NhanVienDialogCreateKhachHang :is-visible="isOpenModal" @hide-modal="isOpenModal = false" />
  <NhanVienDialogEditKhachHang :is-visible="isOpenEditModel" :khach-hang="dataKhachHang" @hide-modal="isOpenEditModel = false" />
</template>
<script setup lang="ts">
import { setTitleHeader } from '~/composables/globalTitleHeader';
import { ref, onMounted } from 'vue';
import 'primeicons/primeicons.css'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { NhanVienService } from '~/services/nhan-vien/nhan-vien.service';
import { NhanVienModel } from '~/models/nhan-vien/nhan-vien.model';

setTitleHeader("Nhân viên");


const confirm = useConfirm();
const toast = useToast();
const keyWords = ref();
const hangNhap = ref();
const isOpenModal = ref();
const isOpenEditModel = ref();
const listKhachHang = ref();
const dataKhachHang = ref();

const onOpenEditModal = (data: NhanVienModel) => {
  dataKhachHang.value = data;
  isOpenEditModel.value = true;
};
const onOpenModal = () => {
  isOpenModal.value = true;
};

onMounted(async () => {
  NhanVienService.getNhanVien().then((res) => {
    listKhachHang.value = res;
  });
})

const confirmDeleteProject = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Save'
    },
    accept: () => {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  });
};

const timKiem = () => {
  console.log("Đây là tìm kiếm");
};
const clearFilter = () => {
  keyWords.value = ''
  hangNhap.value = null
}
const getRowSTT = (index: number) => {
  return index + 1;
}

</script>