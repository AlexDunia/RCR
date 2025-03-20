import axios from 'axios';

// Base API URL - would typically come from .env file
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Fetch dashboard summary data
 * @returns {Promise} Promise that resolves to dashboard data
 */
export async function fetchDashboardData() {
  try {
    const response = await axios.get(`${API_URL}/dashboard/summary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
}

/**
 * Fetch recent activity for the dashboard
 * @param {number} limit - Maximum number of items to retrieve
 * @returns {Promise} Promise that resolves to activity data
 */
export async function fetchRecentActivity(limit = 10) {
  try {
    const response = await axios.get(`${API_URL}/dashboard/activity`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    throw error;
  }
}

/**
 * Fetch sales statistics for charts
 * @param {string} period - Time period (day, week, month, year)
 * @returns {Promise} Promise that resolves to sales statistics
 */
export async function fetchSalesStats(period = 'month') {
  try {
    const response = await axios.get(`${API_URL}/dashboard/sales-stats`, {
      params: { period }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales statistics:', error);
    throw error;
  }
}

/**
 * Fetch agent performance metrics
 * @returns {Promise} Promise that resolves to performance metrics
 */
export async function fetchPerformanceMetrics() {
  try {
    const response = await axios.get(`${API_URL}/dashboard/performance`);
    return response.data;
  } catch (error) {
    console.error('Error fetching performance metrics:', error);
    throw error;
  }
}
