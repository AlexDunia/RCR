<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { getTimestampedImageUrl } from '@/utils/imageUtils';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Image'
  },
  fallbackSrc: {
    type: String,
    default: '/images/default-avatar.svg'
  },
  width: {
    type: [String, Number],
    default: null
  },
  height: {
    type: [String, Number],
    default: null
  },
  class: {
    type: String,
    default: ''
  },
  forceRefresh: {
    type: Boolean,
    default: false
  }
});

// State
const imgSrc = ref(props.src);
const hasError = ref(false);
const isLoading = ref(true);

// Apply timestamp to prevent caching if forceRefresh is true
const timestampedSrc = computed(() => {
  return props.forceRefresh ? getTimestampedImageUrl(imgSrc.value) : imgSrc.value;
});

// Watch for changes to the src prop
watch(() => props.src, (newSrc) => {
  imgSrc.value = newSrc;
  hasError.value = false;
  isLoading.value = true;
});

// Handle image load error
const handleError = () => {
  hasError.value = true;
  isLoading.value = false;
  console.log(`Image load error for ${props.src}, using fallback`);
  imgSrc.value = props.fallbackSrc;
};

// Handle image load success
const handleLoad = () => {
  isLoading.value = false;
};

// Check if images need refresh from localStorage
onMounted(() => {
  const needsRefresh = localStorage.getItem('imagesNeedRefresh');
  if (needsRefresh === 'true') {
    // Clear the flag (only needs to happen once per page load)
    localStorage.removeItem('imagesNeedRefresh');
    imgSrc.value = getTimestampedImageUrl(props.src);
  }
});
</script>

<template>
  <div class="image-container" :class="{ 'is-loading': isLoading }">
    <img
      v-if="!hasError"
      :src="timestampedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :class="class"
      @error="handleError"
      @load="handleLoad"
    />
    <img
      v-else
      :src="fallbackSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :class="class"
    />
    <div v-if="isLoading" class="loading-placeholder"></div>
  </div>
</template>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
}

.loading-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 0.8; }
  100% { opacity: 0.6; }
}

.is-loading img {
  opacity: 0;
}

.is-loading .loading-placeholder {
  opacity: 1;
}
</style>
