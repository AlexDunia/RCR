<template>
  <div class="task-home">
    <TaskHeader />
    <TaskNavigation />
    <TaskList />
  </div>
</template>

<script setup>
import TaskHeader from '@/features/task/TaskHeader.vue'
import TaskNavigation from '@/features/task/TaskNavigation.vue'
import TaskList from '@/features/task/TaskList.vue'
</script>

<style scoped>
.task-home {
  padding: 20px;
}
</style>
