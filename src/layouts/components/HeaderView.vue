<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

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

// Routes with custom headers
const isDraftsPage = computed(() => isRoutePath('/drafts'));
const isEducationTrainingPage = computed(() => isRoutePath('/education-training'));
const isManageListingsPage = computed(() => {
  return isRoutePath(['/manage-listings', '/add-listing', '/view-listings', '/pending-approvals']);
});
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
</script>

<template>
  <header class="header" :class="{ 'below-modal': $root.modalOpen }">
    <!-- Show marketing header on post detail page -->
    <div v-if="isPostDetailPage" class="custom-header">
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
    <div v-else class="search-bar">
      <svg class="search-icon" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" stroke="black" stroke-width="1.5" fill="none" />
        <line x1="16" y1="16" x2="22" y2="22" stroke="black" stroke-width="1.5" />
      </svg>
      <input type="text" placeholder="Search..." />
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
  border:none;
  z-index: 100;
  box-shadow: 0px 2px 5px rgba(99, 98, 98, 0.1);
  /* Ensure it stays below modal overlays */
}

.header.below-modal {
  z-index: 10;
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
</style>
