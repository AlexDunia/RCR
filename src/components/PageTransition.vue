<template>
  <div class="page-wrapper">
    <div v-if="loading" class="skeleton-loader">
      <div v-for="n in 5" :key="n" class="skeleton-item" :style="{ animationDelay: `${(n - 1) * 0.1}s` }"></div>
    </div>
    <div v-show="!loading" class="content-loaded">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 800);
});
</script>

<style scoped>
.page-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.skeleton-loader {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.skeleton-item {
  width: 100%;
  height: 60px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite ease-in-out;
  border-radius: 8px;
  margin-bottom: 16px;
}

.content-loaded {
  animation: fadeIn 0.3s ease-in-out;
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
