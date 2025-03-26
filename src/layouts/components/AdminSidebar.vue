<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useNavigationStore } from '@/stores/navigation';

const router = useRouter();
const route = useRoute();
const navigationStore = useNavigationStore();

const isCollapsed = ref(false);

const adminMenuItems = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    path: '/admin/dashboard',
    children: []
  },
  {
    title: 'User Management',
    icon: 'users',
    path: '/admin/users',
    children: [
      { title: 'All Users', path: '/admin/users/all' },
      { title: 'Agents', path: '/admin/users/agents' },
      { title: 'Clients', path: '/admin/users/clients' }
    ]
  },
  {
    title: 'Properties',
    icon: 'home',
    path: '/admin/properties',
    children: [
      { title: 'All Properties', path: '/admin/properties/all' },
      { title: 'Pending Approvals', path: '/admin/properties/pending' },
      { title: 'Archived', path: '/admin/properties/archived' }
    ]
  },
  {
    title: 'System Settings',
    icon: 'settings',
    path: '/admin/settings',
    children: [
      { title: 'General', path: '/admin/settings/general' },
      { title: 'Security', path: '/admin/settings/security' },
      { title: 'Notifications', path: '/admin/settings/notifications' }
    ]
  },
  {
    title: 'Reports',
    icon: 'chart',
    path: '/admin/reports',
    children: [
      { title: 'Analytics', path: '/admin/reports/analytics' },
      { title: 'Activity Logs', path: '/admin/reports/activity' },
      { title: 'Audit Trail', path: '/admin/reports/audit' }
    ]
  }
];

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const navigateTo = (path) => {
  router.push(path);
  navigationStore.setActiveMenu(path);
};
</script>

<template>
  <aside class="admin-sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="sidebar-header">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <button class="collapse-btn" @click="toggleCollapse">
        <i class="fas fa-chevron-left"></i>
      </button>
    </div>

    <nav class="sidebar-nav">
      <div v-for="item in adminMenuItems" :key="item.title" class="nav-section">
        <div
          class="nav-item"
          :class="{ 'active': route.path.startsWith(item.path) }"
          @click="navigateTo(item.path)"
        >
          <i :class="['fas', `fa-${item.icon}`]"></i>
          <span v-if="!isCollapsed">{{ item.title }}</span>
        </div>

        <div v-if="item.children && item.children.length > 0" class="sub-menu">
          <div
            v-for="child in item.children"
            :key="child.title"
            class="sub-menu-item"
            :class="{ 'active': route.path === child.path }"
            @click="navigateTo(child.path)"
          >
            <span>{{ child.title }}</span>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.admin-sidebar {
  width: 280px;
  height: 100vh;
  background-color: #1a1a1a;
  color: #fff;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

.admin-sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  height: 40px;
  width: auto;
}

.collapse-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.collapse-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-nav {
  padding: 20px 0;
}

.nav-section {
  margin-bottom: 8px;
}

.nav-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-item i {
  width: 20px;
  text-align: center;
}

.sub-menu {
  padding-left: 20px;
  margin-top: 4px;
}

.sub-menu-item {
  padding: 8px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.9em;
}

.sub-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sub-menu-item.active {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
