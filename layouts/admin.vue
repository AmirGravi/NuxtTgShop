<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :rail="mini"
    permanent
    color="surface"
    elevation="0"
    border="0"
    location="end"
    >
      <div class="pa-4">
        <v-btn
            block
            variant="text"
            color="default"
            @click="mini = !mini"
        >
          <v-icon>{{ mini ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
          <span v-if="!mini" class="mr-2">بستن منو</span>
        </v-btn>
      </div>
    <div class="pa-2 d-flex align-center justify-center" >
      <span v-if="!mini" class="fw-500 ml-2">پنل ادمین</span>
      <v-icon size="24">mdi-shield-account</v-icon>
    </div>

    <v-divider class="mx-4"></v-divider>

    <v-list nav density="compact" class="px-2">
      <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          :value="item"
          color="primary"
          rounded="xl"
      class="mb-1"
      >
      <template v-slot:prepend>
        <v-icon>{{ item.icon }}</v-icon>
      </template>
      <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>


    </v-navigation-drawer>

    <v-app-bar elevation="0" border="0" color="surface" height="64">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-medium">داشبورد</v-toolbar-title>
<!--      <v-spacer></v-spacer>-->
<!--      <ModeToggle asSwitch class="ml-4"/>-->
    </v-app-bar>

    <v-main class="bg-grey-lighten-5">
      <v-container fluid class="pa-6">
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModeToggle from '@/components/CE/ModeToggle.vue';

const drawer = ref(true);
const mini = ref(false);

const menuItems = [
  { title: 'داشبورد', icon: 'mdi-view-dashboard', to: '/admin/dashboard' },
  { title: 'کاربران', icon: 'mdi-account-group', to: '/admin/users' },
  { title: 'محصولات', icon: 'mdi-package-variant', to: '/admin/products' },
  { title: 'تنظیمات', icon: 'mdi-cog', to: '/admin/settings' },
];
</script>

