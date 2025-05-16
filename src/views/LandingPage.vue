<template>
  <div class="landing-page">
    <!-- Header with Role Switcher -->
    <header class="header">
      <div class="container header__container header__container--figma">
        <!-- Logo Left -->
        <div class="header__logo">
          <h2>Real City</h2>
          <span class="header__tagline">realty inc brokerage</span>
        </div>
        <!-- Nav Center -->
        <nav class="header__nav header__nav--center">
          <a href="#" class="header__nav-link">Buy</a>
          <a href="#" class="header__nav-link">Rent</a>
          <a href="#" class="header__nav-link">Sell</a>
          <div class="header__nav-dropdown">
            <a href="#" class="header__nav-link">Agent <span class="dropdown-arrow">▼</span></a>
          </div>
        </nav>
        <!-- Role Switcher (for frontend testing) -->
        <div class="role-switcher">
          <div class="profile-section" @click="toggleRoleMenu">
            <img class="profile-image"
              src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png"
              alt="Profile" />
            <span class="profile-name">{{ currentRole === 'all' ? 'All' : currentRole === 'admin' ? 'Admin' : currentRole === 'agent' ? 'Agent' : 'Client' }}</span>
            <svg class="dropdown-icon" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
            <!-- Role switcher dropdown -->
            <div v-if="showRoleMenu" class="role-switcher-menu">
              <div class="role-switcher-header">Switch Role</div>
              <div class="role-option" :class="{ 'active': currentRole === 'all' }" @click="changeRole('all')">
                <span class="role-icon all-icon">All</span>
                <span class="role-name">All</span>
              </div>
              <div class="role-option" :class="{ 'active': currentRole === 'admin' }" @click="changeRole('admin')">
                <span class="role-icon admin-icon">A</span>
                <span class="role-name">Admin</span>
              </div>
              <div class="role-option" :class="{ 'active': currentRole === 'agent' }" @click="changeRole('agent')">
                <span class="role-icon agent-icon">Ag</span>
                <span class="role-name">Agent</span>
              </div>
              <div class="role-option" :class="{ 'active': currentRole === 'client' }" @click="changeRole('client')">
                <span class="role-icon client-icon">C</span>
                <span class="role-name">Client</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Auth Buttons Right -->
        <div class="header__auth header__auth--figma">
          <a href="#" class="header__sign-up header__sign-up--figma">Sign in</a>
          <a href="#" class="header__login header__login--figma">Login</a>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__overlay"></div>
      <div class="container hero__container--figma">
        <div class="hero__content">
          <h1 class="hero__title">Discover Homes You'll Love</h1>
        </div>
        <div class="hero__search-wrapper">
          <div class="hero__search-tabs">
            <button class="hero__tab-btn hero__tab-btn--active">Sell</button>
            <button class="hero__tab-btn">Rent</button>
            <button class="hero__tab-btn">Buy</button>
          </div>
          <div class="hero__search-form">
            <div class="search-input-group">
              <div class="search-input-wrapper">
                <span class="search-icon">
                  <i class="fas fa-home"></i>
                </span>
                <input type="text" class="search-input" placeholder="Property type">
                <span class="search-dropdown-icon">▼</span>
              </div>
            </div>
            <div class="search-input-group search-input-group--location">
              <div class="search-input-wrapper">
                <span class="search-icon">
                  <i class="fas fa-search"></i>
                </span>
                <input type="text" class="search-input" placeholder="Search by location or Property ID...">
              </div>
              <button class="search-btn">Search</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Add new section for property type filter pills below hero -->
    <section class="property-types-section">
      <div class="container">
        <div class="property-types-row">
          <a href="#" class="property-type-item property-type-item--active">Single-family homes</a>
          <a href="#" class="property-type-item">Condos and townhouses</a>
          <a href="#" class="property-type-item">Luxury and high-end properties</a>
          <a href="#" class="property-type-item">Multi-family homes</a>
          <a href="#" class="property-type-item">New developments</a>
          <a href="#" class="property-type-item">Vacation homes</a>
        </div>
      </div>
    </section>

    <!-- Featured Properties Section -->
    <section class="featured featured--figma">
      <div class="container">
        <h2 class="featured__title featured__title--figma">Find the best place for you.</h2>
        <div class="property-grid--figma">
          <template v-if="propertyStore.loading">
            <div v-for="n in 8" :key="n" class="property-card--figma skeleton-card">
              <div class="skeleton-img"></div>
              <div class="skeleton-text skeleton-title"></div>
              <div class="skeleton-text skeleton-price"></div>
              <div class="skeleton-text skeleton-address"></div>
            </div>
          </template>
          <template v-else>
            <div v-for="property in propertyStore.properties" :key="property.id" class="property-card--figma">
              <img :src="property.image" :alt="property.name" class="property-card__img--figma">
              <div class="property-card__content--figma">
                <h3 class="property-card__title--figma">{{ property.name }}</h3>
                <div class="property-card__price--figma">{{ property.price }}</div>
                <div class="property-card__address--figma">
                  <svg class="property-card__address-icon" width="16" height="16" fill="none" stroke="#0052a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 10.2C21 16.1 12 22 12 22S3 16.1 3 10.2C3 6.1 7 2 12 2s9 4.1 9 8.2z"/><circle cx="12" cy="10.2" r="2.2"/></svg>
                  <span>{{ property.address }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- How We Can Help Section (Pixel Perfect, Figma Accurate, Cleaned Up) -->
    <section class="help-section">
      <div class="help-section__bg">
        <div class="help-section__container" style="display: flex; align-items: flex-start; justify-content: center; gap: 48px; background: transparent; box-shadow: none; padding: 64px 0;">
          <div style="display: flex; flex-direction: row; gap: 0;">
            <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80" alt="Interior 1" style="width: 220px; height: 320px; object-fit: cover; border-radius: 0; margin: 0;" />
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Interior 2" style="width: 220px; height: 320px; object-fit: cover; border-radius: 0; margin: 0; margin-left: 0;" />
          </div>
          <div style="background: #000; color: #fff; padding: 48px 48px 48px 48px; border-radius: 0; min-width: 420px; display: flex; flex-direction: column; justify-content: center; height: 320px;">
            <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 32px; font-family: 'Poppins', sans-serif;">Here's how we can help you</h2>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 24px;">
              <li style="display: flex; align-items: center; gap: 16px; font-size: 1.1rem;">
                <span style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: none;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.13"/><path d="M7 12.5l3 3 7-7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <span>Fast search for homes that best suit you.</span>
              </li>
              <li style="display: flex; align-items: center; gap: 16px; font-size: 1.1rem;">
                <span style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: none;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.13"/><path d="M7 12.5l3 3 7-7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <span>Access to the best and experienced agents to guide your decision making.</span>
              </li>
              <li style="display: flex; align-items: center; gap: 16px; font-size: 1.1rem;">
                <span style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: none;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.13"/><path d="M7 12.5l3 3 7-7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <span>Be the first to get the best offer.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Neighborhoods Section (Pixel Perfect, Figma Accurate) -->
    <section class="neighborhoods neighborhoods--figma">
      <div class="container neighborhoods__container">
        <h2 class="neighborhoods__title neighborhoods__title--figma">Find the area that feels like home</h2>
        <div class="neighborhoods__grid neighborhoods__grid--figma">
          <div class="neighborhood-card neighborhood-card--figma">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="New England" class="neighborhood-card__img neighborhood-card__img--figma" />
            <div class="neighborhood-card__label--figma">New England</div>
          </div>
          <div class="neighborhood-card neighborhood-card--figma">
            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80" alt="Silicon Valley" class="neighborhood-card__img neighborhood-card__img--figma" />
            <div class="neighborhood-card__label--figma">Silicon Valley</div>
          </div>
          <div class="neighborhood-card neighborhood-card--figma">
            <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" alt="Pacific Northwest" class="neighborhood-card__img neighborhood-card__img--figma" />
            <div class="neighborhood-card__label--figma">Pacific Northwest</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Platform Benefits Section -->
    <section class="benefits benefits--figma">
      <div class="benefits__container">
        <div class="benefits__left">
          <h2 class="benefits__title--figma">
            A platform built for you to<br />
            find a home with <span class="benefits__highlight--figma">little effort</span>
          </h2>
        </div>
        <div class="benefits__right">
          <div class="benefit-card--figma">
            <div class="benefit-card__icon--figma">
              <!-- Magnifying glass SVG -->
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="22" cy="22" r="12" stroke="#8c8c8c" stroke-width="3"/><line x1="34.071" y1="34.485" x2="28.485" y2="28.899" stroke="#8c8c8c" stroke-width="3" stroke-linecap="round"/></svg>
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
            <div class="benefit-card__text--figma">Get alerts on the best deals</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section faq-section--figma">
      <div class="faq__container--figma">
        <div class="faq__left--figma">
          <h2 class="faq__title--figma">Frequently Asked Questions</h2>
          <p class="faq__subtitle--figma">If there are questions you want to ask.<br>We will answer all your questions.</p>
        </div>
        <div class="faq__right--figma">
          <div v-for="(item, idx) in faqList" :key="item.q" class="faq__item--figma" :class="{ 'faq__item--active': openIdx === idx }">
            <button class="faq__question--figma" @click="toggleFaq(idx)">
              <span>{{ item.q }}</span>
              <span class="faq__icon--figma">
                <svg v-if="openIdx === idx" width="24" height="24" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="2" rx="1" fill="#333"/></svg>
                <svg v-else width="24" height="24" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="2" rx="1" fill="#333"/><rect x="11" y="5" width="2" height="14" rx="1" fill="#333"/></svg>
              </span>
            </button>
            <div v-if="openIdx === idx" class="faq__answer--figma">{{ item.a }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer--figma">
      <div class="footer__container--figma">
        <div class="footer__col footer__col--brand">
          <div class="footer__logo--figma">Real City</div>
          <div class="footer__tagline--figma">realty inc brokerage</div>
          <div class="footer__desc--figma">We have built our reputation as true local area experts.</div>
        </div>
        <div class="footer__col footer__col--service">
          <div class="footer__heading--figma">Service</div>
          <ul class="footer__list--figma">
            <li><a href="#">About us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy & Policy</a></li>
          </ul>
        </div>
        <div class="footer__col footer__col--community">
          <div class="footer__heading--figma">Community</div>
          <ul class="footer__list--figma">
            <li><a href="#">Find agents</a></li>
            <li><a href="#">Lifestyle</a></li>
            <li><a href="#">Legal notice</a></li>
          </ul>
        </div>
        <div class="footer__col footer__col--social">
          <div class="footer__heading--figma">Follow us on</div>
          <div class="footer__socials--figma">
            <a href="#" class="footer__social-icon--figma" aria-label="Instagram">
              <span class="footer__icon-bg--figma">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 7.5H16.51M11 15.5C13.4853 15.5 15.5 13.4853 15.5 11C15.5 8.51472 13.4853 6.5 11 6.5C8.51472 6.5 6.5 8.51472 6.5 11C6.5 13.4853 8.51472 15.5 11 15.5ZM11 22C16.5228 22 21 17.5228 21 12C21 6.47715 16.5228 2 11 2C5.47715 2 1 6.47715 1 12C1 17.5228 5.47715 22 11 22Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </a>
            <a href="#" class="footer__social-icon--figma" aria-label="YouTube">
              <span class="footer__icon-bg--figma">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5 6.5C21.5 6.5 21.3 4.5 20.5 3.7C19.5 2.7 18.5 2.7 18 2.5C15.5 2 11 2 11 2C11 2 6.5 2 4 2.5C3.5 2.7 2.5 2.7 1.5 3.7C0.7 4.5 0.5 6.5 0.5 6.5C0.5 6.5 0.3 8.7 0.3 10.9V13.1C0.3 15.3 0.5 17.5 0.5 17.5C0.5 17.5 0.7 19.5 1.5 20.3C2.5 21.3 3.5 21.3 4 21.5C5.5 21.9 11 22 11 22C11 22 15.5 21.9 18 21.5C18.5 21.3 19.5 21.3 20.5 20.3C21.3 19.5 21.5 17.5 21.5 17.5C21.5 17.5 21.7 15.3 21.7 13.1V10.9C21.7 8.7 21.5 6.5 21.5 6.5ZM8.8 15.1V8.9L14.5 12L8.8 15.1Z" fill="#fff"/>
                </svg>
              </span>
            </a>
            <a href="#" class="footer__social-icon--figma" aria-label="Facebook">
              <span class="footer__icon-bg--figma">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5 11C21.5 5.5 16.8 1 11 1C5.2 1 0.5 5.5 0.5 11C0.5 15.9 4.1 20 8.8 21V14.5H6.5V11H8.8V8.3C8.8 5.3 10.5 3.8 13.2 3.8C14.4 3.8 15.7 4 15.7 4V6.5H14.3C12.9 6.5 12.5 7.2 12.5 8V11H15.5L15 14.5H12.5V21C17.2 20 21.5 15.9 21.5 11Z" fill="#fff"/>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoleStore } from '@/stores/roleStore';
import { usePropertyStore } from '@/stores/propertyStore';

const roleStore = useRoleStore();
const propertyStore = usePropertyStore();

// Role switcher states
const showRoleMenu = ref(false);
const currentRole = ref(roleStore.currentRole || 'all');

// Toggle role menu
const toggleRoleMenu = () => {
  showRoleMenu.value = !showRoleMenu.value;
};

// Add click outside handler
onMounted(() => {
  // Set role to 'all' when landing page is mounted
  roleStore.setRole('all');
  currentRole.value = 'all';

  document.addEventListener('click', (event) => {
    const profileSection = document.querySelector('.profile-section');
    if (profileSection && !profileSection.contains(event.target)) {
      showRoleMenu.value = false;
    }
  });
});

// Change user role
const changeRole = (role) => {
  currentRole.value = role;
  // Set the role in the store
  roleStore.setRole(role);
  // Close the menu
  showRoleMenu.value = false;
  // Small delay to ensure the role change is processed
  setTimeout(() => {
    // Redirect based on role
    if (role === 'all') {
      window.location.hash = '/landing';
    } else if (role === 'client') {
      window.location.hash = '/client-dashboard';
    } else if (role === 'admin') {
      window.location.hash = '/admin-dashboard';
    } else {
      window.location.hash = '/agent-dashboard';
    }
  }, 100);
};

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
const openIdx = ref(null);
function toggleFaq(idx) {
  openIdx.value = openIdx.value === idx ? null : idx;
}
</script>

<style scoped>
/* Root Variables */
:root {
  --color-primary: #004fa3;
  --color-primary-dark: #003b7a;
  --color-secondary: #4f46e5;
  --color-accent: #f97316;
  --color-white: #ffffff;
  --color-black: #000000;
  --color-text: #333333;
  --color-text-light: #666666;
  --color-light-gray: #f5f5f5;
  --color-border: #e5e5e5;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  --spacing-section: 80px;

  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-xxl: 24px;
  --font-size-h1: 48px;
  --font-size-h2: 36px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.05);

  --help-bg: #e3f2fd;
  --help-white: #fff;
  --help-black: #111;
  --help-radius: 22px;
  --help-gap: 72px;
  --help-max-width: 1200px;
  --help-section-padding: 72px 0;
  --help-container-padding: 0 32px;
  --help-img-box-width: 500px;
  --help-img-box-height: 340px;
  --help-content-box-width: 500px;
  --help-content-box-padding: 64px 56px;
  --help-title-size: 2.4rem;
  --help-title-weight: 700;
  --help-list-gap: 36px;
  --help-item-size: 1.22rem;
  --help-icon-size: 24px;
  --help-mobile-padding: 18px;

  --neigh-title-size: 2.6rem;
  --neigh-title-weight: 700;
  --neigh-card-radius: 16px;
  --neigh-label-bg: #d6edff;
  --neigh-label-color: #222;
  --neigh-label-radius: 10px;
  --neigh-label-padding: 8px 22px;
  --neigh-label-font-size: 1.08rem;
  --neigh-label-shadow: 0 2px 8px rgba(0,0,0,0.06);
  --neigh-grid-gap: 48px;
  --neigh-card-aspect: 16 / 9;
  --neigh-card-width: 370px;
  --neigh-card-label-top: 18px;
  --neigh-card-label-left: 18px;
}

/* Base Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--color-text);
  line-height: 1.5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  width: 100%;
}

a {
  text-decoration: none;
  color: inherit;
}

/* Header */
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 0;
  z-index: 10;
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: var(--color-white);
}

