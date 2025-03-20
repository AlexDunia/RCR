<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const completedTasks = ref([]);
const isLoading = ref(true);
const error = ref(null);
const filterValue = ref('all'); // 'all', 'today', 'thisWeek', 'thisMonth'
const searchQuery = ref('');

onMounted(async () => {
  try {
    // Simulate API call with timeout
    setTimeout(() => {
      completedTasks.value = [
        {
          id: 4001,
          title: "Property Listing Update",
          completedDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), // Today
          priority: "high",
          description: "Updated property listing details and photos for the lakefront property",
          client: "Rivera Family",
          completedBy: "Jane Smith",
          notes: "Added new professional photos and updated price"
        },
        {
          id: 4002,
          title: "Client Consultation",
          completedDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // Yesterday
          priority: "medium",
          description: "Initial consultation with the Davis family about selling their property",
          client: "Davis Family",
          completedBy: "Robert Chen",
          notes: "Discussed pricing strategy and timeline"
        },
        {
          id: 4003,
          title: "Home Inspection Coordination",
          completedDate: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(), // 3 days ago
          priority: "medium",
          description: "Arranged home inspection for the Wilson property purchase",
          client: "Wilson Family",
          completedBy: "Michael Johnson",
          notes: "Inspection scheduled for next Tuesday"
        },
        {
          id: 4004,
          title: "Contract Preparation",
          completedDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(), // 5 days ago
          priority: "high",
          description: "Prepared purchase agreement for the downtown condo",
          client: "Taylor Family",
          completedBy: "Jane Smith",
          notes: "Used standard template with custom contingencies"
        },
        {
          id: 4005,
          title: "Market Analysis Report",
          completedDate: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString(), // 2 weeks ago
          priority: "medium",
          description: "Completed quarterly market analysis report for the team",
          client: "Internal",
          completedBy: "Robert Chen",
          notes: "Identified three emerging neighborhood trends"
        },
        {
          id: 4006,
          title: "Staff Training Session",
          completedDate: new Date(new Date().setDate(new Date().getDate() - 25)).toISOString(), // 25 days ago
          priority: "low",
          description: "Conducted training session on new CRM features",
          client: "Internal",
          completedBy: "Michael Johnson",
          notes: "10 staff members attended, positive feedback"
        }
      ];
      isLoading.value = false;
    }, 600);
  } catch (err) {
    console.error('Failed to load completed tasks:', err);
    error.value = 'Failed to load completed tasks. Please try again.';
    isLoading.value = false;
  }
});

const filteredTasks = computed(() => {
  if (!completedTasks.value.length) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday is 0

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // First filter by date range
  let dateFiltered = completedTasks.value.filter(task => {
    const taskDate = new Date(task.completedDate);

    switch (filterValue.value) {
      case 'today':
        return isToday(taskDate);
      case 'thisWeek':
        return isInRange(taskDate, startOfWeek, today);
      case 'thisMonth':
        return isInRange(taskDate, startOfMonth, today);
      default: // 'all'
        return true;
    }
  });

  // Then filter by search query if present
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    dateFiltered = dateFiltered.filter(task =>
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.client.toLowerCase().includes(query) ||
      task.completedBy.toLowerCase().includes(query) ||
      (task.notes && task.notes.toLowerCase().includes(query))
    );
  }

  // Sort by most recently completed first
  return dateFiltered.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate));
});

const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

const isInRange = (date, start, end) => {
  return date >= start && date <= end;
};

const viewTaskDetails = (taskId) => {
  router.push(`/tasks/completed/${taskId}`);
};

const priorityClass = (priority) => {
  switch (priority) {
    case 'high': return 'priority-high';
    case 'medium': return 'priority-medium';
    case 'low': return 'priority-low';
    default: return '';
  }
};

const formatDate = (dateString) => {
  const taskDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isToday(taskDate)) {
    return 'Today';
  } else if (
    taskDate.getDate() === yesterday.getDate() &&
    taskDate.getMonth() === yesterday.getMonth() &&
    taskDate.getFullYear() === yesterday.getFullYear()
  ) {
    return 'Yesterday';
  } else {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return taskDate.toLocaleDateString(undefined, options);
  }
};

