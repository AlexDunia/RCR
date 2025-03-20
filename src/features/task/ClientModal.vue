<template>
  <div v-if="isOpen" class="client-modal" role="dialog" aria-labelledby="client-modal-title">
    <!-- Modal Overlay -->
    <div class="client-modal__overlay" @click="handleClose"></div>

    <!-- Modal Content -->
    <div class="client-modal__content">
      <header class="client-modal__header">
        <h2 id="client-modal-title" class="client-modal__title">Add client</h2>
        <button class="client-modal__close" @click="handleClose" aria-label="Close modal">
          &times;
        </button>
      </header>

      <!-- Network Selection -->
      <div class="client-modal__network">
        <label for="network" class="client-modal__label">Select network</label>
        <select
          id="network"
          v-model="selectedNetwork"
          class="client-modal__select"
          required
        >
          <option value="">All networks</option>
          <option v-for="network in networks" :key="network.id" :value="network.id">
            {{ network.name }}
          </option>
        </select>
      </div>

      <!-- Tabs -->
      <div class="client-modal__tabs" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="client-modal__tab"
          :class="{ 'client-modal__tab--active': activeTab === tab.id }"
          role="tab"
          :aria-selected="activeTab === tab.id"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- Search -->
      <div class="client-modal__search">
        <input
          type="search"
          v-model="searchQuery"
          class="client-modal__search-input"
          placeholder="Search clients..."
          aria-label="Search clients"
        >
      </div>

      <!-- Client List -->
      <div class="client-modal__list" role="list">
        <div
          v-for="client in filteredClients"
          :key="client.id"
          class="client-modal__item"
          :class="{ 'client-modal__item--selected': isSelected(client) }"
          role="listitem"
        >
          <label class="client-modal__checkbox-label">
            <input
              type="checkbox"
              :checked="isSelected(client)"
              @change="toggleSelection(client)"
              class="client-modal__checkbox"
            >
            <div class="client-modal__client-info">
              <img
                :src="client.avatar"
                :alt="client.name"
                class="client-modal__avatar"
                @error="handleAvatarError"
              >
              <div class="client-modal__details">
                <span class="client-modal__name">{{ client.name }}</span>
                <span class="client-modal__email">{{ client.email }}</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- Footer -->
      <footer class="client-modal__footer">
        <button class="client-modal__done" @click="handleDone">
          Done
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  initialSelectedClients: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['close', 'select'])

// State
const selectedNetwork = ref('')
const activeTab = ref('all')
const searchQuery = ref('')
const selectedClients = ref(props.initialSelectedClients)

// Mock data
const networks = [
  { id: 1, name: 'Network A' },
  { id: 2, name: 'Network B' },
  { id: 3, name: 'Network C' }
]

const tabs = [
  { id: 'all', name: 'All' },
  { id: 'recent', name: 'Recent' },
  { id: 'favorites', name: 'Favorites' }
]

const clients = [
  {
    id: 1,
    name: 'Christian Anderson',
    email: 'christian.a@example.com',
    avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png',
    network: 1,
    recent: true,
    favorite: false
  },
  {
    id: 2,
    name: 'Emma Thompson',
    email: 'emma.t@example.com',
    avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png',
    network: 1,
    recent: true,
    favorite: true
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png',
    network: 2,
    recent: false,
    favorite: true
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png',
    network: 2,
    recent: true,
    favorite: false
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david.w@example.com',
    avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png',
    network: 3,
    recent: false,
    favorite: true
  }
]

// Computed
const filteredClients = computed(() => {
  let filtered = clients

  // Filter by network
  if (selectedNetwork.value) {
    filtered = filtered.filter(client => client.network === selectedNetwork.value)
  }

  // Filter by tab
  if (activeTab.value === 'recent') {
    filtered = filtered.filter(client => client.recent)
  } else if (activeTab.value === 'favorites') {
    filtered = filtered.filter(client => client.favorite)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(client =>
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Methods
const handleAvatarError = (e) => {
  e.target.src = '/default-avatar.jpg'
}

const isSelected = (client) => {
  return selectedClients.value.some(c => c.id === client.id)
}

const toggleSelection = (client) => {
  if (isSelected(client)) {
    selectedClients.value = selectedClients.value.filter(c => c.id !== client.id)
  } else {
    selectedClients.value = [...selectedClients.value, client]
  }
}

const handleClose = () => {
  emit('close')
}

const handleDone = () => {
  emit('select', selectedClients.value)
  emit('close')
}
</script>

<style scoped>
.client-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.client-modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.client-modal__content {
  position: relative;
  background: #FFFFFF;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.client-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #E5E7EB;
}

.client-modal__title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.client-modal__close {
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}

.client-modal__network {
  padding: 20px;
  border-bottom: 1px solid #E5E7EB;
}

.client-modal__label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.client-modal__select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
}

.client-modal__tabs {
  display: flex;
  padding: 0 20px;
  border-bottom: 1px solid #E5E7EB;
}

.client-modal__tab {
  padding: 12px 16px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: #6B7280;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.client-modal__tab--active {
  color: #2563EB;
  border-bottom-color: #2563EB;
}

.client-modal__search {
  padding: 20px;
  border-bottom: 1px solid #E5E7EB;
}

.client-modal__search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
}

.client-modal__list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.client-modal__item {
  margin-bottom: 12px;
}

.client-modal__checkbox-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.client-modal__checkbox-label:hover {
  background-color: #F3F4F6;
}

.client-modal__checkbox {
  width: 16px;
  height: 16px;
}

.client-modal__client-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.client-modal__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.client-modal__details {
  display: flex;
  flex-direction: column;
}

.client-modal__name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.client-modal__email {
  font-size: 12px;
  color: #6B7280;
}

.client-modal__footer {
  padding: 20px;
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: flex-end;
}

.client-modal__done {
  background: #2563EB;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.client-modal__done:hover {
  background: #1D4ED8;
}

/* Responsive Design */
@media (max-width: 767px) {
  .client-modal__content {
    margin: 16px;
    max-height: calc(100vh - 32px);
  }

  .client-modal__header,
  .client-modal__network,
  .client-modal__search,
  .client-modal__list,
  .client-modal__footer {
    padding: 16px;
  }

  .client-modal__tabs {
    padding: 0 16px;
    overflow-x: auto;
  }

  .client-modal__tab {
    padding: 12px;
    white-space: nowrap;
  }
}
</style>
