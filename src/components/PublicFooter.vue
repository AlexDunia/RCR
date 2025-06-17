<template>
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
            <li><router-link to="/terms">Terms &amp; Conditions</router-link></li>
            <li><router-link to="/privacy">Privacy &amp; Policy</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>
            <li><router-link to="/signup" class="footer__link">Sign up</router-link></li>
            <li><router-link to="/login" class="footer__link">Login</router-link></li>
          </ul>
        </div>
        <div class="footer__col footer__col--community">
          <div class="footer__heading--figma">Community</div>
          <ul class="footer__list--figma">
            <li><router-link to="/allagents">Find agents</router-link></li>
            <li><router-link to="/lifestyle">Lifestyle</router-link></li>
            <li><router-link to="/legal-notice">Legal notice</router-link></li>
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
      <div class="footer__disclaimer-wrapper">
        <div class="footer__disclaimer">
          <p class="footer__disclaimer-text">The information provided on this website does not constitute legal, tax, financial, or real estate advice. Real City is a licensed real estate brokerage that abides by Equal Housing Opportunity laws. All material presented herein is intended for informational purposes only.</p>
        </div>
        <div class="footer__copyright">
          <p class="footer__copyright-text">© {{ currentYear }} Real City Realty Inc. All rights reserved. Real Estate Website by Real City.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer--figma {
  background-color: #0052a5;
  color: #fff;
  padding: 64px 0 32px;
}

.boxed-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer__container--figma {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-bottom: 48px;
}

.footer__col {
  display: flex;
  flex-direction: column;
}

.footer__logo--figma {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.footer__tagline--figma {
  font-size: 14px;
  margin-bottom: 16px;
  opacity: 0.8;
}

.footer__desc--figma {
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.8;
}

.footer__heading--figma {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
}

.footer__list--figma {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__list--figma li {
  margin-bottom: 16px;
}

.footer__list--figma a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.footer__list--figma a:hover {
  opacity: 1;
}

.footer__socials--figma {
  display: flex;
  gap: 16px;
}

.footer__social-icon--figma {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  transition: background-color 0.2s;
}

.footer__social-icon--figma:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.footer__disclaimer-wrapper {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 32px;
}

.footer__disclaimer-text,
.footer__copyright-text {
  font-size: 12px;
  line-height: 1.5;
  opacity: 0.8;
  margin: 0;
}

.footer__disclaimer {
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .footer__container--figma {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .footer__container--figma {
    grid-template-columns: 1fr;
  }

  .footer__col {
    margin-bottom: 32px;
  }
}
</style>
