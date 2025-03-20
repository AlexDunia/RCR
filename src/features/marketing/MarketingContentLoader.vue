<template>
  <div class="marketing-content">
    <div v-if="isLoading" class="content-loader">
      <Loader v-for="n in loaderCount" :key="n" />
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Loader from '@/components/Loader.vue';

const props = defineProps({
  loaderCount: {
    type: Number,
    default: 3
  },
  loadingDelay: {
    type: Number,
    default: 1000
  }
});

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, props.loadingDelay);
});
</script>

<style scoped>
.marketing-content {
  width: 100%;
}

.content-loader {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style> 