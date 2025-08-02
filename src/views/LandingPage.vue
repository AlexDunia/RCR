<template>
  <div class="landing-page">
    <teleport to="body">
      <transition name="fade">
        <div v-if="showMobileNav" class="modal-wrapper" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999999999; display: flex; transform: translateZ(0); will-change: transform; isolation: isolate;">
          <div class="mobile-nav-modal">
            <div class="mobile-nav-modal__backdrop" @click="showMobileNav = false"></div>
            <div class="mobile-nav-modal__content">
              <button class="mobile-nav-modal__close" @click="showMobileNav = false" aria-label="Close navigation">×</button>
              <router-link v-if="userRole === 'all'" to="/" class="mobile-nav-modal__link" @click="showMobileNav = false">Home</router-link>
              <router-link to="/allagents" class="mobile-nav-modal__link" @click="showMobileNav = false">Find Agents</router-link>
              <router-link to="/signup" class="mobile-nav-modal__link" @click="showMobileNav = false">Join Us</router-link>
              <div class="mobile-nav-modal__buttons">
                <router-link to="/signup" class="mobile-nav-modal__button" @click="showMobileNav = false">Sign up</router-link>
                <router-link to="/login" class="mobile-nav-modal__button mobile-nav-modal__button--primary" @click="showMobileNav = false">Login</router-link>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- Hero Section -->
    <section id="hero-section" class="hero">
      <div class="hero__overlay"></div>
      <div class="boxed-container">
        <!-- Header Navigation -->
        <nav class="main-nav">
          <div class="main-nav__logo">
            <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1748316444/rclogo_l7oiod.png" alt="Real City Logo" class="main-nav__logo-img" />
          </div>
          <div class="main-nav__center desktop-nav">
            <router-link v-if="userRole === 'all'" to="/" class="main-nav__link">Home</router-link>
            <router-link to="/allagents" class="main-nav__link">Find Agents</router-link>
            <router-link to="/signup" class="main-nav__link">Join Us</router-link>
          </div>
          <div class="main-nav__right desktop-nav">
            <router-link to="/signup" class="main-nav__button">Sign up</router-link>
            <router-link to="/login" class="main-nav__button main-nav__button--primary">Login</router-link>
          </div>
          <!-- Hamburger for mobile -->
          <button class="main-nav__hamburger" @click="showMobileNav = true" aria-label="Open navigation" v-if="!showMobileNav">
            <span></span><span></span><span></span>
          </button>
        </nav>
        <div class="hero__content">
          <h1 class="hero__title">Discover Homes<br />You'll Love</h1>
        </div>
        <div class="hero__search-wrapper">
          <!-- MOBILE: Pill buttons row with indicator arrow on active -->
          <div v-if="isMobile" class="hero__pill-row-mobile">
            <div class="pill-btn-group">
              <button class="pill-btn" :class="{ 'pill-btn--active': activeTab === 'Sell' }" @click="activeTab = 'Sell'">
                Sell <span v-if="activeTab === 'Sell'" class="pill-btn__arrow">▼</span>
              </button>
              <button class="pill-btn" :class="{ 'pill-btn--active': activeTab === 'Rent' }" @click="activeTab = 'Rent'">
                Rent <span v-if="activeTab === 'Rent'" class="pill-btn__arrow">▼</span>
              </button>
              <button class="pill-btn" :class="{ 'pill-btn--active': activeTab === 'Buy' }" @click="activeTab = 'Buy'">
                Buy <span v-if="activeTab === 'Buy'" class="pill-btn__arrow">▼</span>
              </button>
            </div>
          </div>
          <!-- DESKTOP: Keep original tabs and search form together -->
          <div v-else>
            <div class="hero__search-tabs">
              <button
                v-for="tab in ['Sell', 'Rent', 'Buy']"
                :key="tab"
                :class="['hero__tab-btn', { 'hero__tab-btn--active': activeTab === tab }]"
                @click="activeTab = tab"
              >
                {{ tab }}
              </button>
            </div>
            <div class="hero__search-form">
              <div class="search-input-group">
                <div class="search-input-wrapper input-icon-wrapper">
                  <span class="search-icon-inside">
                    <i class="fas fa-home"></i>
                  </span>
                  <form @submit.prevent="handleSearch" class="search-form">
                    <div class="search-input-wrapper input-icon-wrapper">
                      <input
                        v-model="searchQuery"
                        type="text"
                        class="search-input with-icon"
                        placeholder="Search by property type, location, or ID…"
                      >
                    </div>
                    <button class="search-btn">Search</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- MOBILE: Standalone search bar section below hero -->
    <section v-if="isMobile" class="mobile-search-section">
      <div class="mobile-search-bar-container">
        <div class="search-input-group mobile-search-bar">
          <div class="search-input-wrapper input-icon-wrapper">
            <span class="search-icon-inside">
              <i class="fas fa-home"></i>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              class="search-input with-icon mobile-search-input"
              placeholder="Search by location or Property name..."
              @keyup.enter="handleSearch"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- TREB Properties Section -->
    <section class="treb-properties">
      <div class="boxed-container">
        <h2 class="treb-properties__title">Featured TREB Listings</h2>
        <div v-if="propertyStore.trebLoading" class="loading-state">
          <div class="loading-spinner"></div>
          <div class="loading-text">Loading properties...</div>
        </div>
        <div v-else-if="propertyStore.trebError" class="error-state">
          <div class="error-message">{{ propertyStore.trebError }}</div>
          <button class="retry-button" @click="retryTrebFetch">Retry</button>
        </div>
        <div v-else-if="!propertyStore.trebData?.data?.value?.length" class="empty-state">
          <div class="empty-message">No properties available at the moment.</div>
        </div>
        <div v-else class="treb-properties__grid">
          <router-link
            v-for="property in propertyStore.trebData?.data?.value"
            :key="property.ListingKey"
            :to="`/property/treb/${property.ListingKey}`"
            class="treb-property-card"
          >
            <div class="treb-property-card__image">
              <img
                v-if="property.image"
                :src="property.image"
                :alt="property.UnparsedAddress || 'Property Image'"
                class="treb-property-card__img"
                loading="lazy"
                @error="handleImageError"
              />
              <div v-else class="treb-property-card__no-image">
                <img
                  src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png"
                  alt="No Image Available"
                  class="treb-property-card__img"
                  loading="lazy"
                />
              </div>
              <div class="treb-property-card__badges">
                <span
                  v-if="property.StandardStatus === 'Active'"
                  class="property-badge property-badge--active"
                >
                  Active
                </span>
                <span
                  v-else-if="property.StandardStatus === 'Sold'"
                  class="property-badge property-badge--sold"
                >
                  Sold
                </span>
                <span
                  v-else-if="property.StandardStatus === 'Pending'"
                  class="property-badge property-badge--pending"
                >
                  Pending
                </span>
                <span
                  class="property-badge property-badge--type"
                >
                  {{ property.PropertyType || 'Residential' }}
                </span>
              </div>
              <div class="treb-property-card__favorite">
                <i class="far fa-heart"></i>
              </div>
            </div>
            <div class="treb-property-card__content">
              <div class="treb-property-card__price">${{ formatPrice(property.ListPrice) }}</div>
              <h3 class="treb-property-card__title">{{ property.UnparsedAddress }}</h3>
              <div class="treb-property-card__details">
                <span class="treb-property-card__detail">
                  <i class="fas fa-bed"></i>
                  {{ property.BedroomsTotal || 'N/A' }} Beds
                </span>
                <span class="treb-property-card__detail">
                  <i class="fas fa-bath"></i>
                  {{ property.BathroomsFull || 'N/A' }} Baths
                </span>
                <span class="treb-property-card__detail">
                  <i class="fas fa-ruler-combined"></i>
                  {{ formatArea(property.LivingArea) || 'N/A' }} sqft
                </span>
              </div>
              <div class="treb-property-card__location">
                <i class="fas fa-map-marker-alt"></i>
                {{ property.City }}, {{ property.StateOrProvince }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Property type filter pills -->
    <section class="property-types-section">
      <div class="boxed-container">
        <div class="property-types-row">
          <a href="#" class="property-type-item property-type-item--active">Single Family Homes</a>
          <a href="#" class="property-type-item">Townhouses</a>
          <a href="#" class="property-type-item">Condos</a>
          <a href="#" class="property-type-item">Pre-Construction</a>
        </div>
      </div>
    </section>

    <!-- Featured Properties Section -->
    <section class="featured featured--figma reveal">
      <div class="boxed-container">
        <h2 class="featured__title--figma">Find the best place for you.</h2>
        <div v-if="propertyStore.loading" class="loading-state">
          Loading properties...
        </div>
        <div v-else-if="propertyStore.error" class="error-state">
          {{ propertyStore.error }}
        </div>
        <div v-else-if="featuredProperties.length === 0" class="empty-state">
          No properties available at the moment.
        </div>
        <div v-else class="property-grid--figma">
          <router-link
            v-for="property in featuredProperties"
            :key="property.id"
            :to="`/property/${property.id}`"
            class="property-card--figma">
            <div class="property-card__image-carousel">
              <img v-if="!property.images?.length"
                   src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png"
                   :alt="property.name"
                   class="property-card__img--figma"
                   loading="lazy">
              <template v-else>
                <img :src="property.images[0]"
                     :alt="property.name"
                     class="property-card__img--figma"
                     loading="lazy"
                     @error="handleImageError">
              </template>
              <div class="property-card__badges">
                <span
                  v-if="property.status === 'active'"
                  class="property-badge property-badge--active"
                >
                  Active
                </span>
                <span
                  v-else-if="property.status === 'sold'"
                  class="property-badge property-badge--sold"
                >
                  Sold
                </span>
                <span
                  v-else-if="property.status === 'pending'"
                  class="property-badge property-badge--pending"
                >
                  Pending
                </span>
                <span
                  class="property-badge property-badge--type"
                >
                  {{ property.type || 'Residential' }}
                </span>
              </div>
              <div class="property-card__favorite">
                <i class="far fa-heart"></i>
              </div>
            </div>
            <div class="property-card__content--figma">
              <div class="property-card__price--figma">${{ formatPrice(property.price) }}</div>
              <h3 class="property-card__title--figma">{{ property.name || 'Beautiful Property' }}</h3>
              <div class="property-card__details">
                <span class="property-card__detail">
                  <i class="fas fa-bed"></i>
                  {{ property.bedrooms || 'N/A' }} Beds
                </span>
                <span class="property-card__detail">
                  <i class="fas fa-bath"></i>
                  {{ property.bathrooms || 'N/A' }} Baths
                </span>
                <span class="property-card__detail">
                  <i class="fas fa-ruler-combined"></i>
                  {{ formatArea(property.area) || 'N/A' }} sqft
                </span>
              </div>
              <div class="property-card__address--figma">
                <i class="fas fa-map-marker-alt"></i>
                {{ property.address }}{{ property.city ? `, ${property.city}` : '' }}{{ property.state ? `, ${property.state}` : '' }}
              </div>
            </div>
          </router-link>
        </div>
        <router-link to="/allproperties" class="featured__view-more">
          View More
          <svg style="margin-left: 8px;" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#0052a5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </router-link>
      </div>
    </section>

    <!-- How We Can Help Section -->
    <section class="help-section">
      <div class="boxed-container">
        <div class="help-section__container">
          <div class="help-section__images">
            <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80" alt="Interior 1" class="help-section__image" />
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Interior 2" class="help-section__image" />
          </div>
          <div class="help-section__content">
            <h2 class="help-section__title">Here's how we can help you</h2>
            <ul class="help-section__list">
              <li class="help-section__item">
                <span class="help-section__icon">✓</span>
                <span>Fast search for homes that best suit you.</span>
              </li>
              <li class="help-section__item">
                <span class="help-section__icon">✓</span>
                <span>Access to the best and experienced agents to guide your decision making.</span>
              </li>
              <li class="help-section__item">
                <span class="help-section__icon">✓</span>
                <span>Be the first to get the best offer.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Neighborhoods Section (Pixel Perfect, Figma Accurate) -->
    <section class="neighborhoods neighborhoods--figma reveal">
      <div class="boxed-container">
        <h2 class="neighborhoods__title neighborhoods__title--figma">Find the area that feels like home</h2>
        <div class="neighborhoods__grid neighborhoods__grid--figma">
          <div class="neighborhood-card neighborhood-card--figma">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=60" alt="New England" class="neighborhood-card__img neighborhood-card__img--figma" loading="lazy" />
            <div class="neighborhood-card__label--figma">New England</div>
          </div>
          <div class="neighborhood-card neighborhood-card--figma">
            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=60" alt="Silicon Valley" class="neighborhood-card__img neighborhood-card__img--figma" loading="lazy" />
            <div class="neighborhood-card__label--figma">Silicon Valley</div>
          </div>
          <div class="neighborhood-card neighborhood-card--figma">
            <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=60" alt="Pacific Northwest" class="neighborhood-card__img neighborhood-card__img--figma" loading="lazy" />
            <div class="neighborhood-card__label--figma">Pacific Northwest</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Agent Carousel Section -->
    <section class="agent-carousel-section">
      <div class="boxed-container">
        <h2 class="agent-carousel__title">Meet Our Top Agents</h2>
        <div class="agent-carousel__subtitle">Handpicked professionals ready to help you find your dream home</div>
        <div class="agent-carousel__wrapper">
          <div class="agent-carousel__track">
            <div v-for="agent in visibleAgents" :key="agent.id" class="agent-card">
              <div class="agent-card__img-box">
                <img :src="agent.avatar || agent.profilePicture || '/default-avatar.png'" :alt="agent.name || 'Agent'" class="agent-card__img" />
              </div>
              <div class="agent-card__name">{{ agent.name || 'Agent Name' }}</div>
            </div>
          </div>
        </div>
        <router-link to="/allagents" class="agent-carousel__view-more">View More</router-link>
      </div>
    </section>

    <!-- Platform Benefits Section -->
    <section class="benefits benefits--figma reveal">
      <div class="boxed-container benefits__container">
        <div class="benefits__left">
          <h2 class="benefits__title--figma">
            A platform built<br>
            for you to find a<br>
            home with little<br>
            effort
          </h2>
        </div>
        <div class="benefits__right">
          <div class="benefit-card--figma">
            <div class="benefit-card__icon--figma">
              <!-- Magnifying glass SVG -->
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="22" cy="22" r="12" stroke="#8c8c8c" stroke-width="3"/><line x1="34.071" y1="34.485" x2="28.485" y2="28.899" stroke="#8c8c8c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="benefit-card__text--figma">Search for homes with ease</div>
          </div>
          <div class="benefit-card--figma">
            <div class="benefit-card__icon--figma">
              <!-- Agent SVG -->
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" fill="#bdbdbd"/><rect x="10" y="30" width="28" height="12" rx="6" fill="#bdbdbd"/></svg>
            </div>
            <div class="benefit-card__text--figma">Get the best agents to aid you.</div>
          </div>
          <div class="benefit-card--figma">
            <div class="benefit-card__icon--figma">
              <!-- Bell SVG -->
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 40c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4zm12-8V22c0-6.08-4.93-11-11-11S14 15.92 14 22v10l-4 4v2h32v-2l-4-4z" fill="#bdbdbd"/></svg>
            </div>
            <div class="benefit-card__text--figma">Get alerts on new pre-construction projects</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section--saas">
      <div class="boxed-container faq__container--saas">
        <div class="faq__left--saas">
          <h2 class="faq__title--saas">Frequently Asked Questions</h2>
          <p class="faq__subtitle--saas">If there are questions you want to ask.<br>We will answer all your questions.</p>
        </div>
        <div class="faq__right--saas">
          <div v-for="(item, idx) in faqList" :key="item.q" class="faq__item--saas" :class="{ 'faq__item--active': openIdx === idx }">
            <button class="faq__question--saas" @click="toggleFaq(idx)">
              <span class="faq__question-text--saas">{{ item.q }}</span>
              <span class="faq__icon--saas">
                <svg v-if="openIdx === idx" width="24" height="24" viewBox="0 0 24 24"><polyline points="6 15 12 9 18 15" fill="none" stroke="#0052a5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg v-else width="24" height="24" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" fill="none" stroke="#bdbdbd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </button>
            <transition name="faq-expand">
              <div v-if="openIdx === idx" class="faq__answer--saas">{{ item.a }}</div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <PublicFooter />

    <!-- Fixed Navigation -->
    <nav class="fixed-nav" :class="{ 'fixed-nav--visible': showFixedNav }" v-show="showFixedNav">
      <div class="boxed-container">
        <div class="fixed-nav__content">
          <div class="fixed-nav__logo">
            <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1748316444/rclogo_l7oiod.png" alt="Real City Logo" class="fixed-nav__logo-img" />
          </div>
          <div class="fixed-nav__center desktop-nav">
            <router-link v-if="userRole === 'all'" to="/" class="fixed-nav__link">Home</router-link>
            <router-link to="/allagents" class="fixed-nav__link">Find Agents</router-link>
            <router-link to="/signup" class="fixed-nav__link">Join Us</router-link>
          </div>
          <div class="fixed-nav__right desktop-nav">
            <router-link to="/signup" class="fixed-nav__button">Sign up</router-link>
            <router-link to="/login" class="fixed-nav__button fixed-nav__button--primary">Login</router-link>
          </div>
          <!-- Add hamburger for mobile -->
          <button class="main-nav__hamburger" @click="showMobileNav = true" aria-label="Open navigation" v-if="!showMobileNav">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import { useAgentStore } from '@/stores/agentStore';
import { usePropertyStore } from '@/stores/propertyStore';
import { useAuthStore } from '@/stores/authStore';
import PublicFooter from '@/components/PublicFooter.vue';

defineOptions({
  name: 'LandingPage'
});

const router = useRouter();
const authStore = useAuthStore();
const userRole = computed(() => authStore.userRole || 'all');
const searchQuery = ref('');

const faqList = [
  {
    q: 'What services do we offer?',
    a: 'We offer property buying, selling, and rental services, as well as expert agent guidance and market insights.'
  },
  {
    q: 'How can I register as an agent?',
    a: 'Click the Sign Up button, select Agent, and fill out your details. Our team will review and approve your registration.'
  },
  {
    q: 'How can I register as a client?',
    a: 'Click the Sign Up button, choose Client, and complete the registration form to get started.'
  },
  {
    q: 'What are the features that could help speed track my search?',
    a: 'Use our advanced filters, instant alerts, and agent recommendations to quickly find the best properties for you.'
  }
];

const isVisible = ref(false);
const openIdx = ref(null);
const activeTab = ref('Buy');
const showFixedNav = ref(false);
const showMobileNav = ref(false);

const agentStore = useAgentStore();
const allAgents = ref([]);
const visibleAgents = ref([]);
const carouselSize = ref(4); // Show 3-5 at a time, default 4
let carouselInterval = null;

// Use Intersection Observer for sticky nav
let observer = null;
onMounted(async () => {
  // Reset all reactive states
  openIdx.value = null;
  activeTab.value = 'Buy';
  showFixedNav.value = false;
  showMobileNav.value = false;

  // Fetch properties
  try {
    await propertyStore.fetchProperties();
    await propertyStore.getTrebData();

  } catch (error) {
    console.error('Error fetching properties:', error);
  }

  // Intersection Observer for sticky nav
  await nextTick();
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    observer = new window.IntersectionObserver(
      ([entry]) => {
        showFixedNav.value = !entry.isIntersecting;
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );
    observer.observe(heroSection);
  }

  // Force scroll to top
  window.scrollTo(0, 0);

  // Ensure component is visible after mount
  isVisible.value = true;

  // Add event listener to close mobile nav on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      showMobileNav.value = false;
    }
  });

  // Load agents from store
  if (typeof agentStore.fetchAgents === 'function') {
    await agentStore.fetchAgents();
  }
  allAgents.value = agentStore.getAllAgents ? agentStore.getAllAgents() : (agentStore.agents || []);
  pickVisibleAgents();
  // Start carousel after page is visible and idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => startCarousel());
  } else {
    setTimeout(() => startCarousel(), 200);
  }

  // Mobile detection
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 600;
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onBeforeUnmount(() => {
  // Clean up component state and event listeners
  if (observer) observer.disconnect();
  isVisible.value = false;
  openIdx.value = null;
  showFixedNav.value = false;
  showMobileNav.value = false;
  stopCarousel();
  window.removeEventListener('resize', () => {});
  document.removeEventListener('keydown', () => {});
});

