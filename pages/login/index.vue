<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="background-body flex items-center justify-center">
    <div class="bg-main rounded-3xl">
      <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
        <div class="text-center mb-8 flex flex-col items-center gap-3">
          <img src="~/assets/fonts/cuong_logo-gara1.svg" alt="" class="w-44">
          <div class="text-surface-900 dark:text-surface-0 text-5xl font-bold">
            Xin chào!
          </div>
          <span class="text-muted-color font-medium">Đăng nhập để tiếp tục</span>
        </div>
        <form action="">
          <div>
            <div style="padding-bottom: 10px">
              <label for="loginEmail" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Tài
                khoản</label>
              <div style="height: 45px">
                <InputText id="loginEmail" v-model="loginEmail" type="text" placeholder="Tài khoản"
                  :invalid="errors.email != null" class="w-full md:w-[30rem] mb-8" />
              </div>
              <span class="text-red-500">{{ errors.email }}</span>
            </div>
            <label for="loginPassword" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Mật
              khẩu</label>
            <div style="height: 45px">
              <Password id="loginPassword" v-model="loginPassword" placeholder="Mật khẩu" fluid :feedback="false"
                :toggle-mask="true" :invalid="errors.password != null" class="mb-4" />
            </div>
            <span class="text-red-500">{{ errors.password }}</span>
            <Button type="submit" label="Đăng nhập" class="btn w-full mt-5 border-none"
              style="background-color: #DEE33E;" @click="onSubmit" />
            <Toast />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router'; // Sử dụng useRouter thay vì useRoute
import { useToast } from 'primevue/usetoast';

definePageMeta({
  layout: false // Không sử dụng layout nào
});

const router = useRouter(); // Đây là cách đúng để lấy router instance
const toast = useToast();

const schema = yup.object({
  email: yup.string().required('Tài khoản là bắt buộc'),
  password: yup.string().required('Mật khẩu là bắt buộc'),
});
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema
});
const [loginEmail] = defineField('email');
const [loginPassword] = defineField('password');
const onSubmit = handleSubmit(() => {
  if (loginEmail.value === "sa" && loginPassword.value === "Abc@123") {
    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Đăng nhập thành công!!!',
      life: 3000,
    });
    setTimeout(() => {
      router.push({ path: "/trang-chu" }); // Đảm bảo gọi đúng method trên router instance
    }, 1000);
  }
  else {
    toast.add({
      severity: 'error',
      summary: 'Thất bại',
      detail: 'Tài khoản hoặc mật khẩu sai!!!',
      life: 3000,
    });
  }
});


</script>

<style scoped>
.bg-main{
  background-color: rgba(255, 255, 255, 0.9);
}
.background-body {
  width: 100vw;
  /* Đảm bảo chiều rộng luôn là 100% màn hình */
  height: 100vh;
  /* Đảm bảo chiều cao luôn là 100% màn hình */
  background: url("~/assets/fonts/Untitled-1.png");
    background-size: cover; /* Adjusts the size of the background image */
    background-position: center; /* Centers the background image */
    background-repeat: no-repeat; /* Prevents the image from repeating */

  /* Màu nền */
  .btn:hover {
    background-color: rgba(222, 227, 62, 1);
    color: rgba(0, 0, 0, 0.6);
  }

}
</style>