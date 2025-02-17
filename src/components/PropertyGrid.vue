<template>
    <div class="property-grid">
      <PropertyCard 
        v-for="property in properties" 
        :key="property.id" 
        :property="property"
      />
    </div>
  </template>
  
  <script setup>
  import PropertyCard from "./PropertyCard.vue";
  
  defineProps({
    properties: Array, // Expects a list of property objects
  });
  </script>
  
  <style scoped>
  .property-grid {
    display: flex;
    gap: 10px;
  }
  </style>
  