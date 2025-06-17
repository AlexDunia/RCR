<template>
  <div class="new-buy-properties-container">
    <GlobalHeader />
    <div class="new-buy-properties">
      <div class="welcome-container">
        <h1>Welcome to Buy Properties</h1>
        <p>Find your dream home with us</p>
      </div>
    </div>
    <PublicFooter />
  </div>
</template>

<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue';
import PublicFooter from '@/components/PublicFooter.vue';
// Component logic can be added here
</script>

<style scoped>
.new-buy-properties {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
}

.welcome-container {
  text-align: center;
  padding: 2rem;
}

.welcome-container h1 {
  font-size: 2.5rem;
  color: #1a4189;
  margin-bottom: 1rem;
}

.welcome-container p {
  font-size: 1.25rem;
  color: #64748b;
}
</style>
