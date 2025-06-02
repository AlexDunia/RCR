<template>
  <nav :class="['public-nav', { 'public-nav--transparent': transparent, 'public-nav--scrolled': isScrolled }]" :style="{ position: isFixed ? 'fixed' : 'relative' }">
    <div class="public-nav__container">
      <div class="public-nav__logo">
        <router-link to="/RCR/landing">
          <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1748316444/rclogo_l7oiod.png" alt="Real City Logo" class="public-nav__logo-img" />
        </router-link>
      </div>
      <div class="public-nav__center">
        <router-link to="/RCR/buy" class="public-nav__link">Buy</router-link>
        <router-link to="/RCR/rent" class="public-nav__link">Rent</router-link>
        <router-link to="/RCR/sell" class="public-nav__link">Sell</router-link>
        <router-link to="/RCR/allagents" class="public-nav__link">Find Agents</router-link>
        <router-link to="/RCR/signup" class="public-nav__link">Join Us</router-link>
      </div>
      <div class="public-nav__right">
        <router-link to="/RCR/signup" class="public-nav__button">Sign up</router-link>
        <router-link to="/RCR/login" class="public-nav__button public-nav__button--primary">Login</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

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

const isScrolled = ref(false);

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

@media (max-width: 900px) {
  .public-nav__center {
    display: none;
  }
}
</style>
