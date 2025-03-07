<template>
  <div class="checklist-detail">
    <div v-if="checklist" class="detail-container">
      <div class="header">
        <h1>{{ checklist.title }}</h1>
        <div class="status-badge" :class="checklist.status.toLowerCase()">
          {{ checklist.status }}
        </div>
      </div>

      <div class="meta-info">
        <div class="info-item">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Created: {{ formatDate(checklist.creationDate) }}</span>
        </div>
        <div v-if="checklist.dueDate" class="info-item" :class="{ 'overdue': isOverdue }">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Due: {{ formatDate(checklist.dueDate) }}</span>
        </div>
      </div>

      <div class="description" v-if="checklist.description">
        <p>{{ checklist.description }}</p>
      </div>

      <div class="progress-section">
        <div class="progress-header">
          <h2>Progress</h2>
          <span class="progress-percentage">{{ calculateProgress }}% Complete</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: calculateProgress + '%' }"></div>
        </div>
      </div>

      <div class="items-section">
        <h2>Checklist Items</h2>
        <div class="items-list">
          <div
            v-for="(item, index) in checklist.items"
            :key="index"
            class="checklist-item"
            :class="{ 'completed': item.completed }"
          >
            <label class="checkbox-container">
              <input
                type="checkbox"
                v-model="item.completed"
                @change="updateItemStatus(index)"
              >
              <span class="checkmark"></span>
            </label>
            <span class="item-text">{{ item.text }}</span>
          </div>
        </div>
      </div>

      <div class="actions">
        <button @click="goBack" class="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Checklists
        </button>
        <button @click="editChecklist" class="edit-btn">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Checklist
        </button>
      </div>
    </div>

    <div v-else class="not-found">
      <svg xmlns="http://www.w3.org/2000/svg" class="not-found-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2>Checklist Not Found</h2>
      <p>The checklist you're looking for doesn't exist or has been deleted.</p>
      <button @click="goBack" class="back-btn">Return to Checklists</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const checklist = ref(null);

onMounted(() => {
  const checklists = JSON.parse(localStorage.getItem('checklists') || '[]');
  checklist.value = checklists.find(c => c.id === Number(route.params.id));
});

const calculateProgress = computed(() => {
  if (!checklist.value || !checklist.value.items.length) return 0;
  const completedItems = checklist.value.items.filter(item => item.completed).length;
  return Math.round((completedItems / checklist.value.items.length) * 100);
});

const isOverdue = computed(() => {
  if (!checklist.value?.dueDate) return false;
  return new Date(checklist.value.dueDate) < new Date();
});

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

const updateItemStatus = (index) => {
  const checklists = JSON.parse(localStorage.getItem('checklists') || '[]');
  const checklistIndex = checklists.findIndex(c => c.id === checklist.value.id);

  if (checklistIndex !== -1) {
    checklists[checklistIndex] = {
      ...checklist.value,
      progress: calculateProgress.value
    };
    localStorage.setItem('checklists', JSON.stringify(checklists));
  }
};

const goBack = () => {
  router.push('/marketing-tools/checklist');
};

const editChecklist = () => {
  router.push(`/marketing-tools/checklist/${checklist.value.id}/edit`);
};
</script>

<style scoped>
.checklist-detail {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.detail-container {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 1.875rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.status-badge.draft {
  background: #FEF3C7;
  color: #D97706;
}

.status-badge.completed {
  background: #D1FAE5;
  color: #059669;
}

.meta-info {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6B7280;
}

.info-item.overdue {
  color: #EF4444;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.description {
  color: #4B5563;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.progress-section {
  margin-bottom: 2rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.progress-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.progress-percentage {
  color: #059669;
  font-weight: 500;
}

.progress-bar {
  height: 0.5rem;
  background: #E5E7EB;
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #059669;
  transition: width 0.3s ease;
}

.items-section {
  margin-bottom: 2rem;
}

.items-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.checklist-item:hover {
  background: #F9FAFB;
}

.checklist-item.completed .item-text {
  text-decoration: line-through;
  color: #9CA3AF;
}

.checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  height: 1.5rem;
  width: 1.5rem;
  background-color: #fff;
  border: 2px solid #E5E7EB;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.checkbox-container:hover .checkmark {
  border-color: #2563EB;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #2563EB;
  border-color: #2563EB;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 0.5rem;
  top: 0.25rem;
  width: 0.25rem;
  height: 0.5rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.item-text {
  flex: 1;
  color: #111827;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin-top: 2rem;
}

.back-btn,
.edit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn {
  background: white;
  border: 1px solid #E5E7EB;
  color: #6B7280;
}

.back-btn:hover {
  background: #F3F4F6;
}

.edit-btn {
  background: #2563EB;
  border: none;
  color: white;
}

.edit-btn:hover {
  background: #1D4ED8;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.not-found-icon {
  width: 4rem;
  height: 4rem;
  color: #6B7280;
  margin-bottom: 1.5rem;
}

.not-found h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.not-found p {
  color: #6B7280;
  margin-bottom: 2rem;
}

@media (max-width: 640px) {
  .checklist-detail {
    padding: 1rem;
  }

  .detail-container {
    padding: 1.5rem;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .meta-info {
    flex-direction: column;
    gap: 1rem;
  }

  .actions {
    flex-direction: column;
  }

  .back-btn,
  .edit-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
