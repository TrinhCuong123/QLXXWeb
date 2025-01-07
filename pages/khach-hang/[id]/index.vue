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
    <div style="display: flex; justify-content:space-between;">
      <Button label="Quay lại" icon="pi pi-arrow-left" severity="danger" class="flex ml-4 justify-items-end"
        title="Quay lại" @click="onBack" />
      <Button label="Thêm mới" icon="pi pi-plus" class="flex mr-4 justify-items-end" title="Thêm mới"
        @click="onOpenModal" />
    </div>

    <div class="m-4" style="padding-bottom: 16px;">
        <DataTable 
          v-model:rows="filterDatatable.length"
          :value="dataTest"
          data-key="id"
          :first="filterDatatable.start"
          :lazy="true"
          :total-records="recordTotals"
          :rows-per-page-options="[1, 5, 10, 25]"
          scrollabled
          show-gridlines
          paginator
          paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          current-page-report-template="hiển thị {first} đến {last} trong {totalRecords} dữ liệu "
          @page="onPage($event as PageEvent)">
          <template #loading>
            Đang tải lên dữ liệu, vui lòng chờ đợi!.
          </template>
          <template #empty>
            <div class="text-center">
              <span class="font-bold">Không có thông tin dữ liệu!</span>
            </div>
          </template>
        <Column class="text-center" body-style="text-align: center;width: 3rem">
          <template #header>
            <span class="m-auto"><b>STT</b></span>
          </template>
          <template #body="slotPros">
            {{ getRowSTT(slotPros.index) }}
          </template>
        </Column>
        <Column field="ngay_sua" header="Ngày sửa">
          <template #body="slotProps">
            <span>{{ slotProps.data.ngay_sua != null ? DateUtils.formatDate(slotProps.data.ngay_sua) : '' }}</span>
          </template>
        </Column>
        <Column field="tong_chiphi" header="Tổng chi phí">
          <template #body="slotProps">
            <span>{{ NumberUtils.formatNumber(slotProps.data.tong_chiphi) }} &#8363;</span>
          </template>
        </Column>
        <Column header="Trạng thái" field="lockout" :filter-menu-style="{ width: '14rem' }" style="min-width: 10rem">
          <template #body="slotProps">
            <div>
              <Badge v-if="slotProps.data.da_thanhtoan" :value="statePay.Active" severity="success" class="text-md font-medium" />
              <Badge v-else :value="statePay.Inactive" severity="danger" class="text-md font-medium" />
            </div>
          </template>
        </Column>
        <Column :exportable="false" style="width: 12rem" :frozen="true" align-frozen="right">
          <template #header>
            <span class="m-auto"><b>Thao tác</b></span>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <Button v-tooltip="'Xem'" icon="pi pi-eye" outlined rounded severity="info" class="mr-2"
                @click="onOpenShowModel(slotProps.data)" />
              <Button v-tooltip="'Sửa'" icon="pi pi-pencil" outlined rounded severity="success" class="mr-2"
                title="chỉnh sửa" @click="onOpenEditModal(slotProps.data)" />
              <Button v-tooltip="'Xóa'" icon="pi pi-trash" outlined rounded severity="danger" title="Xóa"
                @click="confirmDeleteProject()" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <KhachHangDialogCreateDetailKhachHang :is-visible="isOpenModal" @insert-model="emitInsertModel()" @hide-modal="isOpenModal = false" />
  <KhachHangDialogEditDetailKhachHang :is-visible="isOpenEditModel" @update-model="emitUpdateModel()" :data-phu-tung="dataPhuTung" @hide-modal="isOpenEditModel = false" />
  <KhachHangDialogShowInfoKhachHang :is-visible="isOpenShowModel" :customer-list="customerList" :data-show="dataShow" @hide-modal="isOpenShowModel = false" />
</template>
<script setup lang="ts">
import { setTitleHeader } from '~/composables/globalTitleHeader';
import { ref,onMounted } from 'vue';
import 'primeicons/primeicons.css'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import { KhachHangService } from '~/services/khach-hang/khach-hang.service';
import type { KhachHangModel, LichSuThayTheModel } from '~/models/khach-hang/khach-hang.model';
import type { FilterLichSuSuaXe } from '~/models/Filter/filter-param.model';
import type { PageEvent } from '~/composables/event';

const router = useRouter();
const confirm = useConfirm();
const toast = useToast();
const keyWords = ref();
const hangNhap = ref();
const dataPhuTung = ref();
const customerList = ref();
const detailList = ref();
const path = ref(router.currentRoute.value.path);
const id = ref(Number(path.value.match(/\/(\d+)$/)?.[1]));
const isOpenModal = ref<boolean>(false);
const isOpenEditModel = ref<boolean>(false);
const isOpenShowModel = ref<boolean>(false);
const dataShow = ref();

customerList.value = await KhachHangService.getByIdKhachHang(id.value);
detailList.value = customerList.value.lichSuThayThe;

const filterDatatable = ref({
  start: 0,
  length: 10,
});

const emitInsertModel = () => {
  onLoadData();
};

const emitUpdateModel = () => {
  onLoadData();
};
const recordTotals = ref();
const loading = ref(true);

const onPage = (event: PageEvent) => {
  filterDatatable.value.start = event.first;
  filterDatatable.value.length = event.rows;
  onLoadData();
};

const dataTest = ref();

const onLoadData = async () => {
  loading.value = true;
  KhachHangService.getLichSuSuaXeDatatable(id.value, filterDatatable.value as FilterLichSuSuaXe).then((res) => {
    dataTest.value = res?.data;
    recordTotals.value = res?.totalRecords;
  })
  loading.value = false;
};

onMounted(async () => {
  loading.value = true;
  onLoadData();
});

const onOpenShowModel = async (data: KhachHangModel) => {
  dataShow.value = await KhachHangService.getLichSuByID(data.id || 0);
  isOpenShowModel.value = true;
};

const onOpenEditModal = async (data: LichSuThayTheModel) => {
  dataPhuTung.value = await KhachHangService.getLichSuByID(data.id || 0);
  isOpenEditModel.value = true;
};

const onOpenModal = () => {
  isOpenModal.value = true;
};

const statePay = {
  Active: 'Đã thanh toán',
  Inactive: 'Chưa thanh toán',
};


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
  return filterDatatable.value.start + index + 1;
}

const onBack = () => {
  router.push('/khach-hang');
};

setTitleHeader(`Lịch sử sửa chữa ${customerList.value.ten_khachhang}`);

</script>