<template>
  <header v-if="!isLandingPage" :class="[
    'public-header',
    { 'public-header--transparent': isLandingPage },
    { 'public-header--fixed': isFixed }
  ]">
    <div class="container header__container">
      <!-- Logo Left -->
      <div class="main-nav__logo">
        <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1748316444/rclogo_l7oiod.png" alt="Real City Logo" class="main-nav__logo-img" />
      </div>
      <!-- Nav Center -->
      <div class="main-nav__center">
        <router-link to="/buy" class="main-nav__link">Buy</router-link>
        <router-link to="/rent" class="main-nav__link">Rent</router-link>
        <router-link to="/sell" class="main-nav__link">Sell</router-link>
        <router-link to="/allagents" class="main-nav__link">Find Agents</router-link>
        <router-link to="/signup" class="main-nav__link">Join Us</router-link>
      </div>
      <!-- Auth Buttons Right -->
      <div class="main-nav__right">
        <button class="main-nav__button">Sign in</button>
        <button class="main-nav__button main-nav__button--primary">Login</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

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

const isLandingPage = computed(() => {
  return route.path === '/landing' || route.path === '/';
});
</script>

<style scoped>
.public-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  background: #fff;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  height: 50px;
  max-height: 50px;
  overflow: visible;
  display: flex;
  align-items: center;
}

.public-header--transparent {
  background: transparent;
  box-shadow: none;
}

.public-header--transparent .main-nav__link,
.public-header--transparent .main-nav__button {
  color: #fff;
}

.public-header--transparent .main-nav__button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.public-header--transparent .main-nav__button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.public-header--transparent .main-nav__button--primary {
  background: #0066cc;
  border: none;
}

.public-header--transparent .main-nav__button--primary:hover {
  background: #0052a5;
}

.public-header--fixed {
  transform: none;
  opacity: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
  gap: 32px;
  justify-content: center;
  align-items: center;
}

.main-nav__link {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s;
}

.main-nav__link:hover {
  color: #0066cc;
}

.main-nav__right {
  display: flex;
  gap: 16px;
}

.main-nav__button {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #333;
}

.main-nav__button--primary {
  background: #0066cc;
  border: none;
  color: #fff;
}

.main-nav__button:hover {
  background: #f8fafc;
}

.main-nav__button--primary:hover {
  background: #0052a5;
}
</style>
