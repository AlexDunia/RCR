<template>
  <div 
    ref="el"
    class="animation-wrapper" 
    :class="{ 'visible': isVisible, 'no-animation': props.noAnimation }" 
    :style="{
      '--animation-delay': `${props.delay}ms`,
      '--animation-duration': `${props.duration}ms`,
      '--animation-distance': `${props.distance}px`
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  delay: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 600
  },
  distance: {
    type: Number,
    default: 30
  },
  // Add a noAnimation prop for cases where we want to disable animation
  noAnimation: {
    type: Boolean,
    default: false
  }
});

const isVisible = ref(false);
const el = ref(null);
const observer = ref(null);

onMounted(() => {
  // If noAnimation is true, make content visible immediately
  if (props.noAnimation) {
    isVisible.value = true;
    return;
  }

  // Create intersection observer for on-screen detection
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add small delay for staggered effect plus any custom delay
        setTimeout(() => {
          isVisible.value = true;
        }, props.delay);
        
        // Stop observing after animation
        observer.value.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }); // 10% visibility triggers animation
  
  // Start observing the element
  if (el.value) {
    observer.value.observe(el.value);
  }
  
  // Fallback: if for some reason the intersection observer doesn't trigger,
  // make the content visible after a timeout
  setTimeout(() => {
    if (!isVisible.value) {
      isVisible.value = true;
    }
  }, props.delay + 1000); // Delay + 1 second grace period
});

onBeforeUnmount(() => {
  // Clean up observer
  if (observer.value && el.value) {
    observer.value.unobserve(el.value);
    observer.value.disconnect();
  }
});
</script>

<style scoped>
.animation-wrapper {
  opacity: 0;
  transform: translateY(var(--animation-distance, 30px));
  transition: 
    opacity var(--animation-duration, 600ms) cubic-bezier(0.2, 0.8, 0.2, 1) var(--animation-delay, 0ms), 
    transform var(--animation-duration, 600ms) cubic-bezier(0.2, 0.8, 0.2, 1) var(--animation-delay, 0ms);
  will-change: opacity, transform;
}

.animation-wrapper.visible {
  opacity: 1;
  transform: translateY(0);
}

.animation-wrapper.no-animation {
  opacity: 1;
  transform: none;
  transition: none;
}
</style> 