<template>
  <div class="task-home">
    <TaskHeader />
    <TaskNavigation />
    <ScheduledTaskList />
  </div>
</template>

<script setup>
import TaskHeader from '@/features/task/TaskHeader.vue'
import TaskNavigation from '@/features/task/TaskNavigation.vue'
import ScheduledTaskList from '@/features/task/ScheduledTaskList.vue'
</script>

<style scoped>
.task-home {
  padding: 20px;
}
</style>
