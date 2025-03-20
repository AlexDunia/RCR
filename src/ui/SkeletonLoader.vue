<script setup>
defineProps({
  type: {
    type: String,
    default: 'rectangle',
    validator: (value) => ['rectangle', 'circle', 'text', 'card', 'metric'].includes(value)
  },
  height: {
    type: String,
    default: '100px'
  },
  width: {
    type: String,
    default: '100%'
  },
  borderRadius: {
    type: String,
    default: '8px'
  },
  animated: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <div 
    class="skeleton-loader" 
    :class="[
      `skeleton-${type}`, 
      { 'skeleton-animated': animated }
    ]"
    :style="{ 
      height: height, 
      width: width, 
      borderRadius: type === 'circle' ? '50%' : borderRadius 
    }"
  >
    <template v-if="type === 'card'">
      <div class="skeleton-card-header"></div>
      <div class="skeleton-card-content">
        <div class="skeleton-card-line"></div>
        <div class="skeleton-card-line"></div>
        <div class="skeleton-card-line skeleton-card-line-short"></div>
      </div>
    </template>
    
    <template v-else-if="type === 'metric'">
      <div class="skeleton-metric-content">
        <div class="skeleton-metric-text">
          <div class="skeleton-metric-line skeleton-metric-title"></div>
          <div class="skeleton-metric-line skeleton-metric-value"></div>
          <div class="skeleton-metric-line skeleton-metric-subtitle"></div>
        </div>
        <div class="skeleton-metric-circle"></div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.skeleton-loader {
  background-color: #ececec;
  overflow: hidden;
  position: relative;
}

.skeleton-animated::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.2) 50%, 
    rgba(255, 255, 255, 0) 100%);
  animation: shimmer 1.5s infinite;
}

/* Card skeleton styling */
.skeleton-card {
  display: flex;
  flex-direction: column;
}

.skeleton-card-header {
  height: 30%;
  background-color: #e0e0e0;
}

.skeleton-card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 70%;
}

.skeleton-card-line {
  height: 16px;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.skeleton-card-line-short {
  width: 60%;
}

/* Metric skeleton styling */
.skeleton-metric {
  padding: 16px;
}

.skeleton-metric-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.skeleton-metric-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 60%;
}

.skeleton-metric-line {
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.skeleton-metric-title {
  width: 70%;
}

.skeleton-metric-value {
  height: 20px;
  width: 50%;
}

.skeleton-metric-subtitle {
  width: 40%;
}

.skeleton-metric-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #e0e0e0;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style> 