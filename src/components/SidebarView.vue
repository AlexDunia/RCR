<script setup>
import { useNavigationStore } from '../stores/navigation';
import { computed } from 'vue';

const navStore = useNavigationStore();
const activeMenu = computed(() => navStore.activeMenu);

const menuItems = [
  { name: 'Dashboard', icon: '🏠', key: 'dashboard', path: '/' },
  { name: 'Manage Listing', icon: '📋', key: 'manage-listing', path: '/property/1' },
  { name: 'Create Offer', icon: '✏️', key: 'create-offer', path: '/create-offer' },
  { name: 'Receipts & Documents', icon: '📄', key: 'receipts-docs', path: '/receipts-docs' },
  { name: 'Marketing Tools', icon: '📢', key: 'marketing-tools', path: '/marketing-tools' },
  { name: 'Education & Training', icon: '🎓', key: 'education-training', path: '/education-training' },
  { name: 'Tasks', icon: '✅', key: 'tasks', path: '/tasks' },
];

const setActiveMenu = (key) => {
  navStore.setActiveMenu(key);
};
</script>

<template>
  <aside class="sidebar">
    <h2 class="logo">Real <span>City</span></h2>
    <nav>
      <ul>
        <li v-for="item in menuItems" :key="item.key" :class="{ active: activeMenu === item.key }">
          <router-link :to="item.path" @click="setActiveMenu(item.key)">
            <span class="icon">{{ item.icon }}</span>
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  background: #002b5b;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.logo {
  font-size: 22px;
  font-weight: bold;
}

.logo span {
  color: #ffcc00;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

nav ul li a {
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  width: 100%;
}

nav ul li.active,
nav ul li:hover {
  background: #1e4e8c;
}

.icon {
  margin-right: 10px;
}
</style>
