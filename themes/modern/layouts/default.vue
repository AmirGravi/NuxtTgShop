<template>

    <ClassicHeader />
    <v-main>
      <slot />
    </v-main>
    <ClassicFooter />

</template>

<script setup>
import ClassicHeader from "../components/Header.vue"
import ClassicFooter from "../components/Footer.vue"

</script>