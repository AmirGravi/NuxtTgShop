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
      <div class="d-flex justify-center">
        <span class="fs-14">{{ item.text }}</span>
        <button class="close-btn" @click="alertStore.closeAlert(item.id)">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>
      <div
          v-if="item.duration"
          class="progress-bar"
          :style="{ animationDuration: item.duration + 'ms' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAlert } from "~/stores/alert.js";

const alertStore = useAlert();
const alerts = computed(() => alertStore.alerts);

const snackbarRefs = ref({});
function setRef(el, id) {
  if (el) {
    snackbarRefs.value[id] = el;
  }
}
</script>

<style >
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
  height: 42px;
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
  background-color: #4caf50; /* سبز */
}
.custom-snackbar.info {
  background-color: #2196f3; /* آبی */
}
.custom-snackbar.warning {
  background-color: #ff9800; /* نارنجی */
}
.custom-snackbar.error {
  background-color: #f44336; /* قرمز */
}



.close-btn {
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.progress-bar {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  animation-name: progress-animation;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
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