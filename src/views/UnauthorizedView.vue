<template>
  <div class="unauthorized-page">
    <div class="content">
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h1>Access Denied</h1>
      <p>You don't have permission to access this page.</p>
      <div class="actions">
        <button @click="goBack" class="btn-secondary">Go Back</button>
        <router-link to="/" class="btn-primary">Go to Dashboard</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const goBack = () => {
  if (route.query.redirect) {
    // If we have a specific redirect origin, go to the previous valid page
    router.push('/');
  } else {
    // Otherwise just go back in history
    router.go(-1);
  }
};
</script>

<style scoped>
.unauthorized-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  background-color: #f9fafb;
}

.content {
  max-width: 500px;
  text-align: center;
  background-color: #fff;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  color: #ef4444;
}

h1 {
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

p {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  text-decoration: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-secondary {
  background-color: white;
  color: #1f2937;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}
</style>
