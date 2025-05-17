<template>
  <div class="careers-container">
    <h1>Careers</h1>
    <div class="content">
      <p>Join our team and be part of shaping the future of real estate.</p>
      <div class="job-listings">
        <!-- Job listings will be dynamically loaded here -->
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'CareersPage'
});
</script>

<style scoped>
.careers-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.content {
  margin-top: 2rem;
}

.job-listings {
  margin-top: 2rem;
}
</style>
