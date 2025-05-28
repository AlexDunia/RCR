<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section id="hero-section" class="hero">
      <div class="hero__overlay"></div>
      <div class="boxed-container">
        <!-- Header Navigation -->
        <nav class="main-nav">
          <div class="main-nav__logo">
            <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1748316444/rclogo_l7oiod.png" alt="Real City Logo" class="main-nav__logo-img" />
          </div>
          <div class="main-nav__center">
            <router-link to="/buy" class="main-nav__link">Buy</router-link>
            <router-link to="/rent" class="main-nav__link">Rent</router-link>
            <router-link to="/sell" class="main-nav__link">Sell</router-link>
            <router-link to="/allagents" class="main-nav__link">Find Agents</router-link>
            <router-link to="/signup" class="main-nav__link">Join Us</router-link>
          </div>
          <div class="main-nav__right">
            <button class="main-nav__button">Sign in</button>
            <button class="main-nav__button main-nav__button--primary">Login</button>
          </div>
        </nav>

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
        <div class="property-grid--figma">
          <div class="property-card--figma" v-for="property in featuredProperties" :key="property.id">
            <img :src="property.image" :alt="property.name" class="property-card__img--figma" loading="lazy">
            <div class="property-card__content--figma">
              <h3 class="property-card__title--figma">{{ property.name }}</h3>
              <div class="property-card__price--figma">{{ property.price }}</div>
              <div class="property-card__address--figma">
                <svg class="property-card__address-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {{ property.address }}
            </div>
            </div>
          </div>
                </div>
        <router-link to="/allproperties" class="featured__view-more">
          View More
          <svg style="margin-left: 8px;" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#0052a5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </router-link>
      </div>
    </section>

    <!-- How We Can Help Section (Pixel Perfect, Figma Accurate, Cleaned Up) -->
    <section class="help-section">
      <div class="boxed-container">
        <div style="display: flex; align-items: flex-start; justify-content: center; gap: 48px; background: transparent; box-shadow: none; padding: 64px 0;">
          <div style="display: flex; flex-direction: row; gap: 0;">
            <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80" alt="Interior 1" style="width: 220px; height: 320px; object-fit: cover; border-radius: 0; margin: 0;" />
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Interior 2" style="width: 220px; height: 320px; object-fit: cover; border-radius: 0; margin: 0; margin-left: 0;" />
          </div>
          <div class="help-section__gradient-box">
            <h2 class="help-section__title">Here's how we can help you</h2>
            <ul class="help-section__list">
              <li class="help-section__item">
                <span class="help-section__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.13"/><path d="M7 12.5l3 3 7-7" stroke="#0052a5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <span>Fast search for homes that best suit you.</span>
              </li>
              <li class="help-section__item">
                <span class="help-section__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.13"/><path d="M7 12.5l3 3 7-7" stroke="#0052a5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <span>Access to the best and experienced agents to guide your decision making.</span>
              </li>
              <li class="help-section__item">
                <span class="help-section__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.13"/><path d="M7 12.5l3 3 7-7" stroke="#0052a5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
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
          <transition-group name="agent-fade" tag="div" class="agent-carousel__track">
            <div
              v-for="agent in visibleAgents"
              :key="agent.id"
              class="agent-card"
            >
              <div class="agent-card__img-box">
                <img :src="agent.avatar || agent.profilePicture" :alt="agent.name" class="agent-card__img" />
              </div>
              <div class="agent-card__name">{{ agent.name }}</div>
            </div>
          </transition-group>
        </div>
        <router-link to="/allagents" class="agent-carousel__view-more">View More</router-link>
      </div>
    </section>

    <!-- Platform Benefits Section -->
    <section class="benefits benefits--figma reveal">
      <div class="boxed-container benefits__container">
        <div class="benefits__left">
          <h2 class="benefits__title--figma" style="white-space: pre-line; text-align: left;">
            A platform built for\nyou to find a home with\nlittle effort
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

    <!-- Blog Section (Below FAQ) -->
    <section class="blog-section--worldclass reveal">
      <div class="boxed-container blog-section__container">
        <h2 class="blog-section__title blog-section__title--worldclass">Latest from our Blog</h2>
        <div class="blog-section__tiles blog-section__tiles--worldclass">
          <div v-for="blog in blogs" :key="blog.id" class="blog-tile blog-tile--worldclass reveal" @click="goToBlog(blog)" style="cursor:pointer;">
            <div class="blog-tile__accent-bar"></div>
            <div class="blog-tile__title-worldclass">{{ blog.title }}</div>
            <div class="blog-tile__desc-worldclass">{{ blog.desc }}</div>
            <div class="blog-tile__meta-worldclass">
              <span class="blog-tile__meta-icon-worldclass">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e0f2fe"/><path d="M12 12c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#0052a5"/></svg>
              </span>
              <span class="blog-tile__meta-author-worldclass">Real City Team</span>
              <span class="blog-tile__meta-dot-worldclass">|</span>
              <span class="blog-tile__meta-date-worldclass">June 2024</span>
            </div>
            <button class="blog-tile__readmore-worldclass" @click.stop="goToBlog(blog)">Read More &gt;</button>
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
    <footer class="footer--figma">
      <div class="boxed-container">
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
              <li><router-link to="/signup" class="footer__link">Sign up</router-link></li>
              <li><router-link to="/login" class="footer__link">Login</router-link></li>
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
      </div>
    </footer>

    <!-- Fixed Navigation -->
    <nav class="fixed-nav" :class="{ 'fixed-nav--visible': showFixedNav }" v-show="showFixedNav">
      <div class="boxed-container">
        <div class="fixed-nav__content">
          <div class="fixed-nav__logo">
            <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1748316444/rclogo_l7oiod.png" alt="Real City Logo" class="fixed-nav__logo-img" />
          </div>
          <div class="fixed-nav__center">
            <router-link to="/buy" class="fixed-nav__link">Buy</router-link>
            <router-link to="/rent" class="fixed-nav__link">Rent</router-link>
            <router-link to="/sell" class="fixed-nav__link">Sell</router-link>
            <router-link to="/agent" class="fixed-nav__link">Agent</router-link>
            <router-link to="/signup" class="fixed-nav__link">Join Us</router-link>
          </div>
          <div class="fixed-nav__right">
            <button class="fixed-nav__button">Sign in</button>
            <button class="fixed-nav__button fixed-nav__button--primary">Login</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed, onActivated } from 'vue';
