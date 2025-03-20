import axios from 'axios';

// Base API URL - would typically come from .env file
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Get the current user's profile
 * @returns {Promise} Promise that resolves to user profile data
 */
export async function getUserProfile() {
  try {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

/**
 * Update the user's profile
 * @param {Object} profileData - Updated profile data
 * @returns {Promise} Promise that resolves to updated profile data
 */
export async function updateUserProfile(profileData) {
  try {
    const response = await axios.put(`${API_URL}/profile`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Upload profile avatar
 * @param {File} file - Image file to upload
 * @returns {Promise} Promise that resolves to the avatar URL
 */
export async function uploadAvatar(file) {
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await axios.post(`${API_URL}/profile/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data.avatarUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
}
