<template>
  <div class="plan-detail-container" v-if="plan">
    <div class="plan-header">
      <button class="back-button" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back to Home
      </button>
      <h1 class="plan-title">{{ plan.title }}</h1>
      <p class="plan-date">Created on {{ new Date(plan.creationDate).toLocaleString() }}</p>
    </div>

    <div class="plan-content">
      <div class="plan-section">
        <h2 class="section-title">Strategy Overview</h2>
        <p class="section-content">{{ plan.strategyOverview }}</p>
      </div>

      <div class="plan-section">
        <h2 class="section-title">Target Audience</h2>
        <ul class="target-list">
          <li v-for="(audience, index) in plan.targetAudiences" :key="index" class="target-item">
            <div class="target-icon">
              <svg v-if="audience.icon === 'user-group'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-if="audience.icon === 'briefcase'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M16 7V4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V7" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <div class="target-content">
              <h3 class="target-title">{{ audience.title }}</h3>
              <p class="target-description">{{ audience.description }}</p>
            </div>
          </li>
          <li class="target-item">
            <div class="target-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="target-content">
              <h3 class="target-title">Young Professionals</h3>
              <p class="target-description">Ages 28-40, household income $100k+, looking for their first or second home</p>
            </div>
          </li>
          <li class="target-item">
            <div class="target-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="target-content">
              <h3 class="target-title">Real Estate Investors</h3>
              <p class="target-description">Looking for rental properties or fix-and-flip opportunities in growing neighborhoods</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="plan-section">
        <h2 class="section-title">Marketing Channels</h2>
        <div class="channels-grid">
          <div v-for="(channel, index) in plan.channels" :key="index"
               class="channel-card" :class="{ 'highlighted': channel.highlight }">
            <div class="channel-icon">
              <svg v-if="channel.icon === 'instagram'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.33.04-4.61-1.04-5.94-2.95-1.32-1.91-1.85-4.38-1.48-6.65.38-2.27 1.76-4.27 3.71-5.49 1.95-1.22 4.34-1.58 6.61-.98v4.03c-.93-.38-1.92-.62-2.92-.71-1-.09-2.02.05-2.94.41-.92.36-1.72 1.02-2.27 1.81-.55.79-.85 1.74-.85 2.69 0 .95.3 1.9.85 2.69.55.79 1.35 1.45 2.27 1.81.92.36 1.94.5 2.94.41 1-.09 1.99-.33 2.92-.71 1.93-.76 3.37-2.49 3.88-4.48.51-1.99.41-4.07.31-6.11v-8.75z"/>
              </svg>
              <svg v-if="channel.icon === 'facebook'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <svg v-if="channel.icon === 'email'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <h3 class="channel-title">{{ channel.name }}</h3>
            <p class="channel-description">{{ channel.description }}</p>
          </div>
        </div>
      </div>

      <div class="plan-section">
        <h2 class="section-title">Timeline</h2>
        <div class="timeline">
          <div v-for="(milestone, index) in plan.timeline" :key="index" class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h3 class="timeline-title">{{ milestone.title }}</h3>
              <p class="timeline-description">{{ milestone.description }}</p>
              <p v-if="milestone.date" class="timeline-date">Due by: {{ new Date(milestone.date).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const plan = ref(null);

onMounted(() => {
  const planId = route.params.id;
  console.log('Loading plan with ID:', planId); // Debug log
  const storedPlans = JSON.parse(localStorage.getItem('marketingPlans') || '[]');
  console.log('Stored plans:', storedPlans); // Debug log
  plan.value = storedPlans[planId];

  if (!plan.value) {
    console.error('Plan not found');
    router.push('/marketing-tools');
  }
});

const goBack = () => {
  router.push('/marketing-tools');
};
</script>

<style scoped>
.plan-detail-container {
  padding: 0 2rem 2rem 2rem; /* Combined padding with top padding for the fixed navigation */
  max-width: 1000px;
  margin: 0 auto;
}

.plan-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 1.5rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #2563EB;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
}

.back-button:hover {
  color: #1D4ED8;
}

.plan-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #565656;
}

.plan-date {
  font-size: 0.875rem;
  color: #6B7280;
}

.plan-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.plan-section {
  background-color: #FFFFFF;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1E3A8A;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #E5E7EB;
}

.section-content {
  font-size: 1rem;
  color: #4B5563;
  line-height: 1.5;
}

.target-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.target-item {
  display: flex;
    align-items: center;
    gap: 1rem;
}

.target-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #EFF6FF;
  border-radius: 50%;
  color: #2563EB;
}

.target-content {
  flex: 1;
}

.target-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.target-description {
  font-size: 0.875rem;
  color: #6B7280;
  line-height: 1.4;
}

.channels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.channel-card {
  background-color: #FFFFFF;
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #E5E7EB;
  position: relative;
  overflow: hidden;
}

.channel-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, #2563EB, #3B82F6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.channel-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.channel-card:hover::before {
  opacity: 1;
}

.channel-card.highlighted {
  border-color: #2563EB;
  background-color: #F8FAFC;
}

.channel-card.highlighted::before {
  opacity: 1;
}

.icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.channel-icon {
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #2563EB;
  transition: transform 0.2s ease;
}

.channel-card:hover .channel-icon {
  transform: scale(1.1);
}

.channel-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.channel-description {
  font-size: 0.875rem;
  color: #6B7280;
  line-height: 1.4;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #E5E7EB;
}

.timeline-item {
  position: relative;
  margin-bottom: 1.5rem;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #2563EB;
  border: 3px solid #EFF6FF;
}

.timeline-content {
  padding-bottom: 1rem;
}

.timeline-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.timeline-description {
  font-size: 0.875rem;
  color: #6B7280;
  line-height: 1.4;
}

.timeline-date {
  font-size: 0.875rem;
  color: #6B7280;
  margin-top: 0.25rem;
}

/* Animation for page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
