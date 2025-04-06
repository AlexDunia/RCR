<template>
  <div class="admin-profile-container">
    <!-- Page header with title and actions -->
    <div class="profile-header">
      <div class="header-content">
        <h1 class="profile-title">Admin Profile</h1>
        <div class="last-login">
          Last login: {{ formatDate(adminStore.adminData.lastLogin) }}
        </div>
      </div>
      <div class="header-actions">
        <button class="save-button" @click="saveChanges" :disabled="!hasChanges">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </span>
          Save Changes
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading admin profile...</p>
    </div>

    <!-- Main content area with tabs -->
    <div v-else class="profile-content">
      <div class="profile-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="tab-content">
        <!-- Profile Information Tab -->
        <div v-if="activeTab === 'profile'" class="profile-section">
          <div class="section-card">
            <h2 class="section-title">Personal Information</h2>
            <div class="form-grid">
              <div class="form-group">
                <label for="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  v-model="formData.fullName"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  v-model="formData.email"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  v-model="formData.phoneNumber"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="jobTitle">Job Title</label>
                <input
                  id="jobTitle"
                  type="text"
                  v-model="formData.jobTitle"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="department">Department</label>
                <input
                  id="department"
                  type="text"
                  v-model="formData.department"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="role">Admin Role</label>
                <select
                  id="role"
                  v-model="formData.role"
                  class="form-control"
                >
                  <option value="System Administrator">System Administrator</option>
                  <option value="Content Manager">Content Manager</option>
                  <option value="Analytics Manager">Analytics Manager</option>
                  <option value="Marketing Manager">Marketing Manager</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Tab -->
        <div v-if="activeTab === 'security'" class="security-section">
          <div class="section-card">
            <h2 class="section-title">Security Settings</h2>

            <div class="security-option">
              <div class="option-details">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
              </div>
              <div class="toggle-switch">
                <label class="switch">
                  <input type="checkbox" v-model="formData.twoFactorEnabled">
                  <span class="slider round"></span>
                </label>
                <span class="toggle-label">{{ formData.twoFactorEnabled ? 'Enabled' : 'Disabled' }}</span>
              </div>
            </div>

            <div class="security-option">
              <div class="option-details">
                <h3>API Access Keys</h3>
                <p>Manage your API access keys</p>
              </div>
              <div class="api-keys">
                <div v-for="(key, index) in formData.apiAccessKeys" :key="index" class="api-key">
                  <span class="key-value">{{ maskKey(key) }}</span>
                  <button class="view-key-btn" @click="toggleViewKey(index)">View</button>
                  <button class="delete-key-btn" @click="deleteKey(index)">Delete</button>
                </div>
                <button class="generate-key-btn" @click="generateNewKey">Generate New Key</button>
              </div>
            </div>

            <div class="security-option">
              <div class="option-details">
                <h3>Change Password</h3>
                <p>Update your account password</p>
              </div>
              <button class="change-password-btn" @click="showChangePasswordModal = true">Change Password</button>
            </div>
          </div>
        </div>

        <!-- Activity Log Tab -->
        <div v-if="activeTab === 'activity'" class="activity-section">
          <div class="section-card">
            <h2 class="section-title">Activity Log</h2>
            <p class="activity-description">Recent actions performed by your account</p>

            <div class="activity-list">
              <div v-for="log in adminStore.activityLog" :key="log.id" class="activity-item">
                <div class="activity-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div class="activity-details">
                  <div class="activity-action">{{ log.action }}</div>
                  <div class="activity-meta">
                    <span class="activity-time">{{ formatDate(log.timestamp) }}</span>
                    <span v-if="log.ipAddress" class="activity-ip">IP: {{ log.ipAddress }}</span>
                  </div>
                  <div v-if="log.details" class="activity-details-text">{{ log.details }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications Tab -->
        <div v-if="activeTab === 'notifications'" class="notifications-section">
          <div class="section-card">
            <h2 class="section-title">Notification Settings</h2>

            <div class="notification-options">
              <div class="notification-option">
                <div class="option-details">
                  <h3>Email Notifications</h3>
                  <p>Receive notifications via email</p>
                </div>
                <div class="toggle-switch">
                  <label class="switch">
                    <input type="checkbox" v-model="formData.preferences.notifications.email">
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>

              <div class="notification-option">
                <div class="option-details">
                  <h3>Browser Notifications</h3>
                  <p>Receive notifications in your browser</p>
                </div>
                <div class="toggle-switch">
                  <label class="switch">
                    <input type="checkbox" v-model="formData.preferences.notifications.browser">
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>

              <div class="notification-option">
                <div class="option-details">
                  <h3>Mobile Notifications</h3>
                  <p>Receive notifications on your mobile device</p>
                </div>
                <div class="toggle-switch">
                  <label class="switch">
                    <input type="checkbox" v-model="formData.preferences.notifications.mobile">
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div v-if="showChangePasswordModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Change Password</h2>
          <button class="close-button" @click="showChangePasswordModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="currentPassword">Current Password</label>
            <input id="currentPassword" type="password" v-model="passwordForm.currentPassword" class="form-control">
          </div>
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input id="newPassword" type="password" v-model="passwordForm.newPassword" class="form-control">
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm New Password</label>
            <input id="confirmPassword" type="password" v-model="passwordForm.confirmPassword" class="form-control">
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-button" @click="showChangePasswordModal = false">Cancel</button>
          <button class="save-button" @click="changePassword">Update Password</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useAdminStore } from '@/stores/adminStore';

