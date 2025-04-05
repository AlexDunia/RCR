<template>
  <div class="admin-task-detail">
    <h1>Admin Task Detail</h1>
    <p>This component is under development</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const taskId = ref(route.params.id);

onMounted(() => {
  console.log('Admin Task Detail mounted with ID:', taskId.value);
  // Fetch task data here when implementing this component
});
</script>

<style scoped>
.admin-task-detail {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
