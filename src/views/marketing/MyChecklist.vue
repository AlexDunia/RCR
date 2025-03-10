<template>
  <div class="checklist-container">
    <div class="marketing-tools-header">
      <h1 class="marketing-tools-title">My Checklist</h1>
      <p class="marketing-tools-subtitle">Organize and manage your tasks efficiently with customizable checklists.</p>
    </div>

    <div class="marketing-tabs">
      <button
        v-for="(info, key) in tabInfo"
        :key="key"
        :class="['marketing-tab', { active: currentTab === key }]"
        @click="handleTabChange(key)"
      >
        {{ info.title }}
      </button>
    </div>

    <!-- Add New Checklist Button -->
    <button class="add-checklist-btn" @click="createNewChecklist" aria-label="Create new checklist">
      <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Add new checklist
    </button>

    <!-- Filter and Search Section -->
    <div class="filters-section">
      <div class="search-bar">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search checklists..."
          aria-label="Search checklists"
        >
      </div>

      <div class="filter-tabs" role="tablist">
        <button
          v-for="tab in filterTabs"
          :key="tab.value"
          class="filter-tab"
          :class="{ active: currentFilter === tab.value }"
          @click="currentFilter = tab.value"
          :aria-selected="currentFilter === tab.value"
          role="tab"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="sort-dropdown">
        <select v-model="sortBy" aria-label="Sort checklists">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="progress">Progress (Low to High)</option>
        </select>
      </div>
    </div>

    <!-- Bulk Actions -->
    <div class="bulk-actions" v-if="selectedChecklists.length > 0">
      <span>{{ selectedChecklists.length }} selected</span>
      <button class="bulk-action-btn" @click="markSelectedAsCompleted">
        <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Mark as Completed
      </button>
      <button class="bulk-action-btn delete" @click="deleteSelected">
        <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete Selected
      </button>
    </div>

    <!-- Checklist Cards -->
    <div class="checklist-cards" v-if="filteredChecklists.length > 0">
      <div
        v-for="checklist in filteredChecklists"
        :key="checklist.id"
        class="checklist-card"
        :class="{ 'is-selected': selectedChecklists.includes(checklist.id) }"
        @click="viewChecklist(checklist.id)"
      >
        <div class="card-checkbox">
          <input
            type="checkbox"
            :checked="selectedChecklists.includes(checklist.id)"
            @click.stop="toggleSelection(checklist.id)"
            :aria-label="'Select ' + checklist.title"
          >
        </div>

        <div class="card-emoji">
          <svg class="emoji-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>
          </svg>
        </div>

        <div class="card-content">
          <h3>{{ checklist.title }}</h3>
          <p class="creation-date">Creation date: {{ formatDate(checklist.creationDate) }}</p>

          <div class="progress-section">
            <div v-if="!checklist.completed" class="progress-info">
              <span class="progress-text">Progress: {{ checklist.progress }}% done</span>
              <span v-if="checklist.status === 'draft'" class="draft-badge">Draft</span>
              <span v-if="isOverdue(checklist)" class="overdue-badge" :title="'Overdue by ' + getDaysOverdue(checklist) + ' days'">
                <svg class="overdue-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke-width="2"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2"/>
                </svg>
                Overdue
              </span>
            </div>
            <div v-else class="completed-badge">
              <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Completed
            </div>
            <div class="progress-bar" v-if="!checklist.completed">
              <div class="progress-fill" :style="{ width: checklist.progress + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="card-actions">
          <button
            class="action-btn edit"
            @click.stop="editChecklist(checklist.id)"
            aria-label="Edit checklist"
          >
            <svg class="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          <button
            class="action-btn delete"
            @click.stop="deleteChecklist(checklist.id)"
            aria-label="Delete checklist"
          >
            <svg class="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v8m-4-4h8"/>
      </svg>
      <p>No checklists found for this filter</p>
      <button class="add-checklist-btn" @click="createNewChecklist">Create your first checklist</button>
    </div>

    <ConfirmationModal
      v-model="showModal"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :type="modalConfig.type"
      :confirm-text="modalConfig.confirmText"
      @confirm="modalConfig.onConfirm"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

const router = useRouter();
const currentTab = ref('checklist');

const tabInfo = {
  success: {
    title: 'Success Plan',
    subtitle: 'Create and track your success milestones with our comprehensive planning tools.'
  },
  checklist: {
    title: 'My Checklist',
    subtitle: 'Organize and manage your tasks efficiently with customizable checklists.'
  },
  done: {
    title: 'Done for You',
    subtitle: 'Access our pre-made templates and automated solutions for quick implementation.'
  },
  social: {
    title: 'Social Platforms',
    subtitle: 'Link your social media accounts to reach a wider audience.'
  }
};

