<template>
  <component :is="landingComponent" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useThemeLoader } from '@/composable/useThemeLoader.js'
const { currentTheme } = useThemeLoader()
const landingComponent = ref(null)

onMounted(async () => {
  // فرض کن تم فعال کلاسیکه
  const themeName = currentTheme.value.name || 'classic'

  // داینامیک import صفحه لندینگ تم
  landingComponent.value = (await import(`~/assets/themes/${themeName}/pages/Landing.vue`)).default
})
</script>
