<template>
  <div class="unauthorized-page">
    <div class="unauthorized-container">
      <div class="icon-container">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15H12.01M12 12V9M4.98207 19H19.0179C20.5615 19 21.5233 17.3256 20.7455 16L13.7455 4C12.9578 2.66962 11.0422 2.66963 10.2545 4L3.25454 16C2.47675 17.3256 3.43849 19 4.98207 19Z" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h1 class="title">Unauthorized Access</h1>
      <p class="message">You don't have permission to view this page. This area is restricted to admin users only.</p>
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
.unauthorized-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 20px;
}

.unauthorized-container {
  background-color: white;
  border-radius: 12px;
  padding: 40px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
}

.icon-container {
  margin-bottom: 24px;
  color: #EF4444;
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
