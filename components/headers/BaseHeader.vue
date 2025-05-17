<template>

  <template v-if="smAndDown">
    <v-app-bar style="position:sticky" :height="48" app class="px-2" color="var(--primary-color)" dark>
      <div class="d-flex align-center justify-space-between px-1 w-100">
        <!--        <img src="/images/NgstAb01.svg" >mdi-home</img>-->

        <!-- منو موبایل -->
        <div class=" d-flex align-center ">
          <!--        hamberger-->
          <div>
            <label class="hamburger d-flex p-1 " :class="{ 'hamburgerActive': mobileMenuOpen }">
              <input type="checkbox" @click="handleOpenMenu('menu')" v-model="mobileMenuOpen"/>
              <svg viewBox="0 0 32 32">
                <path
                    class="line line-top-bottom"
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path class="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </div>

          <!--        <svg  @click="handleOpenMenu('cart')" class="size-6 mr-2" style="width: 19px;fill: #ffffff;" height="100"  viewBox="0 0 17 48"  xmlns="http://www.w3.org/2000/svg"><path d="m13.4575 16.9268h-1.1353a3.8394 3.8394 0 0 0 -7.6444 0h-1.1353a2.6032 2.6032 0 0 0 -2.6 2.6v8.9232a2.6032 2.6032 0 0 0 2.6 2.6h9.915a2.6032 2.6032 0 0 0 2.6-2.6v-8.9231a2.6032 2.6032 0 0 0 -2.6-2.6001zm-4.9575-2.2768a2.658 2.658 0 0 1 2.6221 2.2764h-5.2442a2.658 2.658 0 0 1 2.6221-2.2764zm6.3574 13.8a1.4014 1.4014 0 0 1 -1.4 1.4h-9.9149a1.4014 1.4014 0 0 1 -1.4-1.4v-8.9231a1.4014 1.4014 0 0 1 1.4-1.4h9.915a1.4014 1.4014 0 0 1 1.4 1.4z"></path></svg>-->
          <div style="height: 48px">
            <svg @click="handleOpenMenu('cart')" class="size-6 mx-4" style="width: 18px;fill: #ffffff;"
                 viewBox="0 0 17 48" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="m13.4575 16.9268h-1.1353a3.8394 3.8394 0 0 0 -7.6444 0h-1.1353a2.6032 2.6032 0 0 0 -2.6 2.6v8.9232a2.6032 2.6032 0 0 0 2.6 2.6h9.915a2.6032 2.6032 0 0 0 2.6-2.6v-8.9231a2.6032 2.6032 0 0 0 -2.6-2.6001zm-4.9575-2.2768a2.658 2.658 0 0 1 2.6221 2.2764h-5.2442a2.658 2.658 0 0 1 2.6221-2.2764zm6.3574 13.8a1.4014 1.4014 0 0 1 -1.4 1.4h-9.9149a1.4014 1.4014 0 0 1 -1.4-1.4v-8.9231a1.4014 1.4014 0 0 1 1.4-1.4h9.915a1.4014 1.4014 0 0 1 1.4 1.4z"></path>
            </svg>
          </div>

          <svg @click="handleOpenMenu('search')" xmlns="http://www.w3.org/2000/svg" style="width: 21px;color: #ffffff;"
               fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
          </svg>


        </div>

        <Transition name="slide-fade">
          <div
              v-if="mobileMenuOpen"
              class="fullscreen-menu "
              :class="{ 'fullscreen-menu-active': mobileMenuOpen }">

            <v-row class="h-100">
              <v-col class="d-flex  justify-center align-center">
                <div v-if="Menumode === 'search'" class="text-white">
                  searchhhhhhhhhhhhhhhhhhh
                </div>

                <div v-if="Menumode === 'menu'" class="text-white">
                  menuuuuuuuuuuuuuu


                </div>
                <div v-if="Menumode === 'cart'" class="text-white">
                  caaaaaaaaaaaaartttttttt
                </div>
              </v-col>
            </v-row>


          </div>
        </Transition>

        <svg viewBox="0 0 17 48" style="width: 19px;fill: #ffffff;" xmlns="http://www.w3.org/2000/svg">
          <path
              d="m15.5752 19.0792a4.2055 4.2055 0 0 0 -2.01 3.5376 4.0931 4.0931 0 0 0 2.4908 3.7542 9.7779 9.7779 0 0 1 -1.2755 2.6351c-.7941 1.1431-1.6244 2.2862-2.8878 2.2862s-1.5883-.734-3.0443-.734c-1.42 0-1.9252.7581-3.08.7581s-1.9611-1.0589-2.8876-2.3584a11.3987 11.3987 0 0 1 -1.9373-6.1487c0-3.61 2.3464-5.523 4.6566-5.523 1.2274 0 2.25.8062 3.02.8062.734 0 1.8771-.8543 3.2729-.8543a4.3778 4.3778 0 0 1 3.6822 1.841zm-6.8586-2.0456a1.3865 1.3865 0 0 1 -.2527-.024 1.6557 1.6557 0 0 1 -.0361-.337 4.0341 4.0341 0 0 1 1.0228-2.5148 4.1571 4.1571 0 0 1 2.7314-1.4078 1.7815 1.7815 0 0 1 .0361.373 4.1487 4.1487 0 0 1 -.9867 2.587 3.6039 3.6039 0 0 1 -2.5148 1.3236z"></path>
        </svg>

      </div>
    </v-app-bar>
  </template>


  <template v-else>
    <v-app-bar
        :height="computedHeight"
        app
        class="px-2"
        color="var(--primary-color)"
        dark
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
    >

      <v-row class="px-2 ">
        <v-col class="d-flex align-center justify-space-between" cols="12">

          <div class="d-flex align-center">
            <div class="d-flex  cursor-pointer">
              <v-icon color="white" icon="mdi-menu"></v-icon>
              <span class="pr-2 text-white d-flex align-center justify-center"
                    style="font-size: 15px; font-weight: 200;">محصولات</span>
            </div>

            <span class="text-white pr-4">فروش ویژه</span>

            <div class="search-container pr-5">
              <input type="text" class="search-input" placeholder="جستجو کنید..." id="search"/>
            </div>


            <div class="d-flex ga-5 pr-5 cursor-pointer">
              <!-- آیکن پروفایل -->
              <v-tooltip :offset="18" location="bottom">
                <template #activator="{ props }">
                  <router-link :to="hasLogin ?  '/profile' : '/login'  ">

                  <v-icon color="white"  v-bind="props">mdi-account-circle</v-icon>
                  </router-link>
                </template>
                <span>پروفایل</span>
              </v-tooltip>
              <!-- آیکن علاقه‌مندی‌ها -->
              <v-tooltip :offset="18" location="bottom">
                <template #activator="{ props }">
                  <v-icon color="white" v-bind="props">mdi-heart</v-icon>
                </template>
                <span>علاقه‌مندی‌ ها</span>
              </v-tooltip>
              <!-- آیکن سبد خرید -->
              <v-tooltip :offset="18" location="bottom">
                <template #activator="{ props }">
                  <v-icon color="white" v-bind="props">mdi-cart</v-icon>
                </template>
                <span>سبد خرید</span>
              </v-tooltip>
            </div>
          </div>

          <div>
            <v-icon color="white" :size="appBarHeight === 70 ? 58 : 45">mdi-fire</v-icon>

          </div>

        </v-col>
      </v-row>

    </v-app-bar>


  </template>

