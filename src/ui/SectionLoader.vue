<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  delay: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 1000
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const isVisible = ref(false);
let observer = null;
const sectionRef = ref(null);

// Watch the loading prop to update visibility when loading completes
watch(() => props.loading, (newLoading) => {
  if (!newLoading) {
    // When loading completes, set visible after the delay
    setTimeout(() => {
      isVisible.value = true;
    }, props.delay);
  }
}, { immediate: true });

onMounted(() => {
  // Set up intersection observer to trigger animation when element is in view
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !props.loading) {
        setTimeout(() => {
          isVisible.value = true;
        }, props.delay);
      }
    });
  }, { threshold: 0.1 });
  
  // Start observing the element using the ref instead of querySelector
  if (observer && sectionRef.value) {
    observer.observe(sectionRef.value);
  }
  
  // Ensure content becomes visible even if intersection observer doesn't trigger
  if (!props.loading) {
    setTimeout(() => {
      isVisible.value = true;
    }, props.delay);
  }
});

onBeforeUnmount(() => {
  // Clean up observer when component is destroyed
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <div class="section-loader" ref="sectionRef">
    <!-- Show skeleton when loading -->
    <div v-if="loading" class="skeleton-container">
      <slot name="skeleton"></slot>
    </div>
    
    <!-- Show actual content when not loading -->
    <div 
      v-else
      class="content-container"
      :style="{
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
        transitionDelay: `${delay}ms`
      }"
      :class="{ 'visible': isVisible && !loading }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.section-loader {
  width: 100%;
  position: relative;
}

.skeleton-container {
  animation: pulse 1.5s infinite ease-in-out;
}

.content-container {
  opacity: 0;
  transform: translateY(20px);
}

.content-container.visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style> 