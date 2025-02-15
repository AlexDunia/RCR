<script setup>
import { useRoute, useRouter } from "vue-router";
import { usePropertyStore } from "@/stores/propertyStore";
import { useNavigationStore } from "@/stores/navigation";
import { computed, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const propertyStore = usePropertyStore();
const navigationStore = useNavigationStore();

// Get property details based on the route parameter
const property = computed(() => {
  return propertyStore.properties.find(p => p.id === Number(route.params.id));
});

// Set active page on mount
onMounted(() => {
  navigationStore.setActivePage("Manage Listings");
});
</script>

<template>
  <header class="property-header">
    <button @click="router.back()" class="back-button">← Back</button>
    <h1 class="page-title">{{ navigationStore.activePage }}</h1>
  </header>

  <div v-if="property" class="property-detail">
    <h1>{{ property.name }}</h1>
    <img :src="`/images/${property.image}`" alt="Property Image" />
    <p><strong>Location:</strong> {{ property.location }}</p>
    <p><strong>Price:</strong> {{ property.price }}</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia mi ac eros tempus venenatis.</p>
  </div>

  <div v-else class="not-found">
    <p>Property not found.</p>
  </div>
</template>

<style scoped>
/* Header */
.property-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: #f8f8f8;
  border-bottom: 1px solid #ddd;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #007bff;
}

/* Property Details */
.property-detail {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.property-detail img {
  width: 100%;
  border-radius: 8px;
}

/* Property Not Found */
.not-found {
  text-align: center;
  font-size: 18px;
  color: #777;
}
</style>
