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
        <router-link to="/RCR/signup" class="public-nav__button">Sign up</router-link>
        <router-link to="/RCR/login" class="public-nav__button public-nav__button--primary">Login</router-link>
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
        <router-link to="/RCR/buy" class="mobile-nav-modal__link" @click="showMobileNav = false">Buy</router-link>
        <router-link to="/RCR/rent" class="mobile-nav-modal__link" @click="showMobileNav = false">Rent</router-link>
        <router-link to="/RCR/sell" class="mobile-nav-modal__link" @click="showMobileNav = false">Sell</router-link>
        <router-link to="/RCR/allagents" class="mobile-nav-modal__link" @click="showMobileNav = false">Find Agents</router-link>
        <router-link to="/RCR/signup" class="mobile-nav-modal__link" @click="showMobileNav = false">Join Us</router-link>
        <div class="mobile-nav-modal__buttons">
          <router-link to="/RCR/signup" class="mobile-nav-modal__button" @click="showMobileNav = false">Sign up</router-link>
          <router-link to="/RCR/login" class="mobile-nav-modal__button mobile-nav-modal__button--primary" @click="showMobileNav = false">Login</router-link>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';

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
