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
    <!-- <div style="display: flex; justify-content: flex-end;">
      <Button label="Thêm mới" icon="pi pi-plus" class="flex mr-4 justify-items-end" title="Thêm mới"
        @click="onOpenModal" />
    </div> -->

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
        <Column class="text-center" body-style="text-align: center; width: 10px">
          <template #header>
            <span class="m-auto"><b>STT</b></span>
          </template>
          <template #body="slotPros">
            {{ getRowSTT(slotPros.index) }}
          </template>
        </Column>
        <Column field="id" header="Mã phụ tùng">
          <template #body="{ data }">
            <NuxtLink class="font-bold text-xl text-cyan-800" :to="`/kho-hang/${data.loai_phutung_id}`">{{ data.loaiPhuTung.ma_phutung
              }}</NuxtLink>
          </template>
        </Column>
        <Column field="tenPhuTung" header="Tên phụ tùng">
          <template #body="{ data }">
            {{ data.loaiPhuTung.ten_phutung }}
          </template>
        </Column>
        <Column field="tongso_phutung" header="Tổng số phụ tùng"></Column>
        <Column field="gia_nhap" header="Giá nhập"></Column>
        <Column field="gia_ban" header="Giá bán"></Column>
        <!-- <Column :exportable="false" style="min-width: 9rem" :frozen="true" align-frozen="right">
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
        </Column> -->
      </DataTable>
    </div>
  </div>
  <KhoHangDialogCreateKhoHang :is-visible="isOpenModal" @hide-modal="isOpenModal = false" @update-model="emitUpdateModel()"/>
  <KhoHangDialogEditKhoHang :is-visible="isOpenEditModel" @hide-modal="isOpenEditModel = false" @update-model="emitUpdateModel()"/>
</template>
<script setup lang="ts">
import { setTitleHeader } from '~/composables/globalTitleHeader';
import { ref } from 'vue';
import type { PageEvent } from '~/composables/event';
import 'primeicons/primeicons.css'
import { KhoHangService } from '~/services/kho-hang/kho-hang.service';
import type { FilterKhoHang } from '~/models/Filter/filter-param.model';

// import { useConfirm } from "primevue/useconfirm";
// import { useToast } from "primevue/usetoast";
// import { useRouter } from 'vue-router';

setTitleHeader("Kho hàng");

const keyWords = ref();
const hangNhap = ref();
const isOpenModal = ref();
const isOpenEditModel = ref();
const searchContent = ref();


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
  KhoHangService.getDatatable(filterDatatable.value as FilterKhoHang).then((res) => {
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