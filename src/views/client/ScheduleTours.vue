<template>
  <div class="schedule-tours">
    <div class="page-header">
      <h1>Schedule Property Tours</h1>
      <p class="subtitle">Book in-person or virtual tours with our agents</p>
    </div>

    <div class="agent-contact-message">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <h2>Contact Your Agent</h2>
      <p>Property tours can only be scheduled by contacting your agent directly.</p>
      <p>You can use the messaging feature to reach out to your agent and request a viewing time.</p>
      <button class="contact-button" @click="goToMessages">Message Your Agent</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToMessages = () => {
  router.push('/client-messages');
};
</script>

<style scoped>
.schedule-tours {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 28px;
  margin: 0;
  color: #333;
}

.subtitle {
  color: #666;
  margin: 8px 0 0 0;
  font-size: 16px;
}

.agent-contact-message {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.agent-contact-message svg {
  color: #1a4189;
  margin-bottom: 16px;
}

.agent-contact-message h2 {
  margin: 0 0 16px 0;
  color: #1a4189;
  font-size: 24px;
}

.agent-contact-message p {
  margin: 8px 0;
  color: #666;
  font-size: 16px;
  line-height: 1.5;
  max-width: 600px;
}

.contact-button {
  margin-top: 24px;
  background-color: #1a4189;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.contact-button:hover {
  background-color: #133267;
}
</style>
