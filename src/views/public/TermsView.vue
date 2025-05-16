<template>
  <PublicHeader :transparent="true" :is-fixed="isHeaderFixed" />
  <section id="hero-section" class="terms-hero">
    <div class="terms-hero__content">
      <h1 class="terms-hero__title">Terms of Service</h1>
      <p class="terms-hero__subtitle">Clarity, fairness, and trust—our promise to every Real City user.</p>
    </div>
  </section>
  <section class="terms-commitments">
    <div class="terms-commitments__container">
      <h2>Our Commitments to You</h2>
      <div class="terms-commitments__grid">
        <div class="terms-commitment">
          <span class="terms-commitment__icon">🤝</span>
          <h3>Transparency</h3>
          <p>We believe in clear, honest communication. Our terms are written to be understood, not hidden in fine print.</p>
        </div>
        <div class="terms-commitment">
          <span class="terms-commitment__icon">⚖️</span>
          <h3>Fairness</h3>
          <p>We treat every user with respect and fairness, ensuring a safe and equitable experience for all.</p>
        </div>
        <div class="terms-commitment">
          <span class="terms-commitment__icon">🔍</span>
          <h3>Accountability</h3>
          <p>We stand by our word. If you have questions or concerns, our team is here to help.</p>
        </div>
      </div>
      <p class="terms-legal">By using Real City, you agree to our terms. Please review the full policy below.</p>
    </div>
  </section>
  <section class="terms-cta">
    <div class="terms-cta__content">
      <h2>Questions about our terms?</h2>
      <p>Contact us at <a href="mailto:legal@realcity.com">legal@realcity.com</a>—we're here to help.</p>
    </div>
  </section>
</template>

<script setup>
import PublicHeader from '@/components/PublicHeader.vue';
import { useFixedHeader } from '@/composables/useFixedHeader';

const { isHeaderFixed } = useFixedHeader('hero-section');
</script>

<style scoped>
.terms-hero {
  background: linear-gradient(120deg, #e3f0ff 0%, #f7f8fa 100%);
  padding: 120px 0 40px 0;
  text-align: center;
}
.terms-hero__title {
  font-size: 2.6rem;
  font-weight: 800;
  color: #003366;
  margin-bottom: 0.5rem;
}
.terms-hero__subtitle {
  font-size: 1.25rem;
  color: #0052a5;
  font-weight: 500;
}
.terms-commitments__container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 16px 32px 16px;
  text-align: center;
}
.terms-commitments__container h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #003366;
  margin-bottom: 1.2rem;
}
.terms-commitments__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  margin-top: 2.5rem;
}
.terms-commitment {
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
.terms-commitment__icon {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}
.terms-commitment h3 {
  font-size: 1.18rem;
  font-weight: 700;
  color: #0052a5;
  margin: 0 0 0.2rem 0;
}
.terms-commitment p {
  color: #444;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
}
.terms-legal {
  color: #888;
  font-size: 0.98rem;
  margin-top: 2.2rem;
}
.terms-cta {
  background: #0052a5;
  color: #fff;
  padding: 48px 0;
  text-align: center;
}
.terms-cta__content h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
}
.terms-cta__content p {
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}
.terms-cta__content a {
  color: #fff;
  text-decoration: underline;
}
.terms-cta__content a:hover {
  color: #b3d4fc;
}
@media (max-width: 900px) {
  .terms-commitments__grid {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
}
</style>
