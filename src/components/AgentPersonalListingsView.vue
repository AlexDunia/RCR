<script setup>
import { usePropertyStore } from "@/stores/propertyStore";
import { computed } from "vue";
import { useRouter } from "vue-router";

const propertyStore = usePropertyStore();
const router = useRouter();

// Reactive properties list
const properties = computed(() => propertyStore.visibleProperties);

// Function to navigate to property details
const viewProperty = (propertyId) => {
  router.push(`/property/${propertyId}`);
};
</script>

<template>
  <div class="mystuff">
    <div class="property-grid">
      <div v-for="property in properties" :key="property.id" class="property-card">
        <div class="image-container">
          <img :src="property.image" alt="Property Image" />
          <div class="edit-icon">
            <i class="fas fa-pen"></i>
          </div>
        </div>
        <div class="property-details">
          <h3>{{ property.name }}</h3>
          <p class="location">{{ property.location }}</p>
          <p class="price">{{ property.price }}</p>
        </div>
        <button @click="viewProperty(property.id)">View property</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.mystuff{
  padding:10px;
  margin-top:25px;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

/* Property Card */
.property-card {
  width: 245px;
  background: transparent;
  padding: 10px 10px;
  border:0.1px solid rgba(104, 104, 104, 0.2);
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(77, 76, 76, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.property-card:hover {
  transform: scale(1.02);
  border: 0.1px solid rgba(7, 79, 144, 0.5); /* Reduced opacity */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}

/* Image Container */
.image-container {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Edit Icon */
.edit-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 35px;
  height: 35px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border:1px solid #074F90;
  color: #074F90;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

/* Property Details */
.property-details {
  text-align: left;
  padding:0 5px;
}

.property-card h3 {
  font-size: 15.5px;
  font-weight: 600;
  color: #424242;
  margin-bottom: -10px;
}

.property-card p {
  font-weight: 600;
}

.property-card .location {
  font-size: 14px;
  font-weight:500;
  color: #6b6b6b;
}

.property-card .price {
  font-size: 16px;
  font-weight: 600;
  color: #074F90;
  margin-top:-8px;
}

/* Button */
button {
  width: 100%;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #074F90;
    background: white;
    border: 1.5px solid #074F90;
    cursor: pointer;
    transition: all 0.3sease-in-out;
}

button:hover {
  background: #074F90;
  color: white;
}
</style>
