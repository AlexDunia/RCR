<template>
  <form @submit.prevent="handleSubmit" class="document-form">
    <!-- Document Title and Description -->
    <div class="input-group">
      <div v-if="isLoading" class="skeleton-loader label-skeleton"></div>
      <label v-else>Document Title</label>
      <div v-if="isLoading" class="skeleton-loader input-skeleton"></div>
      <input
        v-else
        v-model="formData.title"
        type="text"
        placeholder="Enter document title"
        required
      />
    </div>

    <div class="input-group">
      <div v-if="isLoading" class="skeleton-loader label-skeleton"></div>
      <label v-else>Document Description</label>
      <div v-if="isLoading" class="skeleton-loader skeleton-textarea"></div>
      <textarea
        v-else
        v-model="formData.description"
        placeholder="Enter document description"
        rows="3"
        required
      ></textarea>
    </div>

    <!-- Associated Agents -->
    <div class="input-group">
      <div v-if="isLoading" class="skeleton-loader label-skeleton"></div>
      <label v-else>Associated Agents</label>
      <div v-if="isLoading" class="skeleton-loader input-skeleton"></div>
      <div v-else>
        <div class="agents-list">
          <div v-for="agent in selectedAgents" :key="agent.id" class="agent-item">
            <img :src="agent.avatar" :alt="agent.name" class="agent-avatar" />
            <span>{{ agent.name }}</span>
            <button type="button" @click="removeAgent(agent)" class="remove-agent">×</button>
          </div>
        </div>
        <button type="button" @click="showAgentModal = true" class="add-agent-btn">
          + Add Agent
        </button>
      </div>
    </div>

    <!-- Original Form Fields -->
    <div v-for="field in fields" :key="field.name" class="input-group">
      <div v-if="isLoading" class="skeleton-loader label-skeleton"></div>
      <label v-else>{{ field.label }}</label>
      <div v-if="isLoading"
        :class="[
          'skeleton-loader',
          { 'skeleton-textarea': field.type === 'textarea' },
          { 'input-skeleton': field.type !== 'textarea' }
        ]"
      ></div>
      <template v-else>
        <template v-if="field.type === 'textarea'">
          <textarea
            v-model="formData[field.name]"
            :placeholder="field.placeholder"
            rows="4"
          ></textarea>
        </template>
        <template v-else-if="field.type === 'select'">
          <select
            v-model="formData[field.name]"
          >
            <option value="" disabled selected>Select {{ field.label.toLowerCase() }}</option>
            <option v-for="option in field.options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </template>
        <template v-else>
          <input
            v-model="formData[field.name]"
            :type="field.type"
            :placeholder="field.placeholder"
          >
        </template>
      </template>
    </div>

    <!-- Agent Selection Modal -->
    <div v-if="showAgentModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Select Agents</h3>
          <button type="button" @click="showAgentModal = false" class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            v-model="agentSearchQuery"
            placeholder="Search agents..."
            class="search-input"
          />
          <div class="agents-grid">
            <div
              v-for="agent in filteredAgents"
              :key="agent.id"
              class="agent-card"
              :class="{ 'selected': isAgentSelected(agent) }"
              @click="toggleAgent(agent)"
            >
              <img :src="agent.avatar" :alt="agent.name" class="agent-avatar" />
              <div class="agent-info">
                <span class="agent-name">{{ agent.name }}</span>
                <span class="agent-experience">{{ agent.experience }} years exp.</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="showAgentModal = false" class="btn-primary">Done</button>
        </div>
      </div>
    </div>

    <button type="submit" class="btn-primary">Proceed</button>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const props = defineProps({
  fields: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])
const formData = reactive({})
const formErrors = ref({})
const showAgentModal = ref(false)
const agentSearchQuery = ref('')
const selectedAgents = ref([])

// Mock agents data - replace with your actual agents data
const allAgents = [
  { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '/avatars/john.jpg', experience: 5 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '/avatars/jane.jpg', experience: 8 },
]

const filteredAgents = computed(() => {
  const query = agentSearchQuery.value.toLowerCase()
  return allAgents.filter(agent =>
    agent.name.toLowerCase().includes(query) ||
    agent.email.toLowerCase().includes(query)
  )
})

const isAgentSelected = (agent) => {
  return selectedAgents.value.some(a => a.id === agent.id)
}

const toggleAgent = (agent) => {
  const index = selectedAgents.value.findIndex(a => a.id === agent.id)
  if (index === -1) {
    selectedAgents.value.push(agent)
  } else {
    selectedAgents.value.splice(index, 1)
  }
}

const removeAgent = (agent) => {
  const index = selectedAgents.value.findIndex(a => a.id === agent.id)
  if (index !== -1) {
    selectedAgents.value.splice(index, 1)
  }
}

const validateForm = () => {
  const errors = {}
  if (!formData.title) {
    errors.title = 'Document title is required'
  }
  if (!formData.description) {
    errors.description = 'Document description is required'
  }
  props.fields.forEach(field => {
    if (field.required && !formData[field.name]) {
      errors[field.name] = `${field.label} is required`
    }
  })
  formErrors.value = errors
  return Object.keys(errors).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) return

  emit('submit', {
    ...formData,
    agents: selectedAgents.value
  })
}
</script>

<style scoped>
/* Base form styles */
form {
  padding: 24px;
}

.input-group {
  margin-bottom: 24px;
}

.input-group label {
  display: block;
  margin-bottom: 12px;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
}

input, select, textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  background: #fff;
}

input::placeholder,
textarea::placeholder {
  color: #9CA3AF;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}

.btn-primary {
  background: #2563EB;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background: #1D4ED8;
}

/* Agent styles */
.agents-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.agent-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 14px;
}

.agent-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.remove-agent {
  padding: 0;
  background: none;
  border: none;
  color: #EF4444;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  margin-left: 4px;
}

.add-agent-btn {
  padding: 8px 16px;
  background: transparent;
  border: 1px dashed #D1D5DB;
  border-radius: 6px;
  color: #6B7280;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.add-agent-btn:hover {
  border-color: #9CA3AF;
  color: #4B5563;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 480px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #E5E7EB;
  text-align: right;
}

.search-input {
  margin-bottom: 20px;
}

.agents-grid {
  display: grid;
  gap: 12px;
}

.agent-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.agent-card:hover {
  border-color: #2563EB;
  background: rgba(37, 99, 235, 0.05);
}

.agent-card.selected {
  border-color: #2563EB;
  background: rgba(37, 99, 235, 0.05);
}

.agent-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.agent-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.agent-experience {
  font-size: 12px;
  color: #6B7280;
}

.close-modal {
  background: none;
  border: none;
  color: #6B7280;
  font-size: 24px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s;
}

.close-modal:hover {
  color: #374151;
}

.skeleton-loader {
  width: 100%;
  height: 42px; /* Standard input height */
  background: #E5E7EB;
  border-radius: 6px;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-textarea {
  height: 100px; /* Textarea height */
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

/* Remove old loader styles */
.loader-wrapper,
.input-group:has(textarea) .loader-wrapper,
.input-group:has(.agents-list) .loader-wrapper {
  display: none;
}

.label-skeleton {
  width: 30%;
  height: 20px;
  margin-bottom: 12px;
  background: #E5E7EB;
  border-radius: 4px;
}

.input-skeleton {
  height: 42px;
}
</style>
