<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '1000px' }" :header="'Thêm lịch sử sửa chữa'" :modal="true"
    :close-on-escape="closeEscapeKeyModalInfo">
    <div>
      <div class="col-span-1 px-3 pt-3">
        <div class="grid grid-cols-1 mb-4">
          <img src="../../assets/fonts/imageGear.svg" class="max-w-full h-28 ml-3">
        </div>
        <div class="grid grid-cols-2 mb-4 gap-4">
          <div class="col-span-1 min-w-40">
            <label for="ngay_sua" class="block font-bold mb-3">Ngày sửa</label>
            <DatePicker v-model="ngay_sua" :invalid="errors.ngay_sua != null" input-class="h-[42.72px]"
              date-format="dd/mm/yy" show-icon fluid placeholder="dd/mm/yyyy" input-id="ngay_sua" />
            <span class="text-red-500">{{ errors.ngayNhap }}</span>

          </div>
          <div class="col-span-1 min-w-40">
            <label for="so_km" class="block font-bold mb-3">Số km</label>
            <InputNumber id="so_km" v-model="so_km" placeholder="Nhập số km" size="large" class="mr-2 w-full h-[42.72px]" />
          </div>
        </div>
        <div>
          <label for="ghi_chu" class="block font-bold mb-3">Ghi chú</label>
          <Textarea id="ghi_chu" v-model="ghi_chu" placeholder="Nhập ghi chú" class="mr-2 w-full" />
        </div>
        <div class="flex justify-between items-center gap-4 mb-2">
          <h6 class="uppercase text[#0b5ee7] font-bold m-0" style="color: #0b5ee7">
            Phụ tùng thay thế
          </h6>
          <Button class="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4" @click="themPhuTung">
            Thêm phụ tùng
          </Button>
        </div>
        <div v-for="(phuTung, index) in phuTungs" :key="index" class="grid grid-cols-4 gap-4 mb-1">
          <div class="min-w-40">
            <label v-if="index === 0" for="tenPhuTung" class="block font-bold mb-3">Mã phụ tùng</label>
            <Select
              id="loai_phutung_id"
              v-model="phuTung.loai_phutung_id"
              fluid
              option-label="loaiPhuTung.ma_phutung"
              option-value="loai_phutung_id"
              filter
              :show-clear="phuTung.loai_phutung_id!=0"
              :options="listPhuTung"
              placeholder="Chọn tên phụ tùng"
            />
          </div>
          <div class="min-w-40">
            <label v-if="index === 0" for="tenPhuTung" class="block font-bold mb-3">Tên phụ tùng</label>
            <Select
              id="loai_phutung_id"
              v-model="phuTung.loai_phutung_id"
              fluid
              option-label="loaiPhuTung.ten_phutung"
              option-value="loai_phutung_id"
              filter
              :show-clear="phuTung.loai_phutung_id!=0"
              :options="listPhuTung"
              placeholder="Chọn tên phụ tùng"
            />
          </div>
          <div class="col-span-1">
            <label v-if="index === 0" class="block font-bold mb-3">Số lượng</label>
            <InputNumber v-model="phuTung.soluong_sudung" placeholder="Nhập số lượng" class="w-full" />
          </div>
          <div class="col-span-1">
            <div>
              <label v-if="index === 0" class="block font-bold mb-3">Giá bán</label>
              <div class="flex">
                <InputNumber v-model="phuTung.gia_ban" class="w-full" fluid input-id="tienCong"
                  placeholder="Nhập giá tiền" mode="currency" currency="VND" locale="vi-VN" />
                <Button icon="pi pi-times" class="ml-3" severity="warn" variant="text" @click="removePhuTung(index)" />
              </div>
            </div>
          </div>
        </div>
        <!-- Nút thêm phụ tùng -->
        <!-- <div class="grid grid-cols-2 gap-4 my-5">
                <div class="col-span-1">
                  <label class="block font-bold mb-3">Tiền công</label>
                  <InputNumber v-model="tienCong" class="w-full" fluid input-id="tienCong" placeholder="Nhập tiền công"
                    mode="currency" currency="VND" locale="vi-VN" :invalid="errors.tienCong != null" />
                  <span class="text-red-500">{{ errors.tienCong }}</span>
                </div>
                <div class="col-span-1">
                  <label class="block font-bold mb-3">Chi phí phát sinh</label>
                  <InputNumber v-model="chiPhiPhatSinh" class="w-full" fluid input-id="chiPhiPhatSinh"
                    placeholder="Nhập chi phí phát sinh" mode="currency" currency="VND" locale="vi-VN"
                    :invalid="errors.chiPhiPhatSinh != null" />
                  <span class="text-red-500">{{ errors.chiPhiPhatSinh }}</span>
                </div>
              </div> -->
        <div class="flex justify-between items-center gap-4 mt-6 mb-2">
          <h6 class="uppercase text[#0b5ee7] font-bold m-0" style="color: #0b5ee7">
            Tiền công sữa chữa và chi phí phát sinh
          </h6>
          <Button class="bg-blue-500 text-white font-bold py-2 px-4 rounded " @click="themTienCong">
            Thêm tiền công
          </Button>
        </div>

        <div v-for="(tienCong, index) in tienCongs" :key="index" class="grid grid-cols-2 gap-4 mb-1">
          <div class="min-w-40">
            <label v-if="index === 0" for="noidung_suachua" class="block font-bold mb-3">Nội dung sửa chữa</label>
            <InputText id="noidung_suachua" v-model="tienCong.noidung_suachua" placeholder="Chọn Nội dung tiền công"
              size="large" class="mr-2 w-full h-[42.72px]" />
          </div>
          <div class="col-span-1">
            <label v-if="index === 0" class="block font-bold mb-3">Đơn giá</label>
            <div class="flex">
              <InputNumber v-model="tienCong.giathanh_suachua" placeholder="Nhập Đơn giá" class="w-full" fluid
                input-id="tienCong" mode="currency" currency="VND" locale="vi-VN" />
              <Button icon="pi pi-times" class="ml-3" severity="warn" variant="text" @click="removeTienCong(index)" />
            </div>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-300 mt-3">
        <div class="flex justify-between mx-28 my-3">
          <div class="mt-6">
            <div class="flex items-center text-xl">
              <label class="block font-bold mr-3">Tổng tiền thanh toán</label>
              <div>
                {{ NumberUtils.formatNumber(tong_chiphi) }} &#8363;
              </div>
            </div>
          </div>
          <div class="mt-6">
            <div class="flex items-center">
              <label class="block font-bold mr-3 text-xl">Tình trạng thanh toán</label>
              <Checkbox v-model="da_thanhtoan" binary inputId="da_thanhtoan" name="da_thanhtoan"
                :invalid="errors.da_thanhtoan != null" />
              <span class="text-red-500">{{ errors.da_thanhtoan }}</span>
              <span v-if="da_thanhtoan!=undefined">
                <div class="ml-3">
                  <Badge v-if="da_thanhtoan" :value="statePay.Active" severity="success" class="text-md font-medium" />
                  <Badge v-else :value="statePay.Inactive" severity="danger" class="text-md font-medium" />
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <Button label="Hủy" icon="pi pi-times" class="p-button-danger" @click="close" />
      <Button label="Lưu" icon="pi pi-check" class="p-button-primary" @click="onSubmit" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { ref, watch } from 'vue'
