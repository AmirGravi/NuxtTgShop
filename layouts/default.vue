<template>
  <component :is="ThemeLayout">
    <slot />
  </component>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useThemeLoader } from '@/composable/useThemeLoader.js'
const { currentTheme } = useThemeLoader()

const ThemeLayout = ref(null)
onMounted(async () => {
  const themeName = currentTheme.value.name || 'classic'
  // لود لایوت از پوشه تم
  try {
    ThemeLayout.value = (await import(`@/assets/themes/${themeName}/layouts/DefaultLayout.vue`)).default;
  } catch (e) {
    console.error('Layout load failed:', e);
  }
  console.log("111" ,   ThemeLayout.value)

})
</script>
