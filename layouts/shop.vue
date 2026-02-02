<template>
    <v-theme-provider :theme="shopThemeName" with-background>
        <component :is="activeThemeLayout">
          <slot />
        </component>
    </v-theme-provider>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'
import { defineAsyncComponent } from 'vue'
import { useHead } from '#app'

const themeStore = useThemeStore()

const activeTheme = computed(() => themeStore.name )

const activeThemeLayout = computed(() => {
  return defineAsyncComponent(() =>
      import(`~/themes/${activeTheme.value}/layouts/default.vue`)
  )
})

const modeCookie = useCookie<'light' | 'dark'>("shop-theme-mode", {
  default: () => "light"
})

const shopThemeName = computed(() => (modeCookie.value === "dark" ? "dark" : "light"))

const themeHeadLinks = computed(() => themeStore.config?.head?.link || [])
useHead(() => ({
  link: themeHeadLinks.value,
}))

</script>
