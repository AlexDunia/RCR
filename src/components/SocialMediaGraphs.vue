<template>
  <div class="social-graphs-section">
    <h2 class="text-xl font-semibold mb-6">Social Media Insights</h2>

    <!-- Loading state -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="i in 3" :key="i" class="bg-white rounded-lg p-6 border border-gray-200 animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div class="h-40 bg-gray-100 rounded"></div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-50 p-4 rounded-lg text-red-600">
      {{ error }}
    </div>

    <!-- Graphs grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="platform in socialPlatforms"
        :key="platform.id"
        class="bg-white rounded-lg p-6 border border-gray-200"
      >
        <!-- Card header -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center">
            <!-- Platform icon -->
            <div class="w-8 h-8 rounded flex items-center justify-center mr-3"
                :class="getPlatformColor(platform.id)">
              <component :is="getPlatformIcon(platform.id)" class="w-5 h-5 text-white" />
            </div>

            <!-- Platform name -->
            <h3 class="font-semibold text-gray-900">{{ platform.name }}</h3>
          </div>

          <!-- View all link -->
          <a href="#" class="text-xs text-gray-500 hover:text-gray-700">view all</a>
        </div>

        <!-- Filter dropdown -->
        <div class="flex justify-between items-center mb-6">
          <div class="text-sm text-gray-500">
            {{ platform.totalFollowers }} followers
          </div>

          <div class="relative">
            <button
              class="text-sm text-gray-700 border border-gray-200 rounded px-3 py-1 flex items-center"
              @click="toggleDropdown(platform.id)"
            >
              Last 7 days
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown menu (hidden by default) -->
            <div
              v-if="activeDropdown === platform.id"
              class="absolute right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 w-36"
            >
              <div class="py-1">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Last 7 days</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Last 14 days</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Last 30 days</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Last 90 days</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Graph -->
        <div class="relative h-40">
          <!-- Y-axis labels -->
          <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
            <div>100</div>
            <div>75</div>
            <div>50</div>
            <div>25</div>
            <div>0</div>
          </div>

          <!-- Graph grid lines -->
          <div class="absolute left-6 right-0 top-0 h-full">
            <div class="h-full flex flex-col justify-between">
              <div class="border-t border-gray-100 h-0"></div>
              <div class="border-t border-gray-100 h-0"></div>
              <div class="border-t border-gray-100 h-0"></div>
              <div class="border-t border-gray-100 h-0"></div>
              <div class="border-t border-gray-100 h-0"></div>
            </div>
          </div>

          <!-- Bars container -->
          <div class="absolute left-8 right-0 top-0 bottom-5 flex items-end justify-between">
            <div
              v-for="(value, index) in platform.data"
              :key="index"
              class="relative flex flex-col items-center"
              style="width: 14%;"
            >
              <!-- Tooltip -->
              <div
                v-if="activeTooltip === `${platform.id}-${index}`"
                class="absolute bottom-full mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2"
              >
                {{ value }}
              </div>

              <!-- Bar -->
              <div
                class="w-1/2 rounded-t transition-all duration-300"
                :style="{
                  height: `${value}%`,
                  backgroundColor: getPlatformBgColor(platform.id)
                }"
                @mouseenter="activeTooltip = `${platform.id}-${index}`"
                @mouseleave="activeTooltip = null"
              ></div>

              <!-- X-axis label -->
              <div class="text-xs text-gray-400 mt-1">
                {{ getDayLabel(index) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Expand button -->
        <div class="mt-4 text-center">
          <button
            class="text-indigo-600 text-sm font-medium hover:text-indigo-800"
            @click="openModal(platform)"
          >
            <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path>
            </svg>
            EXPAND
          </button>
        </div>
      </div>
    </div>

    <!-- Expanded graph modal -->
    <div
      v-if="activeModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded flex items-center justify-center mr-3"
                :class="getPlatformColor(activeModalData?.id || '')">
              <component :is="getPlatformIcon(activeModalData?.id || '')" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-semibold">{{ activeModalData?.name }} Insights</h3>
          </div>

          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Expanded graph -->
        <div class="relative h-64 mt-8 mb-8">
          <!-- Y-axis labels -->
          <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-gray-400">
            <div>100</div>
            <div>75</div>
            <div>50</div>
            <div>25</div>
            <div>0</div>
          </div>

          <!-- Graph grid lines -->
          <div class="absolute left-10 right-0 top-0 h-full">
            <div class="h-full flex flex-col justify-between">
              <div class="border-t border-gray-100 h-0"></div>
              <div class="border-t border-gray-100 h-0"></div>
              <div class="border-t border-gray-100 h-0"></div>
              <div class="border-t border-gray-100 h-0"></div>
              <div class="border-t border-gray-100 h-0"></div>
            </div>
          </div>

          <!-- Bars container -->
          <div class="absolute left-12 right-0 top-0 bottom-8 flex items-end justify-between">
            <div
              v-for="(value, index) in activeModalData?.data"
              :key="index"
              class="relative flex flex-col items-center"
              style="width: 14%;"
            >
              <!-- Tooltip -->
              <div
                v-if="activeTooltip === `modal-${index}`"
                class="absolute bottom-full mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2"
              >
                {{ value }}
              </div>

              <!-- Bar -->
              <div
                class="w-1/2 rounded-t transition-all duration-300"
                :style="{
                  height: `${value}%`,
                  backgroundColor: getPlatformBgColor(activeModalData?.id || '')
                }"
                @mouseenter="activeTooltip = `modal-${index}`"
                @mouseleave="activeTooltip = null"
              ></div>

              <!-- X-axis label -->
              <div class="text-sm text-gray-400 mt-2">
                {{ getDayLabel(index, true) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Additional insights -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="font-semibold mb-4">Additional Insights</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded">
              <div class="text-sm text-gray-500">Total Followers</div>
              <div class="text-xl font-semibold">{{ activeModalData?.totalFollowers }}</div>
            </div>
            <div class="bg-gray-50 p-4 rounded">
              <div class="text-sm text-gray-500">Last Updated</div>
              <div class="text-xl font-semibold">{{ formatDate(activeModalData?.lastUpdated) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSocialMediaStore } from '../stores/socialMediaStore';

// Icons components
const XIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5549 21H20.7996L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/>
    </svg>
  `
};

const FacebookIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  `
};

const LinkedInIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  `
};

// Get store data
const { socialPlatforms, isLoading, error, fetchSocialMediaData } = useSocialMediaStore();

// UI state
const activeDropdown = ref(null);
const activeTooltip = ref(null);
const activeModal = ref(false);
const activeModalData = ref(null);

// Helper functions
const getPlatformIcon = (platformId) => {
  switch (platformId) {
    case 'X': return XIcon;
    case 'Facebook': return FacebookIcon;
    case 'LinkedIn': return LinkedInIcon;
    default: return null;
  }
};

const getPlatformColor = (platformId) => {
  switch (platformId) {
    case 'X': return 'bg-[#000000]';
    case 'Facebook': return 'bg-[#1877F2]';
    case 'LinkedIn': return 'bg-[#0A66C2]';
    default: return 'bg-gray-500';
  }
};

const getPlatformBgColor = (platformId) => {
  switch (platformId) {
    case 'X': return '#000000';
    case 'Facebook': return '#1877F2';
    case 'LinkedIn': return '#0A66C2';
    default: return '#6B7280';
  }
};

const getDayLabel = (index, fullName = false) => {
  const days = fullName
    ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate the day of week based on today
  const today = new Date();
  const dayIndex = (today.getDay() - (6 - index)) % 7;
  return days[dayIndex < 0 ? dayIndex + 7 : dayIndex];
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// UI interaction methods
const toggleDropdown = (platformId) => {
  if (activeDropdown.value === platformId) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = platformId;
  }
};

const openModal = (platform) => {
  activeModalData.value = platform;
  activeModal.value = true;
  // Close any open dropdowns when modal opens
  activeDropdown.value = null;
};

const closeModal = () => {
  activeModal.value = false;
  activeModalData.value = null;
};

// Lifecycle hooks
onMounted(() => {
  // Fetch data when component mounts
  fetchSocialMediaData();

  // Close dropdowns when clicking outside
  const handleClickOutside = (event) => {
    if (activeDropdown.value && !event.target.closest('.relative')) {
      activeDropdown.value = null;
    }
  };

  document.addEventListener('click', handleClickOutside);

  // Cleanup
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
});
</script>

<style scoped>
.social-graphs-section {
  margin-bottom: 2rem;
}

/* Animation for loading state */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
