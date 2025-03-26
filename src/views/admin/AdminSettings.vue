<script setup>
import { ref } from 'vue';

const generalSettings = ref({
  siteName: 'Real Estate CRM',
  siteDescription: 'Professional Real Estate Management System',
  contactEmail: 'admin@realestatecrm.com',
  contactPhone: '+1 (555) 123-4567',
  address: '123 Business Street, Suite 100, City, State 12345',
  timezone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY',
  currency: 'USD',
  enableRegistration: true,
  enableEmailNotifications: true
});

const emailSettings = ref({
  smtpHost: 'smtp.example.com',
  smtpPort: 587,
  smtpUsername: 'noreply@realestatecrm.com',
  smtpPassword: '********',
  smtpEncryption: 'tls',
  fromName: 'Real Estate CRM',
  fromEmail: 'noreply@realestatecrm.com',
  replyToEmail: 'support@realestatecrm.com'
});

const notificationSettings = ref({
  newUserRegistration: true,
  newPropertyListing: true,
  propertyStatusChange: true,
  newClientAssignment: true,
  documentUpload: true,
  systemAlerts: true
});

const securitySettings = ref({
  requireEmailVerification: true,
  enableTwoFactorAuth: false,
  sessionTimeout: 30,
  maxLoginAttempts: 5,
  passwordExpiryDays: 90,
  enableActivityLogging: true
});

const saveSettings = () => {
  // TODO: Implement API call to save settings
  console.log('Saving settings...');
};

const resetSettings = () => {
  // TODO: Implement reset functionality
  console.log('Resetting settings...');
};
</script>