</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'

import {useDisplay} from "vuetify";
import useAuth from "~/composable/useAuth.js";


const {mdAndUp, smAndDown} = useDisplay()
const mobileMenuOpen = ref(null)
const menuMode = ref('');
const { hasRole, isLoggedIn } = useAuth()
const hasLogin = computed(() => isLoggedIn())


const categories = ref([
  {
    title: 'کفش ورزشی',
    count: 12,
    image: 'https://i.pinimg.com/736x/69/04/c3/6904c3d96a6bcc686610155ba635e139.jpg'
  },
  {
    title: 'شلوار',
    count: 18,
    image: 'https://i.pinimg.com/736x/4e/dc/27/4edc274587ea392204c88f8ec332575b.jpg'
  },
  {
    title: 'تاپ و زیر پیراهن',
    count: 25,
    image: 'https://i.pinimg.com/736x/b1/8f/d9/b18fd9833b27ce6ec13630598eb9a200.jpg'
  },

])
const isHovering = ref(false)
const scrollY = ref(0)

const computedHeight = computed(() => {
  if (isHovering.value) {
    return 65
  }
  return scrollY.value > 20 ? 50 : 65
})
const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleOpenMenu(mode) {
  console.log(mode)
  if (mode === 'search') {
    mobileMenuOpen.value = true;
    Menumode.value = 'search'
  } else if (mode === 'menu') {
    Menumode.value = 'menu'
  } else if (mode === 'cart') {
    Menumode.value = 'cart'
    mobileMenuOpen.value = true;
  }
  console.log(Menumode.value)
}
</script>

<style>
.icon-search {
  width: 24px;
  height: 24px;
  background-color: white; /* رنگ دلخواه */
  mask: url('/icons/search.svg') no-repeat center;
  -webkit-mask: url('/icons/search.svg') no-repeat center;
}

.fullscreen-menu {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw;
  height: 0;
  background-color: var(--primary-color);
  z-index: 2000;
  overflow: hidden;

}

.fullscreen-menu.fullscreen-menu-active {
  height: 100vh;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}


/* From Mobile menu */
.hamburger {
  cursor: pointer;
}

.hamburgerActive {
  z-index: 10000;
  position: relative;
}

.hamburger input {
  display: none;
}

.hamburger svg {
  height: 1.8em;
  transition: transform 100ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line {
  fill: none;
  stroke: #ffffff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
  transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
  stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line-top-bottom {
  stroke-dasharray: 12 63;
}

.hamburger input:checked + svg {
  transform: rotate(-45deg);
}

.hamburger input:checked + svg .line-top-bottom {
  stroke-dasharray: 20 300;
  stroke-dashoffset: -32.42;
}

.search-container {
  max-width: 800px;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: .1px solid #374b58;
  border-radius: 3px;
  outline: none;
  height: 33px;
  font-weight: 300;

}

.search-input:focus {
  border-color: #007BFF;
}

.zoomable-image {
  transition: transform 1s ease;
}

.zoomed {
  transform: scale(1.1);
}


</style>
