<template>
  <Teleport to="body">
    <div v-if="show" class="client-modal__overlay">
      <div class="client-modal" role="dialog" aria-modal="true" aria-label="Add User modal">
        <!-- Header -->
        <div class="client-modal__header">
          <h2 class="client-modal__title">Add User</h2>
          <button class="client-modal__close" aria-label="Close modal" @click="$emit('close')">
            &times;
          </button>
        </div>

        <!-- Network Dropdown -->
        <div class="client-modal__dropdown">
          <select class="client-modal__network-select">
            <option value="" selected>You can only add agents or clients in your network</option>
          </select>
        </div>

        <!-- Tabs -->
        <div class="client-modal__tabs">
          <button class="client-modal__tab">
            Agent
          </button>
          <button class="client-modal__tab client-modal__tab--active">
            Client
          </button>
        </div>

        <!-- Search -->
        <div class="client-modal__search">
          <input
            type="text"
            v-model="searchQuery"
            class="client-modal__search-input"
            placeholder="Search clients"
          >
        </div>

        <!-- Client List -->
        <div class="client-modal__list">
          <div
            v-for="client in filteredClients"
            :key="client.id"
            class="client-modal__list-item"
            @click="toggleClient(client)"
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
                <span class="client-modal__email">{{ client.email || 'johndoe@gmail.com' }}</span>
              </div>
            </div>
            <div class="client-modal__radio">
              <div
                class="client-modal__radio-circle"
                :class="{ 'client-modal__radio-circle--selected': isSelected(client) }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="client-modal__footer">
          <button class="client-modal__done-btn" @click="handleDone">
            Done
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  clients: {
    type: Array,
    default: () => [],
    required: false
  },
  selectedClients: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close', 'select', 'remove']);

// State
const searchQuery = ref('');
const localSelectedClients = ref([...props.selectedClients]);

// Make sure the console logs are added for debugging
console.log('ClientModal props:', {
  show: props.show,
  clientsCount: props.clients?.length,
  selectedCount: props.selectedClients?.length
});

// Handle avatar errors
const handleAvatarError = (e) => {
  e.target.src = 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png';
};

// Filter clients based on search query
const filteredClients = computed(() => {
  if (!searchQuery.value) return props.clients;
  const query = searchQuery.value.toLowerCase();

  return props.clients.filter(client =>
    client.name?.toLowerCase().includes(query) ||
    (client.email && client.email.toLowerCase().includes(query))
  );
});

// Check if a client is selected
const isSelected = (client) => {
  return localSelectedClients.value.some(c => c.id === client.id);
};

// Toggle selection of a client
const toggleClient = (client) => {
  const index = localSelectedClients.value.findIndex(c => c.id === client.id);

  if (index === -1) {
    localSelectedClients.value.push(client);
  } else {
    localSelectedClients.value.splice(index, 1);
  }
};

// Handle done button click
const handleDone = () => {
  emit('select', localSelectedClients.value);
  emit('close');
};

// Update local selection when props change
watch(() => props.selectedClients, (newVal) => {
  localSelectedClients.value = [...newVal];
}, { deep: true });

// Update local selection when modal is opened
watch(() => props.show, (isOpen) => {
  if (isOpen) {
    localSelectedClients.value = [...props.selectedClients];
  }
});
</script>

<style scoped>
.client-modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.client-modal {
  background: #FFFFFF;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.client-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #E5E7EB;
}

.client-modal__title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.client-modal__close {
  background: none;
  border: none;
  font-size: 24px;
  color: #9CA3AF;
  cursor: pointer;
  padding: 4px;
}

.client-modal__dropdown {
  padding: 0 20px;
  margin-top: 16px;
}

.client-modal__network-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  font-size: 14px;
  color: #6B7280;
  background-color: #FFFFFF;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236B7280'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
}

.client-modal__tabs {
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  margin-top: 16px;
}

.client-modal__tab {
  flex: 1;
  padding: 10px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  text-align: center;
  border-bottom: 2px solid transparent;
}

.client-modal__tab--active {
  color: #2563EB;
  border-bottom: 2px solid #2563EB;
}

.client-modal__search {
  padding: 12px 20px;
  border-bottom: 1px solid #E5E7EB;
}

.client-modal__search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  font-size: 14px;
  color: #111827;
  background-color: #FFFFFF;
}

.client-modal__search-input::placeholder {
  color: #9CA3AF;
}

.client-modal__list {
  overflow-y: auto;
  max-height: 300px;
  padding: 0;
}

.client-modal__list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
}

.client-modal__list-item:hover {
  background-color: #F9FAFB;
}

.client-modal__client-info {
  display: flex;
  align-items: center;
}

.client-modal__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
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

.client-modal__radio {
  margin-left: auto;
}

.client-modal__radio-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #D1D5DB;
  display: flex;
  justify-content: center;
  align-items: center;
}

.client-modal__radio-circle--selected {
  border-color: #2563EB;
  position: relative;
}

.client-modal__radio-circle--selected::after {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #2563EB;
  position: absolute;
}

.client-modal__footer {
  padding: 12px 20px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #E5E7EB;
}

.client-modal__done-btn {
  background-color: #2563EB;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.client-modal__done-btn:hover {
  background-color: #1D4ED8;
}
</style>
