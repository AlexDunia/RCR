<template>
  <div class="checklist-container">
    <div class="checklist-header">
      <div class="tabs">
        <button class="tab active">My checklist</button>
        <button class="tab">Success Plan</button>
        <button class="tab">Done for you</button>
        <button class="tab">Social Platforms</button>
      </div>
      <div class="filters">
        <button class="filter active">All</button>
        <button class="filter">Drafts</button>
        <button class="filter">Completed</button>
      </div>
    </div>

    <div class="checklist-content">
      <div class="checklist-section">
        <div class="checklist-item" :class="{ 'completed': isCompleted('photos') }">
          <div class="item-header">
            <div class="item-icon">
              <span>P</span>
            </div>
            <div class="item-meta">
              <p class="creation-date">Creation date: {{ new Date().toLocaleString() }}</p>
              <h3 class="item-title">Property Preparation</h3>
            </div>
            <div class="item-status">
              <span class="progress" v-if="!isCompleted('photos')">Progress: 70% done</span>
              <span class="completed-status" v-if="isCompleted('photos')">Completed</span>
            </div>
            <div class="item-actions">
              <button class="action-btn edit-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20h9" stroke="#A1A1AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#A1A1AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="action-btn delete-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6h18" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 11v6" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 11v6" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="checklist-item" :class="{ 'completed': isCompleted('video') }">
          <div class="item-header">
            <div class="item-icon">
              <span>O</span>
            </div>
            <div class="item-meta">
              <p class="creation-date">Creation date: {{ new Date().toLocaleString() }}</p>
              <h3 class="item-title">Online Presence</h3>
            </div>
            <div class="item-status">
              <span class="progress" v-if="!isCompleted('video')">Progress: 70% done</span>
              <span class="completed-status" v-if="isCompleted('video')">Completed</span>
            </div>
            <div class="item-actions">
              <button class="action-btn edit-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20h9" stroke="#A1A1AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#A1A1AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="action-btn delete-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6h18" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 11v6" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 11v6" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="checklist-item" :class="{ 'completed': isCompleted('staging') }">
          <div class="item-header">
            <div class="item-icon">
              <span>I</span>
            </div>
            <div class="item-meta">
              <p class="creation-date">Creation date: {{ new Date().toLocaleString() }}</p>
              <h3 class="item-title">In-Person Marketing</h3>
            </div>
            <div class="item-status">
              <span class="progress" v-if="!isCompleted('staging')">Progress: 70% done</span>
              <span class="completed-status" v-if="isCompleted('staging')">Completed</span>
            </div>
            <div class="item-actions">
              <button class="action-btn edit-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20h9" stroke="#A1A1AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#A1A1AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="action-btn delete-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6h18" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 11v6" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 11v6" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const completedTasks = ref(new Set(['photos', 'video'])); // Some tasks pre-completed for demo

const isCompleted = (taskId) => {
  return completedTasks.value.has(taskId);
};

const toggleTask = (taskId) => {
  if (completedTasks.value.has(taskId)) {
    completedTasks.value.delete(taskId);
  } else {
    completedTasks.value.add(taskId);
  }
};
</script>

<style scoped>
.checklist-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  background: #F8FAFC;
}

.checklist-header {
  margin-bottom: 1rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tab {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tab.active {
  color: #2563EB;
  border-bottom: 2px solid #2563EB;
}

.tab:hover {
  color: #2563EB;
}

.filters {
  display: flex;
  gap: 0.5rem;
}

.filter {
  padding: 0.5rem 1rem;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter.active {
  background: #E0F2FE;
  border-color: #2563EB;
  color: #2563EB;
}

.filter:hover {
  background: #F3F4F6;
}

.checklist-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checklist-section {
  background: transparent;
}

.checklist-item {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.3s ease;
}

.checklist-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.checklist-item.completed {
  border-left: 4px solid #10B981;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-icon {
  width: 40px;
  height: 40px;
  background: #EF4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: #FFFFFF;
}

.item-meta {
  flex: 1;
}

.creation-date {
  font-size: 0.75rem;
  color: #6B7280;
  margin-bottom: 0.25rem;
}

.item-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.item-status {
  font-size: 0.875rem;
}

.progress {
  color: #10B981;
  font-weight: 500;
}

.completed-status {
  color: #10B981;
  font-weight: 500;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  background: #F3F4F6;
  border: none;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #E5E7EB;
}

.edit-btn svg {
  stroke: #A1A1AA;
}

.delete-btn svg {
  stroke: #EF4444;
}
</style>
