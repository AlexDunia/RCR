<template>
  <div class="checklist-container">
    <div class="header">
      <h1>Marketing Checklists</h1>
      <button class="create-btn" @click="createNewChecklist">
        <span class="icon">+</span>
        New Checklist
      </button>
    </div>

    <div class="filters">
      <div class="filter-tabs">
        <button
          v-for="filter in filters"
          :key="filter.value"
          :class="['filter-tab', { active: currentFilter === filter.value }]"
          @click="currentFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <div v-if="filteredChecklists.length" class="checklist-grid">
      <div
        v-for="checklist in filteredChecklists"
        :key="checklist.id"
        class="checklist-card"
        :class="{ 'is-overdue': isOverdue(checklist) }"
      >
        <div class="card-header">
          <div class="title-section">
            <h3>{{ checklist.title }}</h3>
            <span class="date">Created: {{ formatDate(checklist.creationDate) }}</span>
          </div>
          <div class="actions">
            <button class="icon-btn edit" @click.stop="editChecklist(checklist.id)" title="Edit checklist">
              <span class="material-icons">edit</span>
            </button>
            <button class="icon-btn delete" @click.stop="deleteChecklist(checklist.id)" title="Delete checklist">
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>

        <div class="card-content" @click="viewChecklist(checklist.id)">
          <p class="description">{{ truncateDescription(checklist.description) }}</p>

          <div class="progress-section">
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: calculateProgress(checklist) + '%' }"
              ></div>
            </div>
            <span class="progress-text">{{ calculateProgress(checklist) }}% Complete</span>
          </div>

          <div class="status-badges">
            <span
              class="status-badge"
              :class="checklist.status"
            >
              {{ checklist.status }}
            </span>
            <span
              v-if="isOverdue(checklist)"
              class="status-badge overdue"
            >
              Overdue
            </span>
          </div>

          <div class="items-preview">
            <span class="items-count">
              {{ checklist.items?.length || 0 }} items
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-content">
        <span class="material-icons">checklist</span>
        <p>{{ getEmptyStateMessage() }}</p>
        <button v-if="currentFilter === 'all'" class="create-btn" @click="createNewChecklist">
          Create Your First Checklist
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onActivated, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const checklists = ref([]);
const currentFilter = ref('all');

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Drafts', value: 'draft' },
  { label: 'Completed', value: 'completed' }
];

onMounted(() => {
  loadChecklists();
  window.addEventListener('storage', handleStorageChange);
});

onActivated(() => {
  loadChecklists();
});

const handleStorageChange = (e) => {
  if (e.key === 'checklists') {
    loadChecklists();
  }
};

const loadChecklists = () => {
  try {
    const storedChecklists = localStorage.getItem('checklists');
    if (storedChecklists) {
      checklists.value = JSON.parse(storedChecklists);
      console.log('Loaded checklists:', checklists.value);
    } else {
      checklists.value = [];
      console.log('No checklists found in localStorage');
    }
  } catch (error) {
    console.error('Error loading checklists:', error);
    checklists.value = [];
  }
};

watch(checklists, (newChecklists) => {
  console.log('Checklists updated:', newChecklists);
}, { deep: true });

const filteredChecklists = computed(() => {
  if (currentFilter.value === 'all') {
    return checklists.value;
  }
  return checklists.value.filter(checklist => checklist.status === currentFilter.value);
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const calculateProgress = (checklist) => {
  if (!checklist.items?.length) return 0;
  const completedItems = checklist.items.filter(item => item.completed).length;
  return Math.round((completedItems / checklist.items.length) * 100);
};

const isOverdue = (checklist) => {
  if (!checklist.dueDate) return false;
  return new Date(checklist.dueDate) < new Date();
};

const truncateDescription = (description, length = 100) => {
  if (!description) return '';
  if (description.length <= length) return description;
  return description.substring(0, length) + '...';
};

const createNewChecklist = () => {
  router.push('/marketing-tools/checklist/create');
};

const viewChecklist = (id) => {
  router.push(`/marketing-tools/checklist/${id}`);
};

const editChecklist = (id) => {
  router.push(`/marketing-tools/checklist/${id}/edit`);
};

const deleteChecklist = async (id) => {
  if (await confirm('Are you sure you want to delete this checklist? This action cannot be undone.')) {
    try {
      const updatedChecklists = checklists.value.filter(c => c.id !== id);
      localStorage.setItem('checklists', JSON.stringify(updatedChecklists));
      loadChecklists();
      console.log('Checklist deleted:', id);
    } catch (error) {
      console.error('Error deleting checklist:', error);
    }
  }
};

const getEmptyStateMessage = () => {
  if (currentFilter.value === 'all') {
    return "You haven't created any checklists yet.";
  }
  return `No ${currentFilter.value} checklists found.`;
};
</script>

<style scoped>
.checklist-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
}

.create-btn .icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.filters {
  margin-bottom: 2rem;
}

.filter-tabs {
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
}

.filter-tab {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  position: relative;
  transition: color 0.3s;
}

.filter-tab.active {
  color: #4CAF50;
}

.filter-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 0;
  width: 100%;
  height: 2px;
  background: #4CAF50;
}

.checklist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.checklist-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
}

.checklist-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title-section {
  flex: 1;
}

.title-section h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.date {
  font-size: 0.8rem;
  color: #666;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.icon-btn:hover {
  background-color: #f5f5f5;
}

.icon-btn.edit {
  color: #2196F3;
}

.icon-btn.delete {
  color: #f44336;
}

.card-content {
  padding: 1rem;
  cursor: pointer;
}

.description {
  color: #666;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.progress-section {
  margin: 1rem 0;
}

.progress-bar {
  height: 6px;
  background: #eee;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50 0%, #45a049 100%);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
  display: block;
}

.status-badges {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.draft {
  background: #e3f2fd;
  color: #1976d2;
}

.status-badge.completed {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge.overdue {
  background: #ffebee;
  color: #c62828;
}

.items-preview {
  font-size: 0.9rem;
  color: #666;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: #f9f9f9;
  border-radius: 12px;
}

.empty-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-content .material-icons {
  font-size: 4rem;
  color: #ccc;
  margin-bottom: 1rem;
}

.empty-content p {
  color: #666;
  margin-bottom: 2rem;
}

.is-overdue {
  border: 1px solid #ffcdd2;
}

@media (max-width: 768px) {
  .checklist-container {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .checklist-grid {
    grid-template-columns: 1fr;
  }
}
</style>
