<template>
  <div class="client-profile">
    <!-- Profile content -->
    <div class="profile-content">
      <div class="content-grid">
        <!-- Left Column -->
        <div class="main-content">
          <!-- Personal Information Card -->
          <div class="info-card">
            <div class="card-header">
              <h2>Personal Information</h2>
              <button
                @click="editProfile"
                class="edit-link"
              >
                <i class="edit-icon"></i>
                Edit
              </button>
            </div>

            <div class="card-body">
              <div class="info-grid">
                <div v-for="(field, index) in personalFields" :key="index" class="info-item">
                  <label>{{ field.label }}</label>
                  <p>{{ profileData?.[field.key] || 'Not set' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Property Preferences Card -->
          <div class="info-card">
            <div class="card-header">
              <h2>Property Preferences</h2>
              <button
                @click="editProfile"
                class="edit-link"
              >
                <i class="edit-icon"></i>
                Edit
              </button>
            </div>

            <div class="card-body">
              <div class="info-grid">
                <div v-for="(field, index) in propertyFields" :key="index" class="info-item">
                  <label>{{ field.label }}</label>
                  <p>{{ profileData?.[field.key] || 'Not set' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="sidebar">
          <!-- Quick Actions Card -->
          <div class="quick-actions-card">
            <h3>Quick Actions</h3>
            <div class="actions-list">
              <button class="action-button">
                <i class="home-icon"></i>
                View Saved Properties
              </button>
              <button class="action-button">
                <i class="calendar-icon"></i>
                Schedule Property Tour
              </button>
              <button class="action-button">
                <i class="phone-icon"></i>
                Contact Agent
              </button>
            </div>
          </div>

          <!-- Recent Activity Card -->
          <div class="activity-card">
            <h3>Recent Activity</h3>
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-icon home-icon"></div>
                <div class="activity-content">
                  <p>Viewed property at 123 Main St</p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon calendar-icon"></div>
                <div class="activity-content">
                  <p>Scheduled tour for 456 Oak Ave</p>
                  <span>Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useClientStore } from '@/stores/clientStore';
import { useLayoutStore } from '@/stores/layout';

const router = useRouter();
const clientStore = useClientStore();
const layoutStore = useLayoutStore();

const profileData = ref(null);

const personalFields = [
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Email Address', key: 'email' },
  { label: 'Phone Number', key: 'phoneNumber' },
  { label: 'Date of Birth', key: 'dateOfBirth' },
  { label: 'Account Type', key: 'role' }
];

const propertyFields = [
  { label: 'Property Type', key: 'propertyType' },
  { label: 'Budget Range', key: 'budget' },
  { label: 'Preferred Location', key: 'location' },
  { label: 'Desired Features', key: 'preferences' }
];

// Hide layout header when this component mounts
onMounted(() => {
  layoutStore.setHeaderVisibility(false);
});

// Restore layout header when component unmounts
onUnmounted(() => {
  layoutStore.setHeaderVisibility(true);
});

onMounted(async () => {
  // Load profile data
  try {
    const data = await clientStore.getClientProfile();
    profileData.value = data;
  } catch (error) {
    console.error('Failed to load profile:', error);
  }
});

const editProfile = () => {
  router.push('/client/profile/edit');
};
</script>

<style scoped>
/* Modern CSS Reset and Variables */
:root {
  --primary: #1a4189;
  --primary-light: #e8f0fe;
  --primary-dark: #153471;
  --accent: #22c55e;
  --accent-dark: #16a34a;
  --surface: #ffffff;
  --neutral-50: #f8fafc;
  --neutral-100: #f1f5f9;
  --neutral-200: #e2e8f0;
  --neutral-300: #cbd5e1;
  --neutral-400: #94a3b8;
  --neutral-500: #64748b;
  --neutral-600: #475569;
  --neutral-700: #334155;
  --neutral-800: #1e293b;
  --neutral-900: #0f172a;
}

.client-profile {
  min-height: 100vh;
  background-color: var(--neutral-50);
  background-image:
    radial-gradient(at 0% 0%, rgba(26, 65, 137, 0.02) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(34, 197, 94, 0.02) 0px, transparent 50%),
    linear-gradient(to bottom right, rgba(26, 65, 137, 0.01), rgba(34, 197, 94, 0.01));
  padding: 20px;
  color: var(--neutral-800);
}

.profile-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 16px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.01),
    0 2px 4px -1px rgba(0, 0, 0, 0.02);
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid rgba(232, 240, 254, 0.7);
  position: relative;
  overflow: hidden;
}

.profile-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(232, 240, 254, 0) 0%,
    rgba(232, 240, 254, 0.8) 50%,
    rgba(232, 240, 254, 0) 100%
  );
}

.profile-header-content {
  display: flex;
  gap: 24px;
  align-items: center;
  position: relative;
}

