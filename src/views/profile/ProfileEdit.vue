<template>
  <div class="profile-edit">
    <div class="content-card">
      <div class="header-content">
        <h2>Edit personal information</h2>
        <div class="header-actions">
          <button class="cancel-button" @click="navigateBack">Cancel</button>
          <button class="save-button" @click="saveProfile">Save changes</button>
        </div>
      </div>

      <div class="card-body">
        <div v-if="isLoading" class="loading-indicator">
          <p>Loading profile data...</p>
        </div>
        <form v-else @submit.prevent="saveProfile" class="edit-form">
            <div class="form-grid">
              <div class="form-group">
              <label for="fullName">Full name</label>
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
              <label for="phoneNumber">Phone number</label>
                <input
                  id="phoneNumber"
                  v-model="profileData.phoneNumber"
                  type="tel"
                  class="form-control"
                  placeholder="Enter your phone number"
                />
              </div>

              <div class="form-group">
              <label for="alternatePhone">Alternate phone number</label>
                <input
                  id="alternatePhone"
                v-model="profileData.alternatePhoneNumber"
                  type="tel"
                  class="form-control"
                  placeholder="Enter alternate phone number"
                />
              </div>

              <div class="form-group">
              <label for="companyName">Agency/Company name</label>
                <input
                  id="companyName"
                v-model="profileData.agencyName"
                  type="text"
                  class="form-control"
                  placeholder="Enter company name"
                />
              </div>

              <div class="form-group">
              <label for="companyDescription">Agency/Company description</label>
                <textarea
                  id="companyDescription"
                v-model="profileData.agencyDescription"
                  class="form-control"
                  rows="3"
                  placeholder="Enter company description"
                ></textarea>
              </div>

              <div class="form-group">
              <label for="countryOfResidence">Country of residence</label>
              <input
                id="countryOfResidence"
                v-model="profileData.countryOfResidence"
                type="text"
                class="form-control"
                placeholder="Enter your country of residence"
              />
            </div>
          </div>

          <div class="profile-photo-section">
            <div class="profile-photo-container">
              <img
                :src="profileData.largeAvatar || defaultAvatar"
                alt="Profile Photo"
                class="profile-large-avatar"
              />
            </div>
            <div class="photo-actions">
              <p class="pick-photo-text">Pick a new profile image</p>
              <label class="choose-file-btn">
                Choose file
                <input
                  type="file"
                  accept="image/*"
                  @change="handleFileSelect"
                  style="display: none;"
                />
              </label>
              <span class="no-file-text">{{ selectedFile ? selectedFile.name : 'No file chosen' }}</span>
            </div>
          </div>

          <h3 class="more-heading">More</h3>

          <div class="form-grid more-grid">
            <div class="form-group">
              <label for="recoNumber">RECO number</label>
                <input
                  id="recoNumber"
                  v-model="profileData.recoNumber"
                  type="text"
                  class="form-control"
                  placeholder="Enter RECO number"
                />
              </div>

              <div class="form-group">
              <label for="trebbNumber">TREBB number</label>
                <input
                  id="trebbNumber"
                  v-model="profileData.trebbNumber"
                  type="text"
                  class="form-control"
                  placeholder="Enter TREBB number"
                />
              </div>
              </div>

          <div class="social-connect-section">
            <div class="social-connect-grid">
              <div class="social-option">
                <input type="radio" name="profileLinking" id="linkProfile" class="social-checkbox" checked />
                <label for="linkProfile">Link your profiles to grow your reach</label>
              </div>
              <div class="social-option">
                <input type="radio" name="profileLinking" id="noLink" class="social-checkbox" />
                <label for="noLink">I do not want to link my profile</label>
              </div>
            </div>

            <div class="social-buttons">
              <button type="button" class="social-button facebook">
                <span class="social-icon">f</span>
                Connect your Facebook account
              </button>

              <button type="button" class="social-button instagram">
                <span class="social-icon">In</span>
                Connect your Instagram account
              </button>

              <button type="button" class="social-button linkedin">
                <span class="social-icon">in</span>
                Connect your LinkedIn account
              </button>
          </div>

            <div class="connected-accounts">
              <div class="connected-account">
                <div class="account-info">
                  <img :src="defaultAvatar" alt="Profile" class="account-avatar" />
                  <div class="account-details">
                    <span class="account-handle">@alexandrealtor_</span>
                    <span class="account-platform">LinkedIn account</span>
                  </div>
                </div>
                <button class="remove-account">×</button>
              </div>

              <div class="connected-account">
                <div class="account-info">
                  <img :src="defaultAvatar" alt="Profile" class="account-avatar" />
                  <div class="account-details">
                    <span class="account-handle">@alexandrealtor_</span>
                    <span class="account-platform">Facebook account</span>
                  </div>
                </div>
                <button class="remove-account">×</button>
              </div>

              <div class="connected-account">
                <div class="account-info">
                  <img :src="defaultAvatar" alt="Profile" class="account-avatar" />
                  <div class="account-details">
                    <span class="account-handle">@alexandrealtor_</span>
                    <span class="account-platform">Instagram account</span>
                  </div>
                </div>
                <button class="remove-account">×</button>
              </div>
            </div>
          </div>

          <div class="action-buttons">
            <button type="button" class="cancel-button" @click="navigateBack">Cancel</button>
            <button type="submit" class="save-button">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profile';

