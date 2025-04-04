<template>
  <div class="not-found-page">
    <div class="not-found-container">
      <div class="icon-container">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m-2-8a2 2 0 100-4 2 2 0 000 4zm0 0v3m6 6a6 6 0 11-12 0 6 6 0 0112 0z" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h1 class="title">404 - Page Not Found</h1>
      <p class="message">The page you are looking for doesn't exist or has been moved.</p>
      <div class="actions">
        <button class="back-button" @click="goBack">Go Back</button>
        <button class="home-button" @click="goHome">Go to Home</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 20px;
}

.not-found-container {
  background-color: white;
  border-radius: 12px;
  padding: 40px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
}

.icon-container {
  margin-bottom: 24px;
  color: #4B5563;
  display: flex;
  justify-content: center;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px;
}

.message {
  color: #6B7280;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 32px;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.back-button, .home-button {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.back-button {
  background-color: #F3F4F6;
  color: #4B5563;
  border: 1px solid #E5E7EB;
}

.back-button:hover {
  background-color: #E5E7EB;
}

.home-button {
  background-color: #2563EB;
  color: white;
  border: none;
}

.home-button:hover {
  background-color: #1D4ED8;
  transform: translateY(-1px);
}
</style>
