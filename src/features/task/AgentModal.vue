<template>
  <Teleport to="body">
    <div v-if="isOpen" class="agent-modal__overlay" @click="closeModal">
      <div class="agent-modal" role="dialog" aria-modal="true" aria-label="Add agent modal" @click.stop>
        <!-- Close Button -->
        <button class="agent-modal__close" aria-label="Close modal" @click="closeModal">
          &times;
        </button>

        <!-- Header -->
        <div class="agent-modal__header">
          <h2 class="agent-modal__title">Add agent</h2>

          <!-- Network Dropdown -->
          <div class="agent-modal__network">
            <select v-model="selectedNetwork" class="agent-modal__network-select">
              <option value="" disabled selected>You can only add agents or clients in your network</option>
              <option v-for="network in networks" :key="network.id" :value="network.id">
                {{ network.name }}
              </option>
            </select>
          </div>

          <!-- Tabs -->
          <div class="agent-modal__tabs">
            <button
              class="agent-modal__tab"
              :class="{ 'active': activeTab === 'agent' }"
              @click="activeTab = 'agent'"
            >
              Agent
            </button>
            <button
              class="agent-modal__tab"
              :class="{ 'active': activeTab === 'selected' }"
              @click="activeTab = 'selected'"
            >
              Selected agents ({{ selectedAgentIds.length }})
            </button>
          </div>
        </div>

        <!-- Search and Actions -->
        <div class="agent-modal__actions-bar">
          <div class="agent-modal__search">
            <input
              type="text"
              v-model="searchQuery"
              class="agent-modal__search-input"
              :placeholder="activeTab === 'agent' ? 'Search agents' : 'Search selected agents'"
            >
          </div>
          <button
            class="agent-modal__done"
            @click="handleDone"
            :disabled="selectedAgentIds.length === 0"
          >
            Done
          </button>
        </div>

        <!-- Agent List -->
        <div class="agent-modal__list" role="listbox" aria-label="Agent selection list">
          <div
            v-for="agent in displayedAgents"
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
                <span class="agent-modal__email">{{ agent.email }}</span>
              </div>
            </div>
            <div class="agent-modal__checkbox">
              <input
                type="checkbox"
                :checked="selectedAgentIds.includes(agent.id)"
                @click.stop
                @change="toggleAgent(agent)"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  initialSelectedAgents: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'select'])

// State
const activeTab = ref('agent')
const searchQuery = ref('')
const selectedAgentIds = ref([])
const selectedNetwork = ref('')

// Networks data (mock)
const networks = ref([
  { id: 1, name: 'Network 1' },
  { id: 2, name: 'Network 2' }
])

// Mock agents data with 20 entries
const agents = ref([
  { id: 1, name: 'John Doe', email: 'john.doe@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 3, name: 'Michael Brown', email: 'mbrown@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 4, name: 'Emma Wilson', email: 'ewilson@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 5, name: 'James Anderson', email: 'james.a@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 6, name: 'Lisa Chen', email: 'lisa.chen@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 7, name: 'David Kim', email: 'david.k@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 8, name: 'Anna Martinez', email: 'anna.m@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 9, name: 'Robert Taylor', email: 'robert.t@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 10, name: 'Emily Davis', email: 'emily.d@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 11, name: 'Thomas White', email: 'thomas.w@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 12, name: 'Jessica Lee', email: 'jessica.l@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 13, name: 'William Clark', email: 'william.c@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 14, name: 'Sofia Rodriguez', email: 'sofia.r@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 15, name: 'Daniel Park', email: 'daniel.p@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 16, name: 'Olivia Thompson', email: 'olivia.t@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 17, name: 'Lucas Garcia', email: 'lucas.g@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 18, name: 'Isabella Kim', email: 'isabella.k@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 19, name: 'Alexander Wang', email: 'alex.w@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' },
  { id: 20, name: 'Victoria Patel', email: 'victoria.p@gmail.com', avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png' }
])

// Computed
const filteredAgents = computed(() => {
  if (!searchQuery.value) return agents.value
  const query = searchQuery.value.toLowerCase()
  return agents.value.filter(agent =>
    agent.name.toLowerCase().includes(query) ||
    agent.email.toLowerCase().includes(query)
  )
})

const selectedAgents = computed(() => {
  return agents.value.filter(agent => selectedAgentIds.value.includes(agent.id))
})

const displayedAgents = computed(() => {
  return activeTab.value === 'agent' ? filteredAgents.value : selectedAgents.value
})

// Methods
const handleAvatarError = (e) => {
  e.target.src = '/default-avatar.jpg'
}

const toggleAgent = (agent) => {
  const index = selectedAgentIds.value.indexOf(agent.id)
  if (index === -1) {
    selectedAgentIds.value.push(agent.id)
  } else {
    selectedAgentIds.value.splice(index, 1)
  }
}

const closeModal = () => {
  emit('close')
}

const handleDone = () => {
  const selectedAgentsList = agents.value.filter(a => selectedAgentIds.value.includes(a.id))
  emit('select', selectedAgentsList)
  closeModal()
}

// Initialize selected agents from props
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    selectedAgentIds.value = props.initialSelectedAgents.map(agent => agent.id)
  }
}, { immediate: true })

// Keyboard navigation
const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
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
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.agent-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #666666;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  z-index: 2;
}

.agent-modal__header {
  padding: 24px 24px 0;
}

.agent-modal__title {
  font-size: 20px;
  color: #007BFF;
  margin: 0 0 16px;
  text-align: center;
  font-weight: 600;
}

.agent-modal__network {
  margin-bottom: 16px;
}

.agent-modal__network-select {
  width: 100%;
  padding: 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  color: #666666;
  background: #FFFFFF;
}

.agent-modal__tabs {
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 8px;
}

.agent-modal__tab {
  background: none;
  border: none;
  padding: 8px 0;
  font-size: 14px;
  color: #666666;
  cursor: pointer;
  position: relative;
}

.agent-modal__tab.active {
  color: #007BFF;
  font-weight: 500;
}

.agent-modal__tab.active::after {
  content: '';
  position: absolute;
  bottom: -9px;
  left: 0;
  right: 0;
  height: 2px;
  background: #007BFF;
}

.agent-modal__actions-bar {
  padding: 16px 24px;
  display: flex;
  gap: 16px;
  align-items: center;
  border-bottom: 1px solid #E5E7EB;
}

.agent-modal__search {
  flex: 1;
}

.agent-modal__search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
}

.agent-modal__list {
  flex: 1;
  overflow-y: auto;
  padding: 0 24px;
  max-height: 400px;
}

.agent-modal__list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #E5E7EB;
  cursor: pointer;
}

.agent-modal__list-item:last-child {
  border-bottom: none;
}

.agent-modal__agent-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-modal__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.agent-modal__details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.agent-modal__name {
  font-size: 14px;
  color: #111827;
  font-weight: 500;
}

.agent-modal__email {
  font-size: 14px;
  color: #6B7280;
}

.agent-modal__checkbox input {
  width: 18px;
  height: 18px;
  border: 2px solid #E5E7EB;
  border-radius: 4px;
  cursor: pointer;
}

.agent-modal__done {
  background: #007BFF;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.agent-modal__done:hover {
  background: #0056b3;
}

.agent-modal__done:disabled {
  background: #E5E7EB;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .agent-modal {
    max-width: 95%;
    margin: 16px;
  }

  .agent-modal__header,
  .agent-modal__actions-bar,
  .agent-modal__list {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
