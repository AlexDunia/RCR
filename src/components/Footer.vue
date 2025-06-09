<template>
  <footer v-if="showFooter" class="footer">
    <div class="footer__container">
      <div class="footer__section">
        <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1748316444/rclogo_l7oiod.png" alt="Real City Logo" class="footer__logo" />
        <p class="footer__description">Your trusted partner in finding the perfect home.</p>
      </div>
      
      <div class="footer__section">
        <h3 class="footer__title">Quick Links</h3>
        <nav class="footer__nav">
          <router-link to="/buy" class="footer__link">Buy</router-link>
          <router-link to="/rent" class="footer__link">Rent</router-link>
          <router-link to="/sell" class="footer__link">Sell</router-link>
          <router-link to="/allagents" class="footer__link">Find Agents</router-link>
        </nav>
      </div>

      <div class="footer__section">
        <h3 class="footer__title">Company</h3>
        <nav class="footer__nav">
          <router-link to="/about" class="footer__link">About Us</router-link>
          <router-link to="/contact" class="footer__link">Contact</router-link>
          <router-link to="/careers" class="footer__link">Careers</router-link>
          <router-link to="/blog" class="footer__link">Blog</router-link>
        </nav>
      </div>

      <div class="footer__section">
        <h3 class="footer__title">Contact Us</h3>
        <div class="footer__contact">
          <p>Email: contact@realcity.com</p>
          <p>Phone: (555) 123-4567</p>
          <p>Address: 123 Real Estate Ave, City, State 12345</p>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__copyright">&copy; {{ new Date().getFullYear() }} Real City. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'AppFooter',
  setup() {
    const store = useStore()
    const userRole = computed(() => store.state.auth.role)
    const showFooter = computed(() => userRole.value === 'all')

    return {
      showFooter
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #1a1a1a;
  color: #fff;
  padding: 64px 0 24px;
  margin-top: auto;
}

.footer__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
}

.footer__logo {
  height: 40px;
  margin-bottom: 16px;
}

.footer__description {
  color: #bdbdbd;
  font-size: 0.9rem;
  line-height: 1.5;
}

.footer__title {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 24px;
}

.footer__nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__link {
  color: #bdbdbd;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.9rem;
}

.footer__link:hover {
  color: #fff;
}

.footer__contact {
  color: #bdbdbd;
  font-size: 0.9rem;
  line-height: 1.8;
}

.footer__bottom {
  max-width: 1280px;
  margin: 48px auto 0;
  padding: 24px 24px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer__copyright {
  color: #bdbdbd;
  font-size: 0.85rem;
  text-align: center;
}

@media (max-width: 1024px) {
  .footer__container {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 48px 0 24px;
  }
}

@media (max-width: 480px) {
  .footer__container {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }

  .footer__logo {
    margin: 0 auto 16px;
  }

  .footer__nav {
    align-items: center;
  }

  .footer__title {
    margin-bottom: 16px;
  }

  .footer__bottom {
    margin-top: 32px;
  }
}
</style> 