<template>
  <div>
    <!-- حالت سوییچر سفارشی -->
    <label v-if="asSwitch" class="switch">
      <input
          type="checkbox"
          id="checkbox"
          :checked="!isDark"
          @change="toggleTheme"
      />
      <span class="slider">
        <div class="star star_1"></div>
        <div class="star star_2"></div>
        <div class="star star_3"></div>
        <svg viewBox="0 0 16 16" class="cloud_1 cloud">
          <path
              transform="matrix(.77976 0 0 .78395-299.99-418.63)"
              fill="#fff"
              d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
          />
        </svg>
      </span>
    </label>

    <!-- حالت Dropdown -->
    <v-menu v-else offset-y>
      <template #activator="{ props }">
        <v-btn variant="text" v-bind="props" class="relative p-0">
          <v-icon
              class="w-[1.5rem] h-[1.5rem] transition-all duration-[1000ms] ease-in-out"
              :class="!isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'"
          >
            mdi-white-balance-sunny
          </v-icon>
          <v-icon
              class="absolute w-[1.5rem] h-[1.5rem] transition-all duration-[1000ms] ease-in-out"
              :class="isDark ? 'scale-100 rotate-0' : 'scale-0 rotate-90'"
          >
            mdi-moon-waning-crescent
          </v-icon>
          <span class="sr-only">Toggle theme</span>
        </v-btn>
      </template>
      <v-list class="dropdown-menu">
        <v-list-item @click="setTheme('light')">Light</v-list-item>
        <v-list-item @click="setTheme('dark')">Dark</v-list-item>
        <v-list-item @click="setTheme('system')">System</v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useTheme } from "vuetify";

defineProps({
  asSwitch: { type: Boolean, default: false },
});

const theme = useTheme();
const isDark = ref(false);

const themeCookie = useCookie('app-theme', {
  default: () => 'system',
  watch: true,
  maxAge: 60 * 60 * 24 * 90
});

const getSystemTheme = () => {
  if (import.meta.client) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const applyTheme = (mode) => {
  let targetTheme = 'light';

  if (mode === 'system') {
    targetTheme = getSystemTheme();
  } else {
    targetTheme = mode;
  }

  theme.global.name.value = targetTheme;
  isDark.value = targetTheme === 'dark';
};

onMounted(() => {
  try {
    const savedTheme = themeCookie.value || 'system';
    applyTheme(savedTheme);

    if (import.meta.client && savedTheme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (themeCookie.value === 'system') {
          applyTheme('system');
        }
      });
    }

    watch(
        () => theme.global.current.value.dark,
        (val) => {
          isDark.value = val;
        }
    );
  } catch (error) {
    console.error('Error initializing theme:', error);
    applyTheme('light');
  }
});

function toggleTheme() {
  try {
    const next = isDark.value ? 'light' : 'dark';
    setTheme(next);
  } catch (error) {
    console.error('Error toggling theme:', error);
  }
}

function setTheme(mode) {
  try {
    themeCookie.value = mode;

    applyTheme(mode);
  } catch (error) {
    console.error('Error setting theme:', error);
  }
}
</script>

<style scoped>
.switch {
  font-size: 13px;
  position: relative;
  display: inline-block;
  width: 4em;
  height: 2.2em;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2a2a2a;
  transition: 0.4s;
  border-radius: 30px;
  overflow: hidden;
}
.slider:before {
  position: absolute;
  content: "";
  height: 1.2em;
  width: 1.2em;
  border-radius: 20px;
  left: 0.5em;
  bottom: 0.5em;
  transition: 0.4s;
  transition-timing-function: cubic-bezier(0.81, -0.04, 0.38, 1.5);
  box-shadow: inset 8px -4px 0px 0px #fff;
}
.switch input:checked + .slider {
  background-color: #00a6ff;
}
.switch input:checked + .slider:before {
  transform: translateX(1.8em);
  box-shadow: inset 15px -4px 0px 15px #ffcf48;
}
.star {
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  width: 5px;
  height: 5px;
  transition: all 0.4s;
}
.star_1 {
  left: 2.5em;
  top: 0.5em;
}
.star_2 {
  left: 2.2em;
  top: 1.2em;
}
.star_3 {
  left: 3em;
  top: 0.9em;
}
.switch input:checked ~ .slider .star {
  opacity: 0;
}
.cloud {
  width: 3.5em;
  position: absolute;
  bottom: -1.4em;
  left: -1.1em;
  opacity: 0;
  transition: all 0.4s;
}
.switch input:checked ~ .slider .cloud {
  opacity: 1;
}

.dropdown-menu {
  direction: rtl;
  background-color: #ffffff;
}
.dark .dropdown-menu {
  background-color: #1f2937;
}
.dropdown-menu .v-list-item {
  color: #111827;
}
.dark .dropdown-menu .v-list-item {
  color: #e5e7eb;
}
</style>