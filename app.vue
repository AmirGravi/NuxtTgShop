<template>
  <v-app>
    <Alert />
        <NuxtLayout :name="layoutName">
          <NuxtPage />
        </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">
import Alert from '~/components/CE/alert.vue'
import { useThemeStore } from '~/stores/theme'
const { $axios } = useNuxtApp()

const route = useRoute()
const themeStore = useThemeStore()

let activeThemeName

try {
  const res = await $axios.get('/theme')
  activeThemeName = res.data.theme || 'classic'
} catch (error) {
  console.error('Failed to fetch theme, using classic')
  activeThemeName = 'classic'
}
const themeCookie = useCookie('selected-theme', {
  default: () => 'classic',
  maxAge: 60 * 60 * 24 * 365
})
themeCookie.value = activeThemeName

await themeStore.loadThemeModule(activeThemeName)

const layoutName = computed(() => {
  if (route.path.startsWith('/panel/admin')) return 'admin'
  if (route.meta.layout) return route.meta.layout
  return 'shop'
})
</script>