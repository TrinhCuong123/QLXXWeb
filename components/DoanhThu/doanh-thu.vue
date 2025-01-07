<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '1150px', color:'rgb(11, 94, 0)' }" :header="'Doanh thu tháng 9'"  :modal="true"
    :close-on-escape="true">
    <div>
      <Tabs value="0">
        <TabList>
          <Tab value="0" as="div" class="flex items-center gap-2"  style=" color: rgb(11, 94, 0);">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M13 10h-2V8h2zm0-4h-2V1h2zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2m10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2m-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03L21 4.96L19.25 4l-3.7 7H8.53L4.27 2H1v2h2l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7z"/></svg>
            <span class="font-bold whitespace-nowrap">Tổng chi phí hàng hóa</span>
          </Tab>
          <Tab value="1" as="div" class="flex items-center gap-2" style=" color: rgb(11, 94, 0);">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 64 64"><path fill="currentColor" d="M61 29.8h-5.2C54.7 18.4 45.6 9.3 34.3 8.2V3c0-1.2-1-2.3-2.3-2.3c-1.2 0-2.3 1-2.3 2.3v5.2C18.4 9.3 9.3 18.4 8.2 29.8H3c-1.2 0-2.3 1-2.3 2.3c0 1.2 1 2.3 2.3 2.3h5.2C9.3 45.8 18.4 54.9 29.8 56v5c0 1.2 1 2.3 2.3 2.3c1.2 0 2.3-1 2.3-2.3v-5.2C45.8 54.7 54.9 45.6 56 34.2h5c1.2 0 2.3-1 2.3-2.3c0-1.1-1.1-2.1-2.3-2.1M34.3 51.3v-.8c0-1.2-1-2.3-2.3-2.3c-1.2 0-2.3 1-2.3 2.3v.8c-8.9-1-16-8.1-17-17h.8c1.2 0 2.3-1 2.3-2.3c0-1.2-1-2.3-2.3-2.3h-.8c1-8.9 8.1-16 17-17v.8c0 1.2 1 2.3 2.3 2.3c1.2 0 2.3-1 2.3-2.3v-.8c8.9 1 16 8.1 17 17h-.8c-1.2 0-2.3 1-2.3 2.3c0 1.2 1 2.3 2.3 2.3h.8c-1.1 8.9-8.1 15.9-17 17"/><path fill="currentColor" d="M34.5 29.8h-5c-.8 0-1.5-.6-1.5-1.3s.7-1.3 1.5-1.3h7.4c1.2 0 2.3-1 2.3-2.3s-1-2.3-2.3-2.3h-2c0-1.2-1-2.2-2.2-2.2s-2.2 1-2.2 2.2h-.9c-3.3 0-6 2.6-6 5.8s2.7 5.8 6 5.8h5c.8 0 1.5.6 1.5 1.3s-.7 1.3-1.5 1.3h-8.4c-1.2 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3h4.4c0 1.2 1 2.2 2.2 2.2s2.2-1 2.2-2.2c3.1-.2 5.6-2.7 5.6-5.8c-.1-3.2-2.8-5.8-6.1-5.8"/></svg>
            <span class="font-bold whitespace-nowrap">Tổng doanh thu sửa chữa</span>
          </Tab>
          <Tab value="2" as="div" class="flex items-center gap-2" style=" color: rgb(11, 94, 0);">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599zM19.425 10H9.397l7.469-2.546l1.522-.487zM15.55 5.79L7.84 8.418l6.106-4.878zM3.5 18.169v-4.34A3 3 0 0 0 5.33 12h13.34a3 3 0 0 0 1.83 1.83v4.34A3 3 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169"/></svg>
            <span class="font-bold whitespace-nowrap">Tổng dư nợ</span>
          </Tab>
          <Tab value="3" as="div" class="flex items-center gap-2" style=" color: rgb(11, 94, 0);">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87c1.96 0 2.4-.98 2.4-1.59c0-.83-.44-1.61-2.67-2.14c-2.48-.6-4.18-1.62-4.18-3.67c0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87c-1.5 0-2.4.68-2.4 1.64c0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16"/></svg>
            <span class="font-bold whitespace-nowrap">Chi phí phát sinh</span>
          </Tab>
          <Tab value="4" as="div" class="flex items-center gap-2" style=" color: rgb(11, 94, 0);">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M8 11.75V7.5q0-.625.438-1.062T9.5 6t1.063.438T11 7.5v4.25q0 .625-.437 1.063T9.5 13.25t-1.062-.437T8 11.75m5-.225V3.5q0-.625.438-1.062T14.5 2t1.063.438T16 3.5v8.025q0 .75-.462 1.125t-1.038.375t-1.037-.375T13 11.525m-10 3.45V11.5q0-.625.438-1.062T4.5 10t1.063.438T6 11.5v3.475q0 .75-.462 1.125t-1.038.375t-1.037-.375T3 14.975m2.4 6.075q-.65 0-.913-.612T4.7 19.35l4.1-4.1q.275-.275.663-.3t.687.25L13 17.65l5.6-5.6H18q-.425 0-.712-.288T17 11.05t.288-.712t.712-.288h3q.425 0 .713.288t.287.712v3q0 .425-.288.713T21 15.05t-.712-.288T20 14.05v-.6l-6.25 6.25q-.275.275-.663.3t-.687-.25L9.55 17.3L6.1 20.75q-.125.125-.312.213t-.388.087"/></svg>
            <span class="font-bold whitespace-nowrap">Tổng lợi nhuận</span>
          </Tab>
        </TabList>
        <TabPanel value="0">

        </TabPanel>
        <TabPanel value="1">

        </TabPanel>
        <TabPanel value="2">

        </TabPanel>
        <TabPanel value="3">

        </TabPanel>
        <TabPanel value="4">

        </TabPanel>
      </Tabs>
    </div>
    <template #footer>
      <Button label="Hủy" icon="pi pi-times" class="p-button-danger" @click="close"/>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>
import {  computed } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
  },
});


const emit = defineEmits(['hideModal']);

const internalVisible = computed({
  get() {
    return props.isVisible;
  },
  set() {
    handleHideModal();
  },
});

const close = () => {
  internalVisible.value = false;
}

const getRowSTT = (index: number) => {
  return index + 1;
}

const handleHideModal = () => {
  emit('hideModal');
};


</script>

<style scoped>
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  text-align: left;
  border-color: #000000;
}

.styled-table thead tr {
  background-color: #f3f3f3;
  color: #000000;
  text-align: center;
  font-weight: bold;
}

.styled-table th,
.styled-table td {
  border: 1px solid #dddddd;
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

/* .styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
} */

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #ffffff;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>