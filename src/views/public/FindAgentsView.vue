<template>
  <section class="agents-hero">
    <div class="agents-hero__content">
      <h1 class="agents-hero__title">Find Your Trusted Agent</h1>
      <p class="agents-hero__subtitle">The right agent makes all the difference. Let us help you connect with someone who truly cares about your journey.</p>
    </div>
  </section>
  <section class="agents-benefits">
    <div class="agents-benefits__container">
      <h2>Why Choose a Real City Agent?</h2>
      <div class="agents-benefits__grid">
        <div class="agents-benefit">
          <span class="agents-benefit__icon">🤝</span>
          <h3>Personalized Guidance</h3>
          <p>Our agents listen, understand, and tailor their approach to your unique needs and dreams.</p>
        </div>
        <div class="agents-benefit">
          <span class="agents-benefit__icon">🏆</span>
          <h3>Proven Expertise</h3>
          <p>With deep local knowledge and a passion for results, our agents turn possibilities into reality.</p>
        </div>
        <div class="agents-benefit">
          <span class="agents-benefit__icon">💬</span>
          <h3>Support at Every Step</h3>
          <p>From first showing to final signature, you'll have a trusted partner by your side.</p>
        </div>
      </div>
    </div>
  </section>
  <section class="agents-cta">
    <div class="agents-cta__content">
      <h2>Ready to connect?</h2>
      <p>Let's match you with an agent who will champion your goals and guide you home.</p>
      <router-link to="/signup" class="agents-cta__button">Get Started</router-link>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.agents-hero {
  background: linear-gradient(120deg, #e3f0ff 0%, #f7f8fa 100%);
  padding: 64px 0 40px 0;
  text-align: center;
}
.agents-hero__title {
  font-size: 2.6rem;
  font-weight: 800;
  color: #003366;
  margin-bottom: 0.5rem;
}
.agents-hero__subtitle {
  font-size: 1.25rem;
  color: #0052a5;
  font-weight: 500;
}
.agents-benefits__container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 16px 32px 16px;
  text-align: center;
}
.agents-benefits__container h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #003366;
  margin-bottom: 1.2rem;
}
.agents-benefits__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  margin-top: 2.5rem;
}
.agents-benefit {
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
.agents-benefit__icon {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}
.agents-benefit h3 {
  font-size: 1.18rem;
  font-weight: 700;
  color: #0052a5;
  margin: 0 0 0.2rem 0;
}
.agents-benefit p {
  color: #444;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
}
.agents-cta {
  background: #0052a5;
  color: #fff;
  padding: 48px 0;
  text-align: center;
}
.agents-cta__content h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
}
.agents-cta__content p {
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}
.agents-cta__button {
  background: #fff;
  color: #0052a5;
  font-weight: 700;
  padding: 0.9rem 2.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  display: inline-block;
}
.agents-cta__button:hover {
  background: #003366;
  color: #fff;
}
@media (max-width: 900px) {
  .agents-benefits__grid {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
}
</style>
