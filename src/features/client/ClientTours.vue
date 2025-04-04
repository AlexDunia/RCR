<template>
  <div class="client-tours">
    <div class="section-header">
      <h3 class="section-title">Client Tours</h3>
      <button class="reset-btn" @click="resetAllTours">Reset Tours Data</button>
    </div>

    <!-- Tour filtering options -->
    <div class="filter-options">
      <button
        v-for="status in ['all', 'scheduled', 'in_progress', 'completed']"
        :key="status"
        :class="['filter-btn', { active: currentFilter === status }]"
        @click="currentFilter = status"
      >
        {{ formatStatus(status) }}
      </button>
    </div>

    <!-- Tours list -->
    <div class="tours-container">
      <div v-if="filteredTours.length === 0" class="empty-state">
        No tours found for this client
      </div>

      <div v-else v-for="tour in filteredTours" :key="tour.id" class="tour-card">
        <div class="tour-header">
          <h4>{{ tour.title }}</h4>
          <span :class="['status-badge', tour.status]">{{ formatStatus(tour.status) }}</span>
        </div>

        <div class="tour-details">
          <div class="date-info">
            <span class="label">Date:</span>
            {{ formatDate(tour.startDate) }} at {{ formatTime(tour.startTime) }}
          </div>

          <!-- Assigned agents -->
          <div class="agents-section">
            <span class="label">Assigned agents:</span>
            <div class="agent-list">
              <div v-for="agent in tour.agentDetails" :key="agent.id" class="agent-chip">
                <img :src="agent.avatar" :alt="agent.name" class="agent-avatar">
                <span class="agent-name">{{ agent.name }}</span>
              </div>
            </div>
          </div>

          <!-- Show assigned clients in each tour card -->
          <div class="clients-section">
            <span class="label">Assigned clients:</span>
            <div class="client-list">
              <div v-for="client in tour.clientDetails" :key="client.id" class="client-chip">
                <img :src="client.avatar" :alt="client.name" class="client-avatar">
                <span class="client-name">{{ client.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="tour-actions">
          <button class="view-details-btn" @click="viewTourDetails(tour.id)">
            View details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTourStore } from '@/stores/tourStore';

const route = useRoute();
const router = useRouter();
const tourStore = useTourStore();

// Get client ID from either route params or query parameter
const clientId = computed(() => {
  // Check if we have a client ID in route params
  if (route.params.id) {
    return parseInt(route.params.id);
  }
  // Check if we have a client ID in query params
  if (route.query.clientId) {
    return parseInt(route.query.clientId);
  }
  // Default to null if no client ID found
  return null;
});

const currentFilter = ref('all');

// Get all tours for this client
onMounted(() => {
  tourStore.initTours();
});

// Reset all tours to test data
const resetAllTours = () => {
  tourStore.clearAllTours();
  // Reload the page to ensure everything is reset
  window.location.reload();
};

// Filter tours by status
const filteredTours = computed(() => {
  // If no client ID is available, return empty array
  if (!clientId.value) {
    return [];
  }

  // Get tours for this specific client only
  const clientTours = tourStore.getToursByClient(clientId.value);

  console.log(`Filtered tours for client ${clientId.value}:`, clientTours);

  if (currentFilter.value === 'all') {
    return clientTours;
  }

  return clientTours.filter(tour => {
    // Handle underscores in status values
    const statusToMatch = currentFilter.value.replace(/-/g, '_');
    return tour.status === statusToMatch;
  }).sort((a, b) => {
    // Sort by date - newest first
    return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
  });
});

// Utility functions
const formatStatus = (status) => {
  const formatted = status.replace('_', ' ');
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
};

const formatTime = (time) => {
  if (!time) return '';
  return time;
};

const viewTourDetails = (tourId) => {
  const tour = tourStore.getTourById(tourId);

  // For admin viewing client tours, use the new admin route
  if (route.path.startsWith('/clients/')) {
    router.push(`/admin/client-tour/${tourId}?clientId=${clientId.value}`);
  } else {
    // Original behavior for agents
    if (tour.status === 'completed') {
      router.push(`/tours/completed/${tourId}`);
    } else {
      router.push(`/tours/${tourId}`);
    }
  }
};
</script>

<style scoped>
.client-tours {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  color: #111827;
  margin: 0;
}

.reset-btn {
  padding: 8px 16px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.reset-btn:hover {
  background: #dc2626;
}

.filter-options {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 14px;
  cursor: pointer;
}

.filter-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.tours-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tour-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
}

.tour-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.tour-header h4 {
  margin: 0;
  font-size: 16px;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.scheduled {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.in_progress {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.completed {
  background: #d1fae5;
  color: #065f46;
}

.tour-details {
  margin-bottom: 16px;
}

.date-info {
  margin-bottom: 8px;
  font-size: 14px;
  color: #4b5563;
}

.label {
  font-weight: 500;
  color: #374151;
  margin-right: 4px;
}

.agents-section,
.clients-section {
  margin-top: 12px;
}

.agent-list,
.client-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.agent-chip,
.client-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: #f3f4f6;
  border-radius: 16px;
  font-size: 12px;
}

.agent-avatar,
.client-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}

.agent-name,
.client-name {
  color: #374151;
}

.tour-actions {
  display: flex;
  justify-content: flex-end;
}

.view-details-btn {
  padding: 6px 12px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.view-details-btn:hover {
  background: #1d4ed8;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #6b7280;
  font-size: 14px;
}
</style>