const currentTabInfo = computed(() => {
  const info = tabInfo[currentTab.value] || tabInfo.checklist;
  console.log('Current tab info:', info); // Debug log
  return info;
});

// State
const searchQuery = ref('');
const currentFilter = ref('all');
const sortBy = ref('newest');
const selectedChecklists = ref([]);
const checklists = ref([]);
const showModal = ref(false);
const modalConfig = ref({
  title: '',
  message: '',
  type: 'default',
  confirmText: 'Confirm',
  onConfirm: () => {}
});

// Filter tabs
const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'Drafts', value: 'drafts' },
  { label: 'Completed', value: 'completed' }
];

// Load checklists from localStorage
const loadChecklists = () => {
  try {
    const storedChecklists = localStorage.getItem('checklists');
    if (storedChecklists) {
      checklists.value = JSON.parse(storedChecklists);
      console.log('Loaded checklists:', checklists.value);
    }
  } catch (error) {
    console.error('Error loading checklists:', error);
    checklists.value = [];
  }
};

onMounted(() => {
  loadChecklists();
});

// Computed
const sortedChecklists = computed(() => {
  const allChecklists = [...checklists.value];

  // Sort by date (newest first) and then by completion status
  return allChecklists.sort((a, b) => {
    // First sort by lastModified date (newest first)
    const dateA = new Date(a.lastModified || a.creationDate);
    const dateB = new Date(b.lastModified || b.creationDate);

    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;

    // If dates are equal, sort completed items after non-completed
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;

    return 0;
  });
});