.header__logo h2 {
  font-weight: 700;
  font-size: 24px;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.header__tagline {
  font-weight: 400;
  font-size: 11px;
  opacity: 0.9;
  line-height: 1;
  margin-top: 2px;
  letter-spacing: 0.2px;
}

.header__nav {
  display: flex;
  gap: 35px;
  margin-right: auto;
  margin-left: 100px;
}

.header__nav-link {
  color: var(--color-white);
  font-weight: 500;
  font-size: 15px;
  transition: opacity 0.3s ease;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}

.dropdown-arrow {
  font-size: 10px;
  margin-left: 4px;
}

.header__auth {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header__sign-up {
  color: var(--color-white);
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
}

.header__login {
  background: #0052a5;
  color: var(--color-white);
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
}

/* Role Switcher */
.role-switcher {
  position: relative;
  margin-left: auto;
  margin-right: 20px;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.profile-section:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.profile-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-white);
}

.dropdown-icon {
  width: 20px;
  height: 20px;
  fill: var(--color-white);
}

.role-switcher-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 200px;
  margin-top: 10px;
  z-index: 10;
}

.role-switcher-header {
  padding: 12px 16px;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #eee;
}

.role-option {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.role-option:hover {
  background-color: #f5f5f5;
}

.role-option.active {
  background-color: #f0f7ff;
}

.role-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
  font-weight: 600;
  font-size: 12px;
}