const adminStore = useAdminStore();
const isLoading = ref(true);
const activeTab = ref('profile');
const showChangePasswordModal = ref(false);
const originalFormData = ref({});
const visibleKeys = ref({});

// Tabs configuration
const tabs = [
  { id: 'profile', label: 'Profile Information' },
  { id: 'security', label: 'Security' },
  { id: 'activity', label: 'Activity Log' },
  { id: 'notifications', label: 'Notifications' }
];

// Form data for profile updates
const formData = reactive({
  fullName: '',
  email: '',
  phoneNumber: '',
  jobTitle: '',
  department: '',
  role: '',
  twoFactorEnabled: false,
  apiAccessKeys: [],
  preferences: {
    notifications: {
      email: true,
      browser: true,
      mobile: false
    },
    theme: 'light',
    defaultView: 'dashboard'
  }
});

// Form data for password change
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Check if form has been modified
const hasChanges = computed(() => {
  return JSON.stringify(formData) !== JSON.stringify(originalFormData.value);
});

// Initialize admin data
onMounted(async () => {
  isLoading.value = true;

  // Initialize the admin store
  await adminStore.initializeStore();

  // Copy admin data to form
  Object.assign(formData, adminStore.adminData);

  // Store original data for comparison
  originalFormData.value = JSON.parse(JSON.stringify(formData));

  isLoading.value = false;
});

