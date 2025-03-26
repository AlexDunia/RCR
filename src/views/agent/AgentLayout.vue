<template>
  <div class="agent-layout">
    <header v-if="!$route.meta.hideHeader" class="agent-header">
      <nav class="agent-nav">
        <router-link to="/agent/dashboard">Dashboard</router-link>
        <router-link to="/agent/listings">Listings</router-link>
        <router-link to="/agent/clients">Clients</router-link>
        <router-link to="/agent/calendar">Calendar</router-link>
        <router-link to="/agent/documents">Documents</router-link>
        <router-link to="/agent/tasks">Tasks</router-link>
        <router-link to="/agent/marketing">Marketing</router-link>
        <router-link to="/agent/education">Education</router-link>
        <router-link to="/agent/messages">Messages</router-link>
        <router-link to="/agent/profile">Profile</router-link>
      </nav>
    </header>

    <div class="agent-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
// No need for useRoute since we're using $route directly in the template
</script>

<style scoped>
.agent-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.agent-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem;
}

.agent-nav {
  display: flex;
  gap: 1rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.agent-nav a {
  color: #4b5563;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.agent-nav a:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.agent-nav a.router-link-active {
  background-color: #e5e7eb;
  color: #111827;
}

.agent-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style> 