<template>
  <div class="admin-settings">
    <div class="settings-header">
      <h2>System Settings</h2>
      <div class="settings-actions">
        <button class="save-btn" @click="saveSettings">
          <i class="fas fa-save"></i> Save Changes
        </button>
        <button class="reset-btn" @click="resetSettings">
          <i class="fas fa-undo"></i> Reset to Default
        </button>
      </div>
    </div>

    <div class="settings-content">
      <div class="settings-section">
        <h3>General Settings</h3>
        <div class="settings-grid">
          <div class="form-group">
            <label for="siteName">Site Name</label>
            <input type="text" id="siteName" v-model="generalSettings.siteName">
          </div>
          <div class="form-group">
            <label for="siteDescription">Site Description</label>
            <input type="text" id="siteDescription" v-model="generalSettings.siteDescription">
          </div>
          <div class="form-group">
            <label for="contactEmail">Contact Email</label>
            <input type="email" id="contactEmail" v-model="generalSettings.contactEmail">
          </div>
          <div class="form-group">
            <label for="contactPhone">Contact Phone</label>
            <input type="tel" id="contactPhone" v-model="generalSettings.contactPhone">
          </div>
          <div class="form-group full-width">
            <label for="address">Business Address</label>
            <textarea id="address" v-model="generalSettings.address" rows="2"></textarea>
          </div>
          <div class="form-group">
            <label for="timezone">Timezone</label>
            <select id="timezone" v-model="generalSettings.timezone">
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
            </select>
          </div>
          <div class="form-group">
            <label for="dateFormat">Date Format</label>
            <select id="dateFormat" v-model="generalSettings.dateFormat">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div class="form-group">
            <label for="currency">Currency</label>
            <select id="currency" v-model="generalSettings.currency">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
          <div class="form-group checkbox">
            <label>
              <input type="checkbox" v-model="generalSettings.enableRegistration">
              Enable User Registration
            </label>
          </div>
          <div class="form-group checkbox">
            <label>
              <input type="checkbox" v-model="generalSettings.enableEmailNotifications">
              Enable Email Notifications
            </label>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3>Email Configuration</h3>
        <div class="settings-grid">
          <div class="form-group">
            <label for="smtpHost">SMTP Host</label>
            <input type="text" id="smtpHost" v-model="emailSettings.smtpHost">
          </div>
          <div class="form-group">
            <label for="smtpPort">SMTP Port</label>
            <input type="number" id="smtpPort" v-model="emailSettings.smtpPort">
          </div>
          <div class="form-group">
            <label for="smtpUsername">SMTP Username</label>
            <input type="text" id="smtpUsername" v-model="emailSettings.smtpUsername">
          </div>
          <div class="form-group">
            <label for="smtpPassword">SMTP Password</label>
            <input type="password" id="smtpPassword" v-model="emailSettings.smtpPassword">
          </div>
          <div class="form-group">
            <label for="smtpEncryption">SMTP Encryption</label>
            <select id="smtpEncryption" v-model="emailSettings.smtpEncryption">
              <option value="tls">TLS</option>
              <option value="ssl">SSL</option>
              <option value="none">None</option>
            </select>
          </div>
          <div class="form-group">
            <label for="fromName">From Name</label>
            <input type="text" id="fromName" v-model="emailSettings.fromName">
          </div>
          <div class="form-group">
            <label for="fromEmail">From Email</label>
            <input type="email" id="fromEmail" v-model="emailSettings.fromEmail">
          </div>
          <div class="form-group">
            <label for="replyToEmail">Reply-To Email</label>
            <input type="email" id="replyToEmail" v-model="emailSettings.replyToEmail">
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3>Notification Settings</h3>
        <div class="settings-grid">
          <div class="form-group checkbox">
            <label>
              <input type="checkbox" v-model="notificationSettings.newUserRegistration">
              New User Registration
            </label>
          </div>
          <div class="form-group checkbox">
            <label>
              <input type="checkbox" v-model="notificationSettings.newPropertyListing">
              New Property Listing
            </label>
          </div>
          <div class="form-group checkbox">
            <label>
              <input type="checkbox" v-model="notificationSettings.propertyStatusChange">
              Property Status Change
            </label>
          </div>
          <div class="form-group checkbox">
            <label>
              <input type="checkbox" v-model="notificationSettings.newClientAssignment">
              New Client Assignment
            </label>
          </div>
          <div class="form-group checkbox">
            <label>
              <input type="checkbox" v-model="notificationSettings.documentUpload">
              Document Upload
            </label>
          </div>
          <div class="form-group checkbox">
            <label>
              <input type="checkbox" v-model="notificationSettings.systemAlerts">
              System Alerts
            </label>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3>Security Settings</h3>
        <div class="settings-grid">
          <div class="form-group checkbox">
            <label>
              <input type="checkbox" v-model="securitySettings.requireEmailVerification">
              Require Email Verification
            </label>
          </div>
          <div class="form-group checkbox">
            <label>
              <input type="checkbox" v-model="securitySettings.enableTwoFactorAuth">
              Enable Two-Factor Authentication
            </label>
          </div>
          <div class="form-group">
            <label for="sessionTimeout">Session Timeout (minutes)</label>
            <input type="number" id="sessionTimeout" v-model="securitySettings.sessionTimeout">
          </div>
          <div class="form-group">
            <label for="maxLoginAttempts">Max Login Attempts</label>
            <input type="number" id="maxLoginAttempts" v-model="securitySettings.maxLoginAttempts">
          </div>
          <div class="form-group">
            <label for="passwordExpiryDays">Password Expiry (days)</label>
            <input type="number" id="passwordExpiryDays" v-model="securitySettings.passwordExpiryDays">
          </div>
          <div class="form-group checkbox">
            <label>
              <input type="checkbox" v-model="securitySettings.enableActivityLogging">
              Enable Activity Logging
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-settings {
  padding: 20px;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.settings-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.settings-actions {
  display: flex;
  gap: 16px;
}

.save-btn,
.reset-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-btn {
  background: #2196F3;
  color: white;
}

.save-btn:hover {
  background: #1976D2;
}

.reset-btn {
  background: #f5f5f5;
  color: #333;
}

.reset-btn:hover {
  background: #e0e0e0;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.settings-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.settings-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 24px 0;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="tel"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-group.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.form-group.checkbox label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.form-group.checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin: 0;
}

@media (max-width: 768px) {
  .settings-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .settings-actions {
    width: 100%;
  }

  .save-btn,
  .reset-btn {
    flex: 1;
    justify-content: center;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style> 