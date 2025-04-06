<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAgentStore } from '@/stores/agentStore';
import { useClientStore } from '@/stores/clientStore';

const route = useRoute();
const router = useRouter();
const agentStore = useAgentStore();
const clientStore = useClientStore();

// Function to go back to previous page
const goBack = () => {
  router.back();
};

// Get current agent if on agent profile page
const currentAgent = computed(() => {
  if (route.name === 'AdminAgentProfileDetail' || route.name === 'AgentProfileDetail') {
    const agentId = parseInt(route.params.id);
    return agentStore.getAgentById(agentId);
  }
  return null;
});

// Get current client if on client profile page
const currentClient = computed(() => {
  if (route.name === 'ClientProfile') {
    const clientId = parseInt(route.params.id);
    return clientStore.getClientById(clientId);
  }
  return null;
});

// Check if the current route is the PostDetail page
const isPostDetailPage = computed(() => {
  return route.path.includes('/social-platforms/post/') ||
         route.path.includes('/marketing-tools/social-platforms/post/') ||
         route.path.includes('/marketing/post/') ||
         (route.matched && route.matched.some(record =>
           record.components && record.components.default &&
           record.components.default.name === 'PostDetail'));
});

// Check if the current route matches a specific route path or pattern
const isRoutePath = (path) => {
  if (Array.isArray(path)) {
    return path.some(p => route.path === p || route.path.startsWith(p + '/'));
  }
  return route.path === path || route.path.startsWith(path + '/');
};

// Check if on agent profile page
const isAgentProfileDetailPage = computed(() => {
  return route.name === 'AdminAgentProfileDetail' || route.name === 'AgentProfileDetail';
});

// Check if on client profile page
const isClientProfilePage = computed(() => {
  return route.name === 'ClientProfile';
});

// Routes with custom headers
const isDraftsPage = computed(() => isRoutePath('/drafts'));
const isEducationTrainingPage = computed(() => isRoutePath('/education-training'));
const isAdminEducationTrainingPage = computed(() => isRoutePath('/admin/education-training'));
const isManageListingsPage = computed(() => {
  return isRoutePath(['/manage-listings', '/add-listing', '/view-listings', '/pending-approvals']);
});
const isPropertiesPage = computed(() => isRoutePath('/properties'));
const isClientsAdminPage = computed(() => isRoutePath('/clients'));
const isAgentsAdminPage = computed(() => isRoutePath('/agents'));
const isDashboardPage = computed(() => isRoutePath('/'));
const isAnalyticsPage = computed(() => isRoutePath('/analytics'));
const isCalendarPage = computed(() => isRoutePath('/calendar'));
const isMessagesPage = computed(() => isRoutePath('/messages'));
const isSettingsPage = computed(() => isRoutePath('/settings'));
const isTasksPage = computed(() => isRoutePath('/tasks'));
const isReceiptsDocsPage = computed(() => isRoutePath('/receipts-docs'));
const isMarketingToolsPage = computed(() => isRoutePath('/marketing-tools'));
const isProfilePage = computed(() => isRoutePath('/profile'));
const isAgentProfilePage = computed(() => isRoutePath('/agent-profile'));
const isChatPage = computed(() => isRoutePath(['/chat/admin', '/chat/client']));
const isAboutPage = computed(() => isRoutePath('/about'));
const isSuccessPlanPage = computed(() => isRoutePath('/marketing-tools/success-plan'));
const isChecklistPage = computed(() => isRoutePath('/marketing-tools/checklist'));
const isDoneForYouPage = computed(() => isRoutePath('/marketing-tools/done-for-you'));
const isSocialPlatformsPage = computed(() => isRoutePath('/marketing-tools/social-platforms'));
const isEducationSessionPage = computed(() =>
  isRoutePath(['/education-training/session', '/education-training/module']));
const isEducationTestPage = computed(() => isRoutePath('/education-training/test'));
const isEducationCreatePage = computed(() => isRoutePath('/admin/education-training/create'));
</script>

