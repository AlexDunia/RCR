<template>
  <div class="task-home">
    <TaskHeader />
    <TaskNavigation />
    <TaskList />
  </div>
</template>

<script setup>
import TaskHeader from '../../components/task/TaskHeader.vue'
import TaskNavigation from '../../components/task/TaskNavigation.vue'
import TaskList from '../../components/task/TaskList.vue'
</script>

<style scoped>
.task-home{
  padding:20px;
}</style>
