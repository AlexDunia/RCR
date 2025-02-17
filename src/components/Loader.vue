<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  width: 100%;
  height: 80px;
  background: linear-gradient(90deg, #e0e0e0 20%, #f0f0f0 30%, #e0e0e0 40%);
  background-size: 200% 100%;
  animation: skeleton-loading 2s infinite;
  opacity: 0.8;
  border-radius: 10px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
