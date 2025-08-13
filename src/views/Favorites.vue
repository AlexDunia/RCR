<template>
  <div class="favorites-page">
    <h1>Your Favorite Properties</h1>
    <div v-if="favouritesStore.loading" class="loading">Loading...</div>
    <div v-else-if="favouritesStore.error" class="error">{{ favouritesStore.error }}</div>
    <div v-else-if="!allFavorites.length" class="empty">No favorite properties yet.</div>
    <div v-else class="property-grid">
      <!-- Local Properties -->
      <div v-for="property in favouritesStore.getAllFavouriteProperties" :key="property.id" class="property-card">
        <router-link v-if="property.id" :to="'/property/' + property.id">
          <div class="property-card__image">
            <img :src="property.image || '/placeholder.jpg'" alt="Property Image" />
            <div class="property-card__favorite" @click.stop="toggleLocalFavorite(property.id, property)">
              <i :class="favouritesStore.isPropertyFavourite(property.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
            </div>
          </div>
          <div class="property-card__details">
            <h3>{{ property.name || 'Unknown' }}</h3>
            <p>{{ property.address || 'Unknown' }}</p>
            <p>${{ (property.price || 0).toLocaleString() }}</p>
            <p>{{ property.bedrooms || 0 }} Beds | {{ property.bathrooms || 0 }} Baths | {{ property.size || 0 }} sqft</p>
          </div>
        </router-link>
      </div>
      <!-- TREB Properties -->
      <div v-for="listingKey in favouritesStore.getAllFavouriteTrebProperties" :key="listingKey" class="property-card">
        <router-link :to="'/property/' + listingKey">
          <div class="property-card__image">
            <img src="/placeholder.jpg" alt="TREB Property Image" />
            <div class="property-card__favorite" @click.stop="toggleTrebFavorite(listingKey)">
              <i :class="favouritesStore.isTrebPropertyFavourite(listingKey) ? 'fas fa-heart' : 'far fa-heart'"></i>
            </div>
          </div>
          <div class="property-card__details">
            <h3>{{ listingKey }}</h3>
            <p>TREB Property</p>
          </div>
        </router-link>
      </div>
    </div>
    <PublicFooter />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useFavouritesStore } from '@/stores/favouritesStore';
import { useAuthStore } from '@/stores/authStore';
import PublicFooter from '@/components/PublicFooter.vue';
import { onMounted, computed } from 'vue';

export default {
  name: 'FavoritesPage',
  components: { PublicFooter },
  setup() {
    const router = useRouter();
    const favouritesStore = useFavouritesStore();
    const authStore = useAuthStore();

    const allFavorites = computed(() => {
      return [
        ...favouritesStore.getAllFavouriteProperties,
        ...favouritesStore.getAllFavouriteTrebProperties
      ];
    });

    onMounted(async () => {
      if (!authStore.isAuthenticated()) {
        router.push('/login');
        return;
      }
      await favouritesStore.fetchFavourites();
    });

    async function toggleTrebFavorite(listingKey) {
      if (!authStore.isAuthenticated()) {
        router.push('/login');
        return;
      }
      try {
        await favouritesStore.toggleFavouriteTrebProperty(listingKey);
        console.log('Current TREB Favorites:', favouritesStore.getAllFavouriteTrebProperties());
      } catch (error) {
        console.error('Error toggling TREB favorite:', error);
      }
    }

    async function toggleLocalFavorite(propertyId, propertyData) {
      if (!authStore.isAuthenticated()) {
        router.push('/login');
        return;
      }
      try {
        await favouritesStore.toggleFavouriteProperty(propertyData);
        console.log('Current Local Favorites:', favouritesStore.getAllFavouriteProperties());
      } catch (error) {
        console.error('Error toggling local favorite:', error);
      }
    }

    return {
      favouritesStore,
      authStore,
      allFavorites,
      toggleTrebFavorite,
      toggleLocalFavorite
    };
  }
};
</script>

<style scoped>
.favorites-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}
.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.property-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
.property-card__image {
  position: relative;
}
.property-card__image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.property-card__favorite {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  color: #ff0000;
}
.property-card__details {
  padding: 15px;
}
.property-card__details h3 {
  margin: 0 0 10px;
  font-size: 1.2rem;
}
.property-card__details p {
  margin: 5px 0;
}
.loading, .error, .empty {
  text-align: center;
  font-size: 1.2rem;
  margin: 20px 0;
}
</style>
