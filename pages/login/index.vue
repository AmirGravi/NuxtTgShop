<template>
  <v-card

      :width="smAndDown ? '100%' : '400px' "
      :height="smAndDown ? '100vh' : '500px' "
      :class="[smAndDown ?  'rounded-0' : 'rounded-lg']"
      class="d-flex flex-column justify-center align-center border-sm "
  >
    <v-card-title class="mt-15 mt-sm-3">
      <span>
        <img class="w-full inline-block" src="https://www.digikala.com/brand/full-vertical.svg" width="100"
             alt="لوگوی دیجیکالا" title="" style="object-fit: contain;">
      </span>
    </v-card-title>

    <v-window v-model="step" class="w-100 mt-4" :show-arrows="false">

      <!-- مرحله اول: دریافت ایمیل یا شماره -->
      <v-window-item :value="1">
        <v-card-subtitle class="w-100 mt-2">
          <span class="fs-18 fs-m-14 fw-600 fw-t-500">
           ورود | ثبت نام
          </span>
        </v-card-subtitle>

        <v-card-text class="w-100">
          <span class="fs-11 fw-400">
           لطفا شماره موبایل یا ایمیل خود را وارد کنید
          </span>

          <CeCustomLogin class="my-5" v-model="enterInput"/>

          <abtn color="error" @keyup.enter="checkUser" @click="checkUser" class="w-100" :loading="loading" :disabled="loading">
            ادامه
          </abtn>
        </v-card-text>
      </v-window-item>

      <!-- مرحله دوم: ورود رمز عبور -->
      <v-window-item :value="2">
        <v-card-subtitle class="w-100 mt-2">
          <span class="fs-18 fs-m-14 fw-600 fw-t-500">
            ورود به حساب
          </span>
        </v-card-subtitle>

        <v-card-text class="w-100">
          <span class="fs-11 fw-400">
            لطفا رمز عبور خود را وارد کنید
          </span>

          <v-text-field
              v-model="password"
              label="رمز عبور"
              type="password"
              class="my-5"
              :error-messages="passwordError"
              clearable
          />

          <abtn color="error" class="w-100" @click="login" :loading="loading" :disabled="loading">
            ورود
          </abtn>

          <abtn  class="mt-3 w-100" @click="step = 1">بازگشت</abtn>
        </v-card-text>
      </v-window-item>

      <!--  مرحله کد تایید -->
      <v-window-item :value="3">
        <v-card-subtitle class="w-100 mt-2">
          <span class="fs-18 fs-m-14 fw-600 fw-t-500">
            کد تایید
          </span>
        </v-card-subtitle>

        <v-card-text class="w-100">
          <span class="fs-11 fw-400">
            کد دریافت شده در جیمیل خود را وارد کنید
          </span>
          <v-text-field
              label="کد"
            v-model="entryCode"
          />
          <abtn color="error" class="w-100" @click="verifyCode" :loading="loading" :disabled="loading ">
            تایید
          </abtn>

          <abtn text class="mt-3 w-100" @click="step = 1">بازگشت</abtn>
        </v-card-text>
      </v-window-item>

      <!--  مرحله ثبت نام -->

      <v-window-item :value="4">
        <v-card-subtitle class="w-100 mt-2">
          <span class="fs-18 fs-m-14 fw-600 fw-t-500">
            تکمیل ثبت نام
          </span>
        </v-card-subtitle>

        <v-card-text class="w-100">
          <span class="fs-11 fw-400">
            مشخصات فردی خود را وارد کنید
          </span>

          <v-text-field
              label="نام"
              v-model="name"
          />
          <v-text-field
              label="رمز عبور"
              v-model="newPassword"
              type="password"
          />

          <abtn color="error" class="w-100" @click="register" :loading="loading" :disabled="loading ">
            ورود
          </abtn>

          <abtn  class="mt-3 w-100" @click="step = 1">بازگشت</abtn>
        </v-card-text>
      </v-window-item>

    </v-window>
  </v-card>

</template>

