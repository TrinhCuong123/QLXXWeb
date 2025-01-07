// ~/composables/globalTitleHeader.ts
import { ref } from 'vue';

const titleHeader = ref<string>(''); // Khai báo kiểu cho titleHeader
let subTitle = 'Phần mềm quản lý xưởng xe'; // Khai báo kiểu cho titleHeader

const setTitleHeader = (title: string): void => { // Định nghĩa hàm với kiểu
  titleHeader.value = title;
  subTitle = titleHeader.value == 'Hi! Trịnh Ngọc Tiến' ? 'Chào mừng đến với phần mềm quản lý xưởng xe' : 'Phần mềm quản lý xưởng xe'; // Khai 
};

export { titleHeader, setTitleHeader, subTitle };