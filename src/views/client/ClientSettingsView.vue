<template>
  <div class="settings-container">
    <div class="settings-header">
      <h1>Settings</h1>
      <p>Manage your account preferences and notifications</p>
    </div>

    <div class="settings-content">
      <!-- Notification Preferences -->
      <div class="settings-card">
        <div class="card-header">
          <h2>Notification Preferences</h2>
        </div>
        <div class="card-content">
          <div class="settings-group">
            <div class="setting-item">
              <div class="setting-info">
                <h3>Email Notifications</h3>
                <p>Receive updates about property matches and appointments</p>
              </div>
              <div class="toggle-switch">
                <input
                  type="checkbox"
                  id="email-notifications"
                  v-model="settings.notifications.email"
                  @change="saveSettings"
                />
                <label for="email-notifications"></label>
              </div>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>SMS Notifications</h3>
                <p>Get text messages for urgent updates</p>
              </div>
              <div class="toggle-switch">
                <input
                  type="checkbox"
                  id="sms-notifications"
                  v-model="settings.notifications.sms"
                  @change="saveSettings"
                />
                <label for="sms-notifications"></label>
              </div>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>App Notifications</h3>
                <p>Receive in-app notifications</p>
              </div>
              <div class="toggle-switch">
                <input
                  type="checkbox"
                  id="app-notifications"
                  v-model="settings.notifications.app"
                  @change="saveSettings"
                />
                <label for="app-notifications"></label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Privacy Settings -->
      <div class="settings-card">
        <div class="card-header">
          <h2>Privacy Settings</h2>
        </div>
        <div class="card-content">
          <div class="settings-group">
            <div class="setting-item">
              <div class="setting-info">
                <h3>Profile Visibility</h3>
                <p>Allow agents to view your profile and preferences</p>
              </div>
              <div class="toggle-switch">
                <input
                  type="checkbox"
                  id="profile-visibility"
                  v-model="settings.privacy.profileVisible"
                  @change="saveSettings"
                />
                <label for="profile-visibility"></label>
              </div>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Newsletter Subscription</h3>
                <p>Receive weekly updates about new properties</p>
              </div>
              <div class="toggle-switch">
                <input
                  type="checkbox"
                  id="newsletter"
                  v-model="settings.communications.newsletter"
                  @change="saveSettings"
                />
                <label for="newsletter"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoleStore } from '@/stores/roleStore';

const roleStore = useRoleStore();

const settings = ref({
  notifications: {
    email: true,
    sms: false,
    app: true
  },
  communications: {
    newsletter: true
  },
  privacy: {
    profileVisible: true
  }
});

onMounted(() => {
  if (roleStore.currentRole !== 'client') {
    roleStore.setRole('client');
  }

  const savedSettings = localStorage.getItem('clientSettings');
  if (savedSettings) {
    settings.value = JSON.parse(savedSettings);
  }
});

const saveSettings = () => {
  localStorage.setItem('clientSettings', JSON.stringify(settings.value));
};
</script>

<style scoped>
.settings-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 24px;
}

.settings-header {
  margin-bottom: 32px;
}

.settings-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.settings-header p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.settings-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #f9fafb;
}

.card-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.card-content {
  padding: 24px;
}

.settings-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.setting-info {
  flex: 1;
  padding-right: 24px;
}

.setting-info h3 {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.setting-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.toggle-switch {
  position: relative;
  width: 50px;
  height: 28px;
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
  border-radius: 34px;
}

.toggle-switch label:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

.toggle-switch input:checked + label {
  background-color: #1a4189;
}

.toggle-switch input:checked + label:before {
  transform: translateX(22px);
}

@media (max-width: 640px) {
  .settings-container {
    padding: 16px;
  }

  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .setting-info {
    padding-right: 0;
  }
}
</style>
