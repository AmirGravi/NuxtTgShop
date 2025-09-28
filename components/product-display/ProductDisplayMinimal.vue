<template>
  <div class="mb-1">
    <!-- Desktop and larger screens -->
    <v-row class="d-none d-sm-flex" dense>
      <v-col
          v-for="(category, index) in products.slice(0, 3)"
          :key="index"
          cols="4"
          class="pa-0"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
              height="550"
              v-bind="props"
              class="overflow-hidden position-relative rounded-0"
              @mouseenter="isHovering = true"
              @mouseleave="isHovering = false"
          >
            <!-- Image with zoom effect -->
            <v-img
                :src="category.image"
                height="650"
                cover
                class="zoomable-image"
                :class="{ zoomed: isHovering }"
            ></v-img>

            <!-- Text below the image -->
            <div
                class="position-absolute desktop-text-css px-2 py-1"
                :style="{
                 minHeight: isHovering ? '115px' : '70px',
                 maxHeight: isHovering ? '115px' : '70px'
            }"
            >
              <div class="bg-surface fs-18  fw-200  d-inline-block px-2 py-1 mb-2  rounded">
                {{ category.title }}
              </div>


              <div class="  fs-17 fw-200 mt-1" :class="{ 'visible': isHovering }">
                <span class="bg-surface px-2 py-1  rounded">
                {{ category.count }} محصول

                </span>
              </div>
            </div>

          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- Mobile version -->
    <div class="d-flex d-sm-none overflow-auto my-2" style="gap: 2px;">
      <div
          v-for="(category, index) in products"
          :key="index"
          class="d-flex flex-column"
          style="min-width: 200px"
      >
        <v-img :src="category.image" height="300" cover></v-img>
        <div class="px-1">
          <div class=" fw-400 text-center" >{{ category.title }}</div>
          <div class= " fw-200 pb-2 text-center">{{ category.count }} محصول</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useTheme } from 'vuetify'

defineProps({
  products: {
    type: Array,
    required: true
  }
})
const theme = useTheme()


const isHovering = ref(false)
</script>

<style scoped>

.desktop-text-css{
  right: 10px;
  width: 100%;
  bottom: -25px;
  overflow: hidden;
  transition: min-height 0.3s ease;
}

/* For WebKit browsers (like Chrome and Edge) - For scrollbar Height */
.d-flex::-webkit-scrollbar {
  height: 2px; /* Horizontal scrollbar height */
}

.d-flex::-webkit-scrollbar-thumb {
  background-color: #ccc; /* Scrollbar thumb color */
  border-radius: 4px;
}

.d-flex::-webkit-scrollbar-track {
  background: transparent; /* Track background color */
}
</style>
