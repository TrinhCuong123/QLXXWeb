<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar bg-white fixed top-0 left-0 h-full w-[250px] z-10">
      <NuxtLink to="/trang-chu">
        <img src="~/assets/fonts/cuong_logo-gara1.svg" class="mt-8" alt="Logo" height="90" width="190">
      </NuxtLink>
      <div class=" w-full p-5">
        <div class="flex justify-center">
          <Menu :model="items" class="w-full md:w-60" style="border: 0;">
            <template #item="{ item, props }">
              <a v-ripple class="flex items-center" v-bind="props.action">
                <span v-html="item.svgIcon" class="inline-block w-6 h-6 mt-2"></span>
                <span>{{ item.label }}</span>
              </a>
            </template>
          </Menu>
        </div>
      </div>
    </aside>

    <!-- Header -->
    <header class="header bg-white text-black p-4 fixed top-0 w-[calc(100%-250px)] ml-[250px] z-5">
      <nav style="flex: 1 1 auto;">
        <div class="flex justify-between items-center ">
          <div>
            <div class="ml-5 py-5">
              <div class="font-bold text-3xl">{{ titleHeader }}</div>
              <div class="text-sm">{{ subTitle }}</div>
            </div>
          </div>
          <div class="flex gap-4 items-center pr-10">
            <div class="flex mr-6">
              <div class="mr-2">
                <div
                  class="flex items-center justify-center p-2 rounded-full  bg-white text-white hover:bg-yellow-400 focus:outline-none focus:ring-0"
                  title="Thông báo" @click="visiblePhanHoi = true">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="#04091E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3 7L12 13L21 7" stroke="#04091E" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
              <div class="mr-3">
                <div
                  class="flex items-center justify-center p-2 rounded-full  bg-white text-white hover:bg-yellow-400 focus:outline-none focus:ring-0"
                  title="Phản hồi" @click="visibleThongBao = true">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5C15.1484 5.54303 16.1274 6.38833 16.8321 7.4453C17.5367 8.50227 17.9404 9.73107 18 11V14C18.0753 14.6217 18.2954 15.2171 18.6428 15.7381C18.9902 16.2592 19.4551 16.6914 20 17H4C4.54494 16.6914 5.00981 16.2592 5.35719 15.7381C5.70457 15.2171 5.92474 14.6217 6 14V11C6.05956 9.73107 6.4633 8.50227 7.16795 7.4453C7.8726 6.38833 8.85159 5.54303 10 5"
                      stroke="#04091E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M9 17V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18V17"
                      stroke="#04091E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="flex items-center">
              <div>
                <img src="~/assets/fonts/avatar.jpg" alt="Circular Image" class="rounded-full"
                  style="width:  50px; height: 50px;">
              </div>
              <div class="ml-4">
                <div class="font-bold text-xl">TrinhTien</div>
                <div class="text-sm">Admin</div>
              </div>
            </div>


          </div>
        </div>

      </nav>

      <Drawer v-model:visible="visibleThongBao" header="Thông báo" position="right">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.</p>
      </Drawer>
      <Drawer v-model:visible="visiblePhanHoi" header="Phản hồi" position="right">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.</p>
      </Drawer>
    </header>

    <!-- Content Area -->
    <div class="layout-main-container ml-[250px] mt-[80px]">
      <div class="layout-main">
        <NuxtPage />
      </div>
      <footer class="footer  bg-gray-200 text-center">
        <p>© 2024 Trịnh Ngọc Cường</p>
      </footer>
    </div>
    <!-- Footer -->
    <!-- <footer class="footer bg-gray-200 text-center py-4 fixed bottom-0 w-[calc(100%-250px)] ml-[250px] z-5">
      <p>© 2024 Trịnh Ngọc Cường</p>
    </footer> -->

    <ConfirmDialog class="w-auto" group="templateConfirmDialog">
      <template #message="slotProps">
        <div class="flex flex-row items-center w-full gap-2 border-b border-surface-200 dark:border-surface-700">
          <i :class="slotProps.message.icon" class="mr-3" style="font-size: 2rem" />
          <span>{{ slotProps.message.message }}</span>
        </div>
      </template>
    </ConfirmDialog>
    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const visibleThongBao = ref(false);
