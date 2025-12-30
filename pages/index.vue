<template>
  <Landing />
</template>

<script setup lang="ts">
import { resolveThemePage } from '~/utils/themePageResolver'

const Landing = resolveThemePage('Landing')
</script>
