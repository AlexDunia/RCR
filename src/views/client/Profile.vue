<template>
  <div class="client-profile">
    <div class="profile-header">
      <div class="profile-avatar">
        <img v-if="client.photo" :src="client.photo" alt="Profile Photo" />
        <div v-else class="avatar-placeholder">
          {{ getInitials(client.name) }}
        </div>
      </div>
      <div class="profile-info">
        <h1>{{ client.name }}</h1>
        <p class="profile-email">{{ client.email }}</p>
      </div>
      <button class="edit-profile-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        Edit Profile
      </button>
    </div>

    <div class="profile-content">
      <div class="profile-sections">
        <div class="profile-section">
          <h2 class="section-title">Personal Information</h2>
          <div class="section-content">
            <div class="profile-field">
              <label>Full Name</label>
              <p>{{ client.name }}</p>
            </div>
            <div class="profile-field">
              <label>Email Address</label>
              <p>{{ client.email }}</p>
            </div>
            <div class="profile-field">
              <label>Phone Number</label>
              <p>{{ client.phone || 'Not provided' }}</p>
            </div>
            <div class="profile-field">
              <label>Address</label>
              <p>{{ client.address || 'Not provided' }}</p>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h2 class="section-title">Preferences</h2>
          <div class="section-content">
            <div class="profile-field">
              <label>Property Type Preference</label>
              <p>{{ client.preferences.propertyType.join(', ') }}</p>
            </div>
            <div class="profile-field">
              <label>Budget Range</label>
              <p>${{ client.preferences.minBudget.toLocaleString() }} - ${{ client.preferences.maxBudget.toLocaleString() }}</p>
            </div>
            <div class="profile-field">
              <label>Bedrooms</label>
              <p>{{ client.preferences.bedrooms }}+</p>
            </div>
            <div class="profile-field">
              <label>Bathrooms</label>
              <p>{{ client.preferences.bathrooms }}+</p>
            </div>
            <div class="profile-field">
              <label>Preferred Locations</label>
              <p>{{ client.preferences.locations.join(', ') }}</p>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h2 class="section-title">Account Settings</h2>
          <div class="section-content">
            <div class="profile-field">
              <label>Communication Preferences</label>
              <div class="preference-toggles">
                <div class="preference-toggle">
                  <input type="checkbox" id="email-notifications" v-model="client.settings.emailNotifications" />
                  <label for="email-notifications">Email Notifications</label>
                </div>
                <div class="preference-toggle">
                  <input type="checkbox" id="sms-notifications" v-model="client.settings.smsNotifications" />
                  <label for="sms-notifications">SMS Notifications</label>
                </div>
                <div class="preference-toggle">
                  <input type="checkbox" id="app-notifications" v-model="client.settings.appNotifications" />
                  <label for="app-notifications">App Notifications</label>
                </div>
              </div>
            </div>
            <div class="profile-field">
              <label>Newsletter Subscription</label>
              <div class="toggle-switch">
                <input type="checkbox" id="newsletter" v-model="client.settings.newsletter" />
                <label for="newsletter"></label>
              </div>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h2 class="section-title">Security</h2>
          <div class="section-content">
            <div class="profile-actions">
              <button class="action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Change Password
              </button>

              <button class="action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
                Enable Two-Factor Authentication
              </button>

              <button class="action-btn danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 16l4-4m0 0l-4-4m4 4H3"></path>
                  <path d="M12 2.252C16.26 2.758 20 6.338 20 11v5c0 1.1.9 2 2 2H4c-1.1 0-2-.9-2-2v-5c0-4.662 3.74-8.242 8-8.748"></path>
                </svg>
                Log Out from All Devices
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineComponent } from 'vue';

// Define component name
defineComponent({
  name: 'ClientProfile'
});

// Sample client data
const client = reactive({
  name: 'John Smith',
  email: 'johnsmith@example.com',
  phone: '(555) 123-4567',
  address: '42 Maple Street, San Francisco, CA 94107',
  photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  preferences: {
    propertyType: ['House', 'Townhouse'],
    minBudget: 500000,
    maxBudget: 950000,
    bedrooms: 3,
    bathrooms: 2,
    locations: ['San Francisco', 'Oakland', 'Berkeley']
  },
  settings: {
    emailNotifications: true,
    smsNotifications: false,
    appNotifications: true,
    newsletter: true
  }
});

// Get initials from name
const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
};
</script>

<style scoped>
.client-profile {
  padding: 24px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 24px;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background-color: #006064;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 600;
}

.profile-info {
  flex: 1;
}

.profile-info h1 {
  font-size: 24px;
  margin: 0 0 4px 0;
  color: #2c3e50;
}

.profile-email {
  font-size: 16px;
  color: #7f8c8d;
  margin: 0;
}

.edit-profile-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: white;
  border: 1px solid #006064;
  color: #006064;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-profile-btn:hover {
  background-color: #f0f7f7;
}

.profile-content {
  display: flex;
  gap: 24px;
}

.profile-sections {
  flex: 1;
}

.profile-section {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  overflow: hidden;
}

.section-title {
  font-size: 18px;
  padding: 16px 24px;
  margin: 0;
  border-bottom: 1px solid #f0f0f0;
  color: #2c3e50;
  background-color: #f9f9f9;
}

.section-content {
  padding: 24px;
}

.profile-field {
  margin-bottom: 16px;
}

.profile-field:last-child {
  margin-bottom: 0;
}

.profile-field label {
  display: block;
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 4px;
}

.profile-field p {
  font-size: 16px;
  color: #2c3e50;
  margin: 0;
}

.preference-toggles {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.preference-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}

.preference-toggle label {
  margin-bottom: 0;
  color: #2c3e50;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-switch label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e0e0e0;
  transition: .4s;
  border-radius: 24px;
}

.toggle-switch label:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

.toggle-switch input:checked + label {
  background-color: #006064;
}

.toggle-switch input:focus + label {
  box-shadow: 0 0 1px #006064;
}

.toggle-switch input:checked + label:before {
  transform: translateX(26px);
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: #f5f7fa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: #e8f4f5;
}

.action-btn.danger {
  color: #e74c3c;
}

.action-btn.danger:hover {
  background-color: #fdf1f0;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .profile-avatar {
    margin-right: 0;
    margin-bottom: 16px;
  }

  .edit-profile-btn {
    margin-top: 16px;
  }
}
</style>
