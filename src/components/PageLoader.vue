<template>
  <div class="page-loader" :class="{ 'fade-out': !isLoading }">
    <div v-for="n in 3" :key="n" class="skeleton-item" :style="{ animationDelay: `${(n - 1) * 0.2}s` }"></div>
  </div>
</template>

<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
});
</script>

<style scoped>
.page-loader {
  width: 100%;
  padding: 20px;
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.page-loader.fade-out {
  opacity: 0;
  pointer-events: none;
}

.skeleton-item {
  width: 100%;
  height: 80px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 35%, #e0e0e0 45%);
  background-size: 200% 100%;
  animation: skeleton-loading 2s infinite, fade-slide-in 0.5s ease-in-out forwards;
  opacity: 0;
  transform: translateY(20px);
  border-radius: 8px;
  margin-bottom: 16px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes fade-slide-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
