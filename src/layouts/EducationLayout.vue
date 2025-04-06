<template>
  <div class="education-layout">
    <div class="education-main">
      <div class="education-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed
</script>

<style scoped>
.education-layout {
  width: 100%;
  height: 100%;
  background-color: #F9FAFB;
  background-image:
    radial-gradient(circle at 100% 100%, rgba(226, 232, 240, 0.5) 0%, transparent 25%),
    radial-gradient(circle at 0% 0%, rgba(226, 232, 240, 0.7) 0%, transparent 25%),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.8));
  background-attachment: fixed;
}

.education-main {
  padding: 0;
  overflow-y: auto;
  min-height: calc(100vh - 64px);
}

.education-content {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
