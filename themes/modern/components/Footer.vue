<template>
  <v-footer  >
    <div class="text-center d-flex flex-column ga-2 py-4 w-100">
      <h3 class="fw-100  my-3 fs-15">
        در ساعات اداری با ما تماس بگیرید - 09100000
      </h3>

      <div class="d-flex flex-column flex-md-row justify-center ga-10 py-2">
        <router-link v-for="(page, index) in pages" :key="index" :to="page.path">
          <h2 class=" fw-200 fs-15">{{ page.name }}</h2>
        </router-link>
      </div>

      <div class="d-flex ga-3 py-2 justify-center">
        <v-btn
            v-for="icon in icons"
            :key="icon"
            :icon="icon"
            density="comfortable"
            variant="text"
        ></v-btn>
      </div>

      <v-divider class="my-2" thickness="2" width="100%" ></v-divider>

      <h2 class=" fw-200 fs-15">
        کلیه حقوق این سایت متعلق به «TG-Project» است.
      </h2>
    </div>
  </v-footer>
</template>

<script setup>
const icons = [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]
const pages = [
  // { name: 'درباره ما', path: '/home' },
  { name: 'قوانین سایت', path: '/about' },
  // { name: 'شرایط تعویض و بازگشت کالا', path: '/contact' },
  { name: 'تماس باما', path: '/about' },
  // { name: 'پشتیبانی', path: '/contact' }
]
</script>