onActivated(async () => {
  // Always refetch agents and properties when activated (e.g., after navigating back)
  if (typeof agentStore.fetchAgents === 'function') {
    await agentStore.fetchAgents();
  }
  allAgents.value = agentStore.getAllAgents ? agentStore.getAllAgents() : (agentStore.agents || []);
  pickVisibleAgents();
  if (typeof propertyStore.fetchProperties === 'function') {
    await propertyStore.fetchProperties();
  }
});

function shuffleAgents(agents) {
  // Fisher-Yates shuffle
  const arr = agents.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickVisibleAgents() {
  if (!allAgents.value.length) return;
  const shuffled = shuffleAgents(allAgents.value);
  visibleAgents.value = shuffled.slice(0, carouselSize.value);
}

function startCarousel() {
  carouselInterval = setInterval(() => {
    pickVisibleAgents();
  }, 5000); // 5 seconds for a more relaxed, world-class feel
}

function stopCarousel() {
  if (carouselInterval) clearInterval(carouselInterval);
}

function toggleFaq(idx) {
  openIdx.value = openIdx.value === idx ? null : idx;
}

// Scroll-to-reveal composable


function useRevealOnScroll(selector = '.reveal') {
  let observer = null;
  onMounted(() => {
    observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(selector).forEach(el => {
      observer.observe(el);
    });
  });
onBeforeUnmount(() => {
    if (observer) observer.disconnect();
  });
}

// Use for main sections and blog cards
useRevealOnScroll('.reveal');

const propertyStore = usePropertyStore();

// Format price with commas
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US').format(price);
};

