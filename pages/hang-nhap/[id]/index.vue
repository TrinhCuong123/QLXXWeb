<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-white m-5 rounded-lg">
    <Toolbar class="mb-5">
      <template #start>
        <div class="flex flex-column justify-center gap-4">
          <!-- <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="keyWords" placeholder="Tìm kiếm" class="w-full" />
          </IconField> -->
          <Select v-model="maPhuTung" :options="listPhuTung" option-label="ma_phutung"
            option-value="id" placeholder="Chọn mã phụ tùng" class="w-48" filter
            :show-clear="maPhuTung != 0" />
          <Select v-model="maPhuTung" :options="listPhuTung" option-label="ten_phutung"
            option-value="id" placeholder="Chọn tên phụ tùng" class="w-48" filter
            :show-clear="maPhuTung != 0" />
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

    <div class="m-6">
      <div class="flex">
        <div class="font-bold mr-3">
          Tên lần nhập hàng:
        </div>
        <div>
          {{ hangNhapList.data.ten_lannhap }}
        </div>
      </div>
      <div class="flex">
        <div class="font-bold mr-3">
          Ngày nhập:
        </div>
        <div>
          {{ DateUtils.formatDate(hangNhapList.data.ngay_nhaphang) }}
        </div>
      </div>
      <div class="flex">
        <div class="font-bold mr-3">
          Tổng tiền:
        </div>
        <div>
          {{ NumberUtils.formatNumber(hangNhapList.data.tongtien_hang) }} &#8363;
        </div>
      </div>
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
          scrollabled show-gridlines paginator
          paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          v-model:expandedRows="expandedRows"
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
        <Column expander style="width: 3rem" />
        <Column class="text-center" body-style="text-align: center">
          <template #header>
            <span class="m-auto"><b>STT</b></span>
          </template>
          <template #body="slotPros">
            {{ getRowSTT(slotPros.index) }}
          </template>
        </Column>
        <Column field="maPhuTung" header="Mã phụ tùng" className="text-sm">
          <template #body="slotProps">
            {{ slotProps.data.loaiPhuTung.ma_phutung }}
          </template>
        </Column>
        <Column field="tenPhuTung" header="Tên phụ tùng" className="text-sm">
          <template #body="slotProps">
            {{ slotProps.data.loaiPhuTung.ten_phutung }}
          </template>
        </Column>
        <Column field="ngay_sanxuat" header="Ngày sản xuất" className="text-sm">
          <template #body="slotProps">
            {{ DateUtils.formatDate(slotProps.data.ngay_sanxuat) }}
          </template>
        </Column>
        <Column field="han_sudung" header="Hạn sử dụng" className="text-sm">
          <template #body="slotProps">
            {{ DateUtils.formatDate(slotProps.data.han_sudung) }}
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
        <template #expansion="slotProps">
          <div class="custom-details text-md mb-3">
            <tr>
              <td><b>Số lượng nhập:</b></td>
              <td class="w-full">
                {{
                  NumberUtils.formatNumber(slotProps.data.soluong_nhap)
                }}
              </td>
            </tr>
            <tr>
              <td><b>Giá nhập:</b></td>
              <td class="w-full">
                {{ NumberUtils.formatNumber(slotProps.data.gia_nhap) }} &#8363;
              </td>
            </tr>
            <tr>
              <td><b>Giá bán:</b></td>
              <td class="w-full">
                {{ NumberUtils.formatNumber(slotProps.data.gia_ban) }} &#8363;
              </td>
            </tr>
            <tr>
              <td><b>Ghi chú:</b></td>
              <td class="w-full">
                {{ slotProps.data.ghi_chu }}
              </td>
            </tr>
          </div>
        </template>
      </DataTable>
    </div>
  </div>
  <HangNhapDialogCreateDetailHangNhap  :is-visible="isOpenModal" @hide-modal="isOpenModal = false" @update-model="emitUpdateModel()" :nhap-hang-id="id" :phu-tung-list="listPhuTung" />
  <HangNhapDialogEditDetailHangNhap :is-visible="isOpenEditModel" @hide-modal="isOpenEditModel = false" @update-model="emitUpdateModel()" :data-nhap-hang="dataEdit" :nhap-hang-id="id" :phu-tung-list="listPhuTung"/>
</template>

<script setup lang="ts">
import { setTitleHeader } from '~/composables/globalTitleHeader';
import { ref } from 'vue';
import 'primeicons/primeicons.css'
// import { useConfirm } from "primevue/useconfirm";
// import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import { NhapHangService } from '~/services/nhap-hang/nhap-hang.service';
import type { FilterChiTietNhapHang } from '~/models/Filter/filter-param.model';
import { ChiTietHangNhapModel } from '~/models/chi-tiet-hang-nhap/chi-tiet-hang-nhap.model';
import { ChiTietNhapHangService } from '~/services/chi-tiet-nhap-hang/chi-tiet-nhap-hang.service';
import { LoaiPhuTungService } from '~/services/loai-phu-tung/loai-phu-tung.service';
import type { PageEvent } from '~/composables/event';

