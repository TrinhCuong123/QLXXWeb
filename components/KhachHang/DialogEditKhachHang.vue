<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '1000px' }" :header="'Sửa khách hàng'" :modal="true"
    :close-on-escape="closeEscapeKeyModalInfo">
    <div>
      <div class="grid grid-cols-1">
        <div class="col-span-1 px-3 pt-3">
          <div class="grid grid-cols-1 gap-4 mb-4">
            <img src="../../assets/fonts/imageCustumer1.svg" class="max-w-full h-28 ml-3">
          </div>
          <div class="grid grid-cols-1 gap-4 mb-4">
            <div class="col-span-1">
              <label class="block font-bold mb-3 required">Tên khách hàng</label>
              <InputText v-model="tenKhachHang" name="tenKhachHang" placeholder="Nhập tên khách hàng"
                :invalid="errors.tenKhachHang ? true : false" class="w-full" />
              <span class="text-red-500">{{ errors.tenKhachHang }}</span>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 mb-4">
            <div class="col-span-1">
              <label class="block font-bold mb-3 required">Địa chỉ</label>
              <InputText v-model="diaChi" name="diaChi" placeholder="Nhập địa chỉ"
                :invalid="errors.diaChi ? true : false" class="w-full" />
              <span class="text-red-500">{{ errors.diaChi }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="col-span-1">
              <label class="block font-bold mb-3 required">Điện thoại</label>
              <InputText v-model="dienThoai" name="dienThoai" placeholder="Nhập điện thoại"
                :invalid="errors.dienThoai ? true : false" class="w-full" />
              <span class="text-red-500">{{ errors.dienThoai }}</span>
            </div>
            <div class="col-span-1">
              <label class="block font-bold mb-3">Thương hiệu</label>
              <InputText v-model="thuongHieu" name="thuongHieu" placeholder="Nhập thương hiệu"
                :invalid="errors.thuongHieu ? true : false" class="w-full" />
              <span class="text-red-500">{{ errors.thuongHieu }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="col-span-1">
              <label class="block font-bold mb-3 required">Biển số xe</label>
              <InputText v-model="bienSoXe" name="bienSoXe" placeholder="Nhập biển số xe"
                :invalid="errors.bienSoXe ? true : false" class="w-full" />
              <span class="text-red-500">{{ errors.bienSoXe }}</span>
            </div>
            <div class="col-span-1">
              <label class="block font-bold mb-3 required">Số vin</label>
              <InputText v-model="soVin" name="soVin" placeholder="Nhập vin" :invalid="errors.soVin ? true : false"
                class="w-full" />
              <span class="text-red-500">{{ errors.soVin }}</span>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4 my-4">
            <div class="col-span-1">
              <label class="block font-bold mb-3">Kinh độ</label>
              <InputNumber v-model="kinhDo" class="w-full" name="kinhDo" placeholder="Nhập kinh độ" mode="decimal"
                :min-fraction-digits="6" />
            </div>
            <div class="col-span-1">
              <label class="block font-bold mb-3">Vĩ độ</label>
              <InputNumber v-model="viDo" class="w-full" name="viDo" mode="decimal" :min-fraction-digits="6"
                placeholder="Nhập vĩ độ" />
            </div>
            <div class="col-span-1">
              <label for="icon" class="font-bold block mb-3">Chọn trên bản đồ</label>
              <Button icon="pi pi-send" class="custom-button" label="Chọn ví trí trên bản đồ" @click="onOpenMap" />
              <Dialog v-model:visible="visible_map" modal header="Chọn vị trí"
                :close-on-escape="closeEscapeKeyModalMap">
                <div class="w-80 h-[500px] sm:w-[900px] sm:h-[600px] m-2">
                  <ClientOnly>
                    <LMap ref="map" :options="{ attributionControl: false }" :zoom="6"
                      :center="[viDo ?? 17.175763720046184, kinhDo ?? 106.69921875000001]" :use-global-leaflet="false">
                      <LTileLayer url="https://tiles.gisgo.vn/base/{z}/{x}/{y}.png" layer-type="base"
                        name="OpenStreetMap" />
                      <!-- <LMarker v-if="lat != null && lon" :lat-lng="[lat, lon]" draggable /> -->
                    </LMap>
                  </ClientOnly>
                </div>
              </Dialog>
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
import { ref, watch, watchEffect } from 'vue'
import { KhachHangModel } from '~/models/khach-hang/khach-hang.model';
import { KhachHangService } from '~/services/khach-hang/khach-hang.service';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();
const toast = useToast();
const visible_map = ref(false);
const props = defineProps({
  isVisible: {
    type: Boolean,
  },
  customerData: {
    type: Object,
    default: () => {
      return new KhachHangModel();
    },
  }
});
const internalVisible = computed({
  get() {
    return props.isVisible;
  },
  set() {
    handleHideModal();
  },
});
const internalKhachHang = computed({
  get() {
    return props.customerData;
  },
  set() {
  },
});
const emit = defineEmits(['hideModal', 'insertModel']);

const handleHideModal = () => {
  emit('hideModal');
  resetForm();
};
const schema = yup.object({
  tenKhachHang: yup.string().required('Vui lòng nhập tên khách hàng!'),
  diaChi: yup.string().required('Vui lòng nhập địa chỉ!'),
  dienThoai: yup.string().required('Vui lòng nhập điện thoại!').matches(
      /^(?!00)(?:\+84|84|0)(?:3|5|7|8|9)\d{8}\b/,
      'Vui lòng nhập đúng định dạng!',
    ),
  bienSoXe: yup.string().required('Vui lòng nhập biển số xe!'),
  soVin: yup.string().required('Vui lòng nhập số vin!'),
});

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
});

