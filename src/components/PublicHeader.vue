<template>
  <nav :class="['public-nav', { 'public-nav--transparent': transparent, 'public-nav--scrolled': isScrolled }]" :style="{ position: isFixed ? 'fixed' : 'relative' }">
    <div class="public-nav__container">
      <div class="public-nav__logo">
        <router-link to="/RCR/landing">
          <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1748316444/rclogo_l7oiod.png" alt="Real City Logo" class="public-nav__logo-img" />
        </router-link>
      </div>
      <!-- Desktop Navigation -->
      <div class="public-nav__center desktop-only">
        <router-link v-if="userRole === 'all'" to="/" class="public-nav__link">Home</router-link>
        <router-link to="/RCR/buy" class="public-nav__link">Buy</router-link>
        <router-link to="/RCR/rent" class="public-nav__link">Rent</router-link>
        <router-link to="/RCR/sell" class="public-nav__link">Sell</router-link>
        <router-link to="/RCR/allagents" class="public-nav__link">Find Agents</router-link>
        <router-link to="/RCR/signup" class="public-nav__link">Join Us</router-link>
      </div>
      <div class="public-nav__right desktop-only">
        <!-- Show user dropdown if logged in, otherwise show auth buttons -->
        <div v-if="isLoggedIn" class="user-dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
          <button class="user-dropdown__trigger" @click="toggleDropdown">
            <span class="user-dropdown__name">{{ userDisplayName }}</span>
            <svg class="user-dropdown__arrow" :class="{ 'user-dropdown__arrow--open': showDropdown }" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div v-if="showDropdown" class="user-dropdown__menu">
            <div class="user-dropdown__header">
              <div class="user-dropdown__avatar">
                {{ userInitials }}
              </div>
              <div class="user-dropdown__info">
                <div class="user-dropdown__full-name">{{ userDisplayName }}</div>
                <div class="user-dropdown__email">{{ userEmail }}</div>
              </div>
            </div>
            <div class="user-dropdown__divider"></div>
            <button @click="handleLogout" class="user-dropdown__item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
        <template v-else>
          <router-link to="/RCR/signup" class="public-nav__button">Sign up</router-link>
          <router-link to="/RCR/login" class="public-nav__button public-nav__button--primary">Login</router-link>
        </template>
      </div>
      <!-- Hamburger Menu for Mobile -->
      <button class="hamburger-menu mobile-only" @click="showMobileNav = true" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <!-- Mobile Navigation Modal -->
  <Transition name="fade">
    <div v-if="showMobileNav" class="mobile-nav-modal">
      <div class="mobile-nav-modal__backdrop" @click="showMobileNav = false"></div>
      <div class="mobile-nav-modal__content">
        <button class="mobile-nav-modal__close" @click="showMobileNav = false" aria-label="Close menu">×</button>

        <!-- Mobile user section if logged in -->
        <div v-if="isLoggedIn" class="mobile-user-section">
          <div class="mobile-user__info">
            <div class="mobile-user__avatar">{{ userInitials }}</div>
            <div class="mobile-user__details">
              <div class="mobile-user__name">{{ userDisplayName }}</div>
              <div class="mobile-user__email">{{ userEmail }}</div>
            </div>
          </div>
          <div class="mobile-user__divider"></div>
          <button @click="handleLogout" class="mobile-user__logout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>

        <!-- Mobile navigation links -->
        <router-link v-if="userRole === 'all'" to="/" class="mobile-nav-modal__link" @click="showMobileNav = false">Home</router-link>
        <router-link to="/allagents" class="mobile-nav-modal__link" @click="showMobileNav = false">Find Agents</router-link>
        <router-link to="/signup" class="mobile-nav-modal__link" @click="showMobileNav = false">Join Us</router-link>

        <!-- Mobile auth buttons if not logged in -->
        <div v-if="!isLoggedIn" class="mobile-nav-modal__buttons">
          <router-link to="/signup" class="mobile-nav-modal__button" @click="showMobileNav = false">Sign up</router-link>
          <router-link to="/login" class="mobile-nav-modal__button mobile-nav-modal__button--primary" @click="showMobileNav = false">Login</router-link>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRoleStore } from '@/stores/roleStore';
import { useRouter } from 'vue-router';

defineProps({
  transparent: {
    type: Boolean,
    default: false
  },
  isFixed: {
    type: Boolean,
    default: true
  }
});

const authStore = useAuthStore();
const roleStore = useRoleStore();
const router = useRouter();
const userRole = computed(() => authStore.userRole || 'all');

const isScrolled = ref(false);
const showMobileNav = ref(false);
const showDropdown = ref(false);

// User authentication state
const isLoggedIn = computed(() => {
  return authStore.isAuthenticated();
});

