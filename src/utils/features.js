/**
 * Feature flag configuration for the application
 * This file centralizes all feature toggles to manage feature releases
 */

export const features = {
  mvpPages: true, // Enable MVP pages for launch
  rolePages: false, // Disable full app pages (three roles) for now
};

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
