<template>
    <div class="property-card">
      <img :src="property.image" alt="Property Image" />
      <h3>{{ property.title }}</h3>
      <p>{{ property.status }}</p>
      <button @click="viewProperty">View</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  const props = defineProps({
    property: Object, // Receives a property object
  });
  
  const viewProperty = () => {
    console.log("Viewing property:", props.property.id);
  };
  </script>
  
  <style scoped>
  .property-card {
    border: 1px solid #ddd;
    padding: 20px;
    text-align: center;
  }
  </style>
  