const visiblePhanHoi = ref(false);
const items = ref([
  {
    separator: true
  },
  {
    items: [
      {
        label: 'Trang chủ',
        svgIcon: `
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 8H1.5C0.5 8 0 7.5 0 6.5V1.5C0 0.5 0.5 0 1.5 0H4.5C5.5 0 6 0.5 6 1.5V6.5C6 7.5 5.5 8 4.5 8ZM6 14.5V13.5C6 12.5 5.5 12 4.5 12H1.5C0.5 12 0 12.5 0 13.5V14.5C0 15.5 0.5 16 1.5 16H4.5C5.5 16 6 15.5 6 14.5ZM10 9.5V14.5C10 15.5 10.5 16 11.5 16H14.5C15.5 16 16 15.5 16 14.5V9.5C16 8.5 15.5 8 14.5 8H11.5C10.5 8 10 8.5 10 9.5ZM10 1.5V2.5C10 3.5 10.5 4 11.5 4H14.5C15.5 4 16 3.5 16 2.5V1.5C16 0.5 15.5 0 14.5 0H11.5C10.5 0 10 0.5 10 1.5Z" fill="#62825D"/>
          </svg>
        `,
        command: () => {
          router.push('/trang-chu');
        }
      },
      {
        label: 'Hàng nhập',
        svgIcon: `
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.47998 8.14998C7.72998 8.25998 7.99 8.33 8.25 8.39V17.91C8.09 17.87 7.93003 17.81 7.78003 17.74L1.78003 15.07C0.700029 14.59 0 13.52 0 12.33V5.67C0 5.4 0.0399854 5.12999 0.109985 4.87999L7.47998 8.14998ZM11.8199 5.92L3.67004 2.08998L1.78003 2.92998C1.43003 3.07998 1.13 3.29999 0.869995 3.55999L8.07996 6.76998C8.65996 7.02998 9.33004 7.02998 9.92004 6.76998L11.8199 5.92ZM17.13 3.55999C16.87 3.29999 16.57 3.07998 16.22 2.92998L10.22 0.259998C9.43997 -0.0900024 8.56003 -0.0900024 7.78003 0.259998L5.48999 1.27999L13.64 5.10997L17.13 3.55999ZM17.89 4.87999L14.38 6.43999V8.89C14.38 9.3 14.04 9.64 13.63 9.64C13.22 9.64 12.88 9.3 12.88 8.89V7.09999L10.52 8.14998C10.27 8.24998 10.01 8.33 9.75 8.39V17.91C9.91 17.87 10.07 17.81 10.22 17.74L16.22 15.07C17.3 14.59 18 13.52 18 12.33V5.67C18 5.4 17.96 5.12999 17.89 4.87999Z" fill="#62825D"/>
          </svg>

    `,
        command: () => {
          router.push('/hang-nhap');
        }

      },
      {
        label: 'Kho hàng',
        svgIcon: `
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.47998 8.14998C7.72998 8.25998 7.99 8.33 8.25 8.39V17.91C8.09 17.87 7.93003 17.81 7.78003 17.74L1.78003 15.07C0.700029 14.59 0 13.52 0 12.33V5.67C0 5.4 0.0399854 5.12999 0.109985 4.87999L7.47998 8.14998ZM11.8199 5.92L3.67004 2.08998L1.78003 2.92998C1.43003 3.07998 1.13 3.29999 0.869995 3.55999L8.07996 6.76998C8.65996 7.02998 9.33004 7.02998 9.92004 6.76998L11.8199 5.92ZM17.13 3.55999C16.87 3.29999 16.57 3.07998 16.22 2.92998L10.22 0.259998C9.43997 -0.0900024 8.56003 -0.0900024 7.78003 0.259998L5.48999 1.27999L13.64 5.10997L17.13 3.55999ZM17.89 4.87999L14.38 6.43999V8.89C14.38 9.3 14.04 9.64 13.63 9.64C13.22 9.64 12.88 9.3 12.88 8.89V7.09999L10.52 8.14998C10.27 8.24998 10.01 8.33 9.75 8.39V17.91C9.91 17.87 10.07 17.81 10.22 17.74L16.22 15.07C17.3 14.59 18 13.52 18 12.33V5.67C18 5.4 17.96 5.12999 17.89 4.87999Z" fill="#62825D"/>
          </svg>

    `,
        command: () => {
          router.push('/kho-hang');
        }

      },
      {
        label: 'Loại hàng',
        svgIcon: `
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.47998 8.14998C7.72998 8.25998 7.99 8.33 8.25 8.39V17.91C8.09 17.87 7.93003 17.81 7.78003 17.74L1.78003 15.07C0.700029 14.59 0 13.52 0 12.33V5.67C0 5.4 0.0399854 5.12999 0.109985 4.87999L7.47998 8.14998ZM11.8199 5.92L3.67004 2.08998L1.78003 2.92998C1.43003 3.07998 1.13 3.29999 0.869995 3.55999L8.07996 6.76998C8.65996 7.02998 9.33004 7.02998 9.92004 6.76998L11.8199 5.92ZM17.13 3.55999C16.87 3.29999 16.57 3.07998 16.22 2.92998L10.22 0.259998C9.43997 -0.0900024 8.56003 -0.0900024 7.78003 0.259998L5.48999 1.27999L13.64 5.10997L17.13 3.55999ZM17.89 4.87999L14.38 6.43999V8.89C14.38 9.3 14.04 9.64 13.63 9.64C13.22 9.64 12.88 9.3 12.88 8.89V7.09999L10.52 8.14998C10.27 8.24998 10.01 8.33 9.75 8.39V17.91C9.91 17.87 10.07 17.81 10.22 17.74L16.22 15.07C17.3 14.59 18 13.52 18 12.33V5.67C18 5.4 17.96 5.12999 17.89 4.87999Z" fill="#62825D"/>
          </svg>

    `,
        command: () => {
          router.push('/loai-hang');
        }

      },
      {
        label: 'Khách hàng',
        svgIcon: `
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.8199 7.72998C14.6699 7.62998 14.66 7.42004 14.78 7.29004C15.54 6.40004 16.01 5.26 16.01 4C16.01 3.63 15.97 3.27004 15.89 2.92004C15.89 2.92004 15.87 2.84006 15.87 2.81006C15.87 2.65006 15.996 2.51696 16.156 2.50696C16.166 2.50696 16.29 2.5 16.34 2.5C18.21 2.5 19.67 4.33004 19.01 6.29004C18.72 7.16004 17.98 7.83995 17.1 8.06995C16.25 8.28995 15.4499 8.12998 14.8199 7.72998ZM17.67 9.17004C17.48 9.17004 17.36 9.29997 17.36 9.46997C17.36 9.53997 17.416 9.62994 17.47 9.68994C18.66 10.9199 19.22 12.64 19.22 14.35V15.24C19.22 15.38 19.34 15.5 19.49 15.5H21C21.28 15.5 21.5 15.28 21.5 15V13.01C21.5 11.24 20.5 9.17004 17.67 9.17004ZM4.90002 8.06995C5.75002 8.28995 6.55005 8.12998 7.18005 7.72998C7.33005 7.62998 7.33997 7.42004 7.21997 7.29004C6.45997 6.40004 5.98999 5.26 5.98999 4C5.98999 3.63 6.02999 3.27004 6.10999 2.92004C6.10999 2.92004 6.13 2.84006 6.13 2.81006C6.13 2.65006 6.00399 2.51696 5.84399 2.50696C5.83399 2.50696 5.71003 2.5 5.66003 2.5C3.79003 2.5 2.32999 4.33004 2.98999 6.29004C3.27999 7.16004 4.02002 7.83995 4.90002 8.06995ZM4.64001 9.46997C4.64001 9.29997 4.51996 9.17004 4.32996 9.17004C1.49996 9.17004 0.5 11.24 0.5 13.01V15C0.5 15.28 0.72 15.5 1 15.5H2.51001C2.66001 15.5 2.78003 15.38 2.78003 15.24V14.35C2.78003 12.64 3.34003 10.9199 4.53003 9.68994C4.58403 9.62994 4.64001 9.53997 4.64001 9.46997ZM11.0081 7.5C12.9381 7.5 14.5081 5.93 14.5081 4C14.5081 2.07 12.9381 0.5 11.0081 0.5C9.07806 0.5 7.50806 2.07 7.50806 4C7.50806 5.93 9.07806 7.5 11.0081 7.5ZM12.777 9.38904H9.22205C5.57205 9.38904 4.27698 12.061 4.27698 14.35V17C4.27698 17.276 4.50098 17.5 4.77698 17.5H17.222C17.498 17.5 17.722 17.276 17.722 17V14.35C17.723 12.061 16.428 9.38904 12.777 9.38904Z" fill="#62825D"/>
        </svg>

    `,
        command: () => {
          router.push('/khach-hang');
        }

      },
      {
        label: 'Doanh thu',
        svgIcon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64">
            <path fill="#62825D" d="M61.9 44.8c-1.1-3.4-4.7-5.3-8.1-4.4l-12.1 2.9c-.3-2.9-2.6-5.3-5.8-5.8H23.1c-1-1.5-2.6-2.5-4.6-2.5H8c-3.4 0-6.3 2.8-6.3 6.3v12.4C1.7 57.1 4.5 60 8 60h10.5c1.5 0 3-.6 4-1.7c.2-.2.3-.4.5-.6c2.9 1.4 6 2.2 9.1 2.2c1.9 0 3.8-.3 5.6-.8L53 54.5l4.3-1.3c1.7-.5 3.2-1.6 4.1-3.2c.9-1.5 1.1-3.4.5-5.2M19.3 54.9c-.2.2-.5.3-.8.3H8c-1 0-1.8-.8-1.8-1.8V41.1c0-1 .8-1.8 1.8-1.8h10.7c.5 0 .9.4.9.9v14c0 .4-.2.6-.3.7m38.2-7c-.3.5-.7.9-1.3 1l-4.4 1.3l-15.2 4.3c-3.9 1.1-8 .7-11.6-1.1l-.9-.5v-11h11.5c1.1.2 1.8 1 1.8 1.9v.5l-3.4.8c-1.2.3-2 1.5-1.7 2.7s1.5 2 2.7 1.7l20-4.8c1.1-.3 2.3.3 2.7 1.4c.1.6.1 1.3-.2 1.8M47.3 21.5h5.1c1.5 0 2.8 1.3 2.8 2.8s-1.3 2.8-2.8 2.8h-7.7c-1.2 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3h2.8v.3c0 1.2 1 2.3 2.3 2.3s2.3-1 2.3-2.3v-.3h.3c4 0 7.3-3.3 7.3-7.3s-3.3-7.3-7.3-7.3h-5.1c-1.5 0-2.8-1.3-2.8-2.8s1.3-2.8 2.8-2.8h7.6c1.2 0 2.3-1 2.3-2.3s-1-2.3-2.3-2.3h-2.8v-.4c0-1.2-1-2.3-2.3-2.3s-2.3 1-2.3 2.3v.3h-.3c-4 0-7.3 3.3-7.3 7.3c.1 4.1 3.4 7.4 7.4 7.4"/>
          </svg>

    `,
        command: () => {
          router.push('/doanh-thu');
        }

      },
      {
        label: 'Nhân viên',
        svgIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36">
          <ellipse cx="18" cy="11.28" fill="#62825D" rx="4.76" ry="4.7"/>
          <path fill="#62825D" d="M10.78 11.75h.48v-.43a6.7 6.7 0 0 1 3.75-6a4.62 4.62 0 1 0-4.21 6.46Zm13.98-.47v.43h.48A4.58 4.58 0 1 0 21 5.29a6.7 6.7 0 0 1 3.76 5.99m-2.47 5.17a21.5 21.5 0 0 1 5.71 2a2.7 2.7 0 0 1 .68.53H34v-3.42a.72.72 0 0 0-.38-.64a18 18 0 0 0-8.4-2.05h-.66a6.66 6.66 0 0 1-2.27 3.58M6.53 20.92A2.76 2.76 0 0 1 8 18.47a21.5 21.5 0 0 1 5.71-2a6.66 6.66 0 0 1-2.27-3.55h-.66a18 18 0 0 0-8.4 2.05a.72.72 0 0 0-.38.64V22h4.53Zm14.93 5.77h5.96v1.4h-5.96z"/>
          <path fill="#62825D" d="M32.81 21.26h-6.87v-1a1 1 0 0 0-2 0v1H22v-2.83a20 20 0 0 0-4-.43a19.3 19.3 0 0 0-9.06 2.22a.76.76 0 0 0-.41.68v5.61h7.11v6.09a1 1 0 0 0 1 1h16.17a1 1 0 0 0 1-1V22.26a1 1 0 0 0-1-1m-1 10.36H17.64v-8.36h6.3v.91a1 1 0 0 0 2 0v-.91h5.87Z"/>
        </svg>
        `,
        command: () => {
          router.push('/nhan-vien');
        }

      },
      {
        label: 'Quản trị',
        svgIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36">
          <path fill="#62825D" d="M14.68 14.81a6.76 6.76 0 1 1 6.76-6.75a6.77 6.77 0 0 1-6.76 6.75m0-11.51a4.76 4.76 0 1 0 4.76 4.76a4.76 4.76 0 0 0-4.76-4.76" class="clr-i-outline clr-i-outline-path-1"/>
          <path fill="#62825D" d="M16.42 31.68A2.14 2.14 0 0 1 15.8 30H4v-5.78a14.8 14.8 0 0 1 11.09-4.68h.72a2.2 2.2 0 0 1 .62-1.85l.12-.11c-.47 0-1-.06-1.46-.06A16.47 16.47 0 0 0 2.2 23.26a1 1 0 0 0-.2.6V30a2 2 0 0 0 2 2h12.7Z" class="clr-i-outline clr-i-outline-path-2"/>
          <path fill="#62825D" d="M26.87 16.29a.4.4 0 0 1 .15 0a.4.4 0 0 0-.15 0" class="clr-i-outline clr-i-outline-path-3"/>
          <path fill="#62825D" d="m33.68 23.32l-2-.61a7.2 7.2 0 0 0-.58-1.41l1-1.86A.38.38 0 0 0 32 19l-1.45-1.45a.36.36 0 0 0-.44-.07l-1.84 1a7 7 0 0 0-1.43-.61l-.61-2a.36.36 0 0 0-.36-.24h-2.05a.36.36 0 0 0-.35.26l-.61 2a7 7 0 0 0-1.44.6l-1.82-1a.35.35 0 0 0-.43.07L17.69 19a.38.38 0 0 0-.06.44l1 1.82a6.8 6.8 0 0 0-.63 1.43l-2 .6a.36.36 0 0 0-.26.35v2.05A.35.35 0 0 0 16 26l2 .61a7 7 0 0 0 .6 1.41l-1 1.91a.36.36 0 0 0 .06.43l1.45 1.45a.38.38 0 0 0 .44.07l1.87-1a7 7 0 0 0 1.4.57l.6 2a.38.38 0 0 0 .35.26h2.05a.37.37 0 0 0 .35-.26l.61-2.05a7 7 0 0 0 1.38-.57l1.89 1a.36.36 0 0 0 .43-.07L32 30.4a.35.35 0 0 0 0-.4l-1-1.88a7 7 0 0 0 .58-1.39l2-.61a.36.36 0 0 0 .26-.35v-2.1a.36.36 0 0 0-.16-.35M24.85 28a3.34 3.34 0 1 1 3.33-3.33A3.34 3.34 0 0 1 24.85 28" class="clr-i-outline clr-i-outline-path-4"/>
          <path fill="none" d="M0 0h36v36H0z"/>
        </svg>
        `,
        command: () => {
          router.push('/quan-tri');
        }

      },
    ]
  },
]);
</script>


<style scoped>
/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;

}

/* Header */
.header {
  height: 80px;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 1;
}

/* Footer */


/* Content */
/* .content-container {
  padding: 16px;
  min-height: calc(100vh - 120px);
  background-color: #F5F5F5;
  border-radius: 10px;
  overflow: hidden;
} */
/* .content-container {
  width: calc(100vw - 250px);
  overflow: hidden;
  border-radius: 10px;
} */

.p-menu {
  border: 0;
}

.layout-main-container {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
  justify-content: space-between;
}

.layout-main {
  flex: 1 1 auto;
  padding-bottom: 2rem;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0 1rem 0;
  gap: 0.5rem;
}
</style>