// Format date to readable format
const formatDate = (dateString) => {
  if (!dateString) return 'Never';

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Mask API key for security
const maskKey = (key) => {
  if (visibleKeys.value[key]) return key;
  if (!key) return '';
  const prefix = key.substring(0, 3);
  const suffix = key.substring(key.length - 4);
  return `${prefix}...${suffix}`;
};

// Toggle API key visibility
const toggleViewKey = (index) => {
  const key = formData.apiAccessKeys[index];
  visibleKeys.value[key] = !visibleKeys.value[key];

  // Auto-hide key after 10 seconds
  if (visibleKeys.value[key]) {
    setTimeout(() => {
      visibleKeys.value[key] = false;
    }, 10000);
  }
};

// Delete API key
const deleteKey = (index) => {
  if (confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
    formData.apiAccessKeys.splice(index, 1);
  }
};

// Generate new API key
const generateNewKey = () => {
  // In a real application, this would call an API to generate a secure key
  const newKey = 'ak_' + Math.random().toString(36).substring(2, 15);
  formData.apiAccessKeys.push(newKey);

  // Auto-show the new key
  visibleKeys.value[newKey] = true;

  // Auto-hide after 10 seconds
  setTimeout(() => {
    visibleKeys.value[newKey] = false;
  }, 10000);
};

// Save changes to profile
const saveChanges = async () => {
  if (!hasChanges.value) return;

  isLoading.value = true;

  try {
    // Update admin data in store
    await adminStore.updateAdminData(formData);

    // Update original form data to reflect saved state
    originalFormData.value = JSON.parse(JSON.stringify(formData));

    // Show success message
    alert('Profile updated successfully');
  } catch (error) {
    console.error('Failed to update profile:', error);
    alert('Failed to update profile. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

// Change password
const changePassword = async () => {
  // Validate password fields
  if (!passwordForm.currentPassword) {
    alert('Please enter your current password');
    return;
  }

  if (!passwordForm.newPassword) {
    alert('Please enter a new password');
    return;
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    alert('New password and confirmation do not match');
    return;
  }

  try {
    // In a real application, this would call an API to verify the current password
    // and update to the new password

    // Simulate password change
    setTimeout(() => {
      // Reset form and close modal
      passwordForm.currentPassword = '';
      passwordForm.newPassword = '';
      passwordForm.confirmPassword = '';
      showChangePasswordModal.value = false;

      // Show success message
      alert('Password changed successfully');
    }, 1000);
  } catch (error) {
    console.error('Failed to change password:', error);
    alert('Failed to change password. Please try again.');
  }
};
</script>

<style scoped>
.admin-profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Header Styles */
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.profile-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1E3A8A;
  margin: 0;
}

.last-login {
  color: #6B7280;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.save-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: #2563EB;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-button:hover:not(:disabled) {
  background-color: #1D4ED8;
}

.save-button:disabled {
  background-color: #94A3B8;
  cursor: not-allowed;
}

.icon {
  display: flex;
  align-items: center;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #E5E7EB;
  border-top-color: #2563EB;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Tabs Navigation */
.profile-tabs {
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 2rem;
  overflow-x: auto;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.tab-button.active {
  color: #2563EB;
  border-bottom: 2px solid #2563EB;
}

.tab-button:hover:not(.active) {
  color: #4B5563;
  background-color: #F9FAFB;
}

/* Content Sections */
.tab-content {
  margin-bottom: 3rem;
}

.section-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

/* Form Styles */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4B5563;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #2563EB;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Toggle Switch */
.toggle-switch {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-right: 0.75rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E5E7EB;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2563EB;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2563EB;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}

.toggle-label {
  font-size: 0.875rem;
  color: #4B5563;
}

/* Security Section */
.security-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #E5E7EB;
}

.security-option:last-child {
  border-bottom: none;
}

.option-details h3 {
  font-size: 1rem;
  font-weight: 500;
  color: #1F2937;
  margin: 0 0 0.25rem 0;
}

.option-details p {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
}

.api-keys {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.api-key {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.key-value {
  font-family: monospace;
  background-color: #F3F4F6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.view-key-btn, .delete-key-btn, .generate-key-btn, .change-password-btn {
  padding: 0.4rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid #D1D5DB;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.view-key-btn:hover, .generate-key-btn:hover {
  background-color: #F3F4F6;
}

.delete-key-btn {
  color: #EF4444;
  border-color: #EF4444;
}

.delete-key-btn:hover {
  background-color: #FEF2F2;
}

.generate-key-btn, .change-password-btn {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: #F3F4F6;
  border: none;
  color: #1F2937;
}

.generate-key-btn:hover, .change-password-btn:hover {
  background-color: #E5E7EB;
}

/* Activity Log */
.activity-description {
  font-size: 0.875rem;
  color: #6B7280;
  margin-top: -1rem;
  margin-bottom: 1.5rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.375rem;
  background-color: #F9FAFB;
}

.activity-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #DBEAFE;
  color: #2563EB;
  flex-shrink: 0;
}

.activity-details {
  flex: 1;
}

.activity-action {
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 0.25rem;
}

.activity-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #6B7280;
  margin-bottom: 0.5rem;
}

.activity-details-text {
  font-size: 0.875rem;
  color: #4B5563;
  padding: 0.5rem;
  background-color: #F3F4F6;
  border-radius: 0.25rem;
}

/* Notification Settings */
.notification-options {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.notification-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background-color: white;
  border-radius: 0.5rem;
  width: 95%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #E5E7EB;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6B7280;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #E5E7EB;
  background-color: #F9FAFB;
}

.cancel-button {
  padding: 0.625rem 1.25rem;
  background-color: white;
  border: 1px solid #D1D5DB;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4B5563;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-button:hover {
  background-color: #F3F4F6;
}
</style>
