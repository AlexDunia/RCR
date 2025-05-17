<template>
  <header :class="[
    'public-header',
    { 'public-header--transparent': transparent && !isFixed },
    { 'public-header--fixed': isFixed }
  ]">
    <div class="container header__container">
      <!-- Logo Left -->
      <div class="header__logo">
        <h2>Real City</h2>
        <span class="header__tagline">realty inc brokerage</span>
      </div>
      <!-- Nav Center -->
      <nav class="header__nav">
        <router-link to="/buy" class="header__nav-link">Buy</router-link>
        <router-link to="/rent" class="header__nav-link">Rent</router-link>
        <router-link to="/sell" class="header__nav-link">Sell</router-link>
        <div class="header__nav-dropdown">
          <router-link to="/agent" class="header__nav-link">
            Agent <span class="dropdown-arrow">▼</span>
          </router-link>
        </div>
      </nav>
      <!-- Auth Buttons Right -->
      <div class="header__auth">
        <div v-if="roleStore.currentRole === 'all'" class="role-switcher">
          <button @click="toggleRoleDropdown" class="role-switcher__button">
            {{ roleStore.currentRole }} <span class="dropdown-arrow">▼</span>
          </button>
          <div v-if="showRoleDropdown" class="role-switcher__dropdown">
            <button
              v-for="role in roleStore.availableRoles"
              :key="role"
              @click="switchRole(role)"
              :class="['role-switcher__option', { 'role-switcher__option--active': roleStore.currentRole === role }]"
            >
              {{ role }}
            </button>
          </div>
        </div>
        <router-link to="/signup" class="header__sign-in">Sign in</router-link>
        <router-link to="/login" class="header__login">Login</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { defineProps, ref, onMounted, onUnmounted } from 'vue';
import { useRoleStore } from '@/stores/roleStore';
import { useRouter } from 'vue-router';

const roleStore = useRoleStore();
const router = useRouter();
const showRoleDropdown = ref(false);

defineProps({
  transparent: {
    type: Boolean,
    default: false
  },
  isFixed: {
    type: Boolean,
    default: false
  }
});

const toggleRoleDropdown = () => {
  showRoleDropdown.value = !showRoleDropdown.value;
};

const switchRole = async (role) => {
  roleStore.setRole(role);
  showRoleDropdown.value = false;

  // Navigate based on role
  switch (role) {
    case 'admin':
      await router.push('/admin-dashboard');
      break;
    case 'agent':
      await router.push('/agent-dashboard');
      break;
    case 'client':
      await router.push('/client-dashboard');
      break;
    case 'all':
      await router.push('/landing');
      break;
    default:
      await router.push('/landing');
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.role-switcher');
  if (dropdown && !dropdown.contains(event.target)) {
    showRoleDropdown.value = false;
  }
};

// Add and remove click outside listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.public-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  transform: translateY(-100%);
  opacity: 0;
}

.public-header--transparent {
  background: transparent;
  position: absolute;
}

.public-header--fixed {
  transform: translateY(0);
  opacity: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  display: flex;
  flex-direction: column;
}

.header__logo h2 {
  color: var(--logo-color, #1a1a1a);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.transparent .header__logo h2 {
  color: #fff;
}

.header__tagline {
  color: var(--tagline-color, #64748b);
  font-size: 0.75rem;
  opacity: 0.8;
  margin-top: 0.25rem;
}

.transparent .header__tagline {
  color: #fff;
}

.header__nav {
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-left: 4rem;
}

.header__nav-link {
  color: var(--nav-color, #1a1a1a);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.transparent .header__nav-link {
  color: #fff;
}

.header__nav-link:hover {
  opacity: 0.8;
}

.header__auth {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.header__sign-in {
  padding: 0.625rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  color: #1a1a1a;
  background: var(--sign-in-bg, #f3f4f6);
  transition: background 0.2s;
}

.transparent .header__sign-in {
  background: #fff;
}

.header__login {
  padding: 0.625rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  color: #fff;
  background: #0066cc;
  transition: background 0.2s;
}

@media (max-width: 768px) {
  .header__nav {
    display: none;
  }
}

.role-switcher {
  position: relative;
  margin-right: 1rem;
}

.role-switcher__button {
  padding: 0.625rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  background: var(--role-switcher-bg, #f3f4f6);
  color: #1a1a1a;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;
}

.transparent .role-switcher__button {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.role-switcher__button:hover {
  background: var(--role-switcher-hover-bg, #e5e7eb);
}

.role-switcher__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 120px;
  z-index: 1000;
  overflow: hidden;
}

.role-switcher__option {
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  color: #1a1a1a;
  font-size: 0.875rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
}

.role-switcher__option:hover {
  background: #f3f4f6;
}

.role-switcher__option--active {
  background: #e5e7eb;
  font-weight: 500;
}

.dropdown-arrow {
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>
