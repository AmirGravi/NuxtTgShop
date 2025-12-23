<template>

  <v-app>
    <component :is="HeaderComponent" />
    <v-main>
      <slot />
    </v-main>
    <component :is="FooterComponent" />
  </v-app>

</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useThemeLoader } from '@/composable/useThemeLoader.js'
const { currentTheme } = useThemeLoader()

const HeaderComponent = ref(null)
const FooterComponent = ref(null)

onMounted(async () => {
  const themeName = currentTheme.value.name || 'classic'
  console.log("themeName" , themeName)
    HeaderComponent.value = (await import(`@/assets/themes/classic/components/Header.vue`)).default;
    FooterComponent.value = (await import('@/assets/themes/classic/components/Footer.vue')).default;

})
</script>