<template>
  <div class="property-gallery">
    <h1>Property Gallery</h1>
    <div v-if="loading" class="loading">Loading images...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="images.length === 0" class="no-images">
      No images available for this property.
    </div>
    <carousel v-else :items-to-show="1" :wrap-around="true">
      <slide v-for="image in images" :key="image.MediaKey">
        <img :src="image.MediaURL" :alt="`Property image ${image.Order}`" />
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
    <router-link :to="`/property/${listingKey}`" class="back-button">
      Back to Property Details
    </router-link>
  </div>
</template>

<script>
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { usePropertyStore } from '@/stores/propertyStore';
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';

export default {
  name: 'PropertyGallery',
  components: { Carousel, Slide, Navigation, Pagination },
  setup() {
    const route = useRoute();
    const propertyStore = usePropertyStore();
    const listingKey = computed(() => route.params.listingKey);

    onMounted(() => {
      if (!propertyStore.getTrebMediaByListingKey(listingKey.value).length) {
        propertyStore.getTrebMedia(listingKey.value);
      }
    });

    const images = computed(() =>
      propertyStore.getTrebMediaByListingKey(listingKey.value)
    );
    const loading = computed(() => propertyStore.loading);
    const error = computed(() => propertyStore.error);

    return {
      listingKey,
      images,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.property-gallery {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.loading,
.error,
.no-images {
  text-align: center;
  font-size: 1.2em;
  color: #666;
}

.carousel {
  margin-bottom: 20px;
}

.carousel img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 8px;
}

.back-button {
  display: block;
  text-align: center;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.back-button:hover {
  text-decoration: underline;
}
</style>
