<template>
  <v-app>
    <v-main>
      <div class="full-page-wrapper">
        <NuxtPage />
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.full-page-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  /* یا background-color: #f5f5f5; */
}
</style>
