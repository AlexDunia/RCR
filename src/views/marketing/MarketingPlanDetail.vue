<template>
  <div v-if="isLoading" class="loading-container">
    <div class="loading-spinner"></div>
    <p>Loading plan details...</p>
  </div>

  <div v-else-if="!plan" class="error-container">
    <div class="error-icon">❌</div>
    <h3>Plan Not Found</h3>
    <p>The marketing plan you're looking for could not be found.</p>
    <button class="back-button-primary" @click="goBack">Back to Plans</button>
  </div>

  <div class="plan-detail-container" v-else>
    <div class="plan-header">
      <button class="back-button" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back to Home
      </button>
      <h1 class="plan-title">{{ plan.title }}</h1>
      <div class="meta-info">
        <span class="date">Created: {{ formatDate(plan.creationDate) }}</span>

        <!-- Add creator badge if available -->
        <div v-if="plan.creator" class="creator-badge">
          <span class="creator-label">Created by:</span>
          <span class="creator-name">{{ plan.creator.name }}</span>
          <span class="creator-role" :class="plan.creator.role">{{ plan.creator.role }}</span>
        </div>

        <!-- Status badge -->
        <div class="status-badge" :class="plan.status ? plan.status.toLowerCase() : 'draft'">
          {{ plan.status || 'Draft' }}
        </div>
      </div>

      <!-- Assignment information -->
      <div v-if="plan.assignedAgents && plan.assignedAgents.length > 0" class="assignment-info">
        <span class="assigned-label">Assigned to:</span>
        <span class="assigned-agents">{{ plan.assignedAgents.join(', ') }}</span>
      </div>

      <!-- Associated checklist information if it exists -->
      <div v-if="associatedChecklist" class="checklist-info">
        <div class="checklist-badge">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>Converted to Checklist</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{width: `${associatedChecklist.progress}%`}"></div>
        </div>
        <div class="progress-text">
          <span>Progress: {{ associatedChecklist.progress }}%</span>
          <div class="checklist-actions">
            <button @click="viewChecklist" class="view-checklist-btn">View Checklist</button>
            <button v-if="isAdmin" @click="viewAdminChecklistOverview" class="admin-overview-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Admin Overview
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Agent action - convert to checklist -->
    <div v-if="isAgentAssigned && !associatedChecklist" class="agent-actions">
      <button @click="convertToChecklist" class="convert-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Convert to Checklist
      </button>
    </div>

    <div class="plan-content">
      <div class="plan-section">
        <h2 class="section-title">Strategy Overview</h2>
        <p class="section-content">{{ plan.strategyOverview }}</p>
      </div>

      <div class="plan-section" v-if="plan.targetAudiences && plan.targetAudiences.length > 0">
        <h2 class="section-title">Target Audience</h2>
        <ul class="target-list">
          <li v-for="(audience, index) in plan.targetAudiences" :key="index" class="target-item">
            <div class="target-icon">
              <svg v-if="audience.icon === 'user-group'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else-if="audience.icon === 'briefcase'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M16 7V4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V7" stroke="currentColor" stroke-width="2"/>
              </svg>
              <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="target-content">
              <h3 class="target-title">{{ audience.title }}</h3>
              <p class="target-description">{{ audience.description }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="plan-section" v-if="plan.channels && plan.channels.length > 0">
        <h2 class="section-title">Marketing Channels</h2>
        <div class="channels-grid">
          <div v-for="(channel, index) in plan.channels" :key="index"
               class="channel-card" :class="{ 'highlighted': channel.highlight }">
            <div class="channel-icon">
              <svg v-if="channel.icon === 'instagram'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.33.04-4.61-1.04-5.94-2.95-1.32-1.91-1.85-4.38-1.48-6.65.38-2.27 1.76-4.27 3.71-5.49 1.95-1.22 4.34-1.58 6.61-.98v4.03c-.93-.38-1.92-.62-2.92-.71-1-.09-2.02.05-2.94.41-.92.36-1.72 1.02-2.27 1.81-.55.79-.85 1.74-.85 2.69 0 .95.3 1.9.85 2.69.55.79 1.35 1.45 2.27 1.81.92.36 1.94.5 2.94.41 1-.09 1.99-.33 2.92-.71 1.93-.76 3.37-2.49 3.88-4.48.51-1.99.41-4.07.31-6.11v-8.75z"/>
              </svg>
              <svg v-else-if="channel.icon === 'facebook'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <svg v-else-if="channel.icon === 'email'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <svg v-else class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <h3 class="channel-title">{{ channel.name }}</h3>
            <p class="channel-description">{{ channel.description }}</p>
          </div>
        </div>
      </div>

      <div class="plan-section" v-if="plan.timeline && plan.timeline.length > 0">
        <h2 class="section-title">Timeline</h2>
        <div class="timeline">
          <div v-for="(milestone, index) in plan.timeline" :key="index" class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h3 class="timeline-title">{{ milestone.title }}</h3>
              <p class="timeline-description">{{ milestone.description }}</p>
              <p v-if="milestone.date" class="timeline-date">Due by: {{ formatDate(milestone.date, true) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Confirmation modal for converting to checklist -->
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h2>Convert to Checklist</h2>
      <p>Are you sure you want to convert this marketing plan to a checklist?</p>
      <p class="modal-note">This will create a new checklist you can track progress on.</p>
      <div class="modal-actions">
        <button @click="showModal = false" class="cancel-btn">Cancel</button>
        <button @click="confirmConvertToChecklist" class="confirm-btn">Convert</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMarketingStore } from '@/stores/marketingStore';
import { useRoleStore } from '@/stores/roleStore';

const router = useRouter();
const route = useRoute();
const marketingStore = useMarketingStore();
const roleStore = useRoleStore();
const plan = ref(null);
const isLoading = computed(() => marketingStore.isLoading);
const showModal = ref(false);
const associatedChecklist = ref(null);

// Check if current user is an assigned agent
const isAgentAssigned = computed(() => {
  if (!plan.value || !plan.value.assignedAgents) return false;

  // If the user is an agent, check if they're assigned to this plan
  if (roleStore.currentRole === 'agent') {
    return plan.value.assignedAgents.includes(roleStore.getCurrentUser().name);
  }

  return false;
});

// Add isAdmin computed property
const isAdmin = computed(() => roleStore.currentRole === 'admin');

onMounted(async () => {
  const planId = route.params.id;
  try {
    plan.value = await marketingStore.plans.getPlanById(planId);

    if (!plan.value) {
      console.error('Plan not found');
    } else {
      // Check if there's an associated checklist
      await findAssociatedChecklist();
    }
  } catch (error) {
    console.error('Error loading plan:', error);
  }
});

const findAssociatedChecklist = async () => {
  if (!plan.value) return;

  // Fetch checklists
  await marketingStore.checklists.fetchChecklists();

  // Find a checklist that was converted from this plan
  const checklist = marketingStore.checklists.marketingChecklists.find(c =>
    c.convertedFromPlan && c.convertedFromPlan.id === route.params.id
  );

  if (checklist) {
    associatedChecklist.value = checklist;
  }
};

const goBack = () => {
  router.push('/marketing-tools');
};

const convertToChecklist = () => {
  showModal.value = true;
};

const confirmConvertToChecklist = async () => {
  try {
    // Create a new checklist from the plan
    const newChecklist = {
      id: Date.now().toString(),
      title: `Checklist: ${plan.value.title}`,
      description: plan.value.strategyOverview,
      items: [],
      status: 'draft',
      progress: 0,
      creationDate: new Date().toISOString(),
      completed: false,
      convertedFromPlan: {
        id: route.params.id,
        title: plan.value.title
      }
    };

    // Add checklist items based on plan content
    if (plan.value.targetAudiences && plan.value.targetAudiences.length) {
      newChecklist.items.push({
        text: 'Review target audiences',
        completed: false
      });
    }

    if (plan.value.channels && plan.value.channels.length) {
      // Add an item for each channel
      plan.value.channels.forEach(channel => {
        newChecklist.items.push({
          text: `Set up ${channel.name}`,
          completed: false
        });
      });
    }

    if (plan.value.timeline && plan.value.timeline.length) {
      // Add an item for each timeline milestone
      plan.value.timeline.forEach(milestone => {
        newChecklist.items.push({
          text: milestone.title,
          completed: false
        });
      });
    }

    // Add a completion item
    newChecklist.items.push({
      text: 'Mark plan as complete',
      completed: false
    });

    // Save the checklist
    await marketingStore.checklists.saveChecklist(newChecklist);

    // Update the plan's status to "Active"
    const plans = marketingStore.plans.marketingPlans;
    const planIndex = plans.findIndex(p =>
      p.title === plan.value.title && p.creationDate === plan.value.creationDate
    );

    if (planIndex !== -1) {
      plans[planIndex].status = 'Active';
      localStorage.setItem('marketingPlans', JSON.stringify(plans));
    }

    // Update UI
    associatedChecklist.value = newChecklist;
    showModal.value = false;

    // Show success notification (you can replace this with your preferred notification method)
    alert('Plan converted to checklist successfully!');
  } catch (error) {
    console.error('Error converting plan to checklist:', error);
    alert('Failed to convert plan to checklist. Please try again.');
  }
};

const viewChecklist = () => {
  if (associatedChecklist.value) {
    router.push(`/marketing-tools/checklist/${associatedChecklist.value.id}`);
  }
};

// Add a method to navigate to admin checklist overview
const viewAdminChecklistOverview = () => {
  router.push('/marketing-tools/admin-checklists');
};

// Format date to a more readable format
const formatDate = (dateString, dateOnly = false) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  if (dateOnly) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1rem;
  margin: 2rem auto;
  max-width: 600px;
  background: #fef2f2;
  border-radius: 0.5rem;
  border: 1px solid #fee2e2;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #dc2626;
}

.error-container h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #b91c1c;
  margin-bottom: 0.5rem;
}

