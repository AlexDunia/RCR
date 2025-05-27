<template>
  <div class="all-properties-page">
    <!-- Header Navigation (from LandingPage.vue) -->
    <nav class="main-nav">
      <div class="main-nav__logo">Real City</div>
      <div class="main-nav__center">
        <router-link to="/properties" class="main-nav__link">Buy</router-link>
        <router-link to="/properties" class="main-nav__link">Rent</router-link>
        <router-link to="/properties" class="main-nav__link">Sell</router-link>
        <router-link to="/allagents" class="main-nav__link">Find Agents</router-link>
        <router-link to="/join" class="main-nav__link">Join Us</router-link>
      </div>
      <div class="main-nav__right">
        <button class="main-nav__button">Sign in</button>
        <button class="main-nav__button main-nav__button--primary">Login</button>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero hero--all-properties">
      <div class="hero__overlay"></div>
      <div class="boxed-container">
        <div class="hero__content">
          <h1 class="hero__title">All Properties</h1>
          <p class="hero__subtitle">Find your dream home from our curated listings.</p>
        </div>
        <!-- Search and filter pills -->
        <div class="hero__search-wrapper">
          <div class="property-types-row">
            <button v-for="type in propertyTypes" :key="type" :class="['property-type-item', { 'property-type-item--active': activeType === type }]" @click="activeType = type">{{ type }}</button>
          </div>
          <div class="search-input-group" style="margin-top: 18px;">
            <div class="search-input-wrapper">
              <span class="search-icon"><i class="fas fa-search"></i></span>
              <input type="text" class="search-input" v-model="searchQuery" placeholder="Search by location, name, or ID...">
            </div>
            <button class="search-btn" @click="applySearch">Search</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Property Grid -->
    <section class="property-grid-section">
      <div class="boxed-container">
        <div class="property-grid--figma">
          <div class="property-card--figma" v-for="property in filteredProperties" :key="property.id" @click="viewProperty(property.id)">
            <img :src="property.image" :alt="property.name" class="property-card__img--figma" loading="lazy">
            <div class="property-card__content--figma">
              <h3 class="property-card__title--figma">{{ property.name }}</h3>
              <div class="property-card__price--figma">{{ property.price }}</div>
              <div class="property-card__address--figma">
                <svg class="property-card__address-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {{ property.address }}
              </div>
              <button class="view-details-btn" @click.stop="viewProperty(property.id)">View Details</button>
            </div>
          </div>
        </div>
        <div v-if="filteredProperties.length === 0" class="no-results">
          <h3>No properties found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';

const router = useRouter();
const propertyStore = usePropertyStore();
const searchQuery = ref('');
const activeType = ref('All');
const propertyTypes = ['All', 'Single Family Homes', 'Townhouses', 'Condos', 'Pre-Construction', 'Apartment', 'Villa', 'Luxury', 'Commercial', 'Residential'];

const filteredProperties = computed(() => {
  let props = propertyStore.properties;
  if (activeType.value !== 'All') {
    props = props.filter(p => p.type === activeType.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    props = props.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q) ||
      (p.id + '').includes(q)
    );
  }
  return props;
});

function viewProperty(id) {
  router.push(`/properties/${id}`);
}
function applySearch() {
  // No-op, search is reactive
}
</script>

<style scoped>
@import '../LandingPage.vue';
.all-properties-page {
  background: #fff;
  min-height: 100vh;
}
.hero--all-properties {
  position: relative;
  height: 340px;
  background-image: url('https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png');
  background-size: cover;
  background-position: center;
  color: #fff;
  margin-bottom: 0;
  padding: 0;
}
.hero__overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}
.hero__content {
  position: relative;
  z-index: 2;
  margin-top: 80px;
  margin-bottom: 30px;
}
.hero__title {
  font-size: 44px;
  font-weight: 700;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 8px;
}
.hero__subtitle {
  font-size: 1.3rem;
  color: #e0f2fe;
  font-family: 'Inter', sans-serif;
  margin-bottom: 0;
}
.hero__search-wrapper {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  width: 60%;
  margin: 0 auto;
  padding: 18px 24px 12px 24px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.property-types-row {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}
.property-type-item {
  background: #f1f5f9;
  color: #64748b;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
  border: none;
  cursor: pointer;
}
.property-type-item--active {
  background: #e0f2fe;
  color: #0052a5;
  font-weight: 600;
}
.search-input-group {
  display: flex;
  gap: 16px;
  width: 100%;
  align-items: center;
}
.search-input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px 16px;
  flex: 1;
  background: #fff;
  transition: all 0.2s ease;
}
.search-input {
  width: 100%;
  border: none;
  font-size: 15px;
  color: #64748b;
  background: transparent;
  outline: none;
}
.search-btn {
  background: #0066cc;
  color: #fff;
  border: none;
  padding: 0 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 48px;
  min-width: 120px;
  white-space: nowrap;
}
.search-btn:hover {
  background: #0052a5;
}
.property-grid-section {
  background: linear-gradient(135deg, #f7f8fa 60%, #e3f0ff 100%);
  padding: 48px 0 64px 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
.property-grid--figma {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  row-gap: 24px;
}
.property-card--figma {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.property-card--figma:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.property-card__img--figma {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.property-card__content--figma {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.property-card__title--figma {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-family: 'Poppins', sans-serif;
}
.property-card__price--figma {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0052a5;
  margin: 0 0 12px 0;
}
.property-card__address--figma {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 0.9rem;
}
.property-card__address-icon {
  width: 16px;
  height: 16px;
  color: #0052a5;
}
.view-details-btn {
  margin-top: 12px;
  background: #0066cc;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-start;
}
.view-details-btn:hover {
  background: #0052a5;
}
.no-results {
  text-align: center;
  margin-top: 48px;
}
@media (max-width: 1200px) {
  .property-grid--figma {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .property-grid--figma {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .property-grid-section {
    padding: 32px 0;
  }
  .property-grid--figma {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .property-card__img--figma {
    height: 180px;
  }
}
</style>
