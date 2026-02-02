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

const route = useRoute()
const themeStore = useThemeStore()

const themeCookie = useCookie('selected-theme', {
  default: () => 'classic',
  maxAge: 60 * 60 * 24 * 365
})
const event = process.server ? useRequestEvent() : null
const serverThemeName = event?.context?.themeName as string | undefined
const activeThemeName = serverThemeName || themeCookie.value

await themeStore.loadThemeModule(activeThemeName)

const layoutName = computed(() => {
  if (route.path.startsWith('/panel/admin')) return 'admin'
  if (route.meta.layout) return route.meta.layout
  return 'shop'
})
</script>
