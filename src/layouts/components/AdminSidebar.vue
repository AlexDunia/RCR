<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeMenu = ref('');

const getActiveMenuFromPath = (path) => {
  if (path === '/') return 'dashboard';
  if (path.startsWith('/properties')) return 'properties';
  if (path.startsWith('/clients')) return 'clients';
  if (path.startsWith('/agents')) return 'agents';
  return 'dashboard';
};

const updateActiveMenu = () => {
  activeMenu.value = getActiveMenuFromPath(route.path);
};

watch(() => route.path, updateActiveMenu, { immediate: true });

onMounted(() => {
  updateActiveMenu();
});

const menuItems = [
  {
    name: 'Dashboard',
    key: 'dashboard',
    path: '/',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`
  },
  {
    name: 'Properties',
    key: 'properties',
    path: '/properties',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 13H5C3.89543 13 3 13.8954 3 15V21H21V15C21 13.8954 20.1046 13 19 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`
  },
  {
    name: 'Clients',
    key: 'clients',
    path: '/clients',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`
  },
  {
    name: 'Agents',
    key: 'agents',
    path: '/agents',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`
  }
];
</script>

<template>
  <aside class="sidebar">
    <div class="logo-container">
      <h2 class="logo">Real City</h2>
      <p class="tagline">realty inc brokerage</p>
    </div>

    <nav class="sidebar-nav">
      <ul>
        <li v-for="item in menuItems" :key="item.key" :class="{ active: activeMenu === item.key }">
          <router-link :to="item.path" :class="{ active: activeMenu === item.key }">
            <span class="icon" v-html="item.icon"></span>
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="account-section">
      <h3>Account Management</h3>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background: #004080;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
}

.logo-container {
  padding: 10px 0 20px 10px;
}

.logo {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.5px;
}

.tagline {
  font-size: 12px;
  margin: 0;
  opacity: 0.7;
  font-weight: 400;
}

.sidebar-nav {
  flex: 1;
  margin-top: 20px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin-bottom: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

nav ul li a {
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
}

.icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
}

.icon svg {
  width: 20px;
  height: 20px;
}

nav ul li.active {
  background: white;
}

nav ul li.active a {
  color: #004080;
}

nav ul li.active .icon svg {
  stroke: #004080;
}

nav ul li:not(.active):hover {
  background: rgba(255, 255, 255, 0.1);
}

.account-section {
  margin-top: auto;
  padding: 20px 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.account-section h3 {
  font-size: 12px;
  font-weight: 500;
  margin: 0;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
