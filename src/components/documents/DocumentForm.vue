<!-- src/components/documents/DocumentForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="document-form">
    <div v-if="isLoading" class="form-loader">
      <Loader v-for="n in fields.length" :key="n" />
    </div>
    <div v-else>
      <div v-for="field in fields" :key="field.name" class="form-group">
        <label :for="field.name" class="form-label">{{ field.label }}</label>
        <input
          v-if="field.type !== 'textarea' && field.type !== 'select'"
          :type="field.type"
          :id="field.name"
          :name="field.name"
          v-model="formData[field.name]"
          :placeholder="field.placeholder"
          class="form-input"
        />
        <textarea
          v-else-if="field.type === 'textarea'"
          :id="field.name"
          :name="field.name"
          v-model="formData[field.name]"
          :placeholder="field.placeholder"
          class="form-textarea"
        ></textarea>
        <select
          v-else
          :id="field.name"
          :name="field.name"
          v-model="formData[field.name]"
          class="form-select"
        >
          <option value="">Select {{ field.label.toLowerCase() }}</option>
          <option v-for="option in field.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="upload-section">
        <h3 class="upload-title">Upload Documents</h3>
        <div
          class="upload-area"
          @drop.prevent="handleDrop"
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          :class="{ 'drag-over': isDragging }"
        >
          <div v-if="documents.length === 0" class="upload-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" class="upload-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <p>Upload documents by dragging & dropping files or</p>
            <button type="button" class="browse-button" @click="triggerFileInput">Browse</button>
            <p class="upload-hint">Supports PDF, DOC, DOCX, JPG, PNG</p>
          </div>
          <div v-else class="documents-list">
            <div v-for="doc in documents" :key="doc.id" class="document-item">
              <div class="document-info">
                <svg v-if="doc.type === 'pdf'" xmlns="http://www.w3.org/2000/svg" class="document-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="document-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                </svg>
                <span class="document-name">{{ doc.name }}</span>
                <span class="document-size">{{ formatFileSize(doc.size) }}</span>
              </div>
              <button type="button" class="remove-button" @click="removeDocument(doc.id)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <button type="button" class="add-more-button" @click="triggerFileInput">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Add More Documents
            </button>
          </div>
        </div>
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          @change="handleFileSelect"
          multiple
        />
      </div>

      <button type="submit" class="submit-button">
        Proceed
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import Loader from "@/components/Loader.vue";

const props = defineProps({
  fields: {
    type: Array,
    required: true
  },
  initialValues: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit', 'input'])
const fileInput = ref(null)
const isDragging = ref(false)
const documents = ref([])
const formData = reactive({})
const isLoading = ref(true)

// Initialize form data with initial values
onMounted(() => {
  props.fields.forEach(field => {
    formData[field.name] = props.initialValues[field.name] || ''
  })
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
})

// Watch for changes in initialValues
watch(() => props.initialValues, (newValues) => {
  props.fields.forEach(field => {
    formData[field.name] = newValues[field.name] || formData[field.name] || ''
  })
}, { deep: true })

// Emit input events when form data changes
watch(formData, (newValues) => {
  Object.entries(newValues).forEach(([field, value]) => {
    emit('input', field, value)
  })
}, { deep: true })

const handleSubmit = () => {
  const formDataWithFiles = {
    ...formData,
    files: documents.value.map(doc => ({
      id: doc.id,
      name: doc.name,
      size: doc.size,
      type: doc.type,
      file: doc.file
    }))
  }
  emit('submit', formDataWithFiles)
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    if (isValidFileType(file)) {
      documents.value.push({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type.includes('pdf') ? 'pdf' : 'image',
        file: file // Store the actual file object for later upload
      })
    }
  })
}

const handleDrop = (event) => {
  isDragging.value = false
  const files = Array.from(event.dataTransfer.files)
  files.forEach(file => {
    if (isValidFileType(file)) {
      documents.value.push({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type.includes('pdf') ? 'pdf' : 'image',
        file: file // Store the actual file object for later upload
      })
    }
  })
}

const handleDragOver = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const isValidFileType = (file) => {
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
  ]
  return validTypes.includes(file.type)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
}

const removeDocument = (id) => {
  documents.value = documents.value.filter(doc => doc.id !== id)
}
</script>

<style scoped>
.document-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #2563eb;
  ring: 2px solid rgba(37, 99, 235, 0.2);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.upload-section {
  margin-top: 1rem;
}

.upload-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 2rem;
  transition: all 0.2s;
}

.upload-area.drag-over {
  border-color: #2563eb;
  background-color: rgba(37, 99, 235, 0.05);
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
}

.upload-icon {
  width: 2rem;
  height: 2rem;
  color: #9ca3af;
}

.browse-button {
  color: #2563eb;
  font-weight: 500;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}

.upload-hint {
  font-size: 0.75rem;
  color: #9ca3af;
}

.documents-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.document-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
}

.document-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.document-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #6b7280;
}

.document-name {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
}

.document-size {
  font-size: 0.75rem;
  color: #6b7280;
}

.remove-button {
  background-color: #fee2e2;
  color: #dc2626;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.remove-button:hover {
  background-color: #fecaca;
}

.add-more-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #f3f4f6;
  border: 1px dashed #d1d5db;
  border-radius: 0.375rem;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.add-more-button:hover {
  background-color: #e5e7eb;
}

.hidden {
  display: none;
}

.submit-button {
  background-color: #1e40af;
  color: white;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  transition: background-color 0.2s;
  margin-top: 1rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #1e3a8a;
}

.form-loader {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
