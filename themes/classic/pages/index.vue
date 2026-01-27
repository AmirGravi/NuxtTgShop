<template>



  <div class="image-container ">
    <img
        class="zoom-on-hover"
        width="100%"
        src="https://narianco.com/wp-content/uploads/2025/03/Banner-V1.0-031208-01-Custom-2048x1152.jpg"
        alt=""
    />
  </div>



  <ProductDisplayMinimal to="/category"  :products="productList" />



  <div class="image-container mb-1">

    <img
        class="zoom-on-hover"
        width="100%"
        src="https://narianco.com/wp-content/uploads/2025/05/Banner-V1.0-040216-01.jpg"
        alt=""
    />
  </div>







  <!--    <img width="100%"    data-aos="fade-down"-->
  <!--         data-aos-duration="2000"-->
  <!--src="/images/5e3949e6-6cd0-4f8b-92c3-7b6ad82ef8ed.png"         alt="">-->


  <!--    <div class="image-container">-->
  <!--      <img-->
  <!--          class="zoom-on-hover"-->
  <!--          width="100%"-->
  <!--          src="/images/5e3949e6-6cd0-4f8b-92c3-7b6ad82ef8ed.png"-->
  <!--          alt=""-->
  <!--      />-->
  <!--    </div>-->



  <!--    <img width="100%"     data-aos="fade-left"-->
  <!--         data-aos-duration="1000"-->
  <!--         data-aos-once="true"-->
  <!--     src="/images/8a48e7b3-db62-46cf-8060-0ffb0e5f22ee.png"         alt="">-->
  <!-- <div class="MobileHeader">
      <MobileHeader />
  </div> -->

  <!--        <img class="imgcss" src="https://narianco.com/wp-content/uploads/2024/09/mainBannerFall2024-copy-2048x1024.webp"-->
  <!--            alt="Banner" />-->

  <!-- اینجا محتویات صفحه‌ها نمایش داده میشه -->
</template>

<script setup >
import AOS from 'aos';
import 'aos/dist/aos.css';
import {ref} from "vue";
import useAuth from '../composable/useAuth.js'
const { $axios } = useNuxtApp()
const { hasRole, isLoggedIn } = useAuth()
onMounted(async () => {
  console.log(isLoggedIn());
  console.log(hasRole('admin'));
  await fetchProducts()
})

const productList = ref([])
const fetchProducts = async () => {
  try {
    const res = await $axios.get("/categories")
    console.log(res.data)
    productList.value = res.data.map(item => ({
      title: item.name,
      count: item.count , // یا هر چیزی که API برگردونه
      id: item._id,
      image: "http://localhost:5000" + item.image
    }));
  }
  catch (error) {
    console.log(error)
  }
}


import { useTheme } from 'vuetify'
import ModeToggle from '~/components/CE/ModeToggle.vue';

const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

onMounted(() => {
  AOS.init({
    once: true,
  });});
</script>

<style scoped>
.image-container {
  overflow: hidden;
  width: 100%;
  height: 500px;
  position: relative;
}

.zoom-on-hover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .6s ease-in-out;
}

.zoom-on-hover:hover {
  transform: scale(1.1);
}

.router-link-active,
.router-link-exact-active,
router-link {
  text-decoration: none;
  border: none;
}

router-link:hover {
  text-decoration: none;
}
</style>
