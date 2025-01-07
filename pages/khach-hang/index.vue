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
      <!-- <DataTable :value="customerList" v-model:rows="filterDatatable.length" tableStyle="min-width: 50rem"
        :first="filterDatatable.start" :lazy="true" :total-records="recordTotals"
        :rows-per-page-options="[1, 5, 10, 25]" scrollabled show-gridlines paginator
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        current-page-report-template="hiển thị {first} đến {last} trong {totalRecords} dữ liệu "
        @page="onPage($event as PageEvent)"> -->
        <DataTable
          v-model:rows="filterDatatable.length"
          data-key="id"
          :first="filterDatatable.start"
          :value="customerList"
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
        <Column class="text-center" body-style="text-align: center;width:10px">
          <template #header>
            <span class="m-auto"><b>STT</b></span>
          </template>
          <template #body="slotPros">
            {{ getRowSTT(slotPros.index) }}
          </template>
        </Column>
        <Column field="tenKhachHang" header="Tên khách hàng" style="min-width: 13rem">
          <template #body="{ data }">
            <NuxtLink class="font-bold text-cyan-800" :to="`/khach-hang/${data.id}`">{{ data.ten_khachhang
              }}</NuxtLink>
          </template>
        </Column>
        <Column field="dien_thoai" header="Điện thoại" style="min-width: 8rem"></Column>
        <Column field="dia_chi" header="Địa chỉ" style="min-width: 10rem"></Column>
        <Column field="thuong_hieu" header="Thương hiệu" style="min-width: 10rem"></Column>
        <Column field="bienso_xe" header="Biển số xe" style="min-width: 10rem"></Column>
        <Column field="so_vin" header="Số vin" style="min-width: 10rem"></Column>
        <Column :exportable="false" style="min-width: 9rem" :frozen="true" align-frozen="right">
          <template #header>
            <span class="m-auto"><b>Thao tác</b></span>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <Button v-tooltip="'Sửa'" icon="pi pi-pencil" outlined rounded severity="success" class="mr-2"
                title="chỉnh sửa" @click="onOpenEditModal(slotProps.data)" />
              <Button v-tooltip="'Xóa'" icon="pi pi-trash" outlined rounded severity="danger" title="Xóa"
                @click="confirmDeleteProject(slotProps.data)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <KhachHangDialogCreateKhachHang :is-visible="isOpenModal"      @insert-model="emitInsertModel()"
  @update-model="emitUpdateModel()" @hide-modal="isOpenModal = false" />
  <KhachHangDialogEditKhachHang :is-visible="isOpenEditModel"      @insert-model="emitInsertModel()"
  @update-model="emitUpdateModel()" :customer-data="customerData"
    @hide-modal="isOpenEditModel = false" />
  <KhachHangDialogShowInfoKhachHang :is-visible="isOpenShowModel" @hide-modal="isOpenShowModel = false" />
</template>
<script setup lang="ts">
import { setTitleHeader } from '~/composables/globalTitleHeader';
import { ref, onMounted } from 'vue';
import 'primeicons/primeicons.css'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { KhachHangService } from '~/services/khach-hang/khach-hang.service';
import type { KhachHangModel } from '~/models/khach-hang/khach-hang.model';
import type { FilterKhachHang } from '~/models/Filter/filter-param.model';
import type { PageEvent } from '~/composables/event';

setTitleHeader("Khách hàng");

const confirm = useConfirm();
const toast = useToast();
const hangNhap = ref();
const isOpenModal = ref();
const isOpenEditModel = ref();
const isOpenShowModel = ref();
const customerData = ref();
const searchContent = ref();

const customerList = ref();

const filterDatatable = ref({
  start: 0,
  length: 10,
  search: {
    value: ''
  },
});
const recordTotals = ref();
const loading = ref(true);


const onLoadData = async () => {
  loading.value = true;
  KhachHangService.getKhachHangDatatable(filterDatatable.value as FilterKhachHang).then((res) => {
    customerList.value = res?.data;
    recordTotals.value = res?.totalRecords;
  })
  loading.value = false;
};

onMounted(async () => {
  loading.value = true;
  onLoadData();
});

const onPage = (event: PageEvent) => {
  filterDatatable.value.start = event.first;
  filterDatatable.value.length = event.rows;
  onLoadData();
};
const onOpenEditModal = (data: KhachHangModel) => {
  isOpenEditModel.value = true;
  customerData.value = data;
};
const onOpenModal = () => {
  isOpenModal.value = true;
};

const emitInsertModel = () => {
  onLoadData();
};

const emitUpdateModel = () => {
  onLoadData();
};
const confirmDeleteProject = (data: KhachHangModel) => {
  confirm.require({
    message: 'Bạn có muốn xóa khách hàng không?',
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
      KhachHangService.deleteKhachHang(data.id as number)
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

</script>