<template>
  <div class="education-layout">
    <div class="education-banner">
      <div class="banner-content">
        <h2>Learn about the real estate business</h2>
      </div>
    </div>
    <div class="education-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
// The layout itself doesn't need additional functionality
// All functionality is handled in the individual views
</script>

<style scoped>
.education-layout {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.education-banner {
  background-color: #e6f4ef;
  border-radius: 10px;
  margin: 24px auto;
  max-width: 960px;
}

.banner-content {
  padding: 22px 36px;
}

.banner-content h2 {
  color: #4a5568;
  font-size: 17px;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
}

.education-content {
  padding: 0;
  max-width: 960px;
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
