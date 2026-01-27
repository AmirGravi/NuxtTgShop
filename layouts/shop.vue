<template>
  <v-app>
    <v-theme-provider :theme="shopThemeName" with-background>
        <component :is="activeThemeLayout">
          <slot />
        </component>
    </v-theme-provider>
  </v-app>
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

const modeCookie = useCookie<'light' | 'dark' | 'system'>("shop-theme-mode", { default: () => "system" });

const getSystemTheme = () =>
    import.meta.client && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const resolvedMode = computed(() => (modeCookie.value === "system" ? getSystemTheme() : modeCookie.value));

const shopThemeName = computed(() => (resolvedMode.value === "dark" ? "dark" : "light"));
</script>