<template>
  <header class="header" :class="{ 'below-modal': $root.modalOpen }">
    <!-- Show agent profile header when viewing an agent's profile -->
    <div v-if="isAgentProfileDetailPage && currentAgent" class="custom-header agent-profile-header">
      <div class="agent-profile-info">
        <button @click="goBack" class="back-button" aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="#1a4189" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="#1a4189" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <img
          :src="currentAgent.avatar || '/images/default-avatar.jpg'"
          :alt="currentAgent.name + ' profile'"
          class="agent-header-avatar"
        />
        <div class="agent-header-details">
          <h1>{{ currentAgent.name }}</h1>
          <p>{{ currentAgent.title || 'Real Estate Agent' }}</p>
        </div>
      </div>
    </div>
    <!-- Show client profile header when viewing a client's profile -->
    <div v-else-if="isClientProfilePage && currentClient" class="custom-header client-profile-header">
      <div class="client-profile-info">
        <button @click="goBack" class="back-button" aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="#1a4189" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="#1a4189" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <img
          :src="currentClient.profilePicture || '/images/default-avatar.jpg'"
          :alt="currentClient.name + ' profile'"
          class="client-header-avatar"
        />
        <div class="client-header-details">
          <h1>{{ currentClient.name }}</h1>
          <p>Client</p>
        </div>
      </div>
    </div>
    <!-- Show marketing header on post detail page -->
    <div v-else-if="isPostDetailPage" class="custom-header">
      <h1>Marketing Tools</h1>
      <p>Link your social media accounts to reach a wider audience.</p>
    </div>
    <!-- Show drafts header -->
    <div v-else-if="isDraftsPage" class="custom-header">
      <h1>Saved Drafts</h1>
      <p>Review and edit your saved drafts anytime</p>
    </div>
    <!-- Show education & training header -->
    <div v-else-if="isEducationTrainingPage" class="custom-header">
      <h1>Education & Training</h1>
      <p>Get informed about the business and modern trends on real estate</p>
    </div>

    <!-- Show admin education & training header -->
    <div v-else-if="isAdminEducationTrainingPage" class="custom-header">
      <h1>Manage Education & Training</h1>
      <p>Create and organize training resources for agents</p>
    </div>

    <!-- Show education creation header -->
    <div v-else-if="isEducationCreatePage" class="custom-header">
      <div class="create-education-header">
        <button @click="goBack" class="back-button" aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="#1a4189" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="#1a4189" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="education-create-details">
          <h1>Create Educational Session</h1>
          <p>Design a structured learning experience with chapters, sections, and resources</p>
        </div>
      </div>
    </div>
    <!-- Show education session header -->
    <div v-else-if="isEducationSessionPage" class="custom-header">
      <h1>Session Details</h1>
      <p>Review your current session materials and progress</p>
    </div>
    <!-- Show education test header -->
    <div v-else-if="isEducationTestPage" class="custom-header">
      <h1>Knowledge Assessment</h1>
      <p>Complete this test to verify your understanding of the material</p>
    </div>
    <!-- Show manage listings header -->
    <div v-else-if="isManageListingsPage" class="custom-header">
      <h1>Manage Listings</h1>
      <p>How you can add, remove, and edit properties on your profile</p>
    </div>
    <!-- Show properties header -->
    <div v-else-if="isPropertiesPage" class="custom-header">
      <h1>Properties</h1>
      <p>Browse and manage all available properties</p>
    </div>
    <!-- Show clients admin header -->
    <div v-else-if="isClientsAdminPage" class="custom-header">
      <h1>Find Clients</h1>
      <p>For Real City admin</p>
    </div>
    <!-- Show agents admin header -->
    <div v-else-if="isAgentsAdminPage" class="custom-header">
      <h1>Agents</h1>
      <p>Manage agents and their properties</p>
    </div>
    <!-- Show dashboard header -->
    <div v-else-if="isDashboardPage" class="custom-header">
      <h1>Dashboard</h1>
      <p>View your performance metrics and important updates</p>
    </div>
    <!-- Show analytics header -->
    <div v-else-if="isAnalyticsPage" class="custom-header">
      <h1>Analytics</h1>
      <p>Track and analyze your business performance</p>
    </div>
    <!-- Show calendar header -->
    <div v-else-if="isCalendarPage" class="custom-header">
      <h1>Calendar</h1>
      <p>Manage your schedule and appointments</p>
    </div>
    <!-- Show messages header -->
    <div v-else-if="isMessagesPage" class="custom-header">
      <h1>Messages</h1>
      <p>Communicate with clients and team members</p>
    </div>
    <!-- Show settings header -->
    <div v-else-if="isSettingsPage" class="custom-header">
      <h1>Settings</h1>
      <p>Customize your account preferences and profile</p>
    </div>
    <!-- Show tasks header -->
    <div v-else-if="isTasksPage" class="custom-header">
      <h1>Tasks</h1>
      <p>Manage and track your daily activities and to-dos</p>
    </div>
    <!-- Show documents header -->
    <div v-else-if="isReceiptsDocsPage" class="custom-header">
      <h1>Documents</h1>
      <p>Organize and access all your important files and forms</p>
    </div>
    <!-- Show marketing tools header -->
    <div v-else-if="isMarketingToolsPage" class="custom-header">
      <h1>Marketing Tools</h1>
      <p>Promote your business and reach more potential clients</p>
    </div>
    <!-- Show success plan header -->
    <div v-else-if="isSuccessPlanPage" class="custom-header">
      <h1>Success Plan</h1>
      <p>Create and track your marketing success plan</p>
    </div>
    <!-- Show checklist header -->
    <div v-else-if="isChecklistPage" class="custom-header">
      <h1>Marketing Checklists</h1>
      <p>Stay organized with customizable marketing checklists</p>
    </div>
    <!-- Show done for you header -->
    <div v-else-if="isDoneForYouPage" class="custom-header">
      <h1>Done For You</h1>
      <p>Ready-to-use marketing materials for your business</p>
    </div>
    <!-- Show social platforms header -->
    <div v-else-if="isSocialPlatformsPage" class="custom-header">
      <h1>Social Platforms</h1>
      <p>Manage and schedule your social media content</p>
    </div>
    <!-- Show profile header -->
    <div v-else-if="isProfilePage" class="custom-header">
      <h1>My Profile</h1>
      <p>Manage your personal information and preferences</p>
    </div>
    <!-- Show agent profile header -->
    <div v-else-if="isAgentProfilePage" class="custom-header">
      <h1>Agent Profile</h1>
      <p>Customize how clients see your professional profile</p>
    </div>
    <!-- Show chat header -->
    <div v-else-if="isChatPage" class="custom-header">
      <h1>Messages</h1>
      <p>Chat with clients and team members in real-time</p>
    </div>
    <!-- Show about header -->
    <div v-else-if="isAboutPage" class="custom-header">
      <h1>About</h1>
      <p>Learn more about our platform and services</p>
    </div>
    <!-- Default search bar for other pages -->
    <div v-else class="custom-header">
      <h1>Education & Training</h1>
      <p>Manage educational sessions for your real estate agents</p>
    </div>

    <!-- Wrapping both icons in a flex container -->
    <div class="icon-wrapper">
      <!-- Message Icon -->
      <div class="icon-container">
        <svg viewBox="0 0 24 24">
          <path d="M4 4h16v12H4z" />
          <path d="M4 4l8 6 8-6" />
        </svg>
        <div class="notification-badge">50</div>
      </div>

      <!-- Bell Notification Icon -->
      <div class="icon-container">
        <svg viewBox="0 0 24 24">
          <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2z" />
          <path d="M18 16V10a6 6 0 1 0-12 0v6l-2 2h16l-2-2z" />
        </svg>
        <div class="notification-badge">99+</div>
      </div>
    </div>

    <!-- Profile Section -->
    <div class="profile-section">
      <img class="profile-image"
        src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png"
        alt="Profile" />
      <span class="profile-name">John Doe</span>
      <svg class="dropdown-icon" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 38px;
  background: white;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  border: none;
  z-index: 100;
  box-shadow: 0px 2px 5px rgba(99, 98, 98, 0.1);
  /* Ensure it stays on top for sticky behavior */
  transition: box-shadow 0.3s ease;
}

