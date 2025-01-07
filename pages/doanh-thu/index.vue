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
    <div class="m-4" style="padding-bottom: 16px;">
      <DataTable :value="data" tableStyle="min-width: 50rem;" showGridlines>
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
        <Column field="tenDoanhThu" header="Doanh thu tháng" className="text-sm">
          <template #body="{ data }">
            <NuxtLink class="font-bold text-xl text-cyan-800" :to="`/doanh-thu/${data.id}`">{{ data.tenDoanhThu
              }}</NuxtLink>
          </template>
        </Column>
        <Column field="tongChiPhi" header="Tổng chi phí">
          <template #body="slotProps">
            <span>{{ slotProps.data.tongChiPhi.toLocaleString('vi-VN') }} &#8363;</span>
          </template>
        </Column>
        <Column field="tongDoanhThu" header="Tổng doanh thu">
          <template #body="slotProps">
            <span>{{ slotProps.data.tongDoanhThu.toLocaleString('vi-VN') }} &#8363;</span>
          </template>
        </Column>
        <Column field="tongDuNo" header="Tổng dư nợ">
          <template #body="slotProps">
            <span>{{ slotProps.data.tongDuNo.toLocaleString('vi-VN') }} &#8363;</span>
          </template>
        </Column>
        <Column field="tongLoiNhuan" header="Chi phí phát sinh">
          <template #body="slotProps">
            <span>{{ slotProps.data.tongLoiNhuan.toLocaleString('vi-VN') }} &#8363;</span>
          </template></Column>
        <Column field="tongLoiNhuan" header="Tổng lợi nhuận">
          <template #body="slotProps">
            <span>{{ slotProps.data.tongLoiNhuan.toLocaleString('vi-VN') }} &#8363;</span>
          </template></Column>
        <Column :exportable="false" style="min-width: 9rem" :frozen="true" align-frozen="right">
          <template #header>
            <span class="m-auto"><b>Thao tác</b></span>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <Button v-tooltip="'Xem'" icon="pi pi-eye" outlined rounded severity="info" class="mr-2" @click="onOpenModal" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <DoanhThu :is-visible="isOpenModal" @hide-modal="isOpenModal = false" />
</template>
<script setup lang="ts">
import { setTitleHeader } from '~/composables/globalTitleHeader';
import { ref } from 'vue';
import 'primeicons/primeicons.css'

setTitleHeader("Doanh thu");
const keyWords = ref();
const hangNhap = ref();
const isOpenModal = ref();

const onOpenModal = () => {
  isOpenModal.value = true;
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

const data = [
  {
    id: 1,
    tenDoanhThu: "Doanh thu tháng 9",
    tongChiPhi: 50000000,
    tongDoanhThu: 120000000,
    tongDuNo: 20000000,
    tongLoiNhuan: 70000000
  },
  {
    id: 2,
    tenDoanhThu: "Doanh thu tháng 10",
    tongChiPhi: 80000000,
    tongDoanhThu: 150000000,
    tongDuNo: 30000000,
    tongLoiNhuan: 40000000
  },
  {
    id: 3,
    tenDoanhThu: "Doanh thu tháng 11",
    tongChiPhi: 60000000,
    tongDoanhThu: 100000000,
    tongDuNo: 15000000,
    tongLoiNhuan: 25000000
  },
  {
    id: 4,
    tenDoanhThu: "Doanh thu tháng 12",
    tongChiPhi: 70000000,
    tongDoanhThu: 170000000,
    tongDuNo: 25000000,
    tongLoiNhuan: 75000000
  },
  {
    id: 5,
    tenDoanhThu: "Doanh thu tháng 1",
    tongChiPhi: 55000000,
    tongDoanhThu: 130000000,
    tongDuNo: 10000000,
    tongLoiNhuan: 65000000
  }
];

</script>