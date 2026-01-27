<script setup lang="ts">
import { resolveThemePage } from "~/utils/resolveThemePage"
const Page = resolveThemePage("index")
</script>

<template>
  <component :is="Page" />
</template>
