import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProfileStore = defineStore('profile', () => {
  // State
  const profileData = ref({});
  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const userRole = computed(() => {
    // This would usually come from an auth store or service
    // For demo purposes, we're hardcoding it here
    return 'agent'; // Could be 'admin', 'agent', or 'client'
  });

  // Mock data for different roles
  const mockAgentData = {
    fullName: 'Alex Dunia',
    role: 'Senior Real Estate Agent',
    email: 'helloduniamedia@gmail.com',
    phoneNumber: '08108725914',
    alternatePhone: '08108725914',
    companyName: 'Soft branded real estate foundations limited.',
    companyDescription: 'A real housing estate that wants your convenience, comfort and happiness.',
    address: '123 Main Street, Los Angeles, CA 90001',
    recoNumber: '97639377946139476',
    trebbNumber: '97639377946139476',
    yearsExperience: '5',
    specialties: 'Luxury homes, Waterfront properties',
    avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png'
  };

  const mockAdminData = {
    fullName: 'Admin User',
    role: 'System Administrator',
    email: 'admin@example.com',
    phoneNumber: '123-456-7890',
    jobTitle: 'Lead Administrator',
    department: 'IT Administration',
    adminRole: 'System Administrator',
    accessLevel: 'Full access',
    lastLogin: '2023-03-15 14:30',
    createdAt: '2022-01-10',
    avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png'
  };

  const mockClientData = {
    fullName: 'Client User',
    role: 'Home Buyer',
    email: 'client@example.com',
    phoneNumber: '987-654-3210',
    address: '456 Client Street, New York, NY 10001',
    propertyType: 'Single-family home',
    budgetRange: '$500,000 - $750,000',
    preferredLocations: 'Brooklyn, Queens',
    bedrooms: '3+',
    agent: {
      name: 'Alex Dunia',
      email: 'helloduniamedia@gmail.com',
      phone: '08108725914',
      avatar: '/path-to-avatar.jpg'
    },
    avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png'
  };

  // Actions
  function fetchProfileData() {
    isLoading.value = true;
    error.value = null;

    // Simulate API call
    setTimeout(() => {
      try {
        // Get data based on role
        if (userRole.value === 'admin') {
          profileData.value = mockAdminData;
        } else if (userRole.value === 'agent') {
          profileData.value = mockAgentData;
        } else {
          profileData.value = mockClientData;
        }
        isLoading.value = false;
      } catch (e) {
        error.value = 'Failed to load profile data';
        isLoading.value = false;
        console.error(e);
      }
    }, 300);
  }

  function updateProfileData(data) {
    isLoading.value = true;
    error.value = null;

    // Simulate API call to update profile
    setTimeout(() => {
      try {
        profileData.value = { ...profileData.value, ...data };
        isLoading.value = false;
      } catch (e) {
        error.value = 'Failed to update profile data';
        isLoading.value = false;
        console.error(e);
      }
    }, 300);
  }

  return {
    profileData,
    isLoading,
    error,
    userRole,
    fetchProfileData,
    updateProfileData
  };
});
