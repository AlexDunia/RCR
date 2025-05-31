<template>
  <nav :class="['main-nav', { 'main-nav--scrolled': isScrolled }]">
    <div class="main-nav__container">
      <div class="main-nav__logo">
        <router-link to="/landing">
          <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1748316444/rclogo_l7oiod.png" alt="Real City Logo" class="main-nav__logo-img" />
        </router-link>
      </div>
      <div class="main-nav__center">
        <router-link to="/buy" class="main-nav__link">Buy</router-link>
        <router-link to="/rent" class="main-nav__link">Rent</router-link>
        <router-link to="/sell" class="main-nav__link">Sell</router-link>
        <router-link to="/allagents" class="main-nav__link">Agent</router-link>
        <router-link to="/signup" class="main-nav__link">Join Us</router-link>
      </div>
      <div class="main-nav__right">
        <router-link to="/signin" class="main-nav__button" >Sign in</router-link>
        <router-link to="/login" class="main-nav__button main-nav__button--primary">Login</router-link>
        <RoleSelector />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import RoleSelector from '@/components/RoleSelector.vue';

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
.main-nav {
  width: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  height: 64px;
  display: flex;
  align-items: center;
  padding: 3px 0;
  transition: box-shadow 0.3s cubic-bezier(.4,0,.2,1), background 0.3s cubic-bezier(.4,0,.2,1);
}

.main-nav--scrolled {
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  background: #f8fafc;
}

.main-nav__container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  box-sizing: border-box;
}

.main-nav__logo {
  display: flex;
  align-items: center;
}

.main-nav__logo-img {
  height: 43px;
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
</style>
