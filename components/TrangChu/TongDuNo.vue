<template>
  <div>
    <DataTable :value="duLieuHienThi" >
        <template #loading>
          Đang tải lên dữ liệu, vui lòng chờ đợi!.
        </template>
        <template #empty>
          <div class="text-center">
            <span class="font-bold">Không có thông tin dữ liệu!</span>
          </div>
        </template>
      <Column field="ten" header="Họ tên"></Column>
      <Column field="bienSoXe" header="Biển số xe"></Column>
      <Column field="soTien" header="Số tiền nợ">
        <template #body="slotProps">
          <span>{{ slotProps.data.soTien }} &#8363;</span>
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="internalVisible" :style="{ width: '800px' }" :header="'Thông tin dư nợ'" :modal="true"
      :close-on-escape="true" >
      <DataTable :value="duLieuDuNo" :rows="10" paginator showGridlines>
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
        <Column field="ten" header="Họ tên"></Column>
        <Column field="bienSoXe" header="Biển số xe"></Column>
        <Column field="soTien" header="Số tiền nợ">
          <template #body="slotProps">
            <span>{{ slotProps.data.soTien }} &#8363;</span>
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

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
};

const getRowSTT = (index: number) => {
  return index + 1;
}

const duLieuDuNo = [
  {
    "ten": "Nguyễn Văn An",
    "bienSoXe": "29A-12345",
    "soTien": "5.000.000"
  },
  {
    "ten": "Trần Thị Bình",
    "bienSoXe": "30B-67890",
    "soTien": "25.000.000"
  },
  {
    "ten": "Lê Minh Cường",
    "bienSoXe": "29C-54321",
    "soTien": "15.000.000"
  },
  {
    "ten": "Phạm Thị Duyên",
    "bienSoXe": "30D-98765",
    "soTien": "2.000.000"
  },
  {
    "ten": "Hoàng Quốc Huy",
    "bienSoXe": "29E-11111",
    "soTien": "3.000.000"
  },
  {
    "ten": "Nguyễn Thị Mai",
    "bienSoXe": "29A-23456",
    "soTien": "7.000.000"
  },
  {
    "ten": "Trần Văn Dũng",
    "bienSoXe": "30B-34567",
    "soTien": "12.000.000"
  },
  {
    "ten": "Lê Thị Hương",
    "bienSoXe": "29C-45678",
    "soTien": "20.000.000"
  },
  {
    "ten": "Phạm Văn Nam",
    "bienSoXe": "30D-56789",
    "soTien": "1.500.000"
  },
  {
    "ten": "Hoàng Văn Minh",
    "bienSoXe": "29E-67890",
    "soTien": "4.500.000"
  },
  {
    "ten": "Nguyễn Văn Tài",
    "bienSoXe": "29A-34567",
    "soTien": "8.500.000"
  },
  {
    "ten": "Trần Thị Lan",
    "bienSoXe": "30B-45678",
    "soTien": "18.000.000"
  },
  {
    "ten": "Lê Văn Hùng",
    "bienSoXe": "29C-56789",
    "soTien": "10.000.000"
  },
  {
    "ten": "Phạm Thị Thủy",
    "bienSoXe": "30D-67890",
    "soTien": "6.000.000"
  },
  {
    "ten": "Hoàng Quốc Tuấn",
    "bienSoXe": "29E-78901",
    "soTien": "9.000.000"
  },
  {
    "ten": "Nguyễn Văn Bình",
    "bienSoXe": "29A-45678",
    "soTien": "11.000.000"
  },
  {
    "ten": "Trần Văn Lộc",
    "bienSoXe": "30B-56789",
    "soTien": "13.500.000"
  },
  {
    "ten": "Lê Thị Hòa",
    "bienSoXe": "29C-67890",
    "soTien": "22.000.000"
  },
  {
    "ten": "Phạm Văn Hậu",
    "bienSoXe": "30D-78901",
    "soTien": "17.000.000"
  },
  {
    "ten": "Hoàng Thị Kim",
    "bienSoXe": "29E-89012",
    "soTien": "14.000.000"
  },
  {
    "ten": "Nguyễn Văn Phúc",
    "bienSoXe": "29A-56789",
    "soTien": "19.000.000"
  },
  {
    "ten": "Trần Thị Ngọc",
    "bienSoXe": "30B-67890",
    "soTien": "16.000.000"
  }
];
const duLieuHienThi = duLieuDuNo.slice(0, 3);

</script>