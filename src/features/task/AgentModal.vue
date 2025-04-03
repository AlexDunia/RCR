<template>
  <Teleport to="body">
    <div v-if="show" class="agent-modal__overlay">
      <div class="agent-modal" role="dialog" aria-modal="true" aria-label="Add User modal">
        <!-- Header -->
        <div class="agent-modal__header">
          <h2 class="agent-modal__title">Add User</h2>
          <button class="agent-modal__close" aria-label="Close modal" @click="$emit('close')">
            &times;
          </button>
        </div>

        <!-- Network Dropdown -->
        <div class="agent-modal__dropdown">
          <select class="agent-modal__network-select">
            <option value="" selected>You can only add agents or clients in your network</option>
          </select>
        </div>

        <!-- Tabs -->
        <div class="agent-modal__tabs">
          <button class="agent-modal__tab agent-modal__tab--active">
            Agent
          </button>
          <button class="agent-modal__tab">
            Client
          </button>
        </div>

        <!-- Search -->
        <div class="agent-modal__search">
          <input
            type="text"
            v-model="searchQuery"
            class="agent-modal__search-input"
            placeholder="Search agents"
          >
        </div>

        <!-- Agent List -->
        <div class="agent-modal__list">
          <div
            v-for="agent in filteredAgents"
            :key="agent.id"
            class="agent-modal__list-item"
            @click="toggleAgent(agent)"
          >
            <div class="agent-modal__agent-info">
              <img
                :src="agent.avatar"
                :alt="agent.name"
                class="agent-modal__avatar"
                @error="handleAvatarError"
              >
              <div class="agent-modal__details">
                <span class="agent-modal__name">{{ agent.name }}</span>
                <span class="agent-modal__email">{{ agent.email || 'johndoe@gmail.com' }}</span>
              </div>
            </div>
            <div class="agent-modal__radio">
              <div
                class="agent-modal__radio-circle"
                :class="{ 'agent-modal__radio-circle--selected': isSelected(agent) }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="agent-modal__footer">
          <button class="agent-modal__done-btn" @click="handleDone">
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
  agents: {
    type: Array,
    default: () => []
  },
  selectedAgents: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close', 'select', 'remove']);

// State
const searchQuery = ref('');
const localSelectedAgents = ref([...props.selectedAgents]);

// Handle avatar errors
const handleAvatarError = (e) => {
  e.target.src = 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png';
};

// Filter agents based on search query
const filteredAgents = computed(() => {
  if (!searchQuery.value) return props.agents;
  const query = searchQuery.value.toLowerCase();

  return props.agents.filter(agent =>
    agent.name?.toLowerCase().includes(query) ||
    (agent.email && agent.email.toLowerCase().includes(query))
  );
});

// Check if an agent is selected
const isSelected = (agent) => {
  return localSelectedAgents.value.some(a => a.id === agent.id);
};

// Toggle selection of an agent
const toggleAgent = (agent) => {
  const index = localSelectedAgents.value.findIndex(a => a.id === agent.id);

  if (index === -1) {
    localSelectedAgents.value.push(agent);
  } else {
    localSelectedAgents.value.splice(index, 1);
  }
};

// Handle done button click
const handleDone = () => {
  emit('select', localSelectedAgents.value);
  emit('close');
};

// Update local selection when props change
watch(() => props.selectedAgents, (newVal) => {
  localSelectedAgents.value = [...newVal];
}, { deep: true });

// Update local selection when modal is opened
watch(() => props.show, (isOpen) => {
  if (isOpen) {
    localSelectedAgents.value = [...props.selectedAgents];
  }
});
</script>

<style scoped>
.agent-modal__overlay {
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

.agent-modal {
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

.agent-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #E5E7EB;
}

.agent-modal__title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.agent-modal__close {
  background: none;
  border: none;
  font-size: 24px;
  color: #9CA3AF;
  cursor: pointer;
  padding: 4px;
}

.agent-modal__dropdown {
  padding: 0 20px;
  margin-top: 16px;
}

.agent-modal__network-select {
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

.agent-modal__tabs {
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  margin-top: 16px;
}

.agent-modal__tab {
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

.agent-modal__tab--active {
  color: #2563EB;
  border-bottom: 2px solid #2563EB;
}

.agent-modal__search {
  padding: 12px 20px;
  border-bottom: 1px solid #E5E7EB;
}

.agent-modal__search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  font-size: 14px;
  color: #111827;
  background-color: #FFFFFF;
}

.agent-modal__search-input::placeholder {
  color: #9CA3AF;
}

.agent-modal__list {
  overflow-y: auto;
  max-height: 300px;
  padding: 0;
}

.agent-modal__list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
}

.agent-modal__list-item:hover {
  background-color: #F9FAFB;
}

.agent-modal__agent-info {
  display: flex;
  align-items: center;
}

.agent-modal__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.agent-modal__details {
  display: flex;
  flex-direction: column;
}

.agent-modal__name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.agent-modal__email {
  font-size: 12px;
  color: #6B7280;
}

.agent-modal__radio {
  margin-left: auto;
}

.agent-modal__radio-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #D1D5DB;
  display: flex;
  justify-content: center;
  align-items: center;
}

.agent-modal__radio-circle--selected {
  border-color: #2563EB;
  position: relative;
}

.agent-modal__radio-circle--selected::after {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #2563EB;
  position: absolute;
}

.agent-modal__footer {
  padding: 12px 20px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #E5E7EB;
}

.agent-modal__done-btn {
  background-color: #2563EB;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.agent-modal__done-btn:hover {
  background-color: #1D4ED8;
}
</style>

