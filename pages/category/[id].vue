<template>
  <v-container fluid>
    <!-- 🔹 Breadcrumb -->
    <v-breadcrumbs :items="breadcrumbs" class="mb-4">
      <template v-slot:divider>
        <v-icon>mdi-chevron-left</v-icon>
      </template>
    </v-breadcrumbs>

    <!-- 🔹 Desktop / Tablet -->
    <v-row class="d-none d-md-flex">
      <!-- فیلترها سمت راست -->
      <v-col cols="2">
        <v-card class="pa-3">
          <h3 class="mb-3">فیلترها</h3>
          <!-- اینجا بعداً فیلترها رو می‌ذاریم -->
          <div>🔍 فیلتر نمونه</div>
        </v-card>
      </v-col>

      <!-- محصولات -->
      <v-col cols="10">
        <v-row>
          <v-col
              v-for="product in products"
              :key="product._id"
              cols="12"
              sm="4"
          >
            <v-card>
              <v-img
                  :src="product.images[0]"
                  height="200"
                  cover
              />
              <v-card-title>{{ product.name }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- 🔹 Mobile -->
    <div class="d-md-none">
      <!-- فیلتر بالا -->
      <v-card class="pa-3 mb-4">
        <h3 class="mb-3">فیلترها</h3>
        <div>🔍 فیلتر نمونه</div>
      </v-card>

      <!-- محصولات -->
      <v-row>
        <v-col
            v-for="product in products"
            :key="product._id"
            cols="6"
        >
          <v-card>
            <v-img
                :src="product.images[0]"
                height="160"
                cover
            />
            <v-card-title class="text-subtitle-2 text-center">
              {{ product.name }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const products = ref([])

const breadcrumbs = [
  { title: 'خانه',icon:'mdi-home', disabled: false, to: '/' },
  { title: 'دسته بندی', disabled: true }
]

onMounted(async () => {
  try {
    const categoryId = route.params.id
    const res = await axios.get(`http://localhost:5000/api/products/category/${categoryId}`)
    products.value = res.data
  } catch (err) {
    console.error('خطا در دریافت محصولات:', err)
  }
})
</script>
