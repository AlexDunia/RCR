<script setup>
defineProps({
  client: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="client-card">
    <div class="client-avatar">
      <img :src="client.avatar" :alt="client.name">
      <div class="client-status" :class="client.status.toLowerCase()"></div>
    </div>
    <div class="client-content">
      <h3 class="client-name">{{ client.name }}</h3>
      <p class="client-type">{{ client.type }}</p>
      <div class="client-details">
        <span><i class="fas fa-phone"></i> {{ client.phone }}</span>
        <span><i class="fas fa-envelope"></i> {{ client.email }}</span>
      </div>
      <div class="client-actions">
        <button class="action-btn message">
          <i class="fas fa-comment"></i> Message
        </button>
        <button class="action-btn view">
          <i class="fas fa-eye"></i> View
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.client-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.client-avatar {
  position: relative;
  width: 80px;
  height: 80px;
}

.client-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.client-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.client-status.active {
  background: #4CAF50;
}

.client-status.busy {
  background: #F44336;
}

.client-status.away {
  background: #FFC107;
}

.client-content {
  flex: 1;
}

.client-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
}

.client-type {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
}

.client-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.client-details span {
  display: flex;
  align-items: center;
  gap: 8px;
}

.client-details i {
  font-size: 16px;
  color: #999;
  width: 16px;
}

.client-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;
}

.action-btn.message {
  background: #2196F3;
  color: white;
}

.action-btn.message:hover {
  background: #1976D2;
}

.action-btn.view {
  background: #E3F2FD;
  color: #2196F3;
}

.action-btn.view:hover {
  background: #BBDEFB;
}

.action-btn i {
  font-size: 16px;
}
</style> 