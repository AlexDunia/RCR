<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePropertyStore } from '@/stores/propertyStore'

const router = useRouter()
const propertyStore = usePropertyStore()

// Form data
const formData = ref({
  name: '',
  type: 'residential',
  status: 'for_sale',
  price: null,
  description: '',
  address: '',
  city: '',
  state: '',
  postal_code: '',
  bedrooms: null,
  bathrooms: null,
  size: null,
  images: []
})

// Loading and error states
const isLoading = ref(false)
const error = ref(null)

// Handle image upload
const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  formData.value.images = files
}

// Submit form
const handleSubmit = async () => {
  try {
    isLoading.value = true
    error.value = null

    // Create FormData object for multipart/form-data
    const data = new FormData()

    // Add all form fields
    Object.entries(formData.value).forEach(([key, value]) => {
      if (key === 'images') {
        // Add each image file
        value.forEach(file => {
          data.append('images[]', file)
        })
      } else if (value !== null && value !== '') {
        data.append(key, value)
      }
    })

    // Create property
    await propertyStore.createProperty(data)

    // Redirect to listings page
    router.push('/listings')
  } catch (err) {
    error.value = err.message || 'Failed to create property'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="add-listing-form">
    <h2>Add New Property</h2>

    <!-- Error Message -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- Basic Information -->
    <div class="form-section">
      <h3>Basic Information</h3>

      <div class="form-group">
        <label for="name">Property Name</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          placeholder="Enter property name"
        >
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="type">Property Type</label>
          <select id="type" v-model="formData.type" required>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" v-model="formData.status" required>
            <option value="for_sale">For Sale</option>
            <option value="for_rent">For Rent</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
          id="price"
          v-model.number="formData.price"
          type="number"
          required
          min="0"
          placeholder="Enter property price"
        >
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="formData.description"
          required
          rows="4"
          placeholder="Enter property description"
        ></textarea>
      </div>
    </div>

    <!-- Location Information -->
    <div class="form-section">
      <h3>Location</h3>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          id="address"
          v-model="formData.address"
          type="text"
          required
          placeholder="Enter street address"
        >
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="city">City</label>
          <input
            id="city"
            v-model="formData.city"
            type="text"
            required
            placeholder="Enter city"
          >
        </div>

        <div class="form-group">
          <label for="state">State</label>
          <input
            id="state"
            v-model="formData.state"
            type="text"
            required
            placeholder="Enter state"
          >
        </div>

        <div class="form-group">
          <label for="postal_code">Postal Code</label>
          <input
            id="postal_code"
            v-model="formData.postal_code"
            type="text"
            required
            placeholder="Enter postal code"
          >
        </div>
      </div>
    </div>

    <!-- Property Details -->
    <div class="form-section">
      <h3>Property Details</h3>

      <div class="form-row">
        <div class="form-group">
          <label for="bedrooms">Bedrooms</label>
          <input
            id="bedrooms"
            v-model.number="formData.bedrooms"
            type="number"
            min="0"
            placeholder="Number of bedrooms"
          >
        </div>

        <div class="form-group">
          <label for="bathrooms">Bathrooms</label>
          <input
            id="bathrooms"
            v-model.number="formData.bathrooms"
            type="number"
            min="0"
            placeholder="Number of bathrooms"
          >
        </div>

        <div class="form-group">
          <label for="size">Size (sq ft)</label>
          <input
            id="size"
            v-model.number="formData.size"
            type="number"
            min="0"
            placeholder="Property size in square feet"
          >
        </div>
      </div>
    </div>

    <!-- Images -->
    <div class="form-section">
      <h3>Property Images</h3>

      <div class="form-group">
        <label for="images">Upload Images</label>
        <input
          id="images"
          type="file"
          multiple
          accept="image/*"
          @change="handleImageUpload"
          required
        >
        <small>You can select multiple images</small>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="form-actions">
      <button type="submit" :disabled="isLoading" class="submit-btn">
        {{ isLoading ? 'Creating Property...' : 'Create Property' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.add-listing-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-section h3 {
  margin: 0 0 20px;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

input,
select,
textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input[type="file"] {
  padding: 8px 0;
  border: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

small {
  display: block;
  margin-top: 4px;
  color: #666;
  font-size: 12px;
}

.error-message {
  background: #ffebee;
  color: #d32f2f;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.form-actions {
  text-align: center;
  margin-top: 30px;
}

.submit-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background: #43A047;
}

.submit-btn:disabled {
  background: #9E9E9E;
  cursor: not-allowed;
}
</style>
