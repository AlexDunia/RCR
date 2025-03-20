<template>
    <div class="search-bar">
      <input type="text" v-model="query" placeholder="Search..." />
      <button @click="onSearch">🔍</button>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from "vue";
  
  const query = ref("");
  const emit = defineEmits(["search"]);
  
  const onSearch = () => {
    emit("search", query.value);
  };
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    background: #f4f4f4;
    padding: 5px;
    border-radius: 5px;
  }
  
  .search-bar input {
    flex: 1;
    border: none;
    padding: 5px;
    outline: none;
  }
  
  .search-bar button {
    background: transparent;
    border: none;
    cursor: pointer;
  }
  </style>
  