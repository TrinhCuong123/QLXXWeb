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
          <Select v-model="hangNhap" :options="listHangNhap" option-label="tenPhuTung" option-value="id"
            placeholder="Chọn loại hàng" class="w-48" show-clear />
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
    <div>
      <Button label="Quay lại" icon="pi pi-arrow-left" severity="danger" class="flex ml-4 justify-items-end"
        title="Quay lại" @click="onBack" />
    </div>
    <div class="m-4" style="padding-bottom: 16px;">
      <div class="m-6">
        <div class="flex">
          <div class="font-bold mr-3">
            Mã phụ tùng:
          </div>
          <div>
            {{ thongTinKho[0] }}
          </div>
        </div>
        <div class="flex">
          <div class="font-bold mr-3">
            Tên phụ tùng:
          </div>
          <div>
            {{ thongTinKho[1] }}
          </div>
        </div>
        <div class="flex">
          <div class="font-bold mr-3">
            Đơn vị:
          </div>
          <div>
            {{ thongTinKho[2] }}
          </div>
        </div>
      </div>
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
        <Column class="text-center" body-style="text-align: center">
          <template #header>
            <span class="m-auto"><b>STT</b></span>
          </template>
          <template #body="slotPros">
            {{ getRowSTT(slotPros.index) }}
          </template>
        </Column>
        <Column field="ngayNhapHang" header="Ngày nhập hàng" className="text-sm">
          <template #body="slotProps">
            <span>{{ DateUtils.formatDate(slotProps.data.ngay_nhaphang) }}</span>
          </template>
        </Column>
        <Column field="ngay_sanxuat" header="Ngày sản xuất" className="text-sm">
          <template #body="slotProps">
            <span>{{ DateUtils.formatDate(slotProps.data.ngay_sanxuat) }}</span>
          </template>
        </Column>
        <Column field="han_sudung" header="Hạn sử dụng" className="text-sm">
          <template #body="slotProps">
            <span>{{ DateUtils.formatDate(slotProps.data.han_sudung) }}</span>
          </template>
        </Column>
        <Column field="soluong_nhap" header="Số lượng nhập" className="text-sm"></Column>
        <Column field="soluong_conlai" header="Số lượng còn lại" className="text-sm"></Column>
        <Column field="gia_nhap" header="Giá nhập" className="text-sm">
          <template #body="slotProps">
            <span>{{ NumberUtils.formatNumber(slotProps.data.gia_nhap) }} &#8363;</span>
          </template>
        </Column>
        <Column field="gia_ban" header="Giá bán">
          <template #body="slotProps">
            <span>{{ NumberUtils.formatNumber(slotProps.data.gia_ban) }} &#8363;</span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <!-- <HangNhapDialogCreateDetailHangNhap :is-visible="isOpenModal" @hide-modal="isOpenModal = false" />
  <HangNhapDialogEditDetailHangNhap :is-visible="isOpenEditModel" @hide-modal="isOpenEditModel = false" /> -->
</template>

<script setup lang="ts">
import { setTitleHeader } from '~/composables/globalTitleHeader';
import { ref } from 'vue';
import 'primeicons/primeicons.css'
import { LichSuHangHoaService } from '~/services/lich-su-hang-hoa/lich-su-hang-hoa.service';
import type { FilterLichSuHangHoa } from '~/models/Filter/filter-param.model';
import type { PageEvent } from '~/composables/event';
import { useRouter } from 'vue-router';

const router = useRouter();
const path = ref(router.currentRoute.value.path);
const id = ref(Number(path.value.match(/\/(\d+)$/)?.[1]));
setTitleHeader("Lịch sử nhập hàng");

const keyWords = ref();
const hangNhap = ref();

const onBack = () => {
  router.push('/kho-hang');
};

const timKiem = () => {
  console.log("Đây là tìm kiếm");
};
const clearFilter = () => {
  keyWords.value = ''
  hangNhap.value = null
}
const thongTinKho = ref<string[]>([]);
const listHangNhap = ref();
const recordTotals = ref();
const loading = ref(true);
const getRowSTT = (index: number) => {
  return filterDatatable.value.start + index + 1;
};
const filterDatatable = ref({
  start: 0,
  length: 10,
  search: {
    value: ''
  },
  loaiphutung_id: id,
});

const onLoadData = async () => {
  loading.value = true;
  LichSuHangHoaService.getDatatable(filterDatatable.value as FilterLichSuHangHoa).then((res) => {
    listHangNhap.value = res?.data;
    recordTotals.value = res?.totalRecords;
    if (listHangNhap.value != null) {
    thongTinKho.value.push(listHangNhap.value[0].loaiPhuTung.ma_phutung);
    thongTinKho.value.push(listHangNhap.value[0].loaiPhuTung.ten_phutung);
    thongTinKho.value.push(listHangNhap.value[0].loaiPhuTung.don_vi);
  }

  })
  loading.value = false;
};
onLoadData();

const onPage = (event: PageEvent) => {
  filterDatatable.value.start = event.first;
  filterDatatable.value.length = event.rows;
  onLoadData();
}
</script>