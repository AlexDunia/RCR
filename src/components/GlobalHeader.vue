<template>
  <nav class="main-nav">
    <div class="main-nav__logo">
      <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1748316444/rclogo_l7oiod.png" alt="Real City Logo" class="main-nav__logo-img" />
    </div>
    <div class="main-nav__center">
      <router-link to="/buy" class="main-nav__link">Buy</router-link>
      <router-link to="/rent" class="main-nav__link">Rent</router-link>
      <router-link to="/sell" class="main-nav__link">Sell</router-link>
      <router-link to="/allagents" class="main-nav__link">Find Agents</router-link>
      <router-link to="/signup" class="main-nav__link">Join Us</router-link>
    </div>
    <div class="main-nav__right">
      <router-link to="/signin" class="main-nav__button">Sign in</router-link>
      <router-link to="/login" class="main-nav__button main-nav__button--primary">Login</router-link>
    </div>
  </nav>
</template>

<script setup>
// No special logic needed for now, as in the landing page header
</script>

<style scoped>
.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  width: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 50px;
  max-height: 50px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
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