.header.below-modal {
  z-index: 10;
}

/* Agent profile header styles */
.agent-profile-header, .client-profile-header {
  width: 100%;
}

.agent-profile-info, .client-profile-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.back-button:hover {
  background-color: rgba(26, 65, 137, 0.08);
}

.back-button:active {
  background-color: rgba(26, 65, 137, 0.12);
}

.agent-header-avatar, .client-header-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f3f4f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.agent-header-details, .client-header-details {
  display: flex;
  flex-direction: column;
}

.agent-header-details h1, .client-header-details h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a4189;
}

.agent-header-details p, .client-header-details p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

h1 {
  font-size: 24px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #EAE8E8;
  /* No background */
  border-radius: 6px;
  /* Rounded corners */
  padding: 15px 16px;
  width:500px;
  transition: border 0.2s ease-in-out;
}

/* Marketing Header */
.marketing-header, .custom-header {
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.marketing-header h1, .custom-header h1 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
  line-height: 1.2;
}

.marketing-header p, .custom-header p {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
  font-weight: normal;
}

/* Apply stroke to the search bar container when focused */
.search-bar:focus-within {
  border: 0.1px solid rgba(0, 102, 255, 0.3);
  /* Soft, light blue */
}

/* Input field: No background, no border */
input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  color:red;
  /* Take remaining space */
  font-size: 14px;
}

/* SVG Search Icon (Stroke only, no fill) */
.search-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.actions button {
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  gap: 40px;
}

.icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  /* Adjust for better spacing */
  height: 40px;
  background: #f0f0f0;
  /* Light grey background */
  border-radius: 50%;
}

.icon-container svg {
  width: 27px;
  /* Adjust size */
  height: 27px;
  stroke: rgb(40, 40, 40);
  fill: none;
  stroke-width: 1.12;
}

.notification-badge {
  position: absolute;
  top: -4px;
  /* Move it slightly up */
  right: -4px;
  /* Move it closer to the icon */
  background-color: red;
  color: white;
  font-size: 10px;
  font-weight: bold;
  width: auto;
  min-width: 16px;
  /* Ensure it adapts to numbers like 99+ */
  height: 16px;
  padding: 2px 5px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}


/* Profile side */
.profile-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right:30px;
  cursor: pointer;
}

.profile-image {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.dropdown-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

/* Back button styles removed */

.create-education-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.education-create-details h1 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  color: #1a4189;
  font-weight: 600;
}

.education-create-details p {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}
</style>
