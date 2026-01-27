<template>
  <client-only>

    <v-theme-provider :theme="adminThemeName" with-background>

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
        <template v-for="item in menuItems" :key="item.title">

          <!-- آیتم ساده -->
          <v-list-item
              v-if="!item.children"
              :to="item.to"
              color="primary"
              rounded="xl"
              variant="tonal"
              class="mb-1"
          >
            <template #prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>

          <!-- آیتم دارای زیرمنو (بدون v-list-group) -->
          <div v-else>
            <v-list-item
                active-color="primary"
                color="primary"
                rounded="xl"
                :height="46"
                class="mb-1"
                variant="tonal"
              @click="onParentClick(item)"
            >
              <template #prepend>
                <v-icon :color="isItemActive(item) ? 'primary' : undefined">
                  {{ item.icon }}
                </v-icon>
              </template>

              <v-list-item-title
               :class="{ 'text-primary': isItemActive(item) }"
              >
                {{ item.title }}</v-list-item-title>

              <template #append>
                <v-icon :color="isItemActive(item) ? 'primary' : undefined">
                  {{ openKey === item.title ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </template>
            </v-list-item>


            <v-expand-transition>
              <div v-show="openKey === item.title">
                <v-list-item
                    v-for="child in item.children"
                    :key="child.title"
                    :to="child.to"
                    color="primary"
                    :min-height="20"
                    :height="35"
                    rounded="xl"
                    class="mb-1 pr-3 "
                >
                  <div  class="d-flex ga-2 align-center" >
                    <v-icon size="small">{{ child.icon }}</v-icon>
                    <v-list-item-title>{{ child.title }}</v-list-item-title>
                  </div>
                </v-list-item>
              </div>
            </v-expand-transition>
          </div>

        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="0" border="0" color="surface" height="64">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-medium">داشبورد</v-toolbar-title>
<!--      <v-spacer></v-spacer>-->
      <ModeToggle class="ml-4" asSwitch scope="admin" />
    </v-app-bar>

    <v-main class="bg-grey-lighten-5">
      <v-container fluid class="pa-6">
        <slot></slot>
      </v-container>
    </v-main>
    </v-theme-provider>

  </client-only>

</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import ModeToggle from '~/components/CE/ModeToggle.vue';

const route = useRoute()

const modeCookie = useCookie<'light' | 'dark'>("admin-theme-mode", { default: () => "light" })
const adminThemeName = computed(() => (modeCookie.value === "dark" ? "adminDark" : "adminLight"))


const isItemActive = (item: any) => {
  if (item.to && route.path === item.to) return true

  if (item.children?.length) {
    return item.children.some((c: any) => route.path.startsWith(c.to))
  }

  return false
}

const drawer = ref(true)
const mini = ref(false)

const openKey = ref<string | null>(null)
const toggle = (key: string) => {
  openKey.value = openKey.value === key ? null : key
}

const menuItems = [
  { title: 'فروشگاه', icon: 'mdi-home', to: '/' },
  { title: 'داشبورد', icon: 'mdi-view-dashboard', to: '/panel/admin' },
  { title: 'کاربران', icon: 'mdi-account-group', to: '/admin/users' },
  {
    title: 'محصولات',
    icon: 'mdi-package-variant',
    children: [
      { title: 'لیست محصولات', icon: 'mdi-list', to: '/panel/admin/products/list' },
      { title: 'افزودن محصول', icon: 'mdi-plus-box', to: '/panel/admin/products/add' },
    ]
  },
  {
    title: 'دسته بندی ها',
    icon: 'mdi-package-variant',
    children: [
      { title: 'لیست محصولات', icon: 'mdi-list', to: '/panel/admin/categofy/list' },
      { title: 'افزودن دسته بندی', icon: 'mdi-plus-box', to: '/panel/admin/categofy/add' },
    ]
  },
  { title: 'تنظیمات', icon: 'mdi-cog', to: '/admin/settings' },
]

const onParentClick = async (item: any) => {
  // اگر کلاً drawer بسته است، بازش کن
  if (!drawer.value) drawer.value = true

  // اگر rail/mini هست، اول از rail دربیار تا جا برای زیرمنو داشته باشیم
  if (mini.value) {
    mini.value = false
    await nextTick()
  }

  // حالا زیرمنو رو باز/ببند
  toggle(item.title)
}

watch(mini, (val) => {
  if (val) openKey.value = null
})

watch(
    () => route.path,
    () => {
      const parent = menuItems.find((it: any) => it.children?.some((c: any) => route.path.startsWith(c.to)))
      if (parent) openKey.value = parent.title
    },
    { immediate: true }
)
</script>

