// src/utils/features.js
import { ref, reactive } from 'vue';

const features = reactive({
  mvpFeature: true,
  fullAppFeature: false,
  mvpPages: true,
  rolePages: false,
});

const isLoading = ref(false);
const isInitialized = ref(true); // Skip backend fetch

export async function fetchFeatureFlags() {
  console.log('Skipping feature flags fetch until /api/features is implemented');
  isInitialized.value = true;
}

export function isFeatureEnabled(featureName) {
  return features[featureName] ?? false;
}

export function getAllFeatures() {
  return { ...features };
}

export function getFeatureFlagsLoading() {
  return isLoading.value;
}

export function isFeatureFlagsInitialized() {
  return isInitialized.value;
}

export async function initializeFeatureFlags() {
  if (!isInitialized.value) {
    await fetchFeatureFlags();
  }
}

export { features };
