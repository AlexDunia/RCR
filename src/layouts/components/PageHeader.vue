<template>
  <div class="page-header">
    <div class="page-header__left">
      <button class="back-button" @click="handleBack" v-if="showBackButton">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="back-icon">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <h1 class="page-title">{{ title }}</h1>
      <p class="page-subtitle" v-if="subtitle">{{ subtitle }}</p>
    </div>

    <div class="page-header__right">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  showBackButton: {
    type: Boolean,
    default: true
  },
  backPath: {
    type: String,
    default: ''
  }
});

const router = useRouter();

const handleBack = () => {
  if (props.backPath) {
    router.push(props.backPath);
  } else {
    router.back();
  }
};
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.page-header__left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #4b5563;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: #111827;
}

.back-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.page-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.page-subtitle {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.page-header__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .page-header__right {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
