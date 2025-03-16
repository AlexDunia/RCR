<template>
  <div class="task-home">
    <TaskHeader />
    <TaskNavigation />
    <ScheduledTaskList />
  </div>
</template>

<script setup>
import TaskHeader from '@/components/task/TaskHeader.vue'
import TaskNavigation from '@/components/task/TaskNavigation.vue'
import ScheduledTaskList from '@/components/task/ScheduledTaskList.vue'
</script>

<style scoped>
.task-home {
  padding: 20px;
}
</style>
