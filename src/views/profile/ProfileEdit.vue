<template>
  <div class="profile-edit">
    <div class="content-card">
      <div class="header-content">
        <h2>Edit Profile</h2>
        <div class="header-actions">
          <button class="cancel-button" @click="navigateBack">Cancel</button>
          <button class="save-button" @click="saveProfile">Save Changes</button>
        </div>
      </div>

      <div class="card-body">
        <div v-if="isLoading" class="loading-indicator">
          <p>Loading profile data...</p>
        </div>
        <form v-else @submit.prevent="saveProfile" class="edit-form">
          <div class="avatar-section">
            <img
              :src="profileData.avatar || '/path-to-default-avatar.jpg'"
              class="profile-avatar"
              alt="Profile Picture"
            />
            <button type="button" class="change-avatar-btn">Change Profile Picture</button>
          </div>

          <div class="form-section">
            <h3>Personal Information</h3>

            <div class="form-grid">
              <div class="form-group">
                <label for="fullName">Full Name</label>
                <input
                  id="fullName"
                  v-model="profileData.fullName"
                  type="text"
                  class="form-control"
                  placeholder="Enter your full name"
                />
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="profileData.email"
                  type="email"
                  class="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div class="form-group">
                <label for="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  v-model="profileData.phoneNumber"
                  type="tel"
                  class="form-control"
                  placeholder="Enter your phone number"
                />
              </div>

              <div class="form-group">
                <label for="alternatePhone">Alternate Phone Number</label>
                <input
                  id="alternatePhone"
                  v-model="profileData.alternatePhone"
                  type="tel"
                  class="form-control"
                  placeholder="Enter alternate phone number"
                />
              </div>
            </div>
          </div>

          <!-- Conditional fields based on user role -->
          <div v-if="userRole === 'agent'" class="form-section">
            <h3>Professional Information</h3>

            <div class="form-grid">
              <div class="form-group">
                <label for="companyName">Agency/Company Name</label>
                <input
                  id="companyName"
                  v-model="profileData.companyName"
                  type="text"
                  class="form-control"
                  placeholder="Enter company name"
                />
              </div>

              <div class="form-group">
                <label for="companyDescription">Agency/Company Description</label>
                <textarea
                  id="companyDescription"
                  v-model="profileData.companyDescription"
                  class="form-control"
                  rows="3"
                  placeholder="Enter company description"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="recoNumber">RECO Number</label>
                <input
                  id="recoNumber"
                  v-model="profileData.recoNumber"
                  type="text"
                  class="form-control"
                  placeholder="Enter RECO number"
                />
              </div>

              <div class="form-group">
                <label for="trebbNumber">TREBB Number</label>
                <input
                  id="trebbNumber"
                  v-model="profileData.trebbNumber"
                  type="text"
                  class="form-control"
                  placeholder="Enter TREBB number"
                />
              </div>

              <div class="form-group">
                <label for="yearsExperience">Years of Experience</label>
                <input
                  id="yearsExperience"
                  v-model="profileData.yearsExperience"
                  type="number"
                  class="form-control"
                  placeholder="Enter years of experience"
                />
              </div>

              <div class="form-group">
                <label for="specialties">Areas of Specialty</label>
                <input
                  id="specialties"
                  v-model="profileData.specialties"
                  type="text"
                  class="form-control"
                  placeholder="E.g., Luxury homes, Waterfront properties"
                />
              </div>
            </div>
          </div>

          <div v-if="userRole === 'admin'" class="form-section">
            <h3>Administrative Information</h3>

            <div class="form-grid">
              <div class="form-group">
                <label for="jobTitle">Job Title</label>
                <input
                  id="jobTitle"
                  v-model="profileData.jobTitle"
                  type="text"
                  class="form-control"
                  placeholder="Enter job title"
                />
              </div>

              <div class="form-group">
                <label for="department">Department</label>
                <input
                  id="department"
                  v-model="profileData.department"
                  type="text"
                  class="form-control"
                  placeholder="Enter department"
                />
              </div>

              <div class="form-group">
                <label for="adminRole">Admin Role</label>
                <select
                  id="adminRole"
                  v-model="profileData.adminRole"
                  class="form-control"
                >
                  <option value="">Select role</option>
                  <option value="System Administrator">System Administrator</option>
                  <option value="Content Manager">Content Manager</option>
                  <option value="User Manager">User Manager</option>
                </select>
              </div>
            </div>
          </div>

          <div v-if="userRole === 'client'" class="form-section">
            <h3>Client Information</h3>

            <div class="form-grid">
              <div class="form-group">
                <label for="address">Address</label>
                <input
                  id="address"
                  v-model="profileData.address"
                  type="text"
                  class="form-control"
                  placeholder="Enter your address"
                />
              </div>

              <div class="form-group">
                <label for="propertyType">Preferred Property Type</label>
                <select
                  id="propertyType"
                  v-model="profileData.propertyType"
                  class="form-control"
                >
                  <option value="">Select property type</option>
                  <option value="Single-family home">Single-family home</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Multi-family">Multi-family</option>
                </select>
              </div>

              <div class="form-group">
                <label for="budgetRange">Budget Range</label>
                <input
                  id="budgetRange"
                  v-model="profileData.budgetRange"
                  type="text"
                  class="form-control"
                  placeholder="E.g., $500,000 - $750,000"
                />
              </div>

              <div class="form-group">
                <label for="preferredLocations">Preferred Locations</label>
                <input
                  id="preferredLocations"
                  v-model="profileData.preferredLocations"
                  type="text"
                  class="form-control"
                  placeholder="E.g., Brooklyn, Queens"
                />
              </div>

              <div class="form-group">
                <label for="bedrooms">Minimum Bedrooms</label>
                <input
                  id="bedrooms"
                  v-model="profileData.bedrooms"
                  type="text"
                  class="form-control"
                  placeholder="E.g., 3+"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profile';

