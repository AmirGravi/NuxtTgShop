<template>
  <AboutPage />
</template>

<script setup lang="ts">
import { resolveThemePage } from '~/utils/themePageResolver'

const AboutPage = resolveThemePage('About')
console.log('abs',AboutPage)
</script>
