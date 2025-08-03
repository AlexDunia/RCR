/**
 * Feature flag configuration for the application
 * This file centralizes all feature toggles to manage feature releases
 */

import { ref, reactive } from 'vue';
import axios from '@/api/axios';

// Reactive feature flags that will be populated from backend
const features = reactive({
  mvpFeature: true, // Default fallback
  fullAppFeature: false, // Default fallback
  // Local feature flags that don't depend on backend
  mvpPages: true,
  rolePages: false,
});

// Loading state for feature flags
const isLoading = ref(false);
const isInitialized = ref(false);

/**
 * Fetch feature flags from backend
 */
export async function fetchFeatureFlags() {
  if (isLoading.value) return;

  isLoading.value = true;

  try {
    const response = await axios.get('/features');
    const backendFeatures = response.data;

    // Update reactive features with backend values
    features.mvpFeature = backendFeatures.mvpFeature ?? true;
    features.fullAppFeature = backendFeatures.fullAppFeature ?? false;

    console.log('Feature flags loaded from backend:', features);
    isInitialized.value = true;
  } catch (error) {
    console.warn('Failed to fetch feature flags from backend, using defaults:', error);
    // Keep default values if backend is unavailable
    isInitialized.value = true;
  } finally {
    isLoading.value = false;
  }
}

/**
 * Check if a feature is enabled
 * @param {string} featureName - The name of the feature to check
 * @returns {boolean} - Whether the feature is enabled
 */
export function isFeatureEnabled(featureName) {
  return features[featureName] ?? false;
}

/**
 * Get all feature flags
 * @returns {Object} - Object containing all feature flags
 */
export function getAllFeatures() {
  return { ...features };
}

/**
 * Get loading state of feature flags
 * @returns {boolean} - Whether feature flags are being loaded
 */
export function getFeatureFlagsLoading() {
  return isLoading.value;
}

/**
 * Check if feature flags have been initialized
 * @returns {boolean} - Whether feature flags have been initialized
 */
export function isFeatureFlagsInitialized() {
  return isInitialized.value;
}

/**
 * Initialize feature flags (call this early in app startup)
 */
export async function initializeFeatureFlags() {
  if (!isInitialized.value) {
    await fetchFeatureFlags();
  }
}

// Export the reactive features object for direct access
export { features };
