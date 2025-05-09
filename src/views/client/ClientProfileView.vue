<template>
  <div class="client-profile">
    <div class="profile-header">
      <div class="profile-cover"></div>
      <div class="profile-avatar">
        <img :src="client.avatar || 'https://ui-avatars.com/api/?name=John+Smith&background=1a4189&color=fff'" alt="Profile photo" />
      </div>
      <div class="profile-info">
        <h1 class="profile-name">{{ client.name }}</h1>
        <p class="profile-since">Member since {{ formatDate(client.joinDate) }}</p>
      </div>
      <div class="profile-actions">
        <button class="edit-profile-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
          Edit Profile
        </button>
      </div>
    </div>

    <div class="profile-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="profile-content">
      <!-- Personal Information Tab -->
      <div v-if="activeTab === 'personal'" class="tab-content">
        <div class="section-card">
          <h2 class="section-title">Personal Information</h2>
          <div class="info-grid">
            <div class="info-group">
              <label>Full Name</label>
              <div class="info-value">{{ client.name }}</div>
            </div>
            <div class="info-group">
              <label>Email</label>
              <div class="info-value">{{ client.email }}</div>
            </div>
            <div class="info-group">
              <label>Phone</label>
              <div class="info-value">{{ client.phone }}</div>
            </div>
            <div class="info-group">
              <label>Address</label>
              <div class="info-value">{{ client.address }}</div>
            </div>
            <div class="info-group">
              <label>Location</label>
              <div class="info-value">{{ client.location }}</div>
            </div>
            <div class="info-group">
              <label>Preferred Contact Method</label>
              <div class="info-value">{{ client.preferredContact }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Preferences Tab -->
      <div v-if="activeTab === 'preferences'" class="tab-content">
        <div class="section-card">
          <h2 class="section-title">Property Preferences</h2>
          <div class="preference-section">
            <h3>Property Type</h3>
            <div class="preference-tags">
              <div v-for="(type, index) in client.preferences.propertyTypes" :key="index" class="preference-tag">
                {{ type }}
              </div>
              <button class="add-preference">+ Add</button>
            </div>
          </div>

          <div class="preference-section">
            <h3>Price Range</h3>
            <div class="price-range">
              <span>${{ formatPrice(client.preferences.priceRange.min) }}</span>
              <div class="price-slider">
                <div class="price-fill" :style="{ width: getPriceRangePercentage() + '%' }"></div>
              </div>
              <span>${{ formatPrice(client.preferences.priceRange.max) }}</span>
            </div>
          </div>

          <div class="preference-section">
            <h3>Bedrooms</h3>
            <div class="preferences-buttons">
              <button v-for="n in 5" :key="n" :class="['preference-button', { active: client.preferences.bedrooms.includes(n) }]">{{ n }}</button>
              <button :class="['preference-button', { active: client.preferences.bedrooms.includes('5+') }]">5+</button>
            </div>
          </div>

          <div class="preference-section">
            <h3>Bathrooms</h3>
            <div class="preferences-buttons">
              <button v-for="n in 4" :key="n" :class="['preference-button', { active: client.preferences.bathrooms.includes(n) }]">{{ n }}</button>
              <button :class="['preference-button', { active: client.preferences.bathrooms.includes('4+') }]">4+</button>
            </div>
          </div>

          <div class="preference-section">
            <h3>Preferred Locations</h3>
            <div class="preference-tags">
              <div v-for="(location, index) in client.preferences.locations" :key="index" class="preference-tag">
                {{ location }}
              </div>
              <button class="add-preference">+ Add</button>
            </div>
          </div>

          <div class="preference-section">
            <h3>Features</h3>
            <div class="preference-tags">
              <div v-for="(feature, index) in client.preferences.features" :key="index" class="preference-tag">
                {{ feature }}
              </div>
              <button class="add-preference">+ Add</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Settings Tab -->
      <div v-if="activeTab === 'settings'" class="tab-content">
        <div class="section-card">
          <h2 class="section-title">Account Settings</h2>

          <div class="settings-section">
            <div class="setting-group">
              <div class="setting-header">
                <h3>Email Notifications</h3>
                <p>Receive email updates about new properties, tours, and more</p>
              </div>
              <div class="toggle-switch">
                <label class="switch">
                  <input type="checkbox" v-model="client.settings.emailNotifications" />
                  <span class="slider"></span>
                </label>
              </div>
            </div>

            <div class="setting-group">
              <div class="setting-header">
                <h3>SMS Notifications</h3>
                <p>Receive text message alerts for important updates</p>
              </div>
              <div class="toggle-switch">
                <label class="switch">
                  <input type="checkbox" v-model="client.settings.smsNotifications" />
                  <span class="slider"></span>
                </label>
              </div>
            </div>

            <div class="setting-group">
              <div class="setting-header">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
              </div>
              <div class="toggle-switch">
                <label class="switch">
                  <input type="checkbox" v-model="client.settings.twoFactorAuth" />
                  <span class="slider"></span>
                </label>
              </div>
            </div>

            <div class="password-section">
              <h3>Change Password</h3>
              <button class="change-password-btn">Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// Sample client data
const client = reactive({
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '(555) 123-4567',
  address: '123 Main Street, Apt 4B',
  location: 'San Francisco, CA',
  preferredContact: 'Email',
  joinDate: '2023-01-15',
  avatar: null,
  preferences: {
    propertyTypes: ['Single Family Home', 'Condominium', 'Townhouse'],
    priceRange: { min: 500000, max: 1200000 },
    bedrooms: [2, 3],
    bathrooms: [2],
    locations: ['San Francisco', 'Oakland', 'San Jose'],
    features: ['Garage', 'Pool', 'Modern Kitchen', 'Hardwood Floors']
  },
  settings: {
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false
  }
});

// Tabs configuration
const tabs = [
  { id: 'personal', label: 'Personal Information' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'settings', label: 'Account Settings' }
];

const activeTab = ref('personal');

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(date);
};

