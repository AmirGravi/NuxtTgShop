<template>
  <div class="main">
    <div class="bubbles">
      <div v-for="n in 5" :key="n" class="bubble" />
    </div>
    <span style="font-size: 80px;font-family: 'Luckiest Guy'!important; margin-bottom:2rem; ">
      404 !
    </span>
    <span class=" fs-m-20 fs-35 py-8 ">. صفحه مورد نظر پیدا نشد</span>

    <c-e-abtn @click="goBack"  class=" fs-12 mt-2" text=" برگشت به صفحه اصلی" >

      <v-icon  icon="mdi-arrow-left pr-2"></v-icon>

    </c-e-abtn>
  </div>
</template>

<script setup>
import {useDisplay} from "vuetify";

const {xs} = useDisplay()

const goBack = () => {
  navigateTo('/', { replace: true })
}

</script>

<style scoped>

.main {
  height: 100vh;
  background: linear-gradient(145deg, #2c3e50, #34495e);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.bubbles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.bubble {
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  position: absolute;
  bottom: -100px;
  animation: floatUp 10s infinite ease-in;
}

.bubble:nth-child(1) {
  left: 20%;
  animation-delay: 0s;
}
.bubble:nth-child(2) {
  left: 40%;
  animation-delay: 2s;
}
.bubble:nth-child(3) {
  left: 60%;
  animation-delay: 4s;
}
.bubble:nth-child(4) {
  left: 80%;
  animation-delay: 6s;
}
.bubble:nth-child(5) {
  left: 50%;
  animation-delay: 8s;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-120vh) scale(0.5);
    opacity: 0;
  }
}

h1 {
  font-size: 8rem;
  z-index: 1;
  margin: 0;
}
p {
  z-index: 1;
  font-size: 1.5rem;
}
button {
  z-index: 1;
  background: white;
  color: #2c3e50;
  padding: 10px 20px;
  border: none;
  font-size: 1rem;
  margin-top: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}
button:hover {
  background: #f0f0f0;
}
</style>
