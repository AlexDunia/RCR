<template>
  <div class="feature-test-page">
    <div class="container">
      <h1>Feature Flag Test Page</h1>

      <div class="feature-status">
        <h2>Current Feature Status</h2>
        <div class="status-grid">
          <div class="status-item">
            <span class="label">MVP Feature:</span>
            <span class="value" :class="{ enabled: isMvpEnabled, disabled: !isMvpEnabled }">
              {{ isMvpEnabled ? 'Enabled' : 'Disabled' }}
            </span>
          </div>
          <div class="status-item">
            <span class="label">Full App Feature:</span>
            <span class="value" :class="{ enabled: isFullAppEnabled, disabled: !isFullAppEnabled }">
              {{ isFullAppEnabled ? 'Enabled' : 'Disabled' }}
            </span>
          </div>
          <div class="status-item">
            <span class="label">Feature Flags Initialized:</span>
            <span class="value" :class="{ enabled: areFeatureFlagsReady, disabled: !areFeatureFlagsReady }">
              {{ areFeatureFlagsReady ? 'Yes' : 'No' }}
            </span>
          </div>
        </div>
      </div>

      <div class="test-links">
        <h2>Test Links</h2>
        <div class="link-grid">
          <router-link to="/landing" class="test-link">Landing Page (Always Available)</router-link>
          <router-link to="/agents" class="test-link">Admin Agents (Full App Only)</router-link>
          <router-link to="/client/dashboard" class="test-link">Client Dashboard (Full App Only)</router-link>
          <router-link to="/agent-dashboard" class="test-link">Agent Dashboard (Full App Only)</router-link>
          <router-link to="/tasks" class="test-link">Tasks (Full App Only)</router-link>
        </div>
      </div>

      <div class="actions">
        <button @click="refreshFeatures" class="btn-secondary">Refresh Feature Flags</button>
        <button @click="goHome" class="btn-primary">Go Home</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { isFeatureEnabled, isFeatureFlagsInitialized, fetchFeatureFlags } from '@/utils/features';

const router = useRouter();

const isMvpEnabled = computed(() => isFeatureEnabled('mvpFeature'));
const isFullAppEnabled = computed(() => isFeatureEnabled('fullAppFeature'));
const areFeatureFlagsReady = computed(() => isFeatureFlagsInitialized());

const refreshFeatures = async () => {
  await fetchFeatureFlags();
};

const goHome = () => {
  router.push('/landing');
};
</script>

<style scoped>
.feature-test-page {
  padding: 40px 20px;
  min-height: 100vh;
  background: #f8fafc;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #1f2937;
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 32px 0;
  text-align: center;
}

h2 {
  color: #374151;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 16px 0;
}

.feature-status {
  margin-bottom: 40px;
}

.status-grid {
  display: grid;
  gap: 16px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.label {
  font-weight: 500;
  color: #374151;
}

.value {
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 14px;
}

.value.enabled {
  background: #dcfce7;
  color: #166534;
}

.value.disabled {
  background: #fef2f2;
  color: #dc2626;
}

.test-links {
  margin-bottom: 40px;
}

.link-grid {
  display: grid;
  gap: 12px;
}

.test-link {
  display: block;
  padding: 16px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: all 0.2s;
}

.test-link:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-primary, .btn-secondary {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-primary {
  background: #0a4d8c;
  color: white;
}

.btn-primary:hover {
  background: #083d70;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #e5e7eb;
}
</style>
