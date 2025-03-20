<!-- src/features/agents/EditListing.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isSaving = ref(false);
const isLoading = ref(true);
const error = ref(null);

const formData = ref({
  id: '',
  title: '',
  price: null,
  address: '',
  city: '',
  state: '',
  zip: '',
  description: '',
  bedrooms: null,
  bathrooms: null,
  sqft: null,
  lotSize: '',
  yearBuilt: null,
  propertyType: 'single-family',
  status: 'draft',
  features: []
});

const featureOptions = [
  'Swimming Pool',
  'Garage',
  'Fireplace',
  'Central AC',
  'Hardwood Floors',
  'Stainless Steel Appliances',
  'Granite Countertops',
  'Deck/Patio',
  'Fenced Yard',
  'Walk-in Closet',
  'Garden',
  'Energy Efficient'
];

onMounted(async () => {
  const listingId = route.params.id;

  try {
    // In a real app, you would fetch the listing from an API
    // const response = await fetchListingById(listingId);
    // formData.value = response.data;

    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock data for demonstration
    formData.value = {
      id: listingId,
      title: 'Beautiful Modern Home in Quiet Neighborhood',
      price: 450000,
      status: 'active',
      address: '123 Maple Street',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      description: 'This stunning property features an open floor plan with abundant natural light, high ceilings, and premium finishes throughout. The gourmet kitchen includes stainless steel appliances, granite countertops, and a spacious island. Located in a sought-after neighborhood with excellent schools and convenient access to shopping, dining, and parks.',
      bedrooms: 4,
      bathrooms: 2.5,
      sqft: 2450,
      lotSize: '0.25 acres',
      yearBuilt: 2018,
      propertyType: 'single-family',
      features: [
        'Central AC',
        'Hardwood Floors',
        'Fireplace',
        'Garage',
        'Granite Countertops'
      ]
    };

    isLoading.value = false;
  } catch (err) {
    console.error('Failed to fetch listing:', err);
    error.value = 'Failed to load property details. Please try again.';
    isLoading.value = false;
  }
});

const toggleFeature = (feature) => {
  const index = formData.value.features.indexOf(feature);
  if (index === -1) {
    formData.value.features.push(feature);
  } else {
    formData.value.features.splice(index, 1);
  }
};

const handleSubmit = async () => {
  try {
    isSaving.value = true;

    // In a real app, you'd send the form data to an API
    // const response = await updateListing(formData.value.id, formData.value);

    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 800));

    // Redirect to manage listings page
    router.push('/manage-listings');
  } catch (err) {
    console.error('Failed to update listing:', err);
    error.value = 'Failed to update listing. Please try again.';
    isSaving.value = false;
  }
};

const handleSaveDraft = async () => {
  formData.value.status = 'draft';
  await handleSubmit();
};

const handlePublish = async () => {
  formData.value.status = 'active';
  await handleSubmit();
};

const goBack = () => {
  router.push('/manage-listings');
};

const deleteListing = async () => {
  if (!confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
    return;
  }

  try {
    // In a real app, you'd send a delete request to the API
    // await deleteListing(formData.value.id);

    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 800));

    // Redirect to manage listings page
    router.push('/manage-listings');
  } catch (err) {
    console.error('Failed to delete listing:', err);
    error.value = 'Failed to delete listing. Please try again.';
  }
};
</script>

