<template>
  <header class="task-header">
    <div class="task-header-content">
      <div  class="task-header-title">
        <h1>  Create a task</h1>
        <p class="task-subtitle">
          Setup activities for you, your agents, and your clients in one workspace
        </p>
      </div>
      <button class="task-create-button" @click="navigateToCreateTask">
        <svg class="task-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>&nbsp;Create task
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const navigateToCreateTask = () => {
  router.push('/tasks/create')
}
</script>

<style scoped>

.task-header {
  margin-bottom: 2rem;
  margin-top: 10px;
  padding: 40px 40px;
  background-color: white;
  box-shadow: 0px 2px 5px rgba(99, 98, 98, 0.1);
  border: 1px solid rgba(67, 67, 67, 0.1);
}

.task-header:hover {

  box-shadow: 0px 2px 5px rgba(99, 98, 98, 0.1);
  border: 1px solid rgba(67, 67, 67, 0.2);
}

.task-subtitle{
  margin-top:20px;
}

.task-header-title p{
  color: rgb(133, 143, 159);
  font-size: 13.7px;
  font-weight: 500;
  margin-top:16px;
}

.task-header-title h1{
   margin-bottom: -10px;
   margin-top: -10px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 18px;
    letter-spacing: -0.5px
}

.task-header-content {
  display: flex;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.task-subtitle {
  color: var(--gray-text);
  margin: 0.5rem 0 0;
}

.task-create-button {
  background-color: #074F90;
  color: white;
  border: none;
  padding: 6px 16px;  /* Reduced vertical padding from 8px to 6px */
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  font-family:poppins;
  cursor: pointer;
  margin-right:50px;
  transition: background-color 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;  /* Increased from 80px to 100px */
  box-shadow: 0 2px 4px rgba(7, 79, 144, 0.2);
  height: 41px; /* Added explicit height to control total height */
}

.task-create-button:hover {
  background-color: #063d70;
}

.task-create-button:active {
  transform: translateY(1px);
}

</style>
