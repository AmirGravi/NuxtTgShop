<template>

  <v-app>
    <ClassicHeader />
    <v-main>
      <slot />
    </v-main>
    <ClassicFooter />
  </v-app>

</template>

<script setup>
import ClassicHeader from "../components/Header.vue"
import ClassicFooter from "../components/Footer.vue"

</script>