import { useAgentStore } from '@/stores/agentStore';
import { usePropertyStore } from '@/stores/propertyStore';
import { useBlogStore } from '@/stores/blogStore';
import { useRouter } from 'vue-router';

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
const showFixedNav = ref(false);

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
});

onBeforeUnmount(() => {
  // Clean up component state and event listeners
  if (observer) observer.disconnect();
  isVisible.value = false;
  openIdx.value = null;
  showFixedNav.value = false;
  stopCarousel();
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

const blogStore = useBlogStore();
const router = useRouter();
onMounted(() => {
  blogStore.fetchBlogs();
});
const blogs = computed(() => blogStore.blogs.slice(0, 3));
function goToBlog(blog) {
  router.push(`/blog/${blog.id}`);
}

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
const featuredProperties = computed(() => propertyStore.properties.slice(0, 4));
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
  background: rgba(0, 0, 0, 0.6);
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
  font-size: 52px;
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
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  width: 50%;
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

.search-input-wrapper:first-child {
  max-width: 260px;
  min-width: 260px;
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

/* Fixed Navigation */
.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  z-index: 1000;
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

.boxed-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
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
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: stretch;
  min-height: 220px;
}
.agent-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,82,165,0.10);
  padding: 24px 18px 18px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  max-width: 240px;
  width: 100%;
  margin: 0 4px;
  transition: transform 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.25s;
  border: 1.5px solid #e0f2fe;
  position: relative;
}
.agent-card:hover {
  transform: translateY(-8px) scale(1.035);
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
.agent-carousel__view-more {
  display: block;
  margin: 32px auto 0 auto;
  background: linear-gradient(90deg, #0066cc 0%, #4f8edc 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 44px;
  font-size: 1.18rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,82,165,0.08);
  transition: background 0.2s, box-shadow 0.2s;
  text-align: center;
  width: fit-content;
  min-width: 180px;
  max-width: 320px;
  text-decoration: none;
}
.agent-carousel__view-more:hover {
  background: linear-gradient(90deg, #0052a5 0%, #0066cc 100%);
  box-shadow: 0 4px 16px rgba(0,82,165,0.13);
  text-decoration: none;
}
@media (max-width: 600px) {
  .agent-carousel__view-more {
    padding: 12px 24px;
    font-size: 1rem;
    min-width: 120px;
    max-width: 90vw;
  }
}
/* Fade/slide animation for carousel */
.agent-fade-enter-active, .agent-fade-leave-active {
  transition: all 0.7s cubic-bezier(.4,2,.3,1);
}
.agent-fade-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}
.agent-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.98);
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

.help-section__gradient-box {
  background: linear-gradient(135deg, #f7f8fa 60%, #e3f0ff 100%);
  color: #0052a5;
  padding: 48px 48px 48px 48px;
  border-radius: 18px;
  min-width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 320px;
  box-shadow: 0 2px 8px rgba(0,82,165,0.08);
}
.help-section__title {
  font-size: 1.7rem;
  font-weight: 900;
  margin-bottom: 32px;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  color: #0052a5;
}
.help-section__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.help-section__item {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 1.13rem;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  color: #23272f;
  font-weight: 500;
}
.help-section__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: none;
}
</style>