// Format area with commas and handle null values
const formatArea = (area) => {
  if (!area) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(area);
};
const featuredProperties = computed(() => {
  const properties = propertyStore.properties || [];
  return properties.map(property => ({
    ...property,
    currentImageIndex: 0,
    images: property.images || []
  }));
});



// Add a reactive isMobile property for mobile detection
const isMobile = ref(false);
const showDropdown = ref(false);

onMounted(() => {
  // ... existing code ...
  // Mobile detection
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 600;
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.pill-btn--dropdown')) {
      showDropdown.value = false;
    }
  });
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {});
  document.removeEventListener('click', () => {});
});
// ... existing code ...



// Add this function to handle image loading errors
function handleImageError(event) {
  event.target.src = 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png';
}

function handleSearch() {
  router.push({
    path: '/search',
    query: {
      q: searchQuery.value
    }
  });
}

// Add retry function for TREB data
async function retryTrebFetch() {
  try {
    await propertyStore.getTrebData();
  } catch (error) {
    console.error('Retry failed:', error);
  }
}

</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: #fff;
}

/* Main Navigation */
.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  width: 100%;
}

.main-nav__logo {
  display: flex;
  align-items: center;
}

.main-nav__logo-img {
  height: 50px;
  width: auto;
}

.main-nav__center {
  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: center;
}

.main-nav__link {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: opacity 0.2s;
}

.main-nav__link:hover {
  opacity: 0.8;
}

.main-nav__right {
  display: flex;
  gap: 16px;
}

.main-nav__button {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
}

.agent-carousel__view-more {
    display: block;
    color: rgb(255, 255, 255);
    font-size: 1.18rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: rgba(0, 82, 165, 0.08) 0px 2px 8px;
    text-align: center;
    width: fit-content;
    min-width: 180px;
    max-width: 320px;
    margin: 32px auto 0px;
    background: linear-gradient(90deg, rgb(0, 102, 204), rgb(79, 142, 220));
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    border-radius: 10px;
    padding: 14px 44px;
    transition: background 0.2s, box-shadow 0.2s;
    text-decoration: none;
}

.main-nav__button--primary {
  background: #0066cc;
  border: none;
}

.main-nav__button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.main-nav__button--primary:hover {
  background: #0052a5;
}

