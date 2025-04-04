<template>
  <div class="agent-tours">
    <div class="tours-header">
      <div class="filter-buttons">
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'all' }"
          @click="filterTours('all')"
        >All Tours</button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'upcoming' }"
          @click="filterTours('upcoming')"
        >Upcoming</button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'completed' }"
          @click="filterTours('completed')"
        >Completed</button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'cancelled' }"
          @click="filterTours('cancelled')"
        >Cancelled</button>
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <p>Loading tours...</p>
    </div>

    <div v-else-if="filteredTours.length === 0" class="empty-state">
      <p>No tours found.</p>
      <button class="schedule-tour-btn" @click="scheduleTour">Schedule New Tour</button>
    </div>

    <div v-else class="tours-list">
      <div v-for="tour in filteredTours" :key="tour.id" class="tour-card">
        <div class="tour-header">
          <div class="tour-status" :class="tour.status">
            {{ tour.status }}
          </div>
          <div class="tour-date">
            {{ formatDate(tour.scheduledDate) }}
          </div>
        </div>

        <div class="property-info">
          <img :src="tour.property.image" :alt="tour.property.title" class="property-image" />
          <div class="property-details">
            <h3 class="property-title">{{ tour.property.title }}</h3>
            <p class="property-address">{{ tour.property.address }}</p>
            <div class="property-price">${{ formatPrice(tour.property.price) }}</div>
          </div>
        </div>

        <div class="tour-details">
          <div class="detail-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>{{ formatTime(tour.scheduledTime) }}</span>
          </div>
          <div class="detail-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>{{ tour.client.name }}</span>
          </div>
          <div class="detail-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{{ tour.tourType }}</span>
          </div>
        </div>

        <div class="tour-notes" v-if="tour.notes">
          <p>{{ tour.notes }}</p>
        </div>

        <div class="tour-actions">
          <button
            v-if="tour.status === 'upcoming'"
            class="action-btn complete"
            @click="completeTour(tour.id)"
          >
            Mark as Complete
          </button>
          <button
            v-if="tour.status === 'upcoming'"
            class="action-btn cancel"
            @click="cancelTour(tour.id)"
          >
            Cancel Tour
          </button>
          <button class="action-btn edit" @click="editTour(tour)">
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTourStore } from '@/stores/tourStore';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const tourStore = useTourStore();

// States
const isLoading = ref(true);
const activeFilter = ref('all');

// Get agent ID from route params
const agentId = computed(() => parseInt(route.params.id));

// Computed properties
const filteredTours = computed(() => {
  const tours = tourStore.getToursByAgentId(agentId.value) || [];
  if (activeFilter.value === 'all') return tours;
  return tours.filter(tour => tour.status.toLowerCase() === activeFilter.value);
});

// Methods
function filterTours(filter) {
  activeFilter.value = filter;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatTime(time) {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-US').format(price);
}

function scheduleTour() {
  router.push({
    path: '/tours/create',
    query: { agentId: agentId.value }
  });
}

function editTour(tour) {
  router.push({
    path: `/tours/${tour.id}/edit`,
    query: { agentId: agentId.value }
  });
}

function completeTour(tourId) {
  tourStore.updateTourStatus(tourId, 'completed');
}

function cancelTour(tourId) {
  tourStore.updateTourStatus(tourId, 'cancelled');
}

// Load data
onMounted(async () => {
  if (agentId.value) {
    await tourStore.fetchToursByAgentId(agentId.value);
    isLoading.value = false;
  }
});
</script>

<style scoped>
.agent-tours {
  width: 100%;
}

.tours-header {
  margin-bottom: 2rem;
}

.filter-buttons {
  display: flex;
  gap: 1rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  color: #6b7280;
  cursor: pointer;
  font-size: 0.875rem;
}

.filter-btn.active {
  background: #1a4189;
  color: white;
  border-color: #1a4189;
}

.loading-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  color: #6b7280;
}

.schedule-tour-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #1a4189;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.tours-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.tour-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.tour-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.tour-status {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.tour-status.upcoming {
  background: #dbeafe;
  color: #1e40af;
}

.tour-status.completed {
  background: #dcfce7;
  color: #166534;
}

.tour-status.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.tour-date {
  font-size: 0.875rem;
  color: #6b7280;
}

.property-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.property-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.375rem;
}

.property-details {
  flex: 1;
}

.property-title {
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.25rem;
}

.property-address {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.25rem;
}

.property-price {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a4189;
}

.tour-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.detail-item svg {
  color: #9ca3af;
}

.tour-notes {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.tour-notes p {
  margin: 0;
}

.tour-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.action-btn {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.action-btn.complete {
  background: #1a4189;
  color: white;
  border: none;
}

.action-btn.cancel {
  background: white;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.action-btn.edit {
  background: white;
  color: #1a4189;
  border: 1px solid #1a4189;
}
</style>