import { LichSuThayTheModel, PhuTungModel } from '~/models/khach-hang/khach-hang.model';
// import { KhachHangService } from '~/services/khach-hang/khach-hang.service';
import { useRouter } from 'vue-router';
import { KhachHangService } from '~/services/khach-hang/khach-hang.service';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { KhoHangService } from '~/services/kho-hang/kho-hang.service';

const statePay = {
  Active: 'Đã thanh toán',
  Inactive: 'Chưa thanh toán',
};
const emit = defineEmits(['hideModal', 'insertModel']);

const confirm = useConfirm();
const toast = useToast();
const router = useRouter();
const visible_map = ref(false);
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
  resetForm();
  phuTungs.value = [
    {
      loai_phutung_id: 0,
      soluong_sudung: 0,
      gia_ban: 0,
    },
  ];
  tienCongs.value = [
    {
      noidung_suachua: '',
      giathanh_suachua: 0,
    },
  ];
};
const schema = yup.object({
  // maPhuTung: yup
  //   .string()
  //   .required('Vui lòng nhập mã phụ tùng!')
  //   .max(100, 'Tối đa 100 ký tự!'),
  // tenPhuTung: yup.string().required('Vui lòng nhập tên phụ tùng!'),
});


const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
});

const close = () => {
  internalVisible.value = false;
  resetForm();
  phuTungs.value = [
    {
      loai_phutung_id: 0,
      soluong_sudung: 0,
      gia_ban: 0,
    },
  ];
  tienCongs.value = [
    {
      noidung_suachua: '',
      giathanh_suachua: 0,
    },
  ];

}

