<script setup lang="ts">
import { resolveThemePage } from '@/utils/resolveThemePage'
const Page = resolveThemePage("category/[id]")
</script>

<template>
  <component :is="Page" />
</template>
