<!-- src/views/documents/BuyerRepForm.vue -->
<template>
  <div class="buyer-rep-form">
    <h2 class="form-title">Buyer Rep</h2>

    <form @submit.prevent="handleSubmit" class="form-container">
      <!-- Buyer Name -->
      <div class="form-group">
        <label for="buyerName" class="form-label">Buyer name</label>
        <input
          type="text"
          id="buyerName"
          v-model="formData.buyerName"
          placeholder="Enter buyer's full name"
          class="form-input"
        />
      </div>

      <!-- Buyer Email -->
      <div class="form-group">
        <label for="buyerEmail" class="form-label">Buyer's Email</label>
        <input
          type="email"
          id="buyerEmail"
          v-model="formData.buyerEmail"
          placeholder="Johndoes@gmail.com"
          class="form-input"
        />
      </div>

      <!-- Phone Number -->
      <div class="form-group">
        <label for="phoneNumber" class="form-label">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          v-model="formData.phoneNumber"
          placeholder="555-123-4567"
          class="form-input"
        />
      </div>

      <!-- Property Type -->
      <div class="form-group">
        <label for="propertyType" class="form-label">Property Type</label>
        <div class="select-wrapper">
          <select
            id="propertyType"
            v-model="formData.propertyType"
            class="form-select"
          >
            <option value="" disabled selected>Select property type</option>
            <option v-for="type in propertyTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
          <div class="select-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Budget Range -->
      <div class="form-group">
        <label for="budgetRange" class="form-label">Budget Range</label>
        <input
          type="text"
          id="budgetRange"
          v-model="formData.budgetRange"
          placeholder="$200,000-$500,000"
          class="form-input"
        />
      </div>

      <!-- Additional Notes -->
      <div class="form-group">
        <label for="additionalNotes" class="form-label">Additional Notes/Requirements</label>
        <textarea
          id="additionalNotes"
          v-model="formData.additionalNotes"
          placeholder="Any specific requirements?"
          class="form-textarea"
        ></textarea>
      </div>

      <!-- File Upload -->
      <div class="upload-section">
        <div
          class="upload-area"
          @drop.prevent="handleDrop"
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          :class="{ 'drag-over': isDragging }"
        >
          <div v-if="!coverPhoto" class="upload-placeholder">
            <div class="upload-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <p class="upload-text">Upload cover photo by Dragging & dropping files or <button type="button" class="browse-button" @click="triggerFileInput">Browse</button></p>
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

      <!-- Submit Button -->
      <button type="submit" class="submit-button">
        Proceed
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useDocumentStore } from '@/stores/documents'

const router = useRouter()
const documentStore = useDocumentStore()
const fileInput = ref(null)
const isDragging = ref(false)
const coverPhoto = ref(null)
const coverPhotoPreview = ref('')

const propertyTypes = [
  'Single Family Home',
  'Condo',
  'Townhouse',
  'Multi-Family',
  'Land',
  'Commercial'
]

const formData = reactive({
  buyerName: '',
  buyerEmail: '',
  phoneNumber: '',
  propertyType: '',
  budgetRange: '',
  additionalNotes: ''
})

const handleSubmit = async () => {
  try {
    await documentStore.saveBuyerRepDocument({
      ...formData,
      coverPhoto: coverPhotoPreview.value,
      type: 'buyer-rep',
      createdAt: new Date().toISOString()
    })
    router.push('/receipts-docs/view-docs')
  } catch (error) {
    console.error('Error saving buyer rep document:', error)
  }
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

const handleDragOver = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
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
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<style scoped>
.buyer-rep-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.form-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
}

.form-container {
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
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #111827;
  background-color: white;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #9CA3AF;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #2563EB;
  box-shadow: 0 0 0 1px #2563EB;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.select-wrapper {
  position: relative;
}

.form-select {
  appearance: none;
  padding-right: 2.5rem;
}

.select-arrow {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #6B7280;
  width: 1.25rem;
  height: 1.25rem;
}

.upload-section {
  margin-top: 0.5rem;
}

.upload-area {
  border: 2px dashed #D1D5DB;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  background-color: #F9FAFB;
  transition: all 0.2s;
}

.upload-area.drag-over {
  border-color: #2563EB;
  background-color: #EFF6FF;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.upload-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #6B7280;
}

.upload-text {
  color: #374151;
  font-size: 0.875rem;
}

.browse-button {
  color: #2563EB;
  font-weight: 500;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline;
}

.upload-hint {
  color: #6B7280;
  font-size: 0.75rem;
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
  background-color: #EF4444;
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.remove-button:hover {
  background-color: #DC2626;
}

.hidden {
  display: none;
}

.submit-button {
  background-color: #1E40AF;
  color: white;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 0.5rem;
}

.submit-button:hover {
  background-color: #1E3A8A;
}
</style>