<script setup>
import { useDisplay } from 'vuetify'
import axios from 'axios'
import CeCustomLogin from './../../components/CE/custom-login.vue'
import { useRouter } from 'vue-router';
import { ref , onMounted, onUnmounted } from 'vue'
import Abtn from "~/components/CE/abtn.vue";
import {useAlert} from "~/stores/alert.js";

const { $axios } = useNuxtApp()

const step = ref(1)
const enterInput = ref('')
const password = ref('')
const passwordError = ref('')
const name = ref('')
const newPassword = ref('')
const entryCode  = ref('')
const loading = ref(false)
const userExists = ref(false)
const { smAndDown } = useDisplay()
const router = useRouter();
const alertStore = useAlert();

const count = ref(0)
setInterval(() => {
  for (let i = 0; i < 1; i++) {
    alertStore.openAlert(1, `${count.value++} لطفا مجددا وارد شوید!` );
  }
}, 1000);

function enterHandler(){

  if (loading.value) return

  switch(step.value){
    case 1 :
      checkUser()
      break;
    case 2 :
      login()
      break;
    case 3 :
      verifyCode()
      break;
    case 4 :
      register()
  }
}

function backspaceHandler(){
  if (loading.value) return
  switch(step.value){
    case 2:
     step.value = 1
      break;
    case 3:
      step.value = 2
      break;
    case 4:
      step.value = 3
      break;
  }
}

function keyDown(e){
  if (e.key === 'Enter'){
    enterHandler()
  }else if(e.key === 'Escape'){
    backspaceHandler()
  }
}
onMounted(() => {
  window.addEventListener('keydown', keyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', keyDown)
})



async function checkUser() {
  if (!enterInput.value) {
    alert('لطفا ایمیل یا شماره موبایل را وارد کنید')
    return
  }
  loading.value = true
  try {
    const response = await $axios.post('/check-user', { emailOrPhone: enterInput.value })
    console.log(response)
    userExists.value = response.data.exists

    if (userExists.value) {
      step.value = 2
    } else {
      step.value = 3

    }
  } catch (error) {
    alert('خطا در ارتباط با سرور: ' + error.message)
  } finally {
    loading.value = false
  }
}

async function verifyCode() {
  loading.value = true

  try {
    const response = await $axios.post('/verifyCode', { code : entryCode.value , emailOrPhone: enterInput.value })
    if (response.data.success) {
      alert('ورود موفق!')
      // توکن یا ریدایرکت به صفحه بعد
      step.value = 4
    } else {
      alert('نام کاربری یا رمز اشتباه است')
    }
  } catch (error) {
    alert('خطا در ورود: ' + error.message)
  } finally {
    loading.value = false
  }
}


async function register() {
  loading.value = true;
  try{
    const response = await $axios.post('/register', {  name : name.value , password : newPassword.value , emailOrPhone: enterInput.value })
    if (response.data) {
      console.log("rs" , response.data)
      alert('ورود موفق!')
      // توکن یا ریدایرکت به صفحه بعد
      step.value = 4
    } else {
      alert('نام کاربری یا رمز اشتباه است')
    }
    if (response.data.token) {
      // ذخیره توکن در localStorage یا cookie
      localStorage.setItem('token', response.data.token);

      alert('ثبت‌نام موفق!');

      router.push('/');
    } else {
      alert('ثبت‌نام ناموفق');
    }
  }catch (error) {
    alert('خطا در ثبت‌نام: ' + error.message);
  } finally {
    loading.value = false;
  }
}
async function login() {
  if (!password.value) {
    passwordError.value = 'رمز عبور را وارد کنید'
    return
  }
  passwordError.value = ''
  loading.value = true

  try {
    const response = await $axios.post('/login', { email: enterInput.value, password: password.value })
    if (response.data.success) {
      alert('ورود موفق!')
      // توکن یا ریدایرکت به صفحه بعد
    } else {
      alert('نام کاربری یا رمز اشتباه است')
    }
    if (response.data.token) {
      // ذخیره توکن در localStorage یا cookie
      localStorage.setItem('token', response.data.token);
    }
    router.push('/');
    } catch (error) {
    alert('خطا در ورود: ' + error.message)
  } finally {
    loading.value = false
  }
}


definePageMeta({
  layout: 'no-header-footer',
})

</script>
