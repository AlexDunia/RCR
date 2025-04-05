// Marketing API Service Module
// This file contains the API endpoints for all marketing-related data

import axios from 'axios';

/**
 * Marketing API Service
 * This service handles all API calls related to marketing features
 * Replace the localStorage implementation with actual API calls when backend is ready
 */

// Create API instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor for authentication
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Add response interceptor for error handling
api.interceptors.response.use(response => {
  return response;
}, error => {
  // Handle common errors (401, 403, 500, etc.)
  if (error.response) {
    if (error.response.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
  }
  return Promise.reject(error);
});

/**
 * Marketing Plans API endpoints
 */
export const plansApi = {
  // Get all marketing plans
  getPlans: () => api.get('/marketing/plans'),

  // Get a specific marketing plan by ID
  getPlan: (id) => api.get(`/marketing/plans/${id}`),

  // Create a new marketing plan
  createPlan: (planData) => api.post('/marketing/plans', planData),

  // Update an existing marketing plan
  updatePlan: (id, planData) => api.put(`/marketing/plans/${id}`, planData),

  // Delete a marketing plan
  deletePlan: (id) => api.delete(`/marketing/plans/${id}`)
};

/**
 * Checklists API endpoints
 */
export const checklistsApi = {
  // Get all checklists
  getChecklists: () => api.get('/marketing/checklists'),

  // Get a specific checklist by ID
  getChecklist: (id) => api.get(`/marketing/checklists/${id}`),

  // Create a new checklist
  createChecklist: (checklistData) => api.post('/marketing/checklists', checklistData),

  // Update an existing checklist
  updateChecklist: (id, checklistData) => api.put(`/marketing/checklists/${id}`, checklistData),

  // Delete a checklist
  deleteChecklist: (id) => api.delete(`/marketing/checklists/${id}`)
};

/**
 * Social Media API endpoints
 */
export const socialApi = {
  // Get all social media posts
  getPosts: () => api.get('/marketing/social/posts'),

  // Get a specific post by ID
  getPost: (id) => api.get(`/marketing/social/posts/${id}`),

  // Create a new social media post
  createPost: (postData) => api.post('/marketing/social/posts', postData),

  // Update an existing post
  updatePost: (id, postData) => api.put(`/marketing/social/posts/${id}`, postData),

  // Delete a post
  deletePost: (id) => api.delete(`/marketing/social/posts/${id}`),

  // Get social media metrics
  getMetrics: () => api.get('/marketing/social/metrics'),
};

/**
 * Templates API endpoints
 */
export const templatesApi = {
  // Get all templates
  getTemplates: () => api.get('/marketing/templates'),

  // Get a specific template by ID
  getTemplate: (id) => api.get(`/marketing/templates/${id}`),
};

// Export the base API instance for custom calls
export default api;