.all-icon {
  background-color: #6c757d;
  color: white;
}

.admin-icon {
  background-color: #ff6b6b;
  color: white;
}

.agent-icon {
  background-color: #5aa6f9;
  color: white;
}

.client-icon {
  background-color: #2ec4b6;
  color: white;
}

.role-name {
  font-size: 14px;
}

/* Hero Section */
.hero {
  position: relative;
  height: 620px;
  min-height: 620px;
  max-height: 620px;
  display: flex;
  align-items: center;
  background-image: url('https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  color: var(--color-white);
  padding: 0;
  overflow: hidden;
}

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  z-index: 1;
}

.hero .container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-top: 60px;
}

.hero__content {
  max-width: 1000px;
  margin: 0;
  text-align: left;
  margin-bottom: 40px;
  padding-left: 30px;
}

.hero__title {
  font-size: 56px;
  font-weight: 800;
  text-align: left;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  margin: 0;
  letter-spacing: -0.5px;
}

/* Search tabs design to match Figma */
.hero__search-wrapper {
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  max-width: 1180px;
  margin: 0 auto;
  width: 100%;
  position: relative;
}

.hero__search-tabs {
  display: flex;
}

.hero__tab-btn {
  padding: 15px 0;
  background: #f0f0f0;
  border: none;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  flex: 1;
  max-width: 140px;
  color: #444;
  text-align: center;
  position: relative;
}

