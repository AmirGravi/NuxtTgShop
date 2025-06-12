<template>
  <v-btn class="text-none" v-bind="$attrs">
    <slot />

    {{ text }}
  </v-btn>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.v-btn {
  letter-spacing: 0 !important;
}
</style>
