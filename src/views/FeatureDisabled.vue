<template>
  <div class="feature-disabled-page">
    <div class="container">
      <div class="error-content">
        <div class="icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#6b7280"/>
          </svg>
        </div>
        <h1>Feature Temporarily Unavailable</h1>
        <p>The feature you're trying to access is currently being updated. Please check back later or contact support for assistance.</p>
        <button @click="goHome" class="btn-primary">Return to Home</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/landing');
};
</script>

<style scoped>
.feature-disabled-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  padding: 20px;
}

.container {
  max-width: 600px;
  width: 100%;
}

.error-content {
  background: white;
  padding: 60px 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  text-align: center;
}

.icon {
  margin-bottom: 32px;
}

h1 {
  color: #1f2937;
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 16px 0;
  line-height: 1.2;
}

p {
  color: #6b7280;
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 32px 0;
}

.btn-primary {
  background: #0a4d8c;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #083d70;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(10, 77, 140, 0.3);
}
</style>