const router = useRouter();
const profileStore = useProfileStore();
const isLoading = ref(true);
const profileData = ref({});

// Get user role from store
const userRole = computed(() => profileStore.userRole);

onMounted(() => {
  // Load profile data when component mounts
  profileStore.fetchProfileData();

  // Wait for data to be loaded
  setTimeout(() => {
    profileData.value = { ...profileStore.profileData };
    isLoading.value = false;
  }, 300);
});

const saveProfile = () => {
  // Show loading while saving
  isLoading.value = true;

  // Update profile data in store
  profileStore.updateProfileData(profileData.value);

  // Navigate back to profile page after short delay
  setTimeout(() => {
    router.push('/profile');
  }, 500);
};

const navigateBack = () => {
  router.push('/profile');
};
</script>

<style scoped>
.profile-edit {
  padding: 24px 32px;
  background-color: #f9fafb;
}

.content-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.header-content {
  background-color: #f3f4f6;
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
}

.header-content h2 {
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  color: #111827;
  margin: 0;
  letter-spacing: -0.025em;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.cancel-button {
  padding: 8px 16px;
  background-color: white;
  color: #4b5563;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-button:hover {
  background-color: #f3f4f6;
}

.save-button {
  padding: 8px 16px;
  background-color: #1d4ed8;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-button:hover {
  background-color: #1e40af;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 32px 24px;
  background-color: white;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  text-align: center;
}

.edit-form {
  max-width: 800px;
  margin: 0 auto;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f3f4f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.change-avatar-btn {
  padding: 8px 16px;
  background-color: white;
  color: #4b5563;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.change-avatar-btn:hover {
  background-color: #f3f4f6;
}

.form-section {
  margin-bottom: 32px;
}

.form-section h3 {
  font-size: 16px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  line-height: 20px;
  color: #111827;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  transition: border-color 0.15s ease-in-out;
}

.form-control:focus {
  border-color: #2563eb;
  outline: 0;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

textarea.form-control {
  resize: vertical;
}

@media (max-width: 768px) {
  .profile-edit {
    padding: 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