.error-container p {
  color: #ef4444;
  margin-bottom: 1.5rem;
}

.back-button-primary {
  padding: 0.625rem 1.25rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-button-primary:hover {
  background-color: #1d4ed8;
}

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
  top: 0;
  bottom: 0;
  left: 0.5rem;
  width: 2px;
  background-color: #E5E7EB;
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  position: absolute;
  top: 0;
  left: -2rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #2563EB;
  border: 3px solid #DBEAFE;
  z-index: 1;
}

.timeline-content {
  padding-left: 0.5rem;
  border-left: none;
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
  margin-bottom: 0.5rem;
}

.timeline-date {
  font-size: 0.75rem;
  color: #2563EB;
  font-weight: 500;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.date {
  font-size: 0.875rem;
  color: #6B7280;
}

.creator-badge {
  display: inline-flex;
  align-items: center;
  background-color: #f3f4f6;
  padding: 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  margin-left: 1rem;
}

.creator-label {
  color: #6b7280;
  margin-right: 0.5rem;
}

.creator-name {
  font-weight: 500;
  margin-right: 0.5rem;
}

.creator-role {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.creator-role.admin {
  background-color: #374151;
  color: white;
}

.creator-role.agent {
  background-color: #2563eb;
  color: white;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 1rem;
  text-transform: capitalize;
}

.status-badge.draft {
  background: #EFF6FF;
  color: #2563EB;
}

.status-badge.active {
  background: #ECFDF5;
  color: #059669;
}

.status-badge.completed {
  background: #F9FAFB;
  color: #4B5563;
}

.assignment-info {
  margin-top: 0.75rem;
  font-size: 0.875rem;
}

.assigned-label {
  color: #6B7280;
  margin-right: 0.5rem;
}

.assigned-agents {
  font-weight: 500;
  color: #111827;
  background-color: #F3F4F6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

.agent-actions {
  margin-bottom: 1.5rem;
}

.convert-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: #2563EB;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.convert-btn:hover {
  background-color: #1D4ED8;
}

.checklist-info {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #F3F4F6;
  border-radius: 0.5rem;
}

.checklist-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 0.5rem;
}

.progress-bar-container {
  height: 0.5rem;
  background-color: #E5E7EB;
  border-radius: 0.25rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-bar {
  height: 100%;
  background-color: #2563EB;
  transition: width 0.3s ease;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #4B5563;
}

.view-checklist-btn {
  background: none;
  border: none;
  color: #2563EB;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  max-width: 500px;
  width: 100%;
}

.modal-content h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.modal-content p {
  color: #4B5563;
  margin-bottom: 1rem;
}

.modal-note {
  font-size: 0.875rem;
  color: #6B7280;
  font-style: italic;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-btn {
  padding: 0.5rem 1rem;
  background-color: #F3F4F6;
  color: #4B5563;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
}

.confirm-btn {
  padding: 0.5rem 1rem;
  background-color: #2563EB;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
}

.checklist-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.admin-overview-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  background-color: #ede9fe;
  color: #6d28d9;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.admin-overview-btn:hover {
  background-color: #ddd6fe;
}
</style>
