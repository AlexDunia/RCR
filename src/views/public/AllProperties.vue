<template>
  <div class="all-properties-page">
    <!-- Header Navigation (from LandingPage.vue) -->
    <nav class="main-nav">
      <div class="main-nav__logo">Real City</div>
      <div class="main-nav__center">
        <router-link to="/buy" class="main-nav__link">Buy</router-link>
        <router-link to="/rent" class="main-nav__link">Rent</router-link>
        <router-link to="/sell" class="main-nav__link">Sell</router-link>
        <router-link to="/allagents" class="main-nav__link">Find Agents</router-link>
        <router-link to="/signup" class="main-nav__link">Join Us</router-link>
      </div>
      <div class="main-nav__right">
        <router-link to="/signup" class="main-nav__button">Sign up</router-link>
        <router-link to="/login" class="main-nav__button main-nav__button--primary">Login</router-link>
      </div>
    </nav>

    <!-- World-class search/filter bar -->
    <div class="all-properties-bar">
      <div class="property-types-row">
        <button v-for="type in propertyTypes" :key="type" :class="['property-type-item', { 'property-type-item--active': activeType === type }]" @click="activeType = type">{{ type }}</button>
      </div>
      <div class="search-input-group">
        <div class="search-input-wrapper">
          <input
            type="text"
            class="search-input"
            v-model="searchQuery"
            placeholder="Search by location, name, or ID..."
            @input="onSearchInput"
            @keydown="onSearchKeydown"
            autocomplete="off"
            spellcheck="false"
            maxlength="64"
          />
          <span class="search-icon">
            <i class="fas fa-search"></i>
          </span>
        </div>
        <button class="search-btn" @click="applySearch">Search</button>
      </div>
    </div>

    <!-- Property Grid -->
    <div class="all-properties-content">
      <div class="property-grid--figma">
        <div class="property-card--figma" v-for="property in filteredProperties" :key="property.id" @click="viewProperty(property)">
          <img :src="property.image" :alt="property.name" class="property-card__img--figma" loading="lazy">
          <div class="property-card__content--figma">
            <h3 class="property-card__title--figma">{{ property.name }}</h3>
            <div class="property-card__price--figma">{{ property.price }}</div>
            <div class="property-card__address--figma">
              <svg class="property-card__address-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {{ property.address }}
            </div>
            <button class="view-details-btn" @click.stop="viewProperty(property)">View Details</button>
          </div>
        </div>
      </div>
      <div v-if="filteredProperties.length === 0" class="no-results">
        <h3>No properties found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';

const router = useRouter();
const propertyStore = usePropertyStore();
const searchQuery = ref('');
const activeType = ref('All');
const propertyTypes = [
  'All',
  'Single Family Homes',
  'Townhouses',
  'Condos',
  'Pre-Construction'
];

function sanitizeInput(input) {
  // Remove script tags and escape special characters
  return input
    .replace(/<script.*?>.*?<\/script>/gi, '')
    .replace(/[<>"']+/g, '');
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^a-z0-9-]/g, '')    // Remove all non-word chars
    .replace(/-+/g, '-')           // Replace multiple - with single -
    .replace(/^-+/, '')              // Trim - from start of text
    .replace(/-+$/, '');             // Trim - from end of text
}

const filteredProperties = computed(() => {
  let props = propertyStore.properties;
  if (activeType.value !== 'All') {
    props = props.filter(p => p.type === activeType.value);
  }
  if (searchQuery.value.trim()) {
    const q = sanitizeInput(searchQuery.value.trim().toLowerCase());
    props = props.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q) ||
      (p.id + '').includes(q)
    );
  }
  return props;
});

function viewProperty(property) {
  const slug = slugify(property.name);
  router.push(`/allproperties/${slug}`);
}
function applySearch() {
  searchQuery.value = sanitizeInput(searchQuery.value);
}
function onSearchInput(e) {
  searchQuery.value = sanitizeInput(e.target.value);
}
function onSearchKeydown(e) {
  if (e.key === 'Enter') {
    applySearch();
  }
}

onMounted(async () => {
  if (typeof propertyStore.fetchProperties === 'function') {
    await propertyStore.fetchProperties();
  }
});

onActivated(async () => {
  if (typeof propertyStore.fetchProperties === 'function') {
    await propertyStore.fetchProperties();
  }
});
</script>