const clearSearch = () => {
  searchQuery.value = '';
};
</script>

<template>
  <div class="completed-tasks">
    <div class="page-header">
      <h1>Completed Tasks</h1>
    </div>

    <div class="filters-search">
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search completed tasks..."
          class="search-input"
        />
        <button v-if="searchQuery" @click="clearSearch" class="clear-search-btn">
          ✕
        </button>
      </div>

      <div class="filter-options">
        <button
          class="filter-btn"
          :class="{ active: filterValue === 'all' }"
          @click="filterValue = 'all'"
        >
          All Time
        </button>
        <button
          class="filter-btn"
          :class="{ active: filterValue === 'today' }"
          @click="filterValue = 'today'"
        >
          Today
        </button>
        <button
          class="filter-btn"
          :class="{ active: filterValue === 'thisWeek' }"
          @click="filterValue = 'thisWeek'"
        >
          This Week
        </button>
        <button
          class="filter-btn"
          :class="{ active: filterValue === 'thisMonth' }"
          @click="filterValue = 'thisMonth'"
        >
          This Month
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading completed tasks...</p>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="filteredTasks.length === 0" class="empty-state">
      <p v-if="searchQuery">No completed tasks match your search criteria.</p>
      <p v-else>No completed tasks found for the selected time period.</p>
    </div>

    <div v-else class="tasks-list">
      <div v-for="task in filteredTasks" :key="task.id" class="task-card">
        <div class="task-header">
          <div class="priority-indicator" :class="priorityClass(task.priority)"></div>
          <h3 class="task-title">{{ task.title }}</h3>
          <div class="completion-date">{{ formatDate(task.completedDate) }}</div>
        </div>

        <div class="task-details">
          <div class="detail-item">
            <span class="detail-label">Client:</span>
            <span class="detail-value">{{ task.client }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Completed by:</span>
            <span class="detail-value">{{ task.completedBy }}</span>
          </div>
        </div>

        <div class="task-description">
          {{ task.description }}
        </div>

        <div v-if="task.notes" class="task-notes">
          <div class="notes-label">Notes:</div>
          <div class="notes-content">{{ task.notes }}</div>
        </div>

        <div class="task-actions">
          <button class="view-btn" @click="viewTaskDetails(task.id)">
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.completed-tasks {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #333;
}

.filters-search {
  margin-bottom: 20px;
}

.search-container {
  position: relative;
  margin-bottom: 15px;
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
  padding-right: 40px;
}

.clear-search-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: white;
  color: #555;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  background-color: #f5f5f5;
}

.filter-btn.active {
  background-color: #e3f2fd;
  color: #1976d2;
  border-color: #bbdefb;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #1976d2;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  padding: 20px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 8px;
  text-align: center;
}

.empty-state {
  padding: 40px;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #757575;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.task-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}

.priority-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
  margin-top: 5px;
}

.priority-high {
  background-color: #f44336;
}

.priority-medium {
  background-color: #ff9800;
}

.priority-low {
  background-color: #4caf50;
}

.task-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #333;
  flex: 1;
}

.completion-date {
  font-size: 0.85rem;
  color: #757575;
  white-space: nowrap;
  margin-left: 10px;
}

.task-details {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
}

.detail-item {
  display: flex;
  align-items: center;
}

.detail-label {
  font-weight: 600;
  color: #555;
  margin-right: 5px;
  font-size: 0.9rem;
}

.detail-value {
  color: #333;
  font-size: 0.9rem;
}

.task-description {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 15px;
}

.task-notes {
  background-color: #f5f7fa;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.notes-label {
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
}

.notes-content {
  color: #333;
}

.task-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.view-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  border: none;
  background-color: #e3f2fd;
  color: #1976d2;
}

.view-btn:hover {
  background-color: #bbdefb;
}

@media (max-width: 600px) {
  .filter-options {
    overflow-x: auto;
    padding-bottom: 10px;
    white-space: nowrap;
    display: flex;
    flex-wrap: nowrap;
  }

  .task-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .completion-date {
    margin-left: 22px;
    margin-top: 5px;
  }
}
</style>