.hero__tab-btn--active {
  background: white;
  color: #0052a5;
  font-weight: 600;
  border-bottom: 3px solid #0052a5;
}

.hero__search-form {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: white;
}

.search-input-group {
  display: flex;
  gap: 16px;
  width: 100%;
}

.search-input-group--location {
  align-items: center;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  padding: 13px 15px;
  flex: 1;
  background: #f8f8f8;
}

.search-icon {
  display: flex;
  align-items: center;
  margin-right: 10px;
  color: #777;
  font-size: 14px;
}

.search-input {
  width: 100%;
  padding: 0;
  border: none;
  font-size: 14px;
  background: transparent;
  color: #333;
}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: #777;
  font-weight: 400;
}

.search-dropdown-icon {
  margin-left: auto;
  font-size: 10px;
  color: #777;
}

.search-btn {
  background: #0052a5;
  color: var(--color-white);
  border: none;
  padding: 13px 32px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Property type filter pills */
.property-types-section {
  background: #fff;
  padding: 32px 0 16px 0;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  margin-bottom: 0;
}
.property-types-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
  margin-bottom: 32px;
}
.property-type-item {
  background: transparent;
  color: #222;
  padding: 10px 22px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  border: none;
  transition: all 0.2s;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  display: inline-block;
}
.property-type-item--active {
  background: #b3d4fc;
  color: #0052a5;
  border: none;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.property-type-item:hover:not(.property-type-item--active) {
  background: #f0f7ff;
  color: #0052a5;
}

/* Featured Properties Section */
.featured--figma {
  background: linear-gradient(135deg, #f7f8fa 60%, #e3f0ff 100%);
  padding-top: 48px;
  padding-bottom: 64px;
}
.featured__title--figma {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 36px;
  margin-top: 0;
  text-align: left;
  font-family: 'Poppins', sans-serif;
}
.property-grid--figma {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  row-gap: 40px;
  background: transparent;
  border-radius: 24px;
  padding: 8px 0;
}
.property-card--figma {
  background: rgba(255,255,255,0.95);
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.25s cubic-bezier(.4,2,.3,1),
              transform 0.22s cubic-bezier(.4,2,.3,1),
              border 0.22s cubic-bezier(.4,2,.3,1);
  padding-bottom: 18px;
  border: none;
  position: relative;
}
.property-card--figma:hover {
  box-shadow: 0 8px 32px 0 rgba(0,82,165,0.10), 0 2px 8px 0 rgba(0,0,0,0.06);
  border: 2px solid rgba(0,82,165,0.18);
  z-index: 2;
  transform: scale(1.025) translateY(-2px);
}
.property-card__img--figma {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
  margin-bottom: 18px;
  background: linear-gradient(120deg, #e3f0ff 0%, #f7f8fa 100%);
  transition: filter 0.22s;
}
.property-card--figma:hover .property-card__img--figma {
  filter: brightness(1.04) saturate(1.08);
}
.property-card__content--figma {
  padding: 0 18px;
  width: 100%;
  text-align: left;
}
.property-card__title--figma {
  font-size: 1.2rem;
  font-weight: 700;
  color: #23272f;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 2px;
}
.property-card__price--figma {
  color: #0052a5;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 8px 0 0 0;
  letter-spacing: 0.5px;
}
.property-card__address--figma {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.98rem;
  margin-top: 6px;
  gap: 6px;
}
.property-card__address-icon {
  min-width: 16px;
  min-height: 16px;
  margin-right: 2px;
}

/* Skeleton Loader Styles */
.skeleton-card {
  background: rgba(255,255,255,0.85);
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 18px;
  border: none;
  position: relative;
  min-height: 280px;
  animation: skeleton-fade 1.2s infinite alternate;
}
.skeleton-img {
  width: 100%;
  height: 180px;
  border-radius: 16px 16px 0 0;
  background: linear-gradient(90deg, #e3f0ff 25%, #f7f8fa 50%, #e3f0ff 75%);
  margin-bottom: 18px;
  animation: skeleton-shimmer 1.5s infinite linear;
}
.skeleton-text {
  height: 18px;
  width: 80%;
  border-radius: 6px;
  background: linear-gradient(90deg, #e3f0ff 25%, #f7f8fa 50%, #e3f0ff 75%);
  margin: 8px 0;
  animation: skeleton-shimmer 1.5s infinite linear;
}
.skeleton-title { width: 60%; height: 22px; }
.skeleton-price { width: 40%; height: 18px; }
.skeleton-address { width: 70%; height: 16px; }

@keyframes skeleton-shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}
@keyframes skeleton-fade {
  0% { opacity: 0.85; }
  100% { opacity: 1; }
}

@media (max-width: 1200px) {
  .property-grid--figma {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .property-grid--figma {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
@media (max-width: 600px) {
  .property-grid--figma {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .featured__title--figma {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  .property-card__img--figma {
    height: 140px;
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
  background: #e5e5e5;
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
.faq-section--figma {
  background: linear-gradient(135deg, #fafbfc 80%, #f5f7fa 100%);
  padding: 110px 0 90px 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
.faq__container--figma {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 100px;
  padding: 0 32px;
}
.faq__left--figma {
  flex: 1.2;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
}
.faq__title--figma {
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  font-size: 2.6rem;
  font-weight: 800;
  color: #23272f;
  margin: 0 0 18px 0;
  line-height: 1.15;
  letter-spacing: -0.5px;
  text-align: left;
}
.faq__subtitle--figma {
  color: #7a7a7a;
  font-size: 1.18rem;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  font-weight: 400;
  margin: 0;
  line-height: 1.7;
  letter-spacing: 0.01em;
}
.faq__right--figma {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 340px;
}
.faq__item--figma {
  background: #fff;
  border: 1.5px solid #ededed;
  border-radius: 12px;
  padding: 0;
  transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  will-change: box-shadow, border-color, transform;
}
.faq__item--figma:hover, .faq__item--figma:focus-within {
  border-color: #0052a5;
  box-shadow: 0 6px 32px rgba(0,82,165,0.07);
  transform: translateY(-2px) scale(1.012);
}
.faq__item--active {
  border-color: #0052a5;
}
.faq__question--figma {
  width: 100%;
  background: none;
  border: none;
  outline: none;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  font-size: 0.98rem;
  font-weight: 500;
  color: #23272f;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.18s;
  filter: none;
  opacity: 1;
}
.faq__item--figma:hover .faq__question--figma,
.faq__item--figma:focus-within .faq__question--figma {
  filter: none;
  opacity: 1;
}
.faq__icon--figma {
  margin-left: 18px;
  display: flex;
  align-items: center;
}
.faq__answer--figma {
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  color: #444;
  font-weight: 400;
  padding: 0 20px 20px 20px;
  line-height: 1.6;
  border-radius: 0 0 12px 12px;
  max-height: 500px;
  opacity: 1;
  transition: max-height 0.35s cubic-bezier(.4,2,.3,1), opacity 0.25s;
  overflow: hidden;
}
.faq__item--figma:not(.faq__item--active) .faq__answer--figma {
  max-height: 0;
  opacity: 0;
  padding-bottom: 0;
}
@media (max-width: 1100px) {
  .faq__container--figma {
    flex-direction: column;
    gap: 60px;
    align-items: stretch;
  }
  .faq__right--figma {
    min-width: 0;
  }
}
@media (max-width: 600px) {
  .faq-section--figma {
    padding: 36px 0 24px 0;
  }
  .faq__container--figma {
    padding: 0 4px;
    gap: 24px;
  }
  .faq__title--figma {
    font-size: 1.3rem;
  }
  .faq__subtitle--figma {
    font-size: 1.02rem;
  }
  .faq__question--figma {
    font-size: 0.92rem;
    padding: 14px 10px;
  }
  .faq__answer--figma {
    font-size: 0.88rem;
    padding: 0 10px 14px 10px;
  }
  .faq__item--figma {
    border-radius: 8px;
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
    grid-template-columns: 1fr;
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
}
</style>
