{
  name: 'Tours',
  path: '/tours',
  icon: '🏠',
  allowedRoles: ['agent', 'admin']
},

<template>
  <nav class="site-navigation">
    <div class="nav-section">
      <h2>Service</h2>
      <router-link to="/about">About us</router-link>
      <router-link to="/careers">Careers</router-link>
      <router-link to="/terms">Terms & Conditions</router-link>
      <router-link to="/privacy">Privacy & Policy</router-link>
      <router-link to="/blog">Blog</router-link>
    </div>
  </nav>
</template>

<script setup>
defineOptions({
  name: 'SiteNavigation'
});
</script>

<style scoped>
.site-navigation {
  padding: 1rem;
}

.nav-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-section h2 {
  color: #ffffff;
  margin-bottom: 1rem;
}

.nav-section a {
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-section a:hover {
  color: #e0e0e0;
}

.nav-section a.router-link-active {
  color: #4CAF50;
}
</style>
