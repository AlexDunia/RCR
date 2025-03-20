import axios from 'axios';

// Base API URL - would typically come from .env file
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Fetch all listings with optional filters
 * @param {Object} filters - Optional filters for listings
 * @returns {Promise} Promise that resolves to array of listings
 */
export async function fetchListings(filters = {}) {
  try {
    const response = await axios.get(`${API_URL}/listings`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}

/**
 * Fetch a single listing by ID
 * @param {string} id - Listing ID
 * @returns {Promise} Promise that resolves to listing data
 */
export async function fetchListingById(id) {
  try {
    const response = await axios.get(`${API_URL}/listings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching listing with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new listing
 * @param {Object} listingData - Listing data
 * @returns {Promise} Promise that resolves to created listing data
 */
export async function createListing(listingData) {
  try {
    const response = await axios.post(`${API_URL}/listings`, listingData);
    return response.data;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
}

/**
 * Update an existing listing
 * @param {string} id - Listing ID
 * @param {Object} listingData - Updated listing data
 * @returns {Promise} Promise that resolves to updated listing data
 */
export async function updateListing(id, listingData) {
  try {
    const response = await axios.put(`${API_URL}/listings/${id}`, listingData);
    return response.data;
  } catch (error) {
    console.error(`Error updating listing with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a listing
 * @param {string} id - Listing ID
 * @returns {Promise} Promise that resolves to deleted status
 */
export async function deleteListing(id) {
  try {
    const response = await axios.delete(`${API_URL}/listings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting listing with ID ${id}:`, error);
    throw error;
  }
}