/* Hero section styles */
.hero {
  position: relative;
  height: 85vh;
  min-height: 500px;
  display: flex;
  align-items: flex-start;
  background-image: url('https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png');
  background-size: cover;
  background-position: center;
  color: #fff;
  margin: 0;
  padding: 0;
}

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.hero .boxed-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.hero__content {
  text-align: left;
  margin-top: 120px;
  margin-bottom: 90px;
}

.hero__title {
  font-size: 50px;
  font-weight: 700;
  text-align: left;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  line-height: 1.2;
  margin: 0;
  letter-spacing: -0.5px;
  font-family: 'Poppins', sans-serif;
}

/* Search wrapper redesign */
.hero__search-wrapper {
  background: #fff;
  border-radius: 12px;
  overflow: visible;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  width: 70%;
  position: relative;
  margin: 0 auto;
  padding: 0;
}

.hero__search-tabs {
  display: flex;
  padding: 0;
  position: absolute;
  top: -43px;
  left: 0;
  gap: 1px;
}

.hero__tab-btn {
  padding: 16px 48px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
  position: relative;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.hero__tab-btn--active {
  background: #fff;
  color: #0066cc;
  font-weight: 600;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-radius: 12px 12px 0 0;
}

.hero__search-form {
  padding: 24px;
  display: flex;
  gap: 16px;
  background: white;
  border-radius: 12px;
  position: relative;
  width: 100%;
}

.search-input-group {
  display: flex;
  gap: 16px;
  width: 100%;
  align-items: center;
}

.input-icon-wrapper {
  position: relative;
  flex: 1 1 0%;
  min-width: 320px;
  max-width: 100%;
}

.with-icon {
  padding-left: 48px;
  width: 100%;
  min-width: 280px;
  height: 48px;
  display: flex;
  align-items: center;
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
  flex-shrink: 0;
  align-self: stretch;
  margin-left: auto;
}

.search-input {
  width: 100%;
  border: none;
  font-size: 15px;
  color: #64748b;
  background: transparent;
  outline: none;
}

.search-input::placeholder {
  color: #94a3b8;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .hero {
    height: 80vh;
    background-size: cover;
    margin-bottom: -80px;
  }
  .property-types-section {
    margin-top: 140px;
  }
}

@media (max-width: 768px) {
  .hero {
    height: 75vh;
    margin-bottom: -60px;
  }
  .hero__content {
    margin-top: 160px;
    margin-bottom: 4rem;
  }
  .property-types-section {
    margin-top: 120px;
  }
}

@media (max-width: 600px) {
  .hero {
    height: auto;
    min-height: 220px;
    padding-bottom: 0;
    margin-bottom: 0;
    padding-top: 18px;
    padding-bottom: 28px;
  }
  .hero__content {
    margin-top: 8px;
    margin-bottom: 18px;
    text-align: left;
    padding-left: 16px;
  }
  .property-types-section {
    padding: 16px 0;
    margin-top: 40px;
  }
}

/* Property type filter pills */
.property-types-section {
  background: #fff;
  padding: 24px 0;
  margin-top: 160px;
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  border-bottom: 1px solid #e5e7eb;
}

