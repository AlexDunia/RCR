<template>
  <div class="content-area">
    <div class="content-card">
      <div class="header-content">
        <h2>Administrator Information</h2>
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
            <h3>Job title</h3>
            <p>{{ profileData?.jobTitle || 'Administrator' }}</p>
          </div>
          <div class="info-item">
            <h3>Department</h3>
            <p>{{ profileData?.department || 'Administration' }}</p>
          </div>
        </div>

        <!-- Admin-specific section -->
        <div class="more-section">
          <h3>System Access</h3>
          <div class="info-grid">
            <div class="info-item">
              <h3>Role</h3>
              <p>{{ profileData?.adminRole || 'System Administrator' }}</p>
            </div>
            <div class="info-item">
              <h3>Access level</h3>
              <p>{{ profileData?.accessLevel || 'Full access' }}</p>
            </div>
            <div class="info-item">
              <h3>Last login</h3>
              <p>{{ profileData?.lastLogin || 'Not available' }}</p>
            </div>
            <div class="info-item">
              <h3>Account created</h3>
              <p>{{ profileData?.createdAt || 'Not available' }}</p>
            </div>
          </div>
        </div>

        <div class="more-section">
          <h3>System Management</h3>
          <div class="admin-actions">
            <button class="admin-button">Manage Users</button>
            <button class="admin-button">System Settings</button>
            <button class="admin-button">View Logs</button>
            <button class="admin-button">Backup System</button>
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

.admin-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.admin-button {
  padding: 12px 20px;
  background-color: #f3f4f6;
  color: #111827;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.admin-button:hover {
  background-color: #e5e7eb;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .info-grid,
  .admin-actions {
    grid-template-columns: 1fr;
  }

  .content-area {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
