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
            <InputText v-model="searchContent" placeholder="Tìm kiếm" class="w-full" />
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
        <DataTable
          v-model:rows="filterDatatable.length"
          data-key="id"
          :first="filterDatatable.start"
          :value="listHangNhap"
          :lazy="true"
          :total-records="recordTotals"
          :rows-per-page-options="[1, 5, 10, 25]"
          scrollabled
          show-gridlines
          paginator
          paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          current-page-report-template="hiển thị {first} đến {last} trong {totalRecords} dữ liệu "
          @page="onPage($event as PageEvent)"
        >
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
        <Column field="ma_phutung" header="Mã phụ tùng"></Column>
        <Column field="ten_phutung" header="Tên phụ tùng"></Column>
        <Column field="don_vi" header="Đơn vị"></Column>
        <Column :exportable="false" style="width: 9rem" :frozen="true" align-frozen="right">
          <template #header>
            <span class="m-auto"><b>Thao tác</b></span>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <Button icon="pi pi-pencil" outlined rounded severity="success" class="mr-2" title="chỉnh sửa"
                @click="onOpenEditModal(slotProps.data)" />
              <Button icon="pi pi-trash" outlined rounded severity="danger" title="Xóa"
                @click="confirmDeleteProject(slotProps.data)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <LoaiHangDialogCreateLoaiHang :is-visible="isOpenModal" @update-model="emitUpdateModel()" @hide-modal="isOpenModal = false"/>
  <LoaiHangDialogEditLoaiHang :is-visible="isOpenEditModel" :data-loai-pt="dataEdit" @update-model="emitUpdateModel()" @hide-modal="isOpenEditModel = false" />
</template>
<script setup lang="ts">
import { setTitleHeader } from '~/composables/globalTitleHeader';
import { ref } from 'vue';
import 'primeicons/primeicons.css'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { LoaiPhuTungService } from '~/services/loai-phu-tung/loai-phu-tung.service';
// import { LoaiPhuTungModel } from '~/models/loai-phu-tung/loai-phu-tung.model';
import type { FilterLoaiPhuTung } from '~/models/Filter/filter-param.model';
import type { PageEvent } from '~/composables/event';
import { LoaiPhuTungModel } from '~/models/loai-phu-tung/loai-phu-tung.model';

setTitleHeader("Hàng bán");
const confirm = useConfirm();
const toast = useToast();
const hangNhap = ref();
const isOpenModal = ref();
const isOpenEditModel = ref();
const searchContent = ref();
const dataEdit = ref<LoaiPhuTungModel>(new LoaiPhuTungModel());

const onOpenEditModal = (data: LoaiPhuTungModel) => {
  if (data) {
    dataEdit.value.id = data.id;
    dataEdit.value.ten_phutung = data.ten_phutung;
    dataEdit.value.ma_phutung = data.ma_phutung;
    dataEdit.value.don_vi = data.don_vi;
    isOpenEditModel.value = true;
  }
};
const onOpenModal = () => {
  isOpenModal.value = true;
};

const confirmDeleteProject = (data: LoaiPhuTungModel) => {
  confirm.require({
    message: 'Bạn có muốn xóa loại phụ tùng này không?',
    header: 'Xóa thông tin',
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
      LoaiPhuTungService.deleteLoaiPhuTung(data.id as number)
        .then((res) => {
          if (res) {
            onLoadData();
            toast.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công', life: 3000 });
          }
          else {
            toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Xóa thất bại', life: 3000 });
          }
        })
    },
    reject: () => {
    }
  })
};

const timKiem = () => {
  filterDatatable.value.search.value = searchContent.value;
  onLoadData();
};
const clearFilter = () => {
  searchContent.value = ''
  filterDatatable.value.search.value='';
  hangNhap.value = null
  onLoadData();
}
const getRowSTT = (index: number) => {
  return filterDatatable.value.start + index + 1;
};
const filterDatatable = ref({
  start: 0,
  length: 10,
  search: {
    value: ''
  },
});
const listHangNhap = ref();
const recordTotals = ref();
const loading = ref(true);

const onLoadData = async () => {
  loading.value = true;
  LoaiPhuTungService.getDatatable(filterDatatable.value as FilterLoaiPhuTung).then((res) => {
    listHangNhap.value = res?.data;
    recordTotals.value = res?.totalRecords;
  })
  loading.value = false;
};
onLoadData();
const emitUpdateModel = () => {
  onLoadData();
};
const onPage = (event: PageEvent) => {
  filterDatatable.value.start = event.first;
  filterDatatable.value.length = event.rows;
  onLoadData();
};
</script>