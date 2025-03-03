<script setup>
import { usePropertyStore } from "@/stores/propertyStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const propertyStore = usePropertyStore();
const router = useRouter();
const propertyListRef = ref(null);

// Reactive properties list
const visibleProperties = computed(() => propertyStore.visibleProperties);

// Function to navigate to property details
const viewProperty = (propertyId) => {
  router.push(`/property/${propertyId}`);
};

// Function to scroll to the next property
const scrollNext = () => {
  if (propertyListRef.value) {
    const cardWidth = propertyListRef.value.firstElementChild.offsetWidth + 20; // Include gap
    propertyListRef.value.scrollBy({ left: cardWidth, behavior: "smooth" });
    propertyStore.nextSlide();
  }
};

// Function to scroll to the previous property
const scrollPrev = () => {
  if (propertyListRef.value) {
    const cardWidth = propertyListRef.value.firstElementChild.offsetWidth + 20; // Include gap
    propertyListRef.value.scrollBy({ left: -cardWidth, behavior: "smooth" });
    propertyStore.prevSlide();
  }
};

</script>

<template>
  <br />
  <div class="mystuff">
    <div class="property-container">
      <button class="prev-arrow" @click="scrollPrev">⬅</button>
      <div ref="propertyListRef" class="property-list">
        <div v-for="property in visibleProperties" :key="property.id" class="property-card">
          <img :src="property.image" alt="Property Image" />
          <h3>{{ property.name }}</h3>
          <p>{{ property.location }}</p>
          <p class="price">{{ property.price }}</p>
          <button @click="viewProperty(property.id)">View Property</button>
        </div>
      </div>
      <button class="next-arrow" @click="scrollNext">➜</button>
    </div>
  </div>
  <div class="property-list">
    <div v-for="property in visibleProperties" :key="property.id" class="property">
      <h3>{{ property.name }}</h3>
      <p>{{ property.location }}</p>
      <p>{{ property.price }}</p>
    </div>
  </div>
</template>

<style scoped>
.mystuff {
  overflow: hidden;
  padding: 25px;
}

.property-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.property-list {
  display: flex;
  gap: 20px;
  justify-content: left;
  overflow-y: hidden;
  padding: 5px;
  flex-direction: column;
}

.property-card {
  border: 1px solid #ddd;
  padding: 7px;
  width: 220px;
  flex-shrink: 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  cursor: pointer;
}

.property-card:hover {
  transform: scale(1.1);
  /* Subtle pop-out effect */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Subtle shadow */
  overflow: hidden;
  border-color: rgba(0, 0, 255, 0.5);
}

.property-card img {
  width: 100%;
  height: 125px;
  margin-bottom: -10px;
  object-fit: cover;
}

.property-card button {
  margin-top: 30px;
}



.property-card img {
  width: 100%;
  height: 125px;
  margin-bottom: -10px;
  object-fit: cover;
}

.property-card h3 {
  font-size: 16px;
  letter-spacing: -0.02em;
  color: #4b545f;
}

.property-card p {
  font-size: 13px;
}

.property-card h3,
.property-card p {
  margin-bottom: -10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

button {
  background: blue;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.next-arrow,
.prev-arrow {
  position: absolute;
  top: 40%;
  transform: translateY(-30%);
  background: rgba(0, 0, 255, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
  z-index: 10;
  /* Ensure arrows are on top */
}

.next-arrow {
  right: 25px;
}

/* .prev-arrow {
  left: -10px;
} */

.next-arrow:hover,
.prev-arrow:hover {
  background: rgba(0, 0, 255, 1);
}

.property {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
