<script setup>
import { computed, onMounted, ref } from "vue";
import { useHeaderStore } from "@/stores/headerStore";
import { usePropertyStore } from "@/stores/propertyStore";
import { useRouter } from "vue-router";

// Stores
const headerStore = useHeaderStore();
const propertyStore = usePropertyStore();
const router = useRouter();

// Set header title for this page
headerStore.setTitle("Manage Listings");

// Local storage key for favorites
const FAVORITES_KEY = "favoriteProperties";

// Favorites state
const favorites = ref([]);

// Load favorites from local storage
onMounted(() => {
  const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  favorites.value = savedFavorites;
});

// Check if a property is in favorites
const isFavorite = (id) => favorites.value.includes(id);

// Toggle favorite property
const toggleFavorite = (id) => {
  if (isFavorite(id)) {
    favorites.value = favorites.value.filter(fav => fav !== id);
  } else {
    favorites.value.push(id);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value));
};

// Computed properties for listings
const properties = computed(() => propertyStore.properties);
</script>

<template>
  <div class="manage-listings">
    <h2>Manage Listings</h2>

    <div v-if="properties.length > 0" class="listings">
      <div v-for="property in properties" :key="property.id" class="property-card">
        <img :src="`/images/${property.image}`" alt="Property Image" @click="router.push(`/property/${property.id}`)">

        <div class="property-info">
          <h3 @click="router.push(`/property/${property.id}`)">{{ property.name }}</h3>
          <p><strong>Location:</strong> {{ property.location }}</p>
          <p><strong>Price:</strong> {{ property.price }}</p>
        </div>

        <!-- Favorite Button -->
        <button @click="toggleFavorite(property.id)" class="favorite-btn">
          <span :class="{ favorited: isFavorite(property.id) }">❤️</span>
        </button>
      </div>
    </div>

    <div v-else class="no-properties">
      <p>No listings available.</p>
    </div>
  </div>
</template>

<style scoped>
.manage-listings {
  padding: 20px;
}

.listings {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.property-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.property-card:hover {
  transform: translateY(-3px);
}

.property-card img {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
}

.property-info {
  margin-top: 10px;
}

.property-info h3 {
  cursor: pointer;
  color: #333;
}

.property-info h3:hover {
  text-decoration: underline;
}

.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin-top: 10px;
}

.favorited {
  color: red;
}
</style>
