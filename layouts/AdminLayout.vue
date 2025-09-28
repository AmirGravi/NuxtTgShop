<template>
  <v-app>
    <v-navigation-drawer
        app
        v-model="drawer"
        v-model:mini-variant="mini"
        clipped
        floating
        color="primary"
    >
      <v-list nav dense>
        <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.to"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!mini">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-btn
          class="mt-auto mb-2 mx-2"
          variant="outlined"
          color="white"
          @click="mini = !mini"
      >
        <v-icon>{{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
      </v-btn>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>پنل ادمین</v-toolbar-title>
      <v-spacer></v-spacer>
      <ModeToggle />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot>dwqqqqqqqqq</slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModeToggle from '@/components/ModeToggle.vue';

const drawer = ref(true);
const mini = ref(false);

const menuItems = [
  { title: 'داشبورد', icon: 'mdi-view-dashboard', to: '/admin/dashboard' },
  { title: 'کاربران', icon: 'mdi-account-group', to: '/admin/users' },
  { title: 'محصولات', icon: 'mdi-package-variant', to: '/admin/products' },
  { title: 'تنظیمات', icon: 'mdi-cog', to: '/admin/settings' },
];
</script>
