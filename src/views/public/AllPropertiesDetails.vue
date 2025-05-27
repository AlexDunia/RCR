<template>
  <div class="property-details-page">
    <!-- Header Navigation (reuse from AllProperties.vue) -->
    <nav class="main-nav">
      <div class="main-nav__logo">Real City</div>
      <div class="main-nav__center">
        <router-link to="/allproperties" class="main-nav__link">Buy</router-link>
        <router-link to="/allproperties" class="main-nav__link">Rent</router-link>
        <router-link to="/allproperties" class="main-nav__link">Sell</router-link>
        <router-link to="/allagents" class="main-nav__link">Find Agents</router-link>
        <router-link to="/join" class="main-nav__link">Join Us</router-link>
      </div>
      <div class="main-nav__right">
        <button class="main-nav__button">Sign in</button>
        <button class="main-nav__button main-nav__button--primary">Login</button>
      </div>
    </nav>

    <div v-if="property" class="property-details-container">
      <div class="property-gallery">
        <img v-for="(img, i) in property.images" :key="i" :src="img" :alt="property.name" class="gallery-img" loading="lazy" />
      </div>
      <div class="property-main-info">
        <h1 class="property-title">{{ property.name }}</h1>
        <div class="property-location">
          <svg class="property-location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {{ property.address }}
        </div>
        <div class="property-price">{{ property.price }}</div>
        <div class="property-features">
          <span><b>{{ property.bedrooms }}</b> Bedrooms</span>
          <span><b>{{ property.bathrooms }}</b> Bathrooms</span>
          <span><b>{{ property.size }}</b> sqft</span>
          <span><b>{{ property.type }}</b></span>
        </div>
        <div class="property-description">{{ property.description }}</div>
        <button class="view-client-btn" @click="showModal = true">View Client</button>
      </div>
    </div>
    <div v-else class="not-found">
      <h2>Property Not Found</h2>
      <router-link to="/allproperties">Back to All Properties</router-link>
    </div>

    <!-- Modal for sign up -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <h2>Create an Account</h2>
        <p>To view client information, please create an account or log in.</p>
        <router-link to="/join" class="modal-btn">Sign Up</router-link>
        <button class="modal-btn modal-btn--secondary" @click="showModal = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';

const route = useRoute();
const propertyStore = usePropertyStore();
const showModal = ref(false);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const property = computed(() => {
  const slug = route.params.slug;
  return propertyStore.properties.find(
    p => slugify(p.name) === slug
  );
});
</script>

<style scoped>
.property-details-page {
  background: #f8fafc;
  min-height: 100vh;
}
.property-details-container {
  max-width: 1100px;
  margin: 48px auto 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,82,165,0.10), 0 2px 8px rgba(0,82,165,0.04);
  padding: 44px 36px 36px 36px;
  align-items: flex-start;
}
.property-gallery {
  flex: 1 1 420px;
  min-width: 320px;
  max-width: 480px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.gallery-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,82,165,0.08);
  background: #e0e7ef;
}
.property-main-info {
  flex: 2 1 400px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.property-title {
  font-size: 2.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 2px 0;
  font-family: 'Poppins', sans-serif;
  line-height: 1.2;
  letter-spacing: -0.01em;
}
.property-location {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #666;
  font-size: 1.08rem;
  margin-bottom: 0;
  line-height: 1.1;
}
.property-location-icon {
  width: 16px;
  height: 16px;
  color: #0052a5;
}
.property-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0052a5;
  margin: 0 0 4px 0;
  line-height: 1.1;
}
.property-features {
  display: flex;
  gap: 22px;
  font-size: 1.08rem;
  color: #334155;
  font-weight: 500;
  margin: 10px 0 0 0;
}
.property-description {
  font-size: 1.08rem;
  color: #444;
  margin-top: 8px;
  line-height: 1.6;
}
.view-client-btn {
  margin-top: 18px;
  background: #0066cc;
  color: #fff;
  border: none;
  padding: 14px 0;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.08rem;
  cursor: pointer;
  transition: background 0.2s cubic-bezier(.4,2,.3,1), box-shadow 0.2s cubic-bezier(.4,2,.3,1);
  align-self: flex-start;
  box-shadow: 0 2px 8px rgba(0,82,165,0.08);
  min-width: 180px;
  text-align: center;
  letter-spacing: 0.01em;
}
.view-client-btn:hover {
  background: #0052a5;
  box-shadow: 0 4px 16px rgba(0,82,165,0.13);
}
.not-found {
  text-align: center;
  margin-top: 80px;
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.18);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 38px 32px 28px 32px;
  box-shadow: 0 8px 32px rgba(0,82,165,0.13);
  min-width: 320px;
  max-width: 90vw;
  text-align: center;
}
.modal-btn {
  display: block;
  width: 100%;
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.08rem;
  font-weight: 600;
  margin: 18px 0 0 0;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.18s cubic-bezier(.4,2,.3,1);
}
.modal-btn--secondary {
  background: #e2e8f0;
  color: #334155;
  margin-top: 10px;
}
@media (max-width: 900px) {
  .property-details-container {
    flex-direction: column;
    gap: 28px;
    padding: 24px 8px 18px 8px;
  }
  .property-gallery {
    grid-template-columns: 1fr;
    gap: 8px;
    max-width: 100%;
  }
  .gallery-img {
    height: 120px;
  }
}
@media (max-width: 600px) {
  .property-details-container {
    padding: 8px 2px 6px 2px;
    gap: 10px;
  }
  .property-main-info {
    padding: 0 2px;
    gap: 10px;
  }
  .gallery-img {
    height: 80px;
  }
}
</style>
