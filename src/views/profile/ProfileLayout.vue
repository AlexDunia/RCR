<template>
  <div class="profile-container">
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-info">
        <img
          :src="profileData?.avatar || '/path-to-default-avatar.jpg'"
          class="profile-avatar"
          alt="Profile Picture"
        />
        <div class="profile-text">
          <h1>{{ profileData?.fullName || 'User Name' }}</h1>
          <p>{{ profileData?.role || 'Role' }}</p>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs-container">
      <div class="tabs-wrapper">
        <nav class="tabs-nav">
          <router-link
            v-for="tab in tabs"
            :key="tab.id"
            :to="tab.path"
            class="tab-button"
            :class="{ 'tab-active': $route.path === tab.path }"
          >
            {{ tab.name }}
          </router-link>
        </nav>
      </div>
    </div>

    <!-- Content Area - This will render the child routes -->
    <router-view v-if="route.path !== '/profile'" />
    <component
      v-else
      :is="currentProfileComponent"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, defineAsyncComponent } from 'vue';
import { useProfileStore } from '@/stores/profile';
import { useRoute } from 'vue-router';

const profileStore = useProfileStore();
const route = useRoute();

const AdminProfileBio = defineAsyncComponent(() =>
  import('@/features/profile/AdminProfileBio.vue')
);
const AgentProfileBio = defineAsyncComponent(() =>
  import('@/features/profile/AgentProfileBio.vue')
);
const ClientProfileBio = defineAsyncComponent(() =>
  import('@/features/profile/ClientProfileBio.vue')
);

const currentProfileComponent = computed(() => {
  if (profileStore.userRole === 'admin') {
    return AdminProfileBio;
  } else if (profileStore.userRole === 'agent') {
    return AgentProfileBio;
  } else {
    return ClientProfileBio;
  }
});

const tabs = [
  { id: 'bio', name: 'Bio', path: '/profile' },
  { id: 'listings', name: 'Listings', path: '/profile/listings' },
  { id: 'documents', name: 'Documents', path: '/profile/documents' }
];

// This will be populated from the store
const profileData = computed(() => profileStore.profileData);

// Load profile data when component mounts
onMounted(() => {
  profileStore.fetchProfileData();
});
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background-color: #f9fafb;
  font-family: Inter, system-ui, -apple-system, sans-serif;
}

.profile-header {
  padding: 28px 32px 16px;
  background-color: #fff;
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(229, 231, 235, 0.8);
}

.profile-text h1 {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  letter-spacing: -0.025em;
}

.profile-text p {
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
  margin: 2px 0 0;
  font-weight: 400;
}

.tabs-container {
  padding: 0 32px;
  background-color: #fff;
}

.tabs-wrapper {
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
}

.tabs-nav {
  display: flex;
  margin-bottom: -1px;
}

.tab-button {
  margin-right: 32px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
  border: none;
  background: none;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  font-weight: 500;
  transition: all 0.15s ease-in-out;
}

.tab-button:hover {
  color: #374151;
}

.tab-active {
  color: #2563eb;
  font-weight: 500;
  background-color: #f9fafb;
  border-bottom: 2px solid #2563eb;
  border-radius: 6px 6px 0 0;
}

/* Ensure consistent font rendering */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .profile-header,
  .tabs-container {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
