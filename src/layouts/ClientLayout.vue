<template>
  <div class="client-layout">
    <!-- Blue Sidebar -->
    <div class="sidebar">
      <div class="logo-container">
        <div class="logo">
          <span class="company-name">Real City</span>
          <span class="tagline">REALTY BE DIFFERENT</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/client-dashboard" class="nav-item" active-class="active">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
          <span>Dashboard</span>
        </router-link>

        <router-link to="/client/properties" class="nav-item" active-class="active">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <span>Properties</span>
        </router-link>

        <router-link to="/client/agents" class="nav-item" active-class="active">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <span>Find agents</span>
        </router-link>

        <router-link to="/client/favorites" class="nav-item" active-class="active">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <span>Favourites</span>
        </router-link>

        <router-link to="/client/documents" class="nav-item" active-class="active">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <span>Documents</span>
        </router-link>

        <router-link to="/client/profile" class="nav-item" active-class="active">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <span>Profile</span>
        </router-link>
      </nav>

      <div class="account-section">
        <div class="section-label">Account Management</div>
        <router-link to="/client/settings" class="nav-item" active-class="active">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </div>
          <span>Settings</span>
        </router-link>
      </div>

      <div class="user-profile">
        <div class="avatar">
          <span>{{ userInitials }}</span>
        </div>
        <div class="user-info">
          <span class="name">{{ userName }}</span>
          <span class="role">Client</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-icon">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="content-area">
      <!-- Top Header Bar - Conditionally displayed based on layout store -->
      <header v-if="!layoutStore.hideHeader" class="header">
        <div class="search-container">
          <div class="search-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Search..." class="search-input" />
            <div class="shortcut">⌘ K</div>
          </div>
        </div>

        <div class="header-actions">
          <div class="notification-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span class="notification-badge">50</span>
          </div>

          <div class="messages-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span class="notification-badge">8+</span>
          </div>

          <div class="user-dropdown">
            <div class="user-avatar">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex Dunia" />
            </div>
            <span class="username">Alex Dunia</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-icon">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRoleStore } from '@/stores/roleStore';
import { useLayoutStore } from '@/stores/layout';

const route = useRoute();
const roleStore = useRoleStore();
const layoutStore = useLayoutStore();

// Get user information
const userName = computed(() => roleStore.getCurrentUser().name || 'John Doe');
const userInitials = computed(() => {
  const name = userName.value;
  if (!name) return 'JD';

  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
});

// Set page title based on current route
const pageTitle = ref('Dashboard');

watch(
  () => route.name,
  (newRouteName) => {
    switch (newRouteName) {
      case 'ClientDashboard':
        pageTitle.value = 'Dashboard';
        break;
      case 'ClientProperties':
        pageTitle.value = 'Properties';
        break;
      case 'ClientAgents':
        pageTitle.value = 'Find an Agent';
        break;
      case 'ClientFavorites':
        pageTitle.value = 'Favourites';
        break;
      case 'ClientDocuments':
        pageTitle.value = 'My Documents';
        break;
      case 'ClientProfile':
        pageTitle.value = 'My Profile';
        break;
      default:
        pageTitle.value = 'Client Portal';
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* Main Layout */
.client-layout {
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background-color: #0a4d8c;
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 10;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.logo-container {
  padding: 25px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.logo {
  display: flex;
  flex-direction: column;
}

.company-name {
  font-size: 22px;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.tagline {
  font-size: 10px;
  letter-spacing: 0.5px;
  opacity: 0.7;
}

.sidebar-nav {
  flex-grow: 1;
  overflow-y: auto;
  padding-top: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  margin: 4px 0;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item:hover, .nav-item.active {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: white;
}

.nav-icon {
  margin-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
}

.section-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
  padding: 16px 20px 8px;
}

.account-section {
  padding-top: 10px;
}

.user-profile {
  display: flex;
  align-items: center;
  padding: 20px;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.avatar {
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 12px;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
  font-size: 14px;
}

.role {
  font-size: 12px;
  opacity: 0.7;
}

.dropdown-icon {
  margin-left: auto;
  opacity: 0.7;
}

/* Content Area Styles */
.content-area {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border-bottom: 1px solid #eaecef;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 5;
}

.search-container {
  flex: 1;
  max-width: 500px;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #f1f3f5;
  border-radius: 8px;
  padding: 0 15px;
  height: 40px;
  width: 100%;
}

.search-icon {
  color: #6c757d;
  margin-right: 10px;
}

.search-input {
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
}

.shortcut {
  color: #6c757d;
  background-color: #e9ecef;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 10px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 25px;
}

.notification-icon, .messages-icon {
  position: relative;
  color: #343a40;
  cursor: pointer;
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff3b30;
  color: white;
  font-size: 10px;
  font-weight: 600;
  border-radius: 10px;
  padding: 2px 6px;
  min-width: 14px;
  text-align: center;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #eaecef;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  font-size: 14px;
  font-weight: 500;
}

.main-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background-color: #f8f9fa;
}

/* Responsive Design */
@media (max-width: 991px) {
  .sidebar {
    width: 70px;
    overflow: hidden;
  }

  .logo-container {
    justify-content: center;
    padding: 15px 0;
  }

  .logo .company-name,
  .logo .tagline,
  .nav-item span,
  .section-label,
  .user-info,
  .user-profile .dropdown-icon {
    display: none;
  }

  .nav-icon {
    margin-right: 0;
  }

  .content-area {
    margin-left: 70px;
  }

  .user-profile {
    justify-content: center;
    padding: 15px 0;
  }

  .avatar {
    margin-right: 0;
  }
}

@media (max-width: 767px) {
  .sidebar {
    width: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .content-area {
    margin-left: 0;
  }

  .header {
    padding: 0 15px;
  }

  .search-container {
    max-width: 200px;
  }

  .main-content {
    padding: 20px 15px;
  }
}
</style>