const filteredChecklists = computed(() => {
  let filtered = [...sortedChecklists.value];

  // Apply search filter
  if (searchQuery.value) {
    filtered = filtered.filter(checklist =>
      checklist.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Apply status filter
  if (currentFilter.value === 'drafts') {
    filtered = filtered.filter(checklist => checklist.status === 'draft');
  } else if (currentFilter.value === 'completed') {
    filtered = filtered.filter(checklist => checklist.status === 'completed');
  }

  // Sort based on status and date
  filtered.sort((a, b) => {
    // If sorting by newest/oldest
    if (sortBy.value === 'newest' || sortBy.value === 'oldest') {
      // First, separate completed and non-completed items
      if (a.status === 'completed' && b.status !== 'completed') return 1;
      if (a.status !== 'completed' && b.status === 'completed') return -1;

      // Then sort by date within each group
      const dateComparison = sortBy.value === 'newest'
        ? new Date(b.creationDate) - new Date(a.creationDate)
        : new Date(a.creationDate) - new Date(b.creationDate);

      return dateComparison;
    }
    // If sorting by progress
    else if (sortBy.value === 'progress') {
      return a.progress - b.progress;
    }
    return 0;
  });

  return filtered;
});

// Methods
const formatDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const isOverdue = (checklist) => {
  if (!checklist.dueDate) return false;
  return new Date(checklist.dueDate) < new Date();
};

const getDaysOverdue = (checklist) => {
  if (!checklist.dueDate) return 0;
  const diff = new Date() - new Date(checklist.dueDate);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const createNewChecklist = () => {
  router.push('/RCR/marketing-tools/checklist/create');
};

const viewChecklist = (id) => {
  router.push(`/RCR/marketing-tools/checklist/${id}`);
};

const editChecklist = (id) => {
  router.push(`/RCR/marketing-tools/checklist/${id}/edit`);
};

const deleteChecklist = (id) => {
  showModal.value = true;
  modalConfig.value = {
    title: 'Delete Checklist',
    message: 'Are you sure you want to delete this checklist? This action cannot be undone.',
    type: 'delete',
    confirmText: 'Delete',
    onConfirm: async () => {
      try {
        const updatedChecklists = checklists.value.filter(c => c.id !== id);
        localStorage.setItem('checklists', JSON.stringify(updatedChecklists));
        loadChecklists();
        selectedChecklists.value = selectedChecklists.value.filter(selectedId => selectedId !== id);
      } catch (error) {
        console.error('Error deleting checklist:', error);
      }
    }
  };
};

const toggleSelection = (id) => {
  const index = selectedChecklists.value.indexOf(id);
  if (index === -1) {
    selectedChecklists.value.push(id);
  } else {
    selectedChecklists.value.splice(index, 1);
  }
};

const markSelectedAsCompleted = async () => {
  try {
    const updatedChecklists = checklists.value.map(checklist => {
      if (selectedChecklists.value.includes(checklist.id)) {
        return {
          ...checklist,
          status: 'completed',
          progress: 100,
          items: checklist.items.map(item => ({ ...item, completed: true }))
        };
      }
      return checklist;
    });

    localStorage.setItem('checklists', JSON.stringify(updatedChecklists));
    loadChecklists();
    selectedChecklists.value = [];
  } catch (error) {
    console.error('Error marking checklists as completed:', error);
  }
};

const deleteSelected = () => {
  showModal.value = true;
  modalConfig.value = {
    title: 'Delete Selected',
    message: `Are you sure you want to delete ${selectedChecklists.value.length} selected checklist(s)? This action cannot be undone.`,
    type: 'delete',
    confirmText: 'Delete',
    onConfirm: async () => {
      try {
        const updatedChecklists = checklists.value.filter(
          checklist => !selectedChecklists.value.includes(checklist.id)
        );
        localStorage.setItem('checklists', JSON.stringify(updatedChecklists));
        loadChecklists();
        selectedChecklists.value = [];
      } catch (error) {
        console.error('Error deleting selected checklists:', error);
      }
    }
  };
};

const handleTabChange = (key) => {
  currentTab.value = key;
  switch (key) {
    case 'success':
      router.push('/RCR/marketing-tools/success-plan');
      break;
    case 'checklist':
      router.push('/RCR/marketing-tools/checklist');
      break;
    case 'done':
      router.push('/RCR/marketing-tools/done-for-you');
      break;
    case 'social':
      router.push('/RCR/marketing-tools/social-platforms');
      break;
  }
};
</script>

<style scoped>
.checklist-container {
  padding: 80px 2rem 2rem 2rem; /* Combined padding with top padding for the fixed navigation */
}

/* Add New Checklist Button */
.add-checklist-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #2563EB;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-checklist-btn:hover {
  background: #1D4ED8;
  transform: translateY(-1px);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Filters Section */
.filters-section {
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-bar {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #6B7280;
}

.search-bar input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
}

.filter-tab {
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  background: white;
  color: #6B7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tab:hover {
  background: #F3F4F6;
}

.filter-tab.active {
  background: #EFF6FF;
  color: #2563EB;
  border-color: #2563EB;
}

.sort-dropdown select {
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  background: white;
  color: #6B7280;
  font-size: 0.875rem;
  cursor: pointer;
}

/* Bulk Actions */
.bulk-actions {
  margin: 1rem 0;
  padding: 1rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bulk-action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  background: white;
  color: #6B7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bulk-action-btn:hover {
  background: #F3F4F6;
}

.bulk-action-btn.delete {
  color: #EF4444;
  border-color: #EF4444;
}

.bulk-action-btn.delete:hover {
  background: #FEE2E2;
}

/* Checklist Cards */
.checklist-cards {
  display: grid;
  gap: 1rem;
}

.checklist-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.checklist-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.checklist-card.is-selected {
  border-color: #2563EB;
  background: #F8FAFC;
}

.card-checkbox {
  display: flex;
  align-items: center;
}

.card-emoji {
  width: 3rem;
  height: 3rem;
  background: #FEE2E2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #EF4444;
}

.card-content {
  flex: 1;
}

.card-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.creation-date {
  font-size: 0.875rem;
  color: #6B7280;
  margin-bottom: 1rem;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-text {
  color: #059669;
  font-weight: 500;
}

.draft-badge {
  padding: 0.25rem 0.5rem;
  background: #FEF3C7;
  color: #D97706;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.overdue-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: #FEE2E2;
  color: #EF4444;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.overdue-icon {
  width: 1rem;
  height: 1rem;
}

.completed-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #059669;
  font-weight: 500;
}

.check-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.progress-bar {
  height: 0.25rem;
  background: #E5E7EB;
  border-radius: 0.125rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #059669;
  transition: width 0.3s ease;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.edit {
  background: #BFDBFE;
  color: #2563EB;
}

.action-btn.delete {
  background: #FEE2E2;
  color: #EF4444;
}

.action-btn:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

.action-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
  border: 2px dashed #E5E7EB;
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  color: #6B7280;
  margin-bottom: 1rem;
}

.empty-state p {
  color: #6B7280;
  margin-bottom: 1.5rem;
}

.marketing-tools-header {
  margin-bottom: 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid #E5E7EB;
}

.marketing-tools-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1E3A8A;
  margin-bottom: 0.75rem;
}

.marketing-tools-subtitle {
  font-size: 1.125rem;
  color: #6B7280;
  max-width: 600px;
}

.marketing-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.marketing-tab {
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: #6B7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.marketing-tab.active {
  color: #2563EB;
  border-bottom: 2px solid #2563EB;
}
</style>
