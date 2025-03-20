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
        <template v-if="field.type === 'file'">
          <div class="file-upload-container">
            <div class="file-upload-area"
                 @drop.prevent="handleFileDrop($event, field.name)"
                 @dragover.prevent
                 @dragenter.prevent="() => isDragging = true"
                 @dragleave.prevent="() => isDragging = false"
                 :class="{ 'dragging': isDragging }">
              <div class="upload-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12V19M12 12L15 15M12 12L9 15M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 7.01349 15.8767 7.03857C14.9827 4.67583 12.6997 3 10 3C6.13401 3 3 6.13401 3 10C3 12.2501 4.07741 14.2509 5.75 15.4805" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="upload-text">
                <span>Drag & drop files here or</span>
                <button type="button" class="browse-button" @click="triggerFileInput(field.name)">Browse files</button>
              </div>
              <div class="upload-formats">
                Supported formats: PDF, DOC, XLS, PPT, JPG, PNG, GIF, TIFF, HEIC
              </div>
              <input
                :id="field.name"
                type="file"
                @change="handleFileSelect($event, field.name)"
                :accept="field.accept"
                multiple
                class="hidden"
              >
            </div>

            <!-- Selected Files List -->
            <div v-if="formData[field.name]?.length > 0" class="selected-files">
              <div v-for="(file, index) in formData[field.name]" :key="index" class="file-item">
                <div class="file-info">
                  <div class="file-icon" :class="getFileIconClass(file.type)">
                    <svg v-if="isDocument(file.type)" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.5 9.16667H12.5M7.5 12.5H10.8333M6.66667 2.5H13.3333L17.5 6.66667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H6.66667ZM13.3333 2.5V6.66667H17.5L13.3333 2.5Z" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <img v-else-if="isImage(file.type)" :src="getFilePreview(file)" class="file-preview" :alt="file.name">
                  </div>
                  <div class="file-details">
                    <span class="file-name">{{ file.name }}</span>
                    <span class="file-size">{{ formatFileSize(file.size) }}</span>
                  </div>
                </div>
                <button type="button" @click="removeFile(field.name, index)" class="remove-file">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M13.3333 5L6.66667 11.6667M6.66667 5L13.3333 11.6667" stroke="#EF4444" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="field.type === 'textarea'">
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
const isDragging = ref(false)

// Initialize form data with empty arrays for file fields
props.fields.forEach(field => {
  if (field.type === 'file') {
    formData[field.name] = []
  } else {
    formData[field.name] = ''
  }
})

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

const triggerFileInput = (fieldName) => {
  document.getElementById(fieldName).click()
}

const handleFileSelect = (event, fieldName) => {
  const files = Array.from(event.target.files)
  if (!formData[fieldName]) {
    formData[fieldName] = []
  }
  addFiles(files, fieldName)
}

const handleFileDrop = (event, fieldName) => {
  event.preventDefault()
  isDragging.value = false
  const files = Array.from(event.dataTransfer.files)
  if (!formData[fieldName]) {
    formData[fieldName] = []
  }
  addFiles(files, fieldName)
}

const addFiles = (files, fieldName) => {
  if (!formData[fieldName]) {
    formData[fieldName] = []
  }

  files.forEach(file => {
    const fileObj = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: isImage(file.type) ? URL.createObjectURL(file) : null
    }
    formData[fieldName].push(fileObj)
  })
}

const removeFile = (fieldName, index) => {
  const file = formData[fieldName][index]
  if (file.preview) {
    URL.revokeObjectURL(file.preview)
  }
  formData[fieldName].splice(index, 1)
}

const isDocument = (type) => {
  return type.includes('pdf') ||
         type.includes('doc') ||
         type.includes('xls') ||
         type.includes('ppt')
}

const isImage = (type) => {
  return type.includes('image/')
}

const getFilePreview = (file) => {
  return file.preview
}

const getFileIconClass = (type) => {
  if (isDocument(type)) return 'document-icon'
  if (isImage(type)) return 'image-icon'
  return 'generic-icon'
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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

.file-upload-container {
  width: 100%;
}

.file-upload-area {
  border: 2px dashed #E5E7EB;
  border-radius: 8px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  background: #F9FAFB;
}

.file-upload-area:hover {
  border-color: #2563EB;
  background: #F3F4F6;
}

.file-upload-area.dragging {
  border-color: #2563EB;
  background-color: #EFF6FF;
  transform: scale(1.01);
}

.upload-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  color: #6B7280;
  background: #F3F4F6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.file-upload-area:hover .upload-icon,
.file-upload-area.dragging .upload-icon {
  color: #2563EB;
  background: #EFF6FF;
}

.upload-text {
  color: #4B5563;
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.5;
}

.upload-formats {
  color: #9CA3AF;
  font-size: 12px;
  margin-top: 8px;
}

.browse-button {
  color: #2563EB;
  background: none;
  border: none;
  padding: 0;
  margin-left: 4px;
  font: inherit;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.browse-button:hover {
  color: #1D4ED8;
}

.selected-files {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.file-item:hover {
  background: #F3F4F6;
  border-color: #D1D5DB;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.file-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  background: #F3F4F6;
  border-radius: 4px;
}

.file-preview {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.file-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}

.file-size {
  font-size: 12px;
  color: #6B7280;
}

.remove-file {
  padding: 6px;
  background: none;
  border: none;
  color: #EF4444;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
}

.remove-file:hover {
  background: rgba(239, 68, 68, 0.1);
}

.remove-file:active {
  background: rgba(239, 68, 68, 0.2);
}

.hidden {
  display: none;
}
</style>
