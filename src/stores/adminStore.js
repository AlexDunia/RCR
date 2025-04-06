import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAdminStore = defineStore('admin', () => {
  // State
  const adminData = ref({});
  const isLoading = ref(false);
  const error = ref(null);
  const activityLog = ref([]);
  const notifications = ref([]);

  // Mock admin data
  const mockAdminData = {
    id: 'admin-001',
    fullName: 'John Doe',
    role: 'System Administrator',
    email: 'admin@realcity.com',
    phoneNumber: '(555) 123-4567',
    jobTitle: 'Lead Administrator',
    department: 'IT Administration',
    accessLevel: 'Full access',
    permissions: ['manage-agents', 'manage-properties', 'manage-clients', 'manage-content', 'view-analytics'],
    lastLogin: '2023-06-15 14:30',
    createdAt: '2022-01-10',
    twoFactorEnabled: true,
    apiAccessKeys: ['ak_real12345', 'ak_city67890'],
    preferences: {
      notifications: {
        email: true,
        browser: true,
        mobile: false
      },
      theme: 'light',
      defaultView: 'dashboard'
    }
  };

  // Mock activity log
  const mockActivityLog = [
    { id: 'log-001', action: 'Login', timestamp: '2023-06-15 14:30:00', ipAddress: '192.168.1.1', userAgent: 'Chrome/Windows' },
    { id: 'log-002', action: 'Updated agent profile', timestamp: '2023-06-15 11:24:32', details: 'Agent ID: AGT-123' },
    { id: 'log-003', action: 'Created new property listing', timestamp: '2023-06-14 16:45:10', details: 'Property ID: PROP-456' },
    { id: 'log-004', action: 'Generated monthly report', timestamp: '2023-06-12 09:15:22', details: 'June 2023 Sales Report' },
    { id: 'log-005', action: 'System settings modified', timestamp: '2023-06-10 13:05:47', details: 'Email notification settings' }
  ];

  // Mock notifications
  const mockNotifications = [
    { id: 'notif-001', type: 'alert', message: 'System update scheduled for tonight', timestamp: '2023-06-15 10:30:00', read: false },
    { id: 'notif-002', type: 'message', message: 'New message from Agent Sarah', timestamp: '2023-06-14 16:20:15', read: true },
    { id: 'notif-003', type: 'task', message: 'Approval needed for new property listing', timestamp: '2023-06-14 09:45:32', read: false }
  ];

  // Getters
  const unreadNotifications = computed(() => {
    return notifications.value.filter(notification => !notification.read);
  });

  // Actions
  function fetchAdminData() {
    isLoading.value = true;
    error.value = null;

    // Simulate API call
    setTimeout(() => {
      try {
        adminData.value = mockAdminData;
        isLoading.value = false;
      } catch (e) {
        error.value = 'Failed to load admin data';
        isLoading.value = false;
        console.error(e);
      }
    }, 300);
  }

  function fetchActivityLog() {
    isLoading.value = true;
    error.value = null;

    // Simulate API call
    setTimeout(() => {
      try {
        activityLog.value = mockActivityLog;
        isLoading.value = false;
      } catch (e) {
        error.value = 'Failed to load activity log';
        isLoading.value = false;
        console.error(e);
      }
    }, 300);
  }

  function fetchNotifications() {
    isLoading.value = true;
    error.value = null;

    // Simulate API call
    setTimeout(() => {
      try {
        notifications.value = mockNotifications;
        isLoading.value = false;
      } catch (e) {
        error.value = 'Failed to load notifications';
        isLoading.value = false;
        console.error(e);
      }
    }, 300);
  }

  function updateAdminData(data) {
    isLoading.value = true;
    error.value = null;

    // Simulate API call to update profile
    setTimeout(() => {
      try {
        adminData.value = { ...adminData.value, ...data };
        isLoading.value = false;
      } catch (e) {
        error.value = 'Failed to update admin data';
        isLoading.value = false;
        console.error(e);
      }
    }, 300);
  }

  function markNotificationAsRead(notificationId) {
    const notification = notifications.value.find(notif => notif.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  function markAllNotificationsAsRead() {
    notifications.value.forEach(notification => {
      notification.read = true;
    });
  }

  function toggleTwoFactorAuth(enabled) {
    // In a real application, this would include authentication steps
    adminData.value.twoFactorEnabled = enabled;
  }

  function updatePreferences(preferences) {
    adminData.value.preferences = { ...adminData.value.preferences, ...preferences };
  }

  // Initialize store with mock data
  function initializeStore() {
    fetchAdminData();
    fetchActivityLog();
    fetchNotifications();
  }

  return {
    adminData,
    activityLog,
    notifications,
    isLoading,
    error,
    unreadNotifications,
    fetchAdminData,
    fetchActivityLog,
    fetchNotifications,
    updateAdminData,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    toggleTwoFactorAuth,
    updatePreferences,
    initializeStore
  };
});
