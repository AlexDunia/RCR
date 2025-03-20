<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// Import will be used when API is implemented
// import { updateUserProfile } from './profileApi';

const router = useRouter();
const isLoading = ref(false);
const error = ref(null);
const profileData = ref({
  name: '',
  email: '',
  phone: '',
  bio: '',
  avatar: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  socialLinks: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  }
});

// Fetch user profile data on mount
onMounted(async () => {
  try {
    isLoading.value = true;
    // In a real app, you'd fetch the profile data from an API
    // For now we're using mock data
    // const response = await getUserProfile();
    // profileData.value = response;

    // Simulate API call with timeout
    setTimeout(() => {
      profileData.value = {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '(555) 123-4567',
        bio: 'Experienced real estate agent with 10+ years helping clients find their dream homes.',
        avatar: '/profile-placeholder.jpg',
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        socialLinks: {
          facebook: 'https://facebook.com/johnsmith',
          twitter: 'https://twitter.com/johnsmith',
          instagram: 'https://instagram.com/johnsmith',
          linkedin: 'https://linkedin.com/in/johnsmith'
        }
      };
      isLoading.value = false;
    }, 500);
  } catch (err) {
    console.error('Failed to load profile data:', err);
    error.value = 'Failed to load profile data. Please try again.';
    isLoading.value = false;
  }
});

const saveProfile = async () => {
  try {
    isLoading.value = true;
    // In a real app, you'd send the updated profile to an API
    // await updateUserProfile(profileData.value);

    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 800));

    // Navigate back to profile view
    router.push('/profile');
  } catch (err) {
    console.error('Failed to save profile data:', err);
    error.value = 'Failed to save profile data. Please try again.';
    isLoading.value = false;
  }
};

const cancelEdit = () => {
  router.push('/profile');
};
</script>

<template>
  <div class="profile-edit-container">
    <h1>Edit Profile</h1>

    <div v-if="isLoading" class="loading-state">
      Loading profile data...
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <form v-else @submit.prevent="saveProfile" class="profile-form">
      <div class="form-section">
        <h2>Personal Information</h2>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            id="name"
            v-model="profileData.name"
            type="text"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="profileData.email"
            type="email"
            required
          />
        </div>

        <div class="form-group">
          <label for="phone">Phone</label>
          <input
            id="phone"
            v-model="profileData.phone"
            type="tel"
          />
        </div>

        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea
            id="bio"
            v-model="profileData.bio"
            rows="4"
          ></textarea>
        </div>
      </div>

      <div class="form-section">
        <h2>Address</h2>

        <div class="form-group">
          <label for="address">Street Address</label>
          <input
            id="address"
            v-model="profileData.address"
            type="text"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="city">City</label>
            <input
              id="city"
              v-model="profileData.city"
              type="text"
            />
          </div>

          <div class="form-group">
            <label for="state">State</label>
            <input
              id="state"
              v-model="profileData.state"
              type="text"
              maxlength="2"
            />
          </div>

          <div class="form-group">
            <label for="zip">ZIP Code</label>
            <input
              id="zip"
              v-model="profileData.zip"
              type="text"
              maxlength="10"
            />
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2>Social Media</h2>

        <div class="form-group">
          <label for="facebook">Facebook</label>
          <input
            id="facebook"
            v-model="profileData.socialLinks.facebook"
            type="url"
            placeholder="https://facebook.com/yourprofile"
          />
        </div>

        <div class="form-group">
          <label for="twitter">Twitter</label>
          <input
            id="twitter"
            v-model="profileData.socialLinks.twitter"
            type="url"
            placeholder="https://twitter.com/yourhandle"
          />
        </div>

        <div class="form-group">
          <label for="instagram">Instagram</label>
          <input
            id="instagram"
            v-model="profileData.socialLinks.instagram"
            type="url"
            placeholder="https://instagram.com/yourhandle"
          />
        </div>

        <div class="form-group">
          <label for="linkedin">LinkedIn</label>
          <input
            id="linkedin"
            v-model="profileData.socialLinks.linkedin"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="cancel-button" @click="cancelEdit">Cancel</button>
        <button type="submit" class="save-button" :disabled="isLoading">
          {{ isLoading ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.profile-edit-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading-state, .error-message {
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 20px 0;
}

.error-message {
  color: #e53935;
  background-color: #ffebee;
}

.profile-form {
  margin-top: 20px;
}

.form-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  resize: vertical;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-button {
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.save-button {
  padding: 10px 20px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.save-button:hover {
  background-color: #1565c0;
}

.save-button:disabled {
  background-color: #90caf9;
  cursor: not-allowed;
}
</style>