<template>
  <div class="edit-listing">
    <div class="page-header">
      <h1>Edit Listing</h1>
      <button class="back-button" @click="goBack">
        Back to Listings
      </button>
    </div>

    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading property details...</p>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <form v-else @submit.prevent="handlePublish" class="listing-form">
      <div class="form-section">
        <h2>Basic Information</h2>

        <div class="form-group">
          <label for="title">Listing Title</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            required
            placeholder="e.g. Beautiful 3BR Home with Pool"
          />
        </div>

        <div class="form-group">
          <label for="price">Price ($)</label>
          <input
            id="price"
            v-model.number="formData.price"
            type="number"
            required
            min="1"
            step="1000"
            placeholder="e.g. 450000"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="property-type">Property Type</label>
            <select id="property-type" v-model="formData.propertyType" required>
              <option value="single-family">Single Family Home</option>
              <option value="condo">Condo/Townhouse</option>
              <option value="multi-family">Multi-Family</option>
              <option value="land">Land/Lot</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" v-model="formData.status">
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2>Location</h2>

        <div class="form-group">
          <label for="address">Street Address</label>
          <input
            id="address"
            v-model="formData.address"
            type="text"
            required
            placeholder="e.g. 123 Main St"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="city">City</label>
            <input
              id="city"
              v-model="formData.city"
              type="text"
              required
              placeholder="e.g. Anytown"
            />
          </div>

          <div class="form-group">
            <label for="state">State</label>
            <input
              id="state"
              v-model="formData.state"
              type="text"
              required
              maxlength="2"
              placeholder="e.g. CA"
            />
          </div>

          <div class="form-group">
            <label for="zip">ZIP Code</label>
            <input
              id="zip"
              v-model="formData.zip"
              type="text"
              required
              maxlength="10"
              placeholder="e.g. 12345"
            />
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2>Property Details</h2>

        <div class="form-row">
          <div class="form-group">
            <label for="bedrooms">Bedrooms</label>
            <input
              id="bedrooms"
              v-model.number="formData.bedrooms"
              type="number"
              required
              min="0"
              placeholder="e.g. 3"
            />
          </div>

          <div class="form-group">
            <label for="bathrooms">Bathrooms</label>
            <input
              id="bathrooms"
              v-model.number="formData.bathrooms"
              type="number"
              required
              min="0"
              step="0.5"
              placeholder="e.g. 2.5"
            />
          </div>

          <div class="form-group">
            <label for="sqft">Square Feet</label>
            <input
              id="sqft"
              v-model.number="formData.sqft"
              type="number"
              required
              min="0"
              placeholder="e.g. 2200"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="lot-size">Lot Size</label>
            <input
              id="lot-size"
              v-model="formData.lotSize"
              type="text"
              placeholder="e.g. 0.25 acres"
            />
          </div>

          <div class="form-group">
            <label for="year-built">Year Built</label>
            <input
              id="year-built"
              v-model.number="formData.yearBuilt"
              type="number"
              min="1800"
              :max="new Date().getFullYear()"
              placeholder="e.g. 2010"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="6"
            required
            placeholder="Describe the property in detail..."
          ></textarea>
        </div>
      </div>

      <div class="form-section">
        <h2>Features & Amenities</h2>

        <div class="features-grid">
          <div
            v-for="feature in featureOptions"
            :key="feature"
            class="feature-checkbox"
            :class="{ 'selected': formData.features.includes(feature) }"
            @click="toggleFeature(feature)"
          >
            <input
              type="checkbox"
              :id="feature"
              :checked="formData.features.includes(feature)"
              @change="toggleFeature(feature)"
            />
            <label :for="feature">{{ feature }}</label>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2>Images</h2>
        <p class="form-note">Manage property images (Coming soon)</p>
        <!-- Image management functionality would be added here -->
      </div>

      <div class="form-actions">
        <button
          type="button"
          class="delete-button"
          @click="deleteListing"
          :disabled="isSaving"
        >
          Delete Listing
        </button>
        <div class="save-actions">
          <button
            type="button"
            class="save-draft-button"
            @click="handleSaveDraft"
            :disabled="isSaving"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            class="publish-button"
            :disabled="isSaving"
          >
            {{ isSaving ? 'Saving...' : 'Update Listing' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.edit-listing {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0;
}

.back-button {
  background-color: transparent;
  color: #1976d2;
  border: none;
  padding: 10px 0;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.back-button:hover {
  text-decoration: underline;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #1976d2;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  padding: 15px;
  text-align: center;
  color: #e53935;
  background-color: #ffebee;
  border-radius: 8px;
  margin-bottom: 20px;
}

.listing-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.form-group textarea {
  resize: vertical;
}

.form-note {
  color: #757575;
  font-size: 14px;
  margin-top: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.feature-checkbox {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #ddd;
  transition: all 0.2s;
}

.feature-checkbox.selected {
  background-color: #e3f2fd;
  border-color: #bbdefb;
}

.feature-checkbox input {
  margin-right: 8px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.save-actions {
  display: flex;
  gap: 10px;
}

.save-draft-button,
.publish-button,
.delete-button {
  padding: 12px 20px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.save-draft-button {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.save-draft-button:hover {
  background-color: #e0e0e0;
}

.publish-button {
  background-color: #1976d2;
  color: white;
}

.publish-button:hover {
  background-color: #1565c0;
}

.delete-button {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ffcdd2;
}

.delete-button:hover {
  background-color: #ffcdd2;
}

.save-draft-button:disabled,
.publish-button:disabled,
.delete-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
