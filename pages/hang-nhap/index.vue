<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-white m-5 rounded-lg">
    <Toolbar class="mb-5">
      <template #start>
        <div class="gap-4">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="searchContent" placeholder="Tìm kiếm" class="w-full" />
          </IconField>
        </div>
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
        <Column field="ten_lannhap" header="Tên lần nhập hàng" className="text-sm">
          <template #body="{ data }">
            <NuxtLink class="font-bold text-xl text-cyan-800" :to="`/hang-nhap/${data.id}`">{{ data.ten_lannhap
              }}</NuxtLink>
          </template>
        </Column>
        <Column field="ngay_nhaphang" header="Ngày nhập hàng" className="text-sm">
          <template #body="slotProps">
            <span>{{ DateUtils.formatDate(slotProps.data.ngay_nhaphang) }} </span>
          </template>
        </Column>
        <Column field="tongtien_hang" header="Tổng tiền hàng" className="text-sm">
          <template #body="slotProps">
            <span>{{ NumberUtils.formatNumber(slotProps.data.tongtien_hang) }} &#8363;</span>
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
                @click="confirmDeleteProject(slotProps.data)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <HangNhapDialogCreateHangNhap :is-visible="isOpenModal" @update-model="emitUpdateModel()" @hide-modal="isOpenModal = false"/>
  <HangNhapDialogEditHangNhap :is-visible="isOpenEditModel" :data-nhap-hang="dataEdit" @update-model="emitUpdateModel()" @hide-modal="isOpenEditModel = false" />
</template>

<script setup lang="ts">
import { setTitleHeader } from '~/composables/globalTitleHeader';
import { ref } from 'vue';
import 'primeicons/primeicons.css'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { NhapHangModel } from '~/models/nhap-hang/nhap-hang.model';
import type { FilterNhapHang } from '~/models/Filter/filter-param.model';
import { NhapHangService } from '~/services/nhap-hang/nhap-hang.service';
import type { PageEvent } from '~/composables/event';

setTitleHeader("Hàng nhập");


const confirm = useConfirm();
const toast = useToast();
const hangNhap = ref();
const isOpenModal = ref();
const isOpenEditModel = ref();
const searchContent = ref();
const dataEdit = ref<NhapHangModel>(new NhapHangModel());

const onOpenEditModal = (data: NhapHangModel) => {
  if (data) {
    dataEdit.value.id = data.id;
    dataEdit.value.ten_lannhap = data.ten_lannhap;
    dataEdit.value.ngay_nhaphang = data.ngay_nhaphang;
    isOpenEditModel.value = true;
  }
};
const onOpenModal = () => {
  isOpenModal.value = true;
};

const confirmDeleteProject = (data: NhapHangModel) => {
  confirm.require({
    message: 'Bạn có muốn xóa dữ liệu nhập hàng không?',
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
      NhapHangService.delete(data.id as number)
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
  NhapHangService.getDatatable(filterDatatable.value as FilterNhapHang).then((res) => {
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