.profile-image-wrapper {
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.02),
    0 4px 8px rgba(0, 0, 0, 0.02);
  border: 2px solid rgba(255, 255, 255, 0.8);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  filter: contrast(1.05);
}

.profile-image-wrapper:hover .profile-image {
  transform: scale(1.08);
  filter: contrast(1.1) brightness(1.1);
}

.status-badge {
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(34, 197, 94, 0.2);
}

.profile-info {
  flex: 1;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.name-section h1 {
  font-size: 20px;
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 4px;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.role {
  color: var(--primary);
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 13px;
  letter-spacing: -0.01em;
  opacity: 0.9;
}

.location {
  color: var(--neutral-500);
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  letter-spacing: -0.01em;
}

.edit-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 2px 4px rgba(26, 65, 137, 0.1),
    0 4px 8px rgba(26, 65, 137, 0.1);
  opacity: 0.95;
}

.edit-button:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow:
    0 4px 8px rgba(26, 65, 137, 0.15),
    0 8px 16px rgba(26, 65, 137, 0.15);
  opacity: 1;
}

.edit-icon {
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.location-icon {
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* Content Grid */
.profile-content {
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  position: relative;
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 2fr 1fr;
    gap: 32px;
  }
}

/* Cards */
.info-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 16px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.01),
    0 2px 4px -1px rgba(0, 0, 0, 0.02);
  margin-bottom: 32px;
  border: 1px solid rgba(232, 240, 254, 0.7);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
  height: auto;
}

.card-header {
  background: rgba(232, 240, 254, 0.5);
  padding: 16px 20px;
  border-bottom: 1px solid rgba(232, 240, 254, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  font-size: 17px;
  font-weight: 600;
  color: var(--neutral-800);
  letter-spacing: -0.01em;
}

.card-body {
  padding: 24px;
  background: rgba(255, 255, 255, 0.95);
  position: relative;
  z-index: 2;
  height: auto;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  position: relative;
  height: auto;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-item label {
  font-size: 14px;
  color: var(--neutral-500);
  font-weight: 500;
  letter-spacing: -0.01em;
}

.info-item p {
  color: var(--neutral-800);
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.01em;
}

/* Buttons */
.edit-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1a4189;
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
}

.edit-link:hover {
  color: #153471;
}

/* Quick Actions */
.quick-actions-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 16px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.01),
    0 2px 4px -1px rgba(0, 0, 0, 0.02);
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid rgba(232, 240, 254, 0.7);
  height: auto;
}

.quick-actions-card h3 {
  font-size: 17px;
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  background: rgba(232, 240, 254, 0.5);
  color: var(--primary);
  border: 1px solid rgba(26, 65, 137, 0.08);
  border-radius: 12px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-button:hover {
  background: rgba(232, 240, 254, 0.8);
  transform: translateY(-1px);
  box-shadow:
    0 4px 8px rgba(26, 65, 137, 0.06),
    0 2px 4px rgba(26, 65, 137, 0.06);
}

/* Activity Card */
.activity-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 16px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.01),
    0 2px 4px -1px rgba(0, 0, 0, 0.02);
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid rgba(232, 240, 254, 0.7);
  height: auto;
}

.activity-card h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: auto;
}

.activity-item {
  display: flex;
  gap: 12px;
  padding: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
}

.activity-item:hover {
  background: rgba(232, 240, 254, 0.3);
  transform: translateX(4px);
}

.activity-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(232, 240, 254, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(26, 65, 137, 0.08);
}

.activity-content {
  flex: 1;
}

.activity-content p {
  font-size: 15px;
  color: var(--neutral-800);
  margin-bottom: 2px;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.activity-content span {
  font-size: 13px;
  color: var(--neutral-500);
  letter-spacing: -0.01em;
}

/* Modern scrollbar */
::-webkit-scrollbar {
  display: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .info-header {
    flex-direction: column;
    align-items: center;
  }

  .profile-image-wrapper {
    margin-bottom: 16px;
  }
}

/* Add smooth transitions */
* {
  transition: background-color 0.3s ease,
              transform 0.3s ease,
              box-shadow 0.3s ease,
              color 0.3s ease;
}

/* Add subtle animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.info-card, .quick-actions-card, .activity-card {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Add loading state styles */
.loading {
  position: relative;
  overflow: hidden;
}

.loading::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(232, 240, 254, 0) 0%,
    rgba(232, 240, 254, 0.2) 50%,
    rgba(232, 240, 254, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Add spacing between sections */
.profile-section {
  margin-bottom: 32px;
}

.profile-section:last-child {
  margin-bottom: 0;
}

/* Remove any max-height restrictions */
.main-content,
.sidebar,
.profile-content,
.content-grid {
  height: auto;
  min-height: unset;
  max-height: none;
}
</style>
