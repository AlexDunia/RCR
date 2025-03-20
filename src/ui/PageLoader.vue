<template>
  <div class="page-container">
    <transition name="fade">
      <div v-if="isLoading || props.externalLoading" class="loader-overlay">
        <div class="loader"></div>
      </div>
    </transition>
    <div class="page-content" :class="{ 'content-loaded': contentVisible && !props.externalLoading }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Prop to allow parent component to control loading
const props = defineProps({
  externalLoading: {
    type: Boolean,
    default: false
  }
});

const isLoading = ref(true);
const contentVisible = ref(false);

onMounted(() => {
  console.log('PageLoader mounted, starting load sequence');
  
  // Use a more efficient approach - just enough time for initial render
  setTimeout(() => {
    isLoading.value = false;
    console.log('PageLoader spinner hidden');
    
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      contentVisible.value = true;
      console.log('PageLoader content shown');
    }, 50);
  }, 300); // Reduced from 600ms for faster initial load
});

onBeforeUnmount(() => {
  // Reset loading state when component is unmounted
  // This ensures a clean state if the component is reused
  isLoading.value = true;
  contentVisible.value = false;
});
</script>

<style scoped>
.page-container {
  position: relative;
  min-height: 100%;
  width: 100%;
}

.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #3498db;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.page-content {
  position: relative;
  transition: opacity 0.3s ease-out;
  opacity: 0;
}

.content-loaded {
  opacity: 1;
}

/* Fade transition for loader */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
