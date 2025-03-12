<template>
  <div class="test-container">
    <h1>Education & Training Test Page</h1>
    <p>If you can see this, the education layout is working correctly.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  console.log('TestView mounted');
});
</script>

<style scoped>
.test-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f0f9ff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #0f172a;
  margin-bottom: 16px;
}

p {
  color: #334155;
  line-height: 1.6;
}
</style>
