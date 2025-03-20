<template>
  <div :class="['loader-container', { 'full-screen': fullScreen, 'with-overlay': overlay }]">
    <div class="loader-content">
      <div class="spinner" :class="size" :style="{ 'border-color': color, 'border-top-color': 'transparent' }"></div>
      <p v-if="text" class="loader-text">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  color: {
    type: String,
    default: '#1976d2'
  },
  fullScreen: {
    type: Boolean,
    default: false
  },
  overlay: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.loader-container.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}

.loader-container.with-overlay {
  background-color: rgba(255, 255, 255, 0.8);
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner {
  display: inline-block;
  border-style: solid;
  border-radius: 50%;
  border-top-color: transparent !important;
  animation: spin 0.8s linear infinite;
}

.spinner.small {
  width: 16px;
  height: 16px;
  border-width: 2px;
}

.spinner.medium {
  width: 32px;
  height: 32px;
  border-width: 3px;
}

.spinner.large {
  width: 48px;
  height: 48px;
  border-width: 4px;
}

.loader-text {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
