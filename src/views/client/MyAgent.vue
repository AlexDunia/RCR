<script setup>
import { computed } from 'vue';
import { useClientStore } from '@/stores/clientStore';
import { useAgentStore } from '@/stores/agentStore';

const clientStore = useClientStore();
const agentStore = useAgentStore();

// Mock client ID
const clientId = 1;

// Get client details
const clientDetails = computed(() => {
  return clientStore.getClientFullDetails(clientId);
});

// Get connected agents (for now, just get the first agent)
const connectedAgents = computed(() => {
  const agents = clientDetails.value?.interactions?.connectedAgents || [];
  return agents.map(agentId => agentStore.getAgentById(agentId)).filter(Boolean);
});

// Primary agent
const primaryAgent = computed(() => {
  return connectedAgents.value[0] || null;
});
</script>

<template>
  <div class="my-agent">
    <div class="page-header">
      <h1>My Agent</h1>
      <p class="subtitle">Connect with your dedicated real estate agent</p>
    </div>

    <div class="agent-container" v-if="primaryAgent">
      <div class="agent-card">
        <div class="agent-photo">
          <img :src="primaryAgent.profilePicture" alt="Agent Photo">
        </div>
        <div class="agent-info">
          <h2>{{ primaryAgent.name }}</h2>
          <p class="agent-title">Real Estate Agent</p>
          <p class="agent-bio">{{ primaryAgent.bio }}</p>

          <div class="agent-details">
            <div class="detail-item">
              <span class="label">Email:</span>
              <span class="value">{{ primaryAgent.email }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Phone:</span>
              <span class="value">{{ primaryAgent.phone || '(555) 123-4567' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Location:</span>
              <span class="value">{{ primaryAgent.location }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Specialty:</span>
              <span class="value">{{ primaryAgent.specialty }}</span>
            </div>
          </div>

          <div class="agent-actions">
            <button class="action-button">Message</button>
            <button class="action-button secondary">Schedule Call</button>
          </div>
        </div>
      </div>
    </div>

    <div class="empty-state" v-else>
      <h3>No assigned agent</h3>
      <p>You don't have a dedicated agent assigned yet</p>
      <button class="primary-button">Find an Agent</button>
    </div>
  </div>
</template>

<style scoped>
.my-agent {
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

.agent-card {
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.agent-photo {
  width: 300px;
  height: 300px;
  overflow: hidden;
  background: #f0f0f0;
}

.agent-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.agent-info {
  flex: 1;
  padding: 30px;
}

.agent-info h2 {
  font-size: 24px;
  margin: 0;
  color: #333;
}

.agent-title {
  font-size: 16px;
  color: #006064;
  margin: 4px 0 16px 0;
  font-weight: 500;
}

.agent-bio {
  font-size: 16px;
  color: #555;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.agent-details {
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  margin-bottom: 10px;
}

.label {
  font-weight: 500;
  color: #666;
  width: 100px;
}

.value {
  color: #333;
  flex: 1;
}

.agent-actions {
  display: flex;
  gap: 12px;
}

.action-button {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;
}

.action-button:first-child {
  background: #006064;
  color: white;
}

.action-button:first-child:hover {
  background: #00796b;
}

.action-button.secondary {
  background: #f0f0f0;
  color: #333;
}

.action-button.secondary:hover {
  background: #e0e0e0;
}

.empty-state {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.empty-state h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}

.empty-state p {
  margin: 0 0 20px 0;
  color: #666;
}

.primary-button {
  display: inline-block;
  background: #006064;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.primary-button:hover {
  background: #00796b;
}

@media (max-width: 768px) {
  .agent-card {
    flex-direction: column;
  }

  .agent-photo {
    width: 100%;
    height: 250px;
  }
}
</style>