const router = useRouter();
const path = ref(router.currentRoute.value.path);
const id = ref(Number(path.value.match(/\/(\d+)$/)?.[1]));
const expandedRows = ref();

// const confirm = useConfirm();
// const toast = useToast();

const isOpenModal = ref();
const isOpenEditModel = ref();
const hangNhapList = ref();
const listHangNhap = ref();
const recordTotals = ref();
const listPhuTung = ref();
const dataEdit = ref<ChiTietHangNhapModel>(new ChiTietHangNhapModel());
const loading = ref(true);
const filterDatatable = ref({
  start: 0,
  length: 10,
  loaiphutung_id: 0,
  hangnhap_id: id.value,
});
hangNhapList.value = await NhapHangService.getByID(id.value);
listPhuTung.value = await LoaiPhuTungService.getLoaiPhuTung();
const onLoadData = async () => {
  loading.value = true;
  ChiTietNhapHangService.getDatatable(filterDatatable.value as FilterChiTietNhapHang).then((res) => {
    listHangNhap.value = res?.data;
    recordTotals.value = res?.totalRecords;
  })
  NhapHangService.getByID(id.value).then((res) => {
    hangNhapList.value = res;
  })
  loading.value = false;
  expandedRows.value = null;
};
onLoadData();
setTitleHeader(`Chi tiết ${(hangNhapList.value.data.ten_lannhap).toLowerCase()}`);


const onOpenEditModal = (data: ChiTietHangNhapModel) => {
  console.log(data);
  if (data.id) {
    dataEdit.value.id = data.id;
    dataEdit.value.ngay_sanxuat = data.ngay_sanxuat;
    dataEdit.value.han_sudung = data.han_sudung;
    dataEdit.value.soluong_nhap = data.soluong_nhap;
    dataEdit.value.gia_nhap = data.gia_nhap;
    dataEdit.value.gia_ban = data.gia_ban;
    dataEdit.value.ghi_chu = data.ghi_chu;
    dataEdit.value.loaiphutung_id = data.loaiphutung_id;
    isOpenEditModel.value = true;
  }
};
const onOpenModal = () => {
  isOpenModal.value = true;
};
const onBack = () => {
  router.push('/hang-nhap');
};

const emitUpdateModel = () => {
  onLoadData();
};

const confirmDeleteProject = (data: ChiTietHangNhapModel) => {
  console.log(data);

  // ConfirmDialog.showConfirmDialog(
  //   confirm,
  //   `${'Bạn có chắc muốn cập nhật thông tin báo cáo này?'
  //   }`,
  //   'Xác nhận',
  //   'pi pi-question-circle',
  //   () => {
  //   },
  //   () => { },
  //   '',
  //   ' p-button-danger',
  // );
};
const maPhuTung = ref(0)
const timKiem = () => {
  filterDatatable.value.loaiphutung_id = maPhuTung.value ?? 0;
  onLoadData();

};
const clearFilter = () => {
  filterDatatable.value.loaiphutung_id = 0;
  onLoadData();
}
const getRowSTT = (index: number) => {
  return filterDatatable.value.start + index + 1;
};
const onPage = (event: PageEvent) => {
  filterDatatable.value.start = event.first;
  filterDatatable.value.length = event.rows;
  onLoadData();
};

</script>

<style scoped>
.custom-width {
  width: 150px;
}

.custom-details {
  table-layout: fixed; /* Kiểm soát chiều rộng bảng */
  width: 100%; /* Đặt chiều rộng bảng */
}

.custom-details tr td {
  height: 35px;
  width: 100px;
  max-width: 200px; /* Giới hạn chiều rộng tối đa */
  word-wrap: break-word; /* Cho phép xuống dòng khi nội dung quá dài */
  word-break: break-word; /* Phá vỡ từ nếu cần thiết */
  white-space: normal; /* Cho phép xuống dòng */
  border-bottom: 0.5px solid rgb(216, 216, 216) !important;
}

.custom-details tr td:first-child {
  padding-right: 26px;
  width: 20%;
}

.custom-details tr {
  vertical-align: middle;
}

.custom-details tr:first-child {
  height: 30px;
  vertical-align: top;
}

.custom-details tr:last-child {
  height: 30px;
  vertical-align: bottom;
  border: none;
}

.first-tr td {
  height: fit-content;
}

</style>