// Format price
const formatPrice = (price) => {
  if (price >= 1000000) {
    return (price / 1000000).toFixed(1) + 'M';
  } else if (price >= 1000) {
    return (price / 1000).toFixed(0) + 'K';
  }
  return price.toString();
};

// Calculate price range percentage for the slider
const getPriceRangePercentage = () => {
  const priceRange = client.preferences.priceRange;
  const MAX_PRICE = 2000000; // This would be dynamic in a real app
  return (priceRange.max / MAX_PRICE) * 100;
};
</script>

<style scoped>
.client-profile {
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.profile-header {
  position: relative;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
  overflow: hidden;
}

.profile-cover {
  height: 180px;
  background: linear-gradient(to right, #1a4189, #4b79a1);
}

.profile-avatar {
  position: absolute;
  left: 32px;
  top: 120px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  padding: 80px 32px 24px;
}

.profile-name {
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.profile-since {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

.profile-actions {
  position: absolute;
  top: 196px;
  right: 32px;
}

.edit-profile-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #1a4189;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-profile-btn:hover {
  background-color: #153170;
}

.profile-tabs {
  display: flex;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
  padding: 4px;
}

.tab-btn {
  flex: 1;
  padding: 12px 16px;
  background: none;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active {
  background-color: #e6f0ff;
  color: #1a4189;
  font-weight: 600;
}

.tab-btn:hover:not(.active) {
  background-color: #f1f5f9;
}

.profile-content {
  margin-bottom: 32px;
}

.section-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

/* Personal Information Tab */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.info-group {
  margin-bottom: 16px;
}

.info-group label {
  display: block;
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;
}

.info-value {
  font-size: 16px;
  color: #1e293b;
  font-weight: 500;
}

/* Preferences Tab */
.preference-section {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.preference-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.preference-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 16px 0;
}

.preference-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.preference-tag {
  background-color: #e6f0ff;
  color: #1a4189;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
}

.add-preference {
  background-color: #f1f5f9;
  color: #64748b;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-preference:hover {
  background-color: #e5e7eb;
  color: #1e293b;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 16px;
}

.price-slider {
  flex: 1;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  position: relative;
}

.price-fill {
  position: absolute;
  height: 100%;
  background-color: #1a4189;
  border-radius: 4px;
}

.preferences-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.preference-button {
  background-color: #f1f5f9;
  color: #64748b;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preference-button.active {
  background-color: #1a4189;
  color: white;
}

.preference-button:hover:not(.active) {
  background-color: #e5e7eb;
  color: #1e293b;
}

/* Settings Tab */
.settings-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.setting-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.setting-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.setting-header p {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

.toggle-switch {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
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
  background-color: #e5e7eb;
  transition: 0.3s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #1a4189;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.password-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.password-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.change-password-btn {
  padding: 8px 16px;
  background-color: #f1f5f9;
  color: #1e293b;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.change-password-btn:hover {
  background-color: #e5e7eb;
}

@media (max-width: 768px) {
  .client-profile {
    padding: 16px;
  }

  .profile-avatar {
    width: 100px;
    height: 100px;
    left: 24px;
    top: 130px;
  }

  .profile-info {
    padding: 60px 24px 24px;
  }

  .profile-actions {
    position: relative;
    top: auto;
    right: auto;
    margin-top: 16px;
    padding: 0 24px 24px;
    display: flex;
    justify-content: flex-end;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .profile-tabs {
    flex-direction: column;
    gap: 8px;
  }

  .tab-btn {
    text-align: left;
  }

  .setting-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .toggle-switch {
    align-self: flex-end;
  }

  .password-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
