<template>
  <PublicHeader :transparent="false" :is-fixed="isHeaderFixed" />
  <section id="hero-section" class="privacy-hero">
    <div class="privacy-hero__content">
      <h1 class="privacy-hero__title">Privacy Policy</h1>
      <p class="privacy-hero__subtitle">Your privacy matters. Learn how we protect and handle your data.</p>
    </div>
  </section>
  <section class="privacy-content">
    <div class="privacy-content__container">
      <h2>Our Privacy Commitment</h2>
      <div class="privacy-grid">
        <div class="privacy-item">
          <span class="privacy-item__icon">🔒</span>
          <h3>Data Protection</h3>
          <p>We use industry-leading security measures to keep your information safe and secure.</p>
        </div>
        <div class="privacy-item">
          <span class="privacy-item__icon">👤</span>
          <h3>Your Control</h3>
          <p>You have full control over your personal data and how it's used.</p>
        </div>
        <div class="privacy-item">
          <span class="privacy-item__icon">🤝</span>
          <h3>Transparency</h3>
          <p>We're clear about what data we collect and how we use it.</p>
        </div>
      </div>
    </div>
  </section>
  <section class="privacy-cta">
    <div class="privacy-cta__content">
      <h2>Questions about privacy?</h2>
      <p>Contact us at <a href="mailto:privacy@realcity.com">privacy@realcity.com</a>—we're here to help.</p>
    </div>
  </section>
</template>

<script setup>
import PublicHeader from '@/components/PublicHeader.vue';
import { useFixedHeader } from '@/composables/useFixedHeader';

const { isHeaderFixed } = useFixedHeader('hero-section');
</script>

<style scoped>
.privacy-hero {
  background: linear-gradient(120deg, #e3f0ff 0%, #f7f8fa 100%);
  padding: 120px 0 40px 0;
  text-align: center;
}

.privacy-hero__title {
  font-size: 2.6rem;
  font-weight: 800;
  color: #003366;
  margin-bottom: 0.5rem;
}

.privacy-hero__subtitle {
  font-size: 1.25rem;
  color: #0052a5;
  font-weight: 500;
}

.privacy-content__container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 16px 32px 16px;
  text-align: center;
}

.privacy-content__container h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #003366;
  margin-bottom: 1.2rem;
}

.privacy-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  margin-top: 2.5rem;
}

.privacy-item {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  padding: 32px 24px;
  flex: 1 1 260px;
  min-width: 260px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s, transform 0.2s;
}

.privacy-item__icon {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.privacy-item h3 {
  font-size: 1.18rem;
  font-weight: 700;
  color: #0052a5;
  margin: 0 0 0.2rem 0;
}

.privacy-item p {
  color: #444;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
}

.privacy-cta {
  background: #0052a5;
  color: #fff;
  padding: 48px 0;
  text-align: center;
}

.privacy-cta__content h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
}

.privacy-cta__content p {
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}

.privacy-cta__content a {
  color: #fff;
  text-decoration: underline;
}

.privacy-cta__content a:hover {
  color: #b3d4fc;
}

@media (max-width: 900px) {
  .privacy-grid {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
}
</style>
