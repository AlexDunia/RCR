<template>
  <div class="content-area">
    <div class="content-card">
      <div class="header-content">
        <h2>Your Personal Information</h2>
        <router-link
          to="/profile/edit"
          class="edit-button"
        >
          Edit profile
        </router-link>
      </div>

      <div class="card-body">
        <div class="profile-image-container">
          <img
            :src="profileData?.avatar || '/path-to-default-avatar.jpg'"
            class="large-profile-image"
            alt="Profile Picture"
          />
        </div>

        <div class="info-grid">
          <div class="info-item">
            <h3>Full name</h3>
            <p>{{ profileData?.fullName }}</p>
          </div>
          <div class="info-item">
            <h3>Email</h3>
            <p>{{ profileData?.email }}</p>
          </div>
          <div class="info-item">
            <h3>Phone number</h3>
            <p>{{ profileData?.phoneNumber }}</p>
          </div>
          <div class="info-item">
            <h3>Alternate phone number</h3>
            <p>{{ profileData?.alternatePhone }}</p>
          </div>
          <div class="info-item">
            <h3>Agency/Company name</h3>
            <p>{{ profileData?.companyName }}</p>
          </div>
          <div class="info-item">
            <h3>Agency/Company description</h3>
            <p>{{ profileData?.companyDescription }}</p>
          </div>
          <div class="info-item">
            <h3>Country of residence</h3>
            <p>{{ profileData?.address }}</p>
          </div>
        </div>

        <!-- Agent-specific section -->
        <div class="more-section">
          <h3>Agent Details</h3>
          <div class="info-grid">
            <div class="info-item">
              <h3>RECO number</h3>
              <p>{{ profileData?.recoNumber }}</p>
            </div>
            <div class="info-item">
              <h3>TREBB number</h3>
              <p>{{ profileData?.trebbNumber }}</p>
            </div>
            <div class="info-item">
              <h3>Years of experience</h3>
              <p>{{ profileData?.yearsExperience || 'Not specified' }}</p>
            </div>
            <div class="info-item">
              <h3>Areas of specialty</h3>
              <p>{{ profileData?.specialties || 'Not specified' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useProfileStore } from '@/stores/profile';

const profileStore = useProfileStore();
const profileData = computed(() => profileStore.profileData);
</script>

<style scoped>
.content-area {
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

.profile-image-container {
  padding: 32px 0;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.large-profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f3f4f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.large-profile-image:hover {
  transform: scale(1.02);
}

.edit-button {
  padding: 8px 16px;
  background-color: #1d4ed8;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.edit-button:hover {
  background-color: #1e40af;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.edit-button:active {
  transform: translateY(0);
}

.card-body {
  padding: 32px 24px;
  background-color: white;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px 64px;
}

.info-item h3 {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 6px;
  letter-spacing: -0.025em;
}

.info-item p {
  font-size: 14px;
  line-height: 20px;
  color: #111827;
  margin: 0;
  font-weight: 400;
}

.more-section {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(229, 231, 235, 0.8);
}

.more-section > h3 {
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 16px;
  letter-spacing: -0.025em;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .content-area {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