.property-types-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.property-types-row {
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  overflow-x: auto;
  padding-bottom: 4px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.property-types-row::-webkit-scrollbar {
  display: none;
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
}

.property-type-item--active {
  background: #e0f2fe;
  color: #0052a5;
  font-weight: 600;
}

.property-type-item:hover {
  background: #e0f2fe;
  color: #0052a5;
}

@media (max-width: 768px) {
  .property-types-section {
    padding: 16px 0;
    margin-top: 40px;
  }
  .property-types-section .container {
    padding: 0 1rem;
  }
  .property-types-row {
    gap: 8px;
  }
  .property-type-item {
    padding: 6px 12px;
    font-size: 13px;
  }
}

/* Featured Properties Section */
.featured--figma {
  background: linear-gradient(135deg, #f7f8fa 60%, #e3f0ff 100%);
  padding: 48px 16px 64px;
  width: 100%;
}

.featured .boxed-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.featured__title--figma {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 auto 48px auto;
  text-align: center;
  max-width: 800px;
  font-family: 'Poppins', sans-serif;
}

.property-grid--figma {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;
  margin: 0 auto;
}

.property-card--figma {
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.property-card--figma:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.property-card__image-carousel {
  position: relative;
    width: 100%;
  padding-top: 66.67%;
  overflow: hidden;
}

.property-card__img--figma {
  position: absolute;
  top: 0;
  left: 0;
    width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.property-card--figma:hover .property-card__img--figma {
  transform: scale(1.08);
}

.property-card__content--figma {
  padding: 24px;
  position: relative;
}

.property-card__price--figma {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 8px;
}

.property-card__title--figma {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 16px;
  line-height: 1.4;
}

.property-card__details {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.property-card__detail {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.875rem;
}

.property-card__address--figma {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.875rem;
  margin-top: 12px;
}

.property-card__address-icon {
  width: 16px;
  height: 16px;
  color: #64748b;
}

.property-card__favorite {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.property-card__favorite:hover {
  transform: scale(1.1);
  background: white;
}

@media (max-width: 1200px) {
  .property-grid--figma {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .property-grid--figma {
    grid-template-columns: repeat(2, 1fr);
  }
  .featured__title--figma {
    font-size: 2rem;
    margin-bottom: 24px;
    text-align: center;
  }
}

@media (max-width: 600px) {
  .property-grid--figma {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 8px;
    margin: 0;
  }

  .featured--figma {
    background: #fff;
    padding: 0;
    margin: 0;
  }

  .featured .boxed-container {
    padding: 0;
    max-width: 100%;
  }

  .featured__title--figma {
    font-size: 20px;
    font-weight: 600;
    color: #000;
    margin: 16px auto;
    text-align: center;
    padding: 0 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.property-card--figma {
    width: calc(100% - 16px);
  background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.08);
  overflow: hidden;
    margin: 0 8px;
    border: none;
}

.property-card__img--figma {
  width: 100%;
    height: 180px;
  object-fit: cover;
    display: block;
    border-radius: 8px 8px 0 0;
}

.property-card__content--figma {
    padding: 10px 12px;
}

.property-card__title--figma {
    font-size: 15px;
    font-weight: 500;
    color: #000;
    margin: 0 0 2px 0;
    line-height: 1.3;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.property-card__price--figma {
    font-size: 15px;
    font-weight: 500;
    color: #0066FF;
    margin: 0 0 6px 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.property-card__address--figma {
  display: flex;
  align-items: center;
    gap: 4px;
  color: #666;
    font-size: 13px;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.property-card__address-icon {
    width: 12px;
    height: 12px;
    color: #666;
    margin-top: -1px;
  }
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
  .featured__title--figma {
    font-size: 2rem;
    margin-bottom: 24px;
    text-align: center;
  }
}

@media (max-width: 600px) {
  .property-grid--figma {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 8px;
    margin: 0;
  }

  .featured--figma {
    background: #fff;
    padding: 0;
    margin: 0;
  }

  .featured .boxed-container {
    padding: 0;
    max-width: 100%;
  }

  .featured__title--figma {
    font-size: 20px;
    font-weight: 600;
    color: #000;
    margin: 16px auto;
    text-align: center;
    padding: 0 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .property-card--figma {
    width: calc(100% - 16px);
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.08);
    overflow: hidden;
    margin: 0 8px;
    border: none;
  }

  .property-card__img--figma {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
    border-radius: 8px 8px 0 0;
  }

  .property-card__content--figma {
    padding: 10px 12px;
  }

  .property-card__title--figma {
    font-size: 15px;
    font-weight: 500;
    color: #000;
    margin: 0 0 2px 0;
    line-height: 1.3;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .property-card__price--figma {
    font-size: 15px;
    font-weight: 500;
    color: #0066FF;
    margin: 0 0 6px 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .property-card__address--figma {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #666;
    font-size: 13px;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .property-card__address-icon {
    width: 12px;
    height: 12px;
    color: #666;
    margin-top: -1px;
  }

  .featured__view-more {
    display: none;
  }
}

/* Property Grid Mobile Styles */
@media (max-width: 600px) {
  .property-grid--figma {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 16px;
  }

  .property-card--figma {
    width: 100%;
    max-width: 100%;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    overflow: hidden;
    margin: 0;
    border: 1px solid #f0f0f0;
  }

  .property-card__img--figma {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
  }

  .property-card__content--figma {
    padding: 16px;
  }

  .property-card__title--figma {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px 0;
    line-height: 1.4;
  }

  .property-card__price--figma {
    font-size: 1.25rem;
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
    margin-top: 8px;
  }

  .property-card__address-icon {
    width: 16px;
    height: 16px;
    color: #666;
    opacity: 0.8;
  }

  .featured--figma {
    padding: 24px 0 32px 0;
  }

  .featured__title--figma {
    font-size: 1.5rem;
    padding: 0 16px;
    margin-bottom: 24px;
  }

  .featured__view-more {
    margin: 24px 16px 0 16px;
    font-size: 1rem;
  }
}

/* Services Section */
.services {
  padding: var(--spacing-section) 0;
  background: var(--color-light-blue);
}

.services__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: center;
}

.services__image {
  border-radius: var(--radius-md);
  overflow: hidden;
}

.services__img {
  width: 100%;
  height: auto;
  display: block;
}

.services__content {
  padding: var(--spacing-xl);
}

.services__title {
  font-size: var(--font-size-h2);
  margin-bottom: var(--spacing-xl);
  color: var(--color-text);
}

.services__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.services__item {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--spacing-xl);
}

.services__icon {
  font-size: var(--font-size-xxl);
  margin-right: var(--spacing-lg);
}

.services__text {
  margin: 0;
  font-size: var(--font-size-lg);
}

/* Neighborhoods Section (Pixel Perfect, Figma Accurate) */
.neighborhoods--figma {
  background: #f7f8fa;
  padding: 80px 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.neighborhoods__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.neighborhoods__title--figma {
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  font-size: 2.6rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px;
  color: #333;
  letter-spacing: -0.5px;
}
.neighborhoods__grid--figma {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  justify-items: center;
}
.neighborhood-card--figma {
  position: relative;
  width: 100%;
  max-width: 370px;
  aspect-ratio: 4 / 3;
  height: 200px;
  border-radius: 18px;
  overflow: hidden;
  background: #eaeaea;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.neighborhood-card__img--figma {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
  display: block;
}
.neighborhood-card__label--figma {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(227, 242, 253, 0.92);
  color: #222;
  border-radius: 18px 0 16px 0;
  padding: 7px 18px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.3;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  min-height: 28px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}
@media (max-width: 1100px) {
  .neighborhoods__grid--figma {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
  .neighborhood-card--figma {
    max-width: 100vw;
    height: 140px;
  }
}
@media (max-width: 900px) {
  .neighborhoods__grid--figma {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .neighborhood-card--figma {
    max-width: 100vw;
    height: 110px;
  }
}

/* Benefits Section */
.benefits--figma {
  background: #fff;
  padding: 80px 0 60px 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
.benefits__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 60px;
  padding: 0 24px;
}
.benefits__left {
  flex: 1.2;
  min-width: 320px;
}
.benefits__title--figma {
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  font-size: 2.4rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 0 0;
  line-height: 1.18;
  letter-spacing: -0.5px;
  text-align: left;
}
.benefits__highlight--figma {
  color: #0052a5;
  font-weight: 700;
  font-size: inherit;
}
.benefits__right {
  flex: 2;
  display: flex;
  flex-direction: row;
  gap: 36px;
  justify-content: flex-start;
}
.benefit-card--figma {
  background: #e0f2fe; /* Light blue tint */
  border-radius: 8px;
  width: 220px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  box-sizing: border-box;
}
.benefit-card__icon--figma {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.benefit-card__icon--figma svg {
  width: 56px;
  height: 56px;
}
.benefit-card__text--figma {
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  font-size: 1.08rem;
  color: #333;
  font-weight: 400;
  text-align: center;
  line-height: 1.4;
}
@media (max-width: 1100px) {
  .benefits__container {
    flex-direction: column;
    gap: 40px;
    align-items: stretch;
  }
  .benefits__right {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
  .benefit-card--figma {
    width: 100%;
    max-width: 340px;
    height: 180px;
  }
}
@media (max-width: 600px) {
  .benefits--figma {
    padding: 36px 0 24px 0;
  }
  .benefits__container {
    padding: 0 4px;
    gap: 18px;
  }
  .benefits__title--figma {
    font-size: 1.3rem;
  }
  .benefit-card--figma {
    height: 120px;
    min-width: 0;
    width: 100%;
    max-width: 100vw;
    padding: 0 6px;
  }
  .benefit-card__icon--figma {
    margin-bottom: 12px;
  }
  .benefit-card__text--figma {
    font-size: 0.98rem;
  }
}

/* FAQ Section */
.faq-section--saas {
  background: linear-gradient(135deg, #fafbfc 80%, #e3f0ff 100%);
  padding: 100px 0 90px 0;
  border-radius: 0 0 32px 32px;
  box-shadow: 0 8px 48px rgba(0,82,165,0.07);
  position: relative;
  z-index: 2;
}
.faq__container--saas {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 60px;
  padding: 0 32px;
}
.faq__left--saas {
  flex: 1.2;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
}
.faq__title--saas {
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  font-size: 2.1rem;
  font-weight: 800;
  color: #111;
  margin: 0 0 18px 0;
  line-height: 1.12;
  letter-spacing: -0.5px;
  text-align: left;
  padding-bottom: 8px;
}
.faq__subtitle--saas {
  color: #7a7a7a;
  font-size: 1.08rem;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  font-weight: 400;
  margin: 0 0 12px 0;
  line-height: 1.7;
  letter-spacing: 0.01em;
}
.faq__right--saas {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 0;
}
.faq__item--saas {
  background: #fff;
  border: 1.5px solid #e0f2fe;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,82,165,0.08);
  transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s, background 0.18s;
  margin-bottom: 0;
  position: relative;
  overflow: hidden;
  min-height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.faq__item--saas:hover, .faq__item--saas:focus-within {
  border-color: #0052a5;
  box-shadow: 0 12px 48px rgba(0,82,165,0.13);
  transform: translateY(-2px) scale(1.012);
  background: linear-gradient(90deg, #f7f8fa 80%, #e0f2fe 100%);
}
.faq__question--saas {
  font-size: 1.08rem;
  font-weight: 700;
  color: #111;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  padding: 22px 32px;
  border-radius: 18px;
  background: none;
  border: none;
  outline: none;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.18s;
}
.faq__question-text--saas {
  flex: 1;
  margin-right: 16px;
  color: #111;
  font-size: 1.08rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.faq__icon--saas {
  margin-left: 18px;
  display: flex;
  align-items: center;
}
.faq__answer--saas {
  font-size: 0.98rem;
  color: #444;
  font-family: 'Inter', 'Poppins', Arial, sans-serif;
  padding: 0 32px 24px 32px;
  border-radius: 0 0 18px 18px;
  background: #f7f8fa;
  min-height: 48px;
  opacity: 1;
  transition: max-height 0.45s cubic-bezier(.4,2,.3,1), opacity 0.32s, padding 0.32s;
  overflow: hidden;
  box-sizing: border-box;
}
.faq__item--saas:not(.faq__item--active) .faq__answer--saas {
  max-height: 0;
  opacity: 0;
  padding-bottom: 0;
}
.faq-expand-enter-active, .faq-expand-leave-active {
  transition: max-height 0.45s cubic-bezier(.4,2,.3,1), opacity 0.32s, padding 0.32s;
}
.faq-expand-enter-from, .faq-expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-bottom: 0;
}
.faq-expand-enter-to, .faq-expand-leave-from {
  max-height: 400px;
  opacity: 1;
  padding-bottom: 24px;
}
@media (max-width: 900px) {
  .faq-section--saas {
    padding: 60px 0 60px 0;
  }
  .faq__container--saas {
    flex-direction: column;
    gap: 24px;
    padding: 0 8px;
  }
  .faq__right--saas {
    gap: 12px;
  }
  .faq__title--saas {
    font-size: 1.3rem;
  }
  .faq__subtitle--saas {
    font-size: 0.98rem;
  }
  .faq__question--saas {
    font-size: 0.98rem;
    padding: 16px 12px;
  }
  .faq__answer--saas {
    font-size: 0.92rem;
    padding: 0 12px 12px 12px;
  }
  .faq__item--saas {
    border-radius: 12px;
  }
}

/* Footer */
.footer--figma {
  background: #0052a5;
  color: #fff;
  padding: 70px 0 50px 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
}
.footer__container--figma {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2.2fr 1fr 1fr 1.2fr;
  gap: 48px;
  align-items: flex-start;
  padding: 0 48px;
}
.footer__col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 18px;
}
.footer__col--brand {
  gap: 18px;
}
.footer__logo--figma {
  font-size: 2.1rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 2px;
}
.footer__tagline--figma {
  font-size: 0.92rem;
  font-weight: 400;
  opacity: 0.85;
  margin-bottom: 18px;
}
.footer__desc--figma {
  font-size: 1.08rem;
  font-weight: 400;
  opacity: 0.95;
  margin-bottom: 0;
}
.footer__heading--figma {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: 0.01em;
}
.footer__list--figma {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.footer__list--figma a {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.95;
  transition: opacity 0.2s;
}
.footer__list--figma a:hover {
  opacity: 1;
  text-decoration: underline;
}
.footer__col--social {
  align-items: flex-start;
  gap: 18px;
}
.footer__socials--figma {
  display: flex;
  flex-direction: row;
  gap: 22px;
  margin-top: 8px;
  justify-content: flex-start;
}
.footer__social-icon--figma {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.footer__icon-bg--figma {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: none;
  transition: background 0.2s;
}
.footer__social-icon--figma:hover .footer__icon-bg--figma {
  background: rgba(255,255,255,0.13);
}
@media (max-width: 1100px) {
  .footer__container--figma {
    grid-template-columns: 1fr 1fr;
    gap: 36px;
    align-items: flex-start;
    padding: 0 18px;
  }
  .footer__col {
    width: 100%;
    min-width: 0;
    max-width: 100vw;
  }
  .footer__col--brand {
    grid-column: 1 / span 2;
  }
}
@media (max-width: 700px) {
  .footer__container--figma {
    display: block;
    grid-template-columns: none;
    gap: 18px;
    padding: 0 4px;
  }
  .footer__logo--figma {
    font-size: 1.3rem;
  }
  .footer__desc--figma {
    font-size: 0.98rem;
  }
  .footer__heading--figma {
    font-size: 1rem;
  }
  .footer__socials--figma {
    gap: 12px;
  }
  .footer__icon-bg--figma {
    width: 36px;
    height: 36px;
  }
  .footer__list--figma {
    gap: 16px;
    margin-bottom: 24px;
  }
  .footer__list--figma li {
    margin-bottom: 8px;
  }
  .footer__list--figma a {
    display: block;
    padding: 4px 0;
  }
}

.faq__question-text {
  flex: 1;
  margin-right: 16px;
}

/* Fixed Navigation */
.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  z-index: 9999;
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
  opacity: 0;
  visibility: hidden;
}

.fixed-nav--visible {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.fixed-nav__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  width: 100%;
}

.fixed-nav__logo {
  display: flex;
  align-items: center;
}

.fixed-nav__logo-img {
  height: 50px;
  width: auto;
}

.fixed-nav__center {
  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: center;
}

.fixed-nav__link {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s;
}

.fixed-nav__link:hover {
  color: #0066cc;
}

.fixed-nav__right {
  display: flex;
  gap: 16px;
}

.fixed-nav__button {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #333;
}

.fixed-nav__button--primary {
  background: #0066cc;
  border: none;
  color: #fff;
}

.fixed-nav__button:hover {
  background: #f8fafc;
}

.fixed-nav__button--primary:hover {
  background: #0052a5;
}

@media (max-width: 900px) {
  .fixed-nav__content {
    padding: 12px 0;
    justify-content: space-between;
  }

  .fixed-nav__logo-img {
    height: 40px;
  }

  .fixed-nav .desktop-nav {
    display: none !important;
  }

  .fixed-nav .main-nav__hamburger {
    display: flex !important;
    margin-left: auto;
  }

  .fixed-nav .main-nav__hamburger span {
    background: #333;
  }
}

.boxed-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 80%;
}

/* Mobile Navigation Styles */
.mobile-only {
  display: none;
}

@media (max-width: 900px) {
  .desktop-nav {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }

  .fixed-nav__content {
    padding: 12px 0;
  }

  .fixed-nav__logo-img {
    height: 40px;
  }

  .main-nav__hamburger.mobile-only {
    margin-left: auto;
  }

  .main-nav__hamburger.mobile-only span {
    background: #333; /* Dark color for fixed nav hamburger */
  }
}

/* Agent Carousel Styles */
.agent-carousel-section {
  background: #232229;
  padding: 64px 0 40px 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  box-shadow: 0 8px 32px rgba(0,82,165,0.07);
}

.agent-carousel__title {
  font-size: 2.4rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.5px;
}

.agent-carousel__subtitle {
  font-size: 1.18rem;
  color: #fff;
  text-align: center;
  margin-bottom: 36px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.agent-carousel__wrapper {
  overflow: hidden;
  width: 100%;
  margin: 0 auto 18px auto;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0,82,165,0.08);
  padding: 32px 0 24px 0;
}

.agent-carousel__track {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  padding: 0 24px;
}

.agent-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,82,165,0.10);
  padding: 24px 18px 18px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: transform 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.25s;
  border: 1.5px solid #e0f2fe;
  position: relative;
}

.agent-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 32px rgba(0,82,165,0.13);
  border-color: #4f8edc;
  z-index: 2;
}

.agent-card__img-box {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 18px;
  border: 4px solid #e0f2fe;
  background: #e0f2fe;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,82,165,0.07);
}

.agent-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(.4,2,.3,1);
}

.agent-card__name {
  margin-top: 10px;
  font-size: 1.18rem;
  font-weight: 700;
  color: #1a4189;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.01em;
}

@media (max-width: 768px) {
  .agent-carousel-section {
    padding: 40px 0;
  }

  .agent-carousel__title {
    font-size: 1.8rem;
    margin-bottom: 8px;
  }

  .agent-carousel__subtitle {
    font-size: 1rem;
    margin-bottom: 24px;
  }

  .agent-carousel__wrapper {
    padding: 24px 0;
  }

  .agent-carousel__track {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 16px;
  }

  .agent-card {
    max-width: 100%;
    padding: 20px 16px;
  }
}

@media (max-width: 480px) {
  .agent-carousel-section {
    padding: 32px 0;
  }

  .agent-carousel__title {
    font-size: 1.5rem;
  }

  .agent-carousel__subtitle {
    font-size: 0.9rem;
  }

  .agent-carousel__wrapper {
    padding: 16px 0;
  }

  .agent-card {
    padding: 16px;
  }

  .agent-card__img-box {
    width: 80px;
    height: 80px;
  }

  .agent-card__name {
    font-size: 1rem;
  }
}

/* Blog Section (Below FAQ) */
.blog-section--worldclass {
  background: linear-gradient(135deg, #f7f8fa 60%, #e3f0ff 100%);
  padding: 80px 0 80px 0;
}
.blog-section__title--worldclass {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 36px;
  text-align: left;
  font-family: 'Poppins', sans-serif;
}
.blog-section__tiles--worldclass {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 56px;
  margin-top: 36px;
}
@media (max-width: 1100px) {
  .blog-section__tiles--worldclass {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}
@media (max-width: 700px) {
  .blog-section__tiles--worldclass {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
.blog-tile--worldclass {
  background: linear-gradient(120deg, rgba(240,247,255,0.55) 80%, rgba(224,242,254,0.35) 100%);
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0,82,165,0.07);
  border: 1.5px solid #e0f2fe;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 320px;
  height: 320px;
  max-width: 320px;
  width: 100%;
  padding: 28px 22px 18px 22px;
  position: relative;
  transition: box-shadow 0.25s, transform 0.25s;
  overflow: hidden;
}
.blog-tile--worldclass:hover {
  box-shadow: 0 12px 48px rgba(0,82,165,0.18), 0 2px 8px rgba(0,82,165,0.10);
  transform: translateY(-8px) scale(1.03);
}
.blog-tile__accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 6px;
  border-radius: 0 0 12px 12px;
  background: linear-gradient(90deg, #0066cc 0%, #4f8edc 100%);
  z-index: 2;
}
.blog-tile__title-worldclass {
  font-size: 1.32rem;
  font-weight: 800;
  color: #0052a5;
  margin-bottom: 18px;
  font-family: 'Poppins', sans-serif;
  line-height: 1.25;
  letter-spacing: -0.5px;
}
.blog-tile__desc-worldclass {
  font-size: 1.08rem;
  color: #444;
  margin-bottom: auto;
  font-family: 'Inter', sans-serif;
  line-height: 1.7;
  max-height: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.blog-tile__meta-worldclass {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 28px 0 18px 0;
  font-size: 1rem;
  color: #64748b;
  font-family: 'Inter', sans-serif;
}
.blog-tile__meta-icon-worldclass {
  display: flex;
  align-items: center;
  margin-right: 4px;
}
.blog-tile__meta-author-worldclass {
  font-weight: 600;
  color: #0052a5;
}
.blog-tile__meta-dot-worldclass {
  margin: 0 4px;
  color: #bdbdbd;
}
.blog-tile__meta-date-worldclass {
  color: #64748b;
}
.blog-tile__readmore-worldclass {
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  font-size: 1rem;
  margin-top: 18px;
  border-radius: 999px;
  padding: 12px 32px;
  background: linear-gradient(90deg, #0066cc 0%, #4f8edc 100%);
  align-self: flex-start;
  box-shadow: 0 2px 8px rgba(0,82,165,0.08);
  transition: background 0.2s, box-shadow 0.2s, color 0.2s;
  border: none;
  outline: none;
  display: inline-block;
}
.blog-tile__readmore-worldclass:hover {
  background: linear-gradient(90deg, #0052a5 0%, #0066cc 100%);
  color: #fff;
  box-shadow: 0 4px 16px rgba(0,82,165,0.13);
}

.reveal {
  opacity: 0;
  transform: translateY(80px) scale(0.96);
  filter: blur(6px);
}
.revealed {
  opacity: 1;
  transform: none;
  filter: none;
  transition: all 0.55s cubic-bezier(.4,2,.3,1);
}

.featured__view-more {
  display: inline-flex;
  align-items: center;
  margin-top: 24px;
  font-weight: 700;
  color: #0052a5;
  font-size: 1.1rem;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
}
.featured__view-more:hover {
  color: #003d7a;
  text-decoration: underline;
}

.help-section {
  padding: 80px 0;
  background: #fff;
}

.help-section__container {
  display: flex;
  gap: 64px;
  justify-content: space-between;
}

.help-section__images {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 600px;
}

.help-section__image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
}

.help-section__content {
  flex: 1;
  padding: 40px;
  max-width: 500px;
}

.help-section__title {
  font-size: 35px;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 40px;
  font-family: 'Poppins', sans-serif;
  line-height: 1.2;
}

.help-section__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.help-section__item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  font-size: 15px;
  color: #334155;
  line-height: 1.5;
}

.help-section__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0066cc;
  font-size: 20px;
}

@media (max-width: 1024px) {
  .help-section__container {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  .help-section__images {
    width: 100%;
  }

  .help-section__content {
    width: 100%;
    max-width: none;
    padding: 0;
  }
}

@media (max-width: 640px) {
  .help-section {
    padding: 40px 0;
  }

  .help-section__images {
    grid-template-columns: 1fr;
  }

  .help-section__image {
    height: 240px;
  }

  .help-section__title {
    font-size: 32px;
    margin-bottom: 32px;
  }

  .help-section__item {
    font-size: 14px;
    gap: 12px;
  }
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 18px;
  color: #64748b;
}

.search-dropdown-icon {
  margin-left: 8px;
  color: #bdbdbd;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.input-icon-wrapper {
  position: relative;
  flex: 1;
}

.search-icon-inside {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 18px;
  pointer-events: none;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.with-icon {
  padding-left: 48px;
  width: 100%;
  min-width: 280px;
  height: 48px;
  display: flex;
  align-items: center;
}

/* Responsive Navigation */
.desktop-nav {
  display: flex;
}
.main-nav__hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1200;
}
.main-nav__hamburger span {
  display: block;
  width: 28px;
  height: 3px;
  background: #fff;
  margin: 4px 0;
  border-radius: 2px;
  transition: all 0.3s;
}
@media (max-width: 900px) {
  .desktop-nav {
    display: none !important;
  }
  .main-nav__hamburger {
    display: flex;
  }
}

/* Mobile Nav Modal */
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999999;
  display: flex;
}

.mobile-nav-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999999;
  display: flex;
}

.mobile-nav-modal__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999999999;
}

.mobile-nav-modal__content {
  position: relative;
  background: #fff;
  width: 80%;
  max-width: 320px;
  height: 100%;
  margin-left: auto;
  padding: 64px 24px 24px;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;
  z-index: 999999999;
}

.mobile-nav-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  font-size: 32px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999999;
}

.mobile-nav-modal__link {
  display: block;
  padding: 16px 0;
  color: #333;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid #eee;
}

.mobile-nav-modal__buttons {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-nav-modal__button {
  display: block;
  padding: 12px 24px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  color: #333;
}

.mobile-nav-modal__button--primary {
  background: #0066cc;
  border: none;
  color: #fff;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
  z-index: 999999999;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Responsive Hero Section */
@media (max-width: 900px) {
  .hero {
    height: auto;
    min-height: 420px;
    padding-bottom: 32px;
  }
  .hero__content {
    margin-top: 80px;
    margin-bottom: 32px;
    text-align: center;
  }
  .hero__title {
    font-size: 2.1rem;
    text-align: center;
    margin-bottom: 18px;
  }
  .hero__search-wrapper {
    width: 95%;
    min-width: 0;
    margin: 0 auto;
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
  .hero__search-form {
    flex-direction: column;
    gap: 12px;
    padding: 16px 8px;
  }
  .search-input-group {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  .input-icon-wrapper {
    min-width: 0;
    width: 100%;
  }
  .with-icon {
    min-width: 0;
    width: 100%;
    font-size: 1rem;
  }
  .search-btn {
    width: 100%;
    min-width: 0;
    height: 44px;
    font-size: 1.1rem;
    margin-left: 0;
    align-self: stretch;
  }
  .hero__search-tabs {
    position: static;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-bottom: 0;
    top: 0;
    left: 0;
    padding: 0;
    gap: 1px;
  }
  .hero__tab-btn {
    padding: 12px 18px;
    font-size: 1rem;
    border-radius: 8px 8px 0 0;
  }
}
@media (max-width: 600px) {
  .hero {
    height: auto;
    min-height: 220px;
    padding-bottom: 0;
    margin-bottom: 0;
    padding-top: 18px;
    padding-bottom: 28px;
  }
  .hero__content {
    margin-top: 8px;
    margin-bottom: 18px;
    text-align: left;
    padding-left: 16px;
  }
  .hero__title {
    font-size: 1.22rem;
    margin-bottom: 12px;
    line-height: 1.22;
    text-align: left;
    letter-spacing: -0.5px;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0,0,0,0.18);
    font-weight: 700;
    padding-left: 0;
  }
  .hero__search-wrapper {
    width: 100%;
    border-radius: 0;
    min-width: 0;
    margin: 0;
    box-shadow: none;
    padding: 0;
    background: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .hero__pill-row-mobile {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding-left: 8px;
  }
  .pill-btn-group {
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-bottom: 0;
    margin-left: 0;
  }
  .pill-btn {
    background: #fff;
    color: #232229;
    font-size: 0.98rem;
    font-weight: 500;
    border: none;
    border-radius: 999px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    padding: 8px 24px;
    min-width: 74px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;
    position: relative;
    outline: none;
    margin-bottom: 0;
  }
  .pill-btn--active {
    background: #e0f2fe;
    color: #0052a5;
    font-weight: 700;
  }
  .pill-btn__arrow {
    margin-left: 8px;
    font-size: 0.9em;
    color: #64748b;
    pointer-events: none;
    display: inline-block;
    vertical-align: middle;
  }
  .search-input-group--mobile {
    width: 100%;
    margin-top: 0;
    background: #fff;
    border-radius: 999px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    padding: 2px 0 2px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .input-icon-wrapper {
    min-width: 0;
    width: 100%;
  }
  .with-icon {
    min-width: 0;
    width: 100%;
    font-size: 1rem;
    padding-left: 36px;
    height: 38px;
    border-radius: 999px;
    border: none;
    background: transparent;
  }
  .search-icon-inside {
    left: 12px;
    font-size: 1rem;
    color: #64748b;
  }
}

/* Mobile Search Section */
@media (max-width: 600px) {
  .mobile-search-section {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    margin: 0;
    padding: 0;
    margin-top: 32px;
    margin-bottom: 12px;
  }
  .mobile-search-bar-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -18px;
    margin-bottom: 0;
  }
  .mobile-search-bar {
    width: 92vw;
    max-width: 480px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    border: 1.5px solid #ececec;
    padding: 0;
    display: flex;
    align-items: center;
    margin: 0 auto;
    min-height: 48px;
  }
  .mobile-search-input {
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.01rem;
    color: #232229;
    width: 100%;
    padding-left: 38px;
    border-radius: 8px;
    height: 48px;
  }
  .mobile-search-bar .search-icon-inside {
    left: 16px;
    color: #bdbdbd;
    font-size: 1.1rem;
    opacity: 0.85;
  }
  .mobile-search-input::placeholder {
    color: #bdbdbd;
    opacity: 1;
    font-weight: 400;
    font-size: 1.01rem;
  }
}

.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999999;
  display: flex;
}

.help-section__container {
  background: #fff;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-left: 30px;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
}

.help-section__images {
  display: flex;
  gap: 24px;
}

.help-section__image {
  width: 280px;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
  margin: 0;
}

.help-section__gradient-box {
  color: #0052a5;
  border-radius: 24px;
  padding: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.help-section__title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  color: #0052a5;
}

@media (max-width: 1024px) {
  .help-section__container {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 40px 24px;
  }

  .help-section__images {
    justify-content: center;
  }

  .help-section__image {
    width: 180px;
    height: 260px;
  }

  .help-section__gradient-box {
    padding: 40px 30px;
  }
}

@media (max-width: 768px) {
  .help-section__container {
    padding: 32px 16px;
  }

  .help-section__images {
    gap: 8px;
  }

  .help-section__image {
    width: 150px;
    height: 220px;
  }

  .help-section__gradient-box {
    padding: 32px 24px;
  }

  .help-section__title {
    font-size: 1.4rem;
    margin-bottom: 24px;
  }

  .help-section__item {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .help-section__container {
    padding: 24px 16px;
  }

  .help-section__images {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .help-section__image {
    width: 100%;
    max-width: 280px;
    height: 200px;
  }

  .help-section__gradient-box {
    padding: 24px 20px;
  }

  .help-section__title {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .help-section__item {
    font-size: 0.9rem;
    gap: 12px;
  }
}

.agent-carousel__track {
  display: flex;
  gap: 32px;
  padding: 0 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

@media (max-width: 768px) {
  .agent-carousel__track {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }

  .agent-carousel__title {
    font-size: 1.8rem;
    margin-bottom: 8px;
  }

  .agent-carousel__subtitle {
    font-size: 1rem;
    margin-bottom: 24px;
  }

  .agent-card {
    width: 100%;
    max-width: 280px;
    margin: 0;
  }
}

@media (max-width: 480px) {
  .agent-carousel-section {
    padding: 40px 0 32px 0;
  }

  .agent-carousel__title {
    font-size: 1.5rem;
  }

  .agent-carousel__subtitle {
    font-size: 0.9rem;
  }

  .agent-card {
    max-width: 100%;
    margin: 0 16px;
  }
}

.help-section {
  padding: 80px 0;
}

.help-section__container {
  display: flex;
  gap: 64px;
  justify-content: space-between;
}

.help-section__images {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 600px;
}

.help-section__image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
}

.help-section__gradient-box {
  flex: 1;
  padding: 40px;
  background: transparent;
  max-width: 500px;
}

.help-section__title {
  font-size: 35px;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 40px;
  font-family: 'Poppins', sans-serif;
  line-height: 1.2;
}

.help-section__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.help-section__item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  font-size: 15px;
  color: #334155;
  line-height: 1.5;
}

.help-section__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0066cc;
  font-size: 20px;
}

@media (max-width: 1024px) {
  .help-section__container {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  .help-section__images {
    width: 100%;
  }

  .help-section__gradient-box {
    width: 100%;
    max-width: none;
    padding: 0;
  }
}

@media (max-width: 640px) {
  .help-section {
    padding: 40px 0;
  }

  .help-section__images {
    grid-template-columns: 1fr;
  }

  .help-section__image {
    height: 240px;
  }

  .help-section__title {
    font-size: 32px;
    margin-bottom: 32px;
  }

  .help-section__item {
    font-size: 16px;
    gap: 12px;
  }
}

/* Footer Disclaimer and Copyright */
.footer__disclaimer-wrapper {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer__disclaimer {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.footer__disclaimer-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 24px;
}

.footer__copyright {
  text-align: center;
}

.footer__copyright-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
  .footer__disclaimer-wrapper {
    margin-top: 32px;
    padding: 24px 16px 0;
  }

  .footer__disclaimer-text {
    font-size: 0.8rem;
    margin-bottom: 16px;
  }

  .footer__copyright-text {
    font-size: 0.8rem;
  }
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
  color: #666;
}

.error-state {
  color: #dc2626;
}

.property-card__image-carousel {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.property-card__images {
  display: flex;
  transition: transform 0.3s ease;
  height: 100%;
}

.property-card__img--figma {
  width: 100%;
  min-width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
}

.property-card__image-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.image-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.image-dot--active {
  background: #fff;
}

.image-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  color: #333;
  z-index: 2;
  transition: all 0.2s;
  opacity: 0;
}

.property-card__image-carousel:hover .image-nav {
  opacity: 1;
}

.image-nav:hover {
  background: rgba(255, 255, 255, 0.95);
}

.image-nav--prev {
  left: 12px;
}

.image-nav--next {
  right: 12px;
}

@media (max-width: 768px) {
  .image-nav {
    opacity: 1;
    width: 28px;
    height: 28px;
    font-size: 20px;
  }
}

/* TREB Properties Section - Updated Styles */
.treb-properties {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.treb-properties__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 3rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.02em;
}

.treb-properties__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;
  margin: 0 auto;
}

.treb-property-card {
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.treb-property-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.treb-property-card__image {
  position: relative;
  width: 100%;
  padding-top: 66.67%;
  overflow: hidden;
}

.treb-property-card__img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.treb-property-card:hover .treb-property-card__img {
  transform: scale(1.08);
}

.treb-property-card__badges {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.property-badge {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(4px);
}

.property-badge--active {
  background: rgba(34, 197, 94, 0.9);
}

.property-badge--sold {
  background: rgba(239, 68, 68, 0.9);
}

.property-badge--pending {
  background: rgba(245, 158, 11, 0.9);
}

.property-badge--type {
  background: rgba(0, 102, 204, 0.9);
}

.treb-property-card__content {
  padding: 24px;
  position: relative;
}

.treb-property-card__price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 8px;
}

.treb-property-card__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 16px;
  line-height: 1.4;
}

.treb-property-card__details {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.treb-property-card__detail {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.875rem;
}

.treb-property-card__location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.875rem;
  margin-top: 12px;
}

.treb-property-card__favorite {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.treb-property-card__favorite:hover {
  transform: scale(1.1);
  background: white;
}

/* Loading, Error, and Empty States */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #e2e8f0;
  border-top-color: #0066cc;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

.loading-text,
.error-message,
.empty-message {
  font-size: 1rem;
  color: #64748b;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.retry-button:hover {
  background: #0052a5;
}

@media (max-width: 768px) {
  .treb-properties {
    padding: 3rem 1rem;
  }

  .treb-properties__title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .treb-properties__grid {
    gap: 1.5rem;
  }
}

@media (max-width: 640px) {
  .treb-properties__title {
    font-size: 1.75rem;
  }

  .treb-property-card {
    border-radius: 12px;
  }

  .treb-property-card__content {
    padding: 1.25rem;
  }

  .treb-property-card__price {
    font-size: 1.25rem;
  }
}
</style>
