<template>
  <div class="page-wrapper">
    <router-view v-slot="{ Component, route }">
      <transition
        name="fade"
        mode="out-in"
        @before-leave="beforeLeave"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <keep-alive>
          <component
            :is="Component"
            :key="route.fullPath"
            v-if="route.meta.keepAlive"
          />
        </keep-alive>
      </transition>

      <transition
        name="fade"
        mode="out-in"
        @before-leave="beforeLeave"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <component
          :is="Component"
          :key="route.fullPath"
          v-if="!route.meta.keepAlive"
        />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';

// Track navigation state
const isTransitioning = ref(false);

// Handle before component leaves view
const beforeLeave = () => {
  isTransitioning.value = true;
  console.log('Component is about to leave the DOM');
};

// Handle when new component enters view
const enter = () => {
  console.log('Component is entering the DOM');
};

// Handle after component has fully entered
const afterEnter = (el) => {
  isTransitioning.value = false;
  console.log('Component has fully entered the DOM');

  // Force a reflow of the DOM to ensure everything is rendered
  nextTick(() => {
    if (el && el.parentElement) {
      el.parentElement.style.display = 'none';
      // Force a reflow
      void el.parentElement.offsetHeight;
      el.parentElement.style.display = '';
    }
  });
};
</script>

<style>
.page-wrapper {
  position: relative;
  min-height: 100%;
  width: 100%;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
