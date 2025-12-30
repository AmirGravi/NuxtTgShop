<template>
  <v-app >
    <Alert />

    <NuxtLayout  :name="layoutName">
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">
import Alert from "~/components/CE/alert.vue";
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()
await themeStore.loadFromServer()

const layoutName = computed(() => {
  return themeStore.config.layouts.default
})

</script>


<style>
:root {
  --primary-color: #153448;
  --secondary-color: #3C5B6F;
  --text-color: #948979;
  --background-color: #DFD0B8;
  --black: #000000;
  --white: #FFFFFF;
  --danger-color: #e53935;
}
:root-fontsize {
  font-family: vazirmatn;
}
</style>