const userDisplayName = computed(() => {
  if (!authStore.isAuthenticated() || !authStore.user) return 'User';
  if (authStore.user?.name) return authStore.user.name;
  if (authStore.user?.first_name && authStore.user?.last_name) {
    return `${authStore.user.first_name} ${authStore.user.last_name}`;
  }
  if (authStore.user?.email) return authStore.user.email.split('@')[0];
  return 'User';
});

const userEmail = computed(() => {
  if (!authStore.isAuthenticated() || !authStore.user) return '';
  return authStore.user?.email || '';
});

const userInitials = computed(() => {
  const name = userDisplayName.value;
  if (name === 'User') return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const handleLogout = async () => {
  try {
    await authStore.logout();
    // Reset role to 'all' for public access
    roleStore.setRole('all');
    showDropdown.value = false;
    showMobileNav.value = false;
    // Redirect to landing page after logout
    router.push('/landing');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.public-nav {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0;
  transition: all 0.3s ease;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.public-nav--transparent {
  background: transparent;
  box-shadow: none;
}

.public-nav--transparent:not(.public-nav--scrolled) .public-nav__link,
.public-nav--transparent:not(.public-nav--scrolled) .public-nav__button:not(.public-nav__button--primary) {
  color: #fff;
}

.public-nav--scrolled {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.public-nav__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.public-nav__logo {
  display: flex;
  align-items: center;
}

.public-nav__logo-img {
  height: 50px;
  width: auto;
}

.public-nav__center {
  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: center;
}

.public-nav__link {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s;
}

.public-nav__link:hover {
  color: #0066cc;
}

.public-nav__right {
  display: flex;
  gap: 16px;
  align-items: center;
}

.public-nav__button {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #333;
}

.public-nav__button--primary {
  background: #0066cc;
  border: none;
  color: #fff !important;
}

.public-nav__button:hover {
  background: #f8fafc;
}

.public-nav__button--primary:hover {
  background: #0052a5;
}

/* User Dropdown Styles */
.user-dropdown {
  position: relative;
}

.user-dropdown__trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.user-dropdown__trigger:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.user-dropdown__name {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-dropdown__arrow {
  transition: transform 0.2s;
}

.user-dropdown__arrow--open {
  transform: rotate(180deg);
}

.user-dropdown__menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  min-width: 240px;
  z-index: 1000;
  animation: dropdownFadeIn 0.2s ease-out;
}

.user-dropdown__header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.user-dropdown__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #0066cc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.user-dropdown__info {
  flex: 1;
  min-width: 0;
}

.user-dropdown__full-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 14px;
  margin-bottom: 2px;
}

.user-dropdown__email {
  color: #6b7280;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-dropdown__divider {
  height: 1px;
  background: #f1f5f9;
  margin: 8px 0;
}

.user-dropdown__item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-dropdown__item:hover {
  background: #f9fafb;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Desktop/Mobile visibility classes */
.desktop-only {
  display: flex !important;
}

.mobile-only {
  display: none !important;
}

/* Hamburger Menu */
.hamburger-menu {
  width: 44px;
  height: 44px;
  display: none !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.hamburger-menu span {
  display: block;
  width: 24px;
  height: 2px;
  background: #333;
  margin: 3px 0;
  transition: all 0.3s ease;
}

.public-nav--transparent .hamburger-menu span {
  background: #fff;
}

/* Mobile Navigation Modal */
.mobile-nav-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
}

.mobile-nav-modal__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.mobile-nav-modal__content {
  position: relative;
  background: #fff;
  width: 80%;
  max-width: 320px;
  height: 100%;
  margin-left: auto;
  padding: 64px 24px 24px;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;
}

.mobile-nav-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  font-size: 32px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-nav-modal__link {
  display: block;
  padding: 16px 0;
  color: #333;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid #eee;
}

.mobile-nav-modal__buttons {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-nav-modal__button {
  display: block;
  padding: 12px 24px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  color: #333;
}

.mobile-nav-modal__button--primary {
  background: #0066cc;
  border: none;
  color: #fff;
}

/* Mobile User Section */
.mobile-user-section {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.mobile-user__info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.mobile-user__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #0066cc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
}

.mobile-user__details {
  flex: 1;
}

.mobile-user__name {
  font-weight: 600;
  color: #1f2937;
  font-size: 16px;
  margin-bottom: 2px;
}

.mobile-user__email {
  color: #6b7280;
  font-size: 14px;
}

.mobile-user__divider {
  height: 1px;
  background: #eee;
  margin: 16px 0;
}

.mobile-user__logout {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 16px 0;
  background: none;
  border: none;
  color: #dc2626;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Responsive styles */
@media (max-width: 900px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }

  .hamburger-menu {
    display: flex !important;
  }

  .public-nav__container {
    padding: 0 16px;
  }

  .public-nav__logo-img {
    height: 40px;
  }
}
</style>
