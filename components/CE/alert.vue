<template>
  <div class="alert-container">
    <div
        v-for="item in alerts"
        :key="item.id"
        :data-id="item.id"
        :ref="el => setRef(el, item.id)"
        class="custom-snackbar"
        :class="item.mode"
    >
      <span class="text">{{ item.text }}</span>
      <div class="progress-bar"></div>
      <button class="close-btn" @click="alertStore.closeAlert(item.id)">
        <v-icon>mdi-close</v-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {useAlert} from "~/stores/alert.js";

const alertStore = useAlert();
const alerts = computed(() => alertStore.alerts);

const snackbarRefs = ref({});
function setRef(el, id) {
  if (el) {
    snackbarRefs.value[id] = el;
  }
}
</script>

<style scoped>
.alert-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 10000;
}

.custom-snackbar {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #323232;
  color: white;
  padding: 0px 44px 0px 16px;
  border-radius: 8px;
  max-width: 400px;
  width: 95vw;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
  overflow: hidden;
}

.custom-snackbar.success {
  background-color: #00e676;
}
.custom-snackbar.error {
  background-color: #b00020;
}
.custom-snackbar.warning {
  background-color: #ff9800;
}

.text {
  font-size: 16px;
}

.close-btn {
  position: absolute;
  top: 7px;
  right: 8px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  animation: progress-animation 3s linear forwards;
}

@keyframes progress-animation {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