const close = () => {
  internalVisible.value = false;
  resetForm();
}
const onOpenMap = () => {
  visible_map.value = true;
  closeEscapeKeyModalInfo.value = false;
  closeEscapeKeyModalMap.value = true;
};
watch(visible_map, () => {
  if (!visible_map.value) {
    closeEscapeKeyModalInfo.value = true;
  }
});
const map = ref();

const closeEscapeKeyModalInfo = ref(true);
const closeEscapeKeyModalMap = ref(false);
const [id] = defineField('id');
const [tenKhachHang] = defineField('tenKhachHang');
const [diaChi] = defineField('diaChi');
const [dienThoai] = defineField('dienThoai');
const [thuongHieu] = defineField('thuongHieu');
const [bienSoXe] = defineField('bienSoXe');
const [soVin] = defineField('soVin');
const [kinhDo] = defineField('kinhDo');
const [viDo] = defineField('viDo');

watchEffect(() => {
  if(internalKhachHang.value.id){
    id.value = internalKhachHang.value.id;
    tenKhachHang.value = internalKhachHang.value.ten_khachhang;
    diaChi.value = internalKhachHang.value.dia_chi;
    dienThoai.value = internalKhachHang.value.dien_thoai;
    thuongHieu.value = internalKhachHang.value.thuong_hieu;
    bienSoXe.value = internalKhachHang.value.bienso_xe;
    soVin.value = internalKhachHang.value.so_vin;
    kinhDo.value = internalKhachHang.value.kinh_do;
    viDo.value = internalKhachHang.value.vi_do;
  }
})

const onSubmit = handleSubmit(() => {
  const customerData:KhachHangModel  = {
    id: id.value,
    ten_khachhang: tenKhachHang.value,
    dia_chi: diaChi.value,
    dien_thoai: dienThoai.value,
    thuong_hieu: thuongHieu.value,
    bienso_xe: bienSoXe.value,
    so_vin: soVin.value,
    kinh_do: kinhDo.value,
    vi_do: viDo.value,
  } as KhachHangModel;

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
      KhachHangService.updateKhachHang(customerData)
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
          // .catch(() => {
          //   toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Thêm mới thất bại', life: 3000 });
          // });
    },
    reject: () => {
    }
  });
});
</script>

<style scoped>
.custom-button {
  background-color: rgb(11, 94, 0);
  color: white;
  width: 100%;
  margin-top: auto;
  transition: background-color 0.3s ease;
  /* Tạo hiệu ứng mượt */
}

.custom-button:hover {
  background-color: rgba(11, 94, 0, 0.8);
  /* Màu khi hover */
}
</style>