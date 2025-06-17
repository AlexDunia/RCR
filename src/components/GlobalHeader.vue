<template>
  <nav :class="['main-nav', { 'main-nav--scrolled': isScrolled }]">
    <div class="main-nav__container">
      <div class="main-nav__logo">
        <router-link to="/landing">
          <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1748316444/rclogo_l7oiod.png" alt="Real City Logo" class="main-nav__logo-img" />
        </router-link>
      </div>
      <!-- Desktop Navigation -->
      <div class="main-nav__center desktop-only">
        <router-link v-if="userRole === 'all'" to="/" class="main-nav__link">Home</router-link>
        <router-link to="/allagents" class="main-nav__link">Find Agents</router-link>
        <router-link to="/signup" class="main-nav__link">Join Us</router-link>
      </div>
      <div class="main-nav__right desktop-only">
        <router-link to="/signin" class="main-nav__button">Sign in</router-link>
        <router-link to="/login" class="main-nav__button main-nav__button--primary">Login</router-link>
        <RoleSelector />
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
        <router-link v-if="userRole === 'all'" to="/" class="mobile-nav-modal__link" @click="showMobileNav = false">Home</router-link>
        <router-link to="/allagents" class="mobile-nav-modal__link" @click="showMobileNav = false">Find Agents</router-link>
        <router-link to="/signup" class="mobile-nav-modal__link" @click="showMobileNav = false">Join Us</router-link>
        <div class="mobile-nav-modal__buttons">
          <router-link to="/signin" class="mobile-nav-modal__button" @click="showMobileNav = false">Sign in</router-link>
          <router-link to="/login" class="mobile-nav-modal__button mobile-nav-modal__button--primary" @click="showMobileNav = false">Login</router-link>
        </div>
        <div class="mobile-nav-modal__role-selector">
          <RoleSelector />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import RoleSelector from '@/components/RoleSelector.vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const userRole = computed(() => authStore.userRole || 'all');

const isScrolled = ref(false);
const showMobileNav = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.main-nav {
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

.main-nav--scrolled {
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.main-nav__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-nav__logo {
  display: flex;
  align-items: center;
}

.main-nav__logo-img {
  height: 50px;
  width: auto;
}

.main-nav__center {
  display: flex;
  gap: 36px;
  justify-content: center;
  align-items: center;
}

.main-nav__link {
  color: #222;
  text-decoration: none;
  font-size: 17px;
  font-weight: 500;
  transition: color 0.2s;
  padding: 2px 0;
}

.main-nav__link:hover {
  color: #0066cc;
}

.main-nav__right {
  display: flex;
  gap: 16px;
  align-items: center;
}

.main-nav__button {
  padding: 7px 22px;
  border-radius: 7px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #333;
  box-shadow: none;
  text-decoration: none;
}

.main-nav__button:visited,
.main-nav__button:active,
.main-nav__button:focus {
  text-decoration: none;
}

.main-nav__button--primary {
  background: #0066cc;
  border: none;
  color: #fff;
}

.main-nav__button:hover {
  background: #f8fafc;
  text-decoration: none;
}

.main-nav__button--primary:hover {
  background: #0052a5;
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
  color: #222;
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

.mobile-nav-modal__role-selector {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #eee;
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

  .main-nav__container {
    padding: 0 16px;
  }

  .main-nav__logo-img {
    height: 40px;
  }
}
</style>
