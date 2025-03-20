<script setup>
import { usePropertyStore } from "@/stores/propertyStore";
import { computed } from "vue";
import { useRouter } from "vue-router";
import AnimationWrapper from "@/ui/AnimationWrapper.vue";

const propertyStore = usePropertyStore();
const router = useRouter();

// Get properties from the store
const properties = computed(() => propertyStore.properties);

const viewProperty = (propertyId) => {
  router.push(`/property/${propertyId}`);
};
</script>

<template>
  <div class="property-list">
    <AnimationWrapper :delay="50">
      <div v-if="properties.length === 0" class="no-listings">
        <p>You currently have no properties listed.</p>
      </div>
    </AnimationWrapper>

    <div v-if="properties.length > 0" class="property-grid">
      <AnimationWrapper v-for="(property, index) in properties"
                       :key="property.id"
                       :delay="100 + (index * 50)"
                       :distance="20">
        <div class="property-card">
          <div class="property-image">
            <img :src="property.image" :alt="property.name" />
            <div class="edit-icon">
              <i class="fas fa-pen"></i>
            </div>
          </div>
          <div class="property-details">
            <h3>{{ property.name }}</h3>
            <p class="address">{{ property.location }}</p>
            <p class="price">{{ property.price }}</p>
            <button @click="viewProperty(property.id)">View property</button>
          </div>
        </div>
      </AnimationWrapper>
    </div>
  </div>
</template>

<style scoped>
.property-list {
  margin-top: 20px;
}

.no-listings {
  text-align: center;
  padding: 30px;
  background-color: #f7f7f7;
  border-radius: 8px;
  margin: 20px 0;
}

.no-listings p {
  color: #666;
  font-size: 16px;
  font-weight: 500;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.property-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.property-image {
  height: 180px;
  overflow: hidden;
  position: relative;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.property-card:hover .property-image img {
  transform: scale(1.05);
}

/* Edit Icon */
.edit-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #074F90;
  color: #074F90;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.property-details {
  padding: 15px;
}

.property-details h3 {
  margin: 0 0 5px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.address {
  color: #666;
  font-size: 14px;
  margin: 0 0 10px;
}

.price {
  font-weight: 700;
  font-size: 18px;
  color: #0A397B;
  margin: 0 0 12px;
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
  transition: all 0.3s ease-in-out;
  border-radius: 5px;
  margin-top: 10px;
}

button:hover {
  background: #074F90;
  color: white;
}
</style>
