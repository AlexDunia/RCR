<template>
  <div class="training-module-card" @click="$emit('click')">
    <div class="card-header">
      <div class="module-icon" :style="{ backgroundColor: module.iconColor }">
        {{ module.icon }}
      </div>
      <div class="module-info">
        <h3 class="module-title">{{ module.title }}</h3>
        <p class="module-date">Creation date: {{ module.creationDate }}</p>
      </div>
    </div>
    <div class="card-actions">
      <button class="view-button" @click.stop="$emit('click')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        View schedule and modules
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  module: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.training-module-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  border: 1px solid #E2E8F0;
}

.training-module-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.module-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-right: 16px;
  flex-shrink: 0;
}

.module-info {
  flex: 1;
}

.module-title {
  font-size: 18px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 4px 0;
}

.module-date {
  font-size: 14px;
  color: #64748B;
  margin: 0;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
}

.view-button {
  display: flex;
  align-items: center;
  background-color: #F1F5F9;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #0F172A;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.view-button:hover {
  background-color: #E2E8F0;
}

.view-button svg {
  margin-right: 8px;
}
</style>
