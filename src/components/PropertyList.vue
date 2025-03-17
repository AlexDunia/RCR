<script setup>
import { usePropertyStore } from "@/stores/propertyStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const propertyStore = usePropertyStore();
const router = useRouter();
const propertyListRef = ref(null);
const showList = ref(true); // Default to list view

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
  <div class="view-controls">
    <h2>Featured Properties</h2>
    <div class="view-toggle">
      <button
        class="toggle-btn"
        :class="{ active: !showList }"
        @click="showList = false"
        title="Show Carousel View"
      >
        <!-- Carousel SVG Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect>
          <path d="M16 3L8 21"></path>
        </svg>
      </button>
      <button
        class="toggle-btn"
        :class="{ active: showList }"
        @click="showList = true"
        title="Show List View"
      >
        <!-- List SVG Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>

  <!-- Carousel View -->
  <div v-if="!showList" class="mystuff">
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

  <!-- List View -->
  <div v-if="showList" class="property-list-container">
    <div class="property-list-view">
      <div v-for="property in visibleProperties" :key="property.id" class="property-list-item">
        <div class="property-list-image">
          <img :src="property.image" alt="Property Image" />
          <div class="property-badge">{{ property.type }}</div>
        </div>
        <div class="property-list-details">
          <div class="property-list-header">
            <h3>{{ property.name }}</h3>
            <span class="property-list-price">{{ property.price }}</span>
          </div>
          <div class="property-list-location">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{{ property.location }}</span>
          </div>
          <div class="property-list-info">
            <div class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 3h18v18H3zM12 8v8M8 12h8"></path>
              </svg>
              <span>{{ property.size }} sq ft</span>
            </div>
            <div class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
              </svg>
              <span>{{ property.bedrooms }} Beds</span>
            </div>
            <div class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>{{ property.bathrooms }} Baths</span>
            </div>
          </div>
          <div class="property-list-actions">
            <button class="view-details-btn" @click="viewProperty(property.id)">View Details</button>
            <button class="contact-agent-btn">Contact Agent</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 15px;
}

.view-controls h2 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
  letter-spacing: -0.01em;
}

.view-toggle {
  display: flex;
  gap: 4px;
  background: #f5f5f5;
  border-radius: 6px;
  padding: 3px;
}

.toggle-btn {
  background: transparent;
  border: none;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
}

.toggle-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.toggle-btn.active {
  background: #074F90;
  color: white;
}

.toggle-btn:hover::after {
  content: attr(title);
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 11px;
  white-space: nowrap;
  z-index: 100;
}

/* Carousel Styles */
.mystuff {
  overflow: hidden;
  padding: 15px;
}

.property-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.property-list {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  overflow-x: auto;
  padding: 5px;
  flex-direction: row;
}

/* List View Styles */
.property-list-container {
  padding: 0 15px;
  width: 100%;
}

.property-list-view {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.property-list-item {
  display: flex;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(102, 102, 102, 0.04);
  transition: all 0.2s ease;
  width: 100%;
  margin-bottom:25px;
  border: 1px solid #f0f0f0;
}

.property-list-item:hover {
  cursor: pointer;
  transform: translateY(-2px);
  box-shadow: 0 1px 3px rgba(102, 102, 102, 0.07);
  border-color: #e0e0e0;
}

.property-list-image {
  width: 250px;
  min-width: 250px;
  height: 170px;
  overflow: hidden;
  position: relative;
}

.property-list-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.property-list-item:hover .property-list-image img {
  transform: scale(1.05);
}

.property-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(7, 79, 144, 0.85);
  color: white;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.property-list-details {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.property-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.property-list-header h3 {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin: 0;
  letter-spacing: -0.01em;
}

.property-list-price {
  font-size: 16px;
  font-weight: 700;
  color: #074F90;
  background: rgba(7, 79, 144, 0.08);
  padding: 3px 10px;
  border-radius: 15px;
}

.property-list-location {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  margin-bottom: 12px;
  font-size: 13px;
}

.property-list-location svg {
  color: #074F90;
}

.property-list-info {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #555;
  font-size: 13px;
}

.info-item svg {
  color: #074F90;
}

.property-list-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.view-details-btn, .contact-agent-btn {
  padding: 7px 14px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 13px;
}

.view-details-btn {
  background: #074F90;
  color: white;
}

.view-details-btn:hover {
  background: #053a6a;
}

.contact-agent-btn {
  background: white;
  color: #074F90;
  border: 1px solid #074F90;
}

.contact-agent-btn:hover {
  background: rgba(7, 79, 144, 0.05);
}

/* Carousel Styles */
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
}

.next-arrow {
  right: 25px;
}

.prev-arrow {
  left: 10px;
}

.next-arrow:hover,
.prev-arrow:hover {
  background: rgba(0, 0, 255, 1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .property-list-item {
    flex-direction: column;
  }

  .property-list-image {
    width: 100%;
    height: 180px;
  }

  .property-list-actions {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
