<template>
  <div class="feature-disabled">
    <div class="feature-disabled-content">
      <div class="icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#6b7280"/>
        </svg>
      </div>
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button @click="goHome" class="btn-primary">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    default: 'Feature Temporarily Unavailable'
  },
  message: {
    type: String,
    default: 'This feature is currently being updated. Please check back later or contact support for assistance.'
  },
  buttonText: {
    type: String,
    default: 'Return to Home'
  }
});

const goHome = () => {
  router.push('/landing');
};
</script>

<style scoped>
.feature-disabled {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 40px 20px;
  text-align: center;
}

.feature-disabled-content {
  max-width: 500px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.icon {
  margin-bottom: 24px;
}

.feature-disabled-content h2 {
  color: #1f2937;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 16px 0;
}

.feature-disabled-content p {
  color: #6b7280;
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 24px 0;
}

.btn-primary {
  background: #0a4d8c;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background: #083d70;
}
</style>