watch(visible_map, () => {
  if (!visible_map.value) {
    closeEscapeKeyModalInfo.value = true;
  }
});

const [so_km] = defineField('so_km');
const [ngay_sua] = defineField('ngay_sua');
const [ghi_chu] = defineField('ghi_chu');
const [da_thanhtoan] = defineField('da_thanhtoan');
const closeEscapeKeyModalInfo = ref(true);
const listPhuTung = ref();
KhoHangService.get().then((response) => {
  listPhuTung.value = response;
});
const path = ref(router.currentRoute.value.path);
const id = ref(Number(path.value.match(/\/(\d+)$/)?.[1]));

const tong_chiphi = computed(() => {
  let sumHangHoa = 0
  let sumTienCong = 0
  for (var i = 0; i < phuTungs.value.length; i++) {
    sumHangHoa += Number(phuTungs.value[i].soluong_sudung) * Number(phuTungs.value[i].gia_ban)
  }
  for (var j = 0; j < tienCongs.value.length; j++) {
    sumTienCong += Number(tienCongs.value[j].giathanh_suachua)
  }
  return ((sumHangHoa + sumTienCong) || 0);
});
const phuTungs = ref([
  {
    loai_phutung_id: 0,
    soluong_sudung: 0,
    gia_ban: 0,
  },
]);

// Hàm thêm phụ tùng mới
const themPhuTung = () => {
  phuTungs.value.push({
    loai_phutung_id: 0,
    soluong_sudung: 0,
    gia_ban: 0,
  });
};
const tienCongs = ref([
  {
    noidung_suachua: '',
    giathanh_suachua: 0,
    
  },
]);

const themTienCong = () => {
  tienCongs.value.push({
    noidung_suachua: '',
    giathanh_suachua: 0,
  });
};

const removePhuTung = (index: number) => {
  if (index >= 0) {
    phuTungs.value.splice(index, 1); // Xóa 1 phần tử tại vị trí `index`
  } else {
    console.error("Chỉ số không hợp lệ!");
  }
};
const removeTienCong = (index: number) => {
  if (index >= 0) {
    tienCongs.value.splice(index, 1); // Xóa 1 phần tử tại vị trí `index`
  } else {
    console.error("Chỉ số không hợp lệ!");
  }
};


watch(
  () => phuTungs,
  (newPhuTungs) => {
    newPhuTungs.value.forEach((phuTung) => {
      if (phuTung.loai_phutung_id) {
        const selectedPhuTung = listPhuTung.value.find(
          (item: PhuTungModel) => item.loai_phutung_id === phuTung.loai_phutung_id
        );
        if (selectedPhuTung) {
          phuTung.gia_ban = selectedPhuTung.gia_ban || 0;
        }
      }
    });
  },
  { deep: true }
);

const onSubmit = handleSubmit(() => {
  const customerData:LichSuThayTheModel = {
    ngay_sua: ngay_sua.value,
    so_km: so_km.value,
    ghi_chu: ghi_chu.value,
    tong_chiphi: tong_chiphi.value,
    da_thanhtoan: da_thanhtoan.value || false,
    khach_hang_id: id.value,
    tungSuaChua: phuTungs.value,
    tienCongSuaChua: tienCongs.value,
  }  as LichSuThayTheModel;
  console.log(customerData);
  confirm.require({
    message: 'Bạn có muốn cập nhật nhân viên không?',
    header: 'Cập nhật',
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
      KhachHangService.insertLichSuSuaXe(customerData)
        .then((res) => {
          if (res) {
            emit('insertModel');
            handleHideModal();
            toast.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm mới thành công', life: 3000 });
          }
          else {
            toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Thêm mới thất bại', life: 3000 });
          }
        })
    },
    reject: () => {
    }
  });
});
</script>

<style scoped>
.custom-button {
  background-color: #0b5ee7;
  color: white;
  width: 100%;
  margin-top: auto;
  transition: background-color 0.3s ease;
  /* Tạo hiệu ứng mượt */
}

.custom-button:hover {
  background-color: #8586ec;
  /* Màu khi hover */
}
</style>