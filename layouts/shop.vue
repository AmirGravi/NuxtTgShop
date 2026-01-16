<template>
  <component :is="activeThemeLayout">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'
import { defineAsyncComponent } from 'vue'

const themeStore = useThemeStore()

const activeTheme = computed(() => themeStore.name )

const activeThemeLayout = computed(() => {
  return defineAsyncComponent(() =>
      import(`~/themes/${activeTheme.value}/layouts/default.vue`)
  )
})
</script>