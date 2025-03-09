<!-- src/components/documents/DocumentForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="document-form">
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
      <h3 class="upload-title">Upload cover photo</h3>
      <div
        class="upload-area"
        @drop.prevent="handleDrop"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        :class="{ 'drag-over': isDragging }"
      >
        <div v-if="!coverPhoto" class="upload-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" class="upload-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
          <p>Upload cover photo by Dragging & dropping files or</p>
          <button type="button" class="browse-button" @click="triggerFileInput">Browse</button>
          <p class="upload-hint">Supported formats: JPEG and PNG</p>
        </div>
        <div v-else class="preview-container">
          <img :src="coverPhotoPreview" alt="Cover photo preview" class="photo-preview" />
          <button type="button" class="remove-button" @click="removeCoverPhoto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <input
        type="file"
        ref="fileInput"
        class="hidden"
        accept="image/jpeg,image/png"
        @change="handleFileSelect"
      />
    </div>

    <button type="submit" class="submit-button">
      Proceed
    </button>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  fields: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['submit'])
const router = useRouter()
const fileInput = ref(null)
const isDragging = ref(false)
const coverPhoto = ref(null)
const coverPhotoPreview = ref('')
const formData = reactive({})

// Initialize form data based on fields
props.fields.forEach(field => {
  formData[field.name] = ''
})

const handleSubmit = () => {
  const formDataWithFile = {
    ...formData,
    coverPhoto: coverPhoto.value
  }
  emit('submit', formDataWithFile)
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    processFile(file)
  }
}

const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
    processFile(file)
  }
}

const handleDragOver = (event) => {
  isDragging.value = true
}

const handleDragLeave = (event) => {
  isDragging.value = false
}

const processFile = (file) => {
  coverPhoto.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    coverPhotoPreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const removeCoverPhoto = () => {
  coverPhoto.value = null
  coverPhotoPreview.value = ''
  fileInput.value.value = ''
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
  text-align: center;
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
}

.upload-hint {
  font-size: 0.75rem;
  color: #9ca3af;
}

.preview-container {
  position: relative;
  display: inline-block;
}

.photo-preview {
  max-width: 100%;
  max-height: 200px;
  border-radius: 0.375rem;
}

.remove-button {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #ef4444;
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.remove-button:hover {
  background-color: #dc2626;
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
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #1e3a8a;
}
</style>