<style scoped>
.all-properties-page {
  background: #f8fafc;
  min-height: 100vh;
}
.all-properties-bar {
  max-width: 85vw;
  width: 100%;
  margin: 56px auto 48px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,82,165,0.07);
  padding: 44px 44px 28px 44px;
}
.property-types-row {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 0;
}
.property-type-item {
  background: #f1f5f9;
  color: #64748b;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(.4,2,.3,1);
  font-family: 'Inter', sans-serif;
  border: none;
  cursor: pointer;
  margin-bottom: 4px;
}
.property-type-item--active {
  background: #e0f2fe;
  color: #0052a5;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,82,165,0.08);
}
.search-input-group {
  display: flex;
  gap: 0;
  width: 100%;
  align-items: center;
  max-width: 600px;
  position: relative;
}
.search-input-wrapper {
  display: flex;
  align-items: center;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 0;
  flex: 1;
  background: #fff;
  transition: all 0.2s cubic-bezier(.4,2,.3,1);
  box-shadow: 0 1px 4px rgba(0,82,165,0.04);
  position: relative;
}
.search-input {
  width: 100%;
  border: none;
  font-size: 16px;
  color: #64748b;
  background: transparent;
  outline: none;
  padding: 14px 18px 14px 44px;
}
.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #b0b8c1;
  font-size: 18px;
  pointer-events: none;
  z-index: 2;
}
.search-btn {
  background: #0066cc;
  color: #fff;
  border: none;
  padding: 0 36px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(.4,2,.3,1);
  height: 48px;
  min-width: 120px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,82,165,0.08);
  margin-left: 18px;
}
.search-btn:hover {
  background: #0052a5;
}
.all-properties-content {
  max-width: 85vw;
  margin: 0 auto 64px auto;
  width: 100%;
  padding-top: 32px;
}
.property-grid--figma {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 44px;
  row-gap: 56px;
  margin-top: 0;
}
.property-card--figma {
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,82,165,0.10), 0 2px 8px rgba(0,82,165,0.04);
  transition: transform 0.18s cubic-bezier(.4,2,.3,1), box-shadow 0.18s cubic-bezier(.4,2,.3,1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1.5px solid #e0f2fe;
  min-width: 0;
  margin-bottom: 8px;
  min-height: 340px;
  max-height: 370px;
  padding: 0 0 18px 0;
}
.property-card--figma:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 0 16px 48px rgba(0,82,165,0.16), 0 2px 12px rgba(0,82,165,0.10);
  border-color: #4f8edc;
  z-index: 2;
}
.property-card__img--figma {
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  margin-bottom: 0;
}
.property-card__content--figma {
  padding: 22px 18px 0 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}
.property-card__title--figma {
  font-size: 1.08rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 2px 0;
  font-family: 'Poppins', sans-serif;
  line-height: 1.2;
  letter-spacing: -0.01em;
}
.property-card__price--figma {
  font-size: 1.08rem;
  font-weight: 700;
  color: #0052a5;
  margin: 0 0 4px 0;
  line-height: 1.1;
}
.property-card__address--figma {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 0.93rem;
  margin-bottom: 0;
  line-height: 1.1;
}
.property-card__address-icon {
  width: 14px;
  height: 14px;
  color: #0052a5;
}
.view-details-btn {
  margin-top: 18px;
  background: #0066cc;
  color: #fff;
  border: none;
  padding: 12px 0;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s cubic-bezier(.4,2,.3,1), box-shadow 0.2s cubic-bezier(.4,2,.3,1);
  align-self: stretch;
  box-shadow: 0 2px 8px rgba(0,82,165,0.08);
  width: 100%;
  text-align: center;
  letter-spacing: 0.01em;
}
.view-details-btn:hover {
  background: #0052a5;
  box-shadow: 0 4px 16px rgba(0,82,165,0.13);
}
.no-results {
  text-align: center;
  margin-top: 56px;
}
@media (max-width: 1200px) {
  .property-grid--figma {
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    row-gap: 36px;
  }
}
@media (max-width: 900px) {
  .property-grid--figma {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    row-gap: 24px;
  }
  .all-properties-bar, .all-properties-content {
    max-width: 98vw;
    padding-left: 8px;
    padding-right: 8px;
  }
}
@media (max-width: 600px) {
  .property-grid--figma {
    grid-template-columns: 1fr;
    gap: 10px;
    row-gap: 14px;
  }
  .property-card__img--figma {
    height: 80px;
  }
  .all-properties-bar, .all-properties-content {
    max-width: 100vw;
    padding-left: 2px;
    padding-right: 2px;
  }
  .all-properties-bar {
    padding: 10px 2px 6px 2px;
    gap: 6px;
  }
  .property-card__content--figma {
    padding: 10px 6px 0 6px;
    gap: 6px;
  }
  .view-details-btn {
    margin-top: 12px;
    padding: 10px 0;
    font-size: 0.97rem;
  }
}
</style>