const router = useRouter();
const profileStore = useProfileStore();
const isLoading = ref(true);
const profileData = ref({});
const selectedFile = ref(null);

// Add the default avatar URL constant
const defaultAvatar = 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png';

onMounted(() => {
  // Load profile data when component mounts
  profileStore.fetchProfileData();

  // Wait for data to be loaded
  setTimeout(() => {
    profileData.value = { ...profileStore.profileData };
    isLoading.value = false;
  }, 300);
});

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    // Create a preview URL
    profileData.value.largeAvatar = URL.createObjectURL(file);
  }
};

const saveProfile = () => {
  // Show loading while saving
  isLoading.value = true;

  // If we have a selected file, we would upload it here
  if (selectedFile.value) {
    // In a real app, you would upload the file to your server
    console.log('File to upload:', selectedFile.value);

    // For demo purposes, we're just using the local object URL
    // In production, this would be the URL returned from your file upload API
    profileData.value.avatar = profileData.value.largeAvatar;
  }

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
  padding: 0;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: poppins;
}

.content-card {
  background: #fff;
  border-radius: 0;
  overflow: hidden;
}

.header-content {
  background-color: #fff;
  width: 100%;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}

.header-content h2 {
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.cancel-button {
  padding: 8px 16px;
  background-color: #fff;
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
  background-color: #f9fafb;
}

.save-button {
  padding: 8px 16px;
  background-color: #0B3B86;
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
  background-color: #092D66;
}

.card-body {
  padding: 24px;
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
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px 40px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
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
  min-height: 80px;
}

.profile-photo-section {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-top: 8px;
  margin-bottom: 32px;
}

.profile-photo-container {
  width: 160px;
  height: 160px;
  overflow: hidden;
  border-radius: 9999px;
}

.profile-large-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.pick-photo-text {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.choose-file-btn {
  padding: 8px 16px;
  background-color: #f9fafb;
  color: #4b5563;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
  position: relative;
  overflow: hidden;
}

.choose-file-btn input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  cursor: inherit;
  display: block;
}

.no-file-text {
  font-size: 14px;
  color: #6b7280;
}

.more-heading {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 24px 0;
}

.more-grid {
  margin-bottom: 32px;
}

.social-connect-section {
  margin-bottom: 32px;
}

.social-connect-grid {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.social-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.social-checkbox {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
}

.social-option label {
  font-size: 14px;
  color: #111827;
}

.social-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.social-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;
}

.social-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.connected-accounts {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.connected-account {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f9fafb;
  border-radius: 6px;
}

.account-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.account-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.account-details {
  display: flex;
  flex-direction: column;
}

.account-handle {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.account-platform {
  font-size: 12px;
  color: #6b7280;
}

.remove-account {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background-color: #e5e7eb;
  color: #4b5563;
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

@media (max-width: 768px) {
  .profile-edit {
    padding: 16px;
  }

  .form-grid,
  .social-buttons {
    grid-template-columns: 1fr;
  }

  .profile-photo-section {
    flex-direction: column;
    align-items: center;
  }

  .social-connect-grid {
    flex-direction: column;
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
}
</style>
