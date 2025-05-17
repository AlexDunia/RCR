<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section id="hero-section" class="hero">
      <div class="hero__overlay"></div>
      <div class="container hero__container--figma">
        <div class="hero__content">
          <h1 class="hero__title">Discover Homes You'll Love</h1>
        </div>
        <div class="hero__search-wrapper">
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
              <div class="search-input-wrapper">
                <span class="search-icon">
                  <i class="fas fa-home"></i>
                </span>
                <input type="text" class="search-input" placeholder="Property type">
                <span class="search-dropdown-icon">▼</span>
              </div>
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
        <h2 class="featured__title--figma">Find the best place for you.</h2>
        <div class="property-grid--figma">
          <div class="property-card--figma">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9" alt="Cedar Grove Estates" class="property-card__img--figma">
            <div class="property-card__content--figma">
              <h3 class="property-card__title--figma">Cedar Grove Estates</h3>
              <div class="property-card__price--figma">$25,000</div>
              <div class="property-card__address--figma">
                <svg class="property-card__address-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                123 Cedar Grove, Austin, TX 78701
            </div>
            </div>
          </div>
          <div class="property-card--figma">
            <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6" alt="Willow Creek Villa" class="property-card__img--figma">
              <div class="property-card__content--figma">
              <h3 class="property-card__title--figma">Willow Creek Villa</h3>
              <div class="property-card__price--figma">$35,000</div>
                <div class="property-card__address--figma">
                <svg class="property-card__address-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                456 Willow Creek, Boulder, CO 80301
                </div>
              </div>
            </div>
          <div class="property-card--figma">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750" alt="Maple Leaf Cottage" class="property-card__img--figma">
            <div class="property-card__content--figma">
              <h3 class="property-card__title--figma">Maple Leaf Cottage</h3>
              <div class="property-card__price--figma">$45,000</div>
              <div class="property-card__address--figma">
                <svg class="property-card__address-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                789 Maple Leaf, Portland, OR 97201
              </div>
            </div>
          </div>
          <div class="property-card--figma">
            <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914" alt="Pine Hill Mansion" class="property-card__img--figma">
            <div class="property-card__content--figma">
              <h3 class="property-card__title--figma">Pine Hill Mansion</h3>
              <div class="property-card__price--figma">$55,000</div>
              <div class="property-card__address--figma">
                <svg class="property-card__address-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                101 Pine Hill, Seattle, WA 98101
              </div>
            </div>
          </div>
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
              <span class="faq__question-text">{{ item.q }}</span>
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
            <li><router-link to="/about">About us</router-link></li>
            <li><router-link to="/careers">Careers</router-link></li>
            <li><router-link to="/terms">Terms & Conditions</router-link></li>
            <li><router-link to="/privacy">Privacy & Policy</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>
            <li><router-link to="/signup">Sign up</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
          </ul>
        </div>
        <div class="footer__col footer__col--community">
          <div class="footer__heading--figma">Community</div>
          <ul class="footer__list--figma">
            <li><router-link to="/find-agents">Find agents</router-link></li>
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
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

defineOptions({
  name: 'LandingPage'
});

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

function toggleFaq(idx) {
  openIdx.value = openIdx.value === idx ? null : idx;
}

onMounted(async () => {
  // Reset all reactive states
  openIdx.value = null;
  activeTab.value = 'Buy';

  // Force scroll to top
  window.scrollTo(0, 0);

  // Ensure component is visible after mount
  await nextTick();
  isVisible.value = true;
});

onBeforeUnmount(() => {
  // Clean up component state
  isVisible.value = false;
  openIdx.value = null;
});
</script>

<style scoped>
/* Update styles to remove header-related styles */
.landing-page {
  min-height: 100vh;
  background: #fff;
}

/* Hero section styles need to be adjusted for the PublicHeader */
.hero {
  position: relative;
  height: 500px;
  min-height: auto;
  display: flex;
  align-items: flex-start;
  background-image: url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80');
  background-size: cover;
  background-position: center;
  color: var(--color-white);
  padding: 0;
  margin-top: 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.65) 100%);
  z-index: 1;
}

.hero .container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding-top: 140px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
}

.hero__content {
  max-width: 900px;
  margin: 0;
  text-align: left;
  margin-bottom: 48px;
  padding-left: 0;
}

.hero__title {
  font-size: 72px;
  font-weight: 700;
  text-align: left;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  line-height: 1.1;
  margin: 0;
  letter-spacing: -1px;
  font-family: 'Poppins', sans-serif;
}

/* Search wrapper redesign to match Figma exactly */
.hero__search-wrapper {
  background: #fff;
  border-radius: 12px;
  overflow: visible;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  max-width: 1140px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  transform: translateY(50%);
}

.hero__search-tabs {
  display: flex;
  padding: 0;
  position: absolute;
  top: -40px;
  left: 0;
  gap: 1px;
}

.hero__tab-btn {
  padding: 16px 40px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  color: #fff;
  position: relative;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
  min-width: 120px;
  text-align: center;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  margin-bottom: -8px;
}

.hero__tab-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.hero__tab-btn--active {
  background: #fff;
  color: #0066cc;
  font-weight: 600;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  padding-bottom: 24px;
  margin-bottom: -12px;
}

.hero__search-form {
  padding: 24px;
  display: flex;
  gap: 16px;
  background: white;
  border-radius: 12px;
  position: relative;
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
  padding: 12px 16px;
  flex: 1;
  background: #fff;
  transition: all 0.2s ease;
}

.search-input-wrapper:first-child {
  max-width: 240px;
}

.search-icon {
  display: flex;
  align-items: center;
  margin-right: 12px;
  color: #94a3b8;
}

.search-input {
  width: 100%;
  padding: 0;
  border: none;
  font-size: 15px;
  background: transparent;
  color: #1e293b;
  font-family: 'Inter', sans-serif;
}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.search-dropdown-icon {
  margin-left: auto;
  font-size: 12px;
  color: #94a3b8;
}

.search-btn {
  background: #0052a5;
  color: #fff;
  border: none;
  padding: 0 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 44px;
  min-width: 100px;
  font-family: 'Inter', sans-serif;
}

.search-btn:hover {
  background: #003b7a;
}

/* Property type filter pills */
.property-types-section {
  background: #fff;
  padding: 24px 0;
  margin-top: 60px;
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
  padding: 48px 0 64px 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.featured .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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
}
}

@media (max-width: 600px) {
  .featured--figma {
    padding: 32px 0;
  }

  .featured .container {
    padding: 0 1rem;
  }

  .property-grid--figma {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .featured__title--figma {
    font-size: 1.75rem;
    margin-bottom: 20px;
  }

  .property-card__img--figma {
    height: 180px;
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

.faq__question-text {
  flex: 1;
  margin-right: 16px;
}
</style>
