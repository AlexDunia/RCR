<template>
  <PublicHeader :transparent="true" :is-fixed="isHeaderFixed" />
  <section id="hero-section" class="careers-hero">
    <div class="careers-hero__content">
      <h1 class="careers-hero__title">Grow With Real City</h1>
      <p class="careers-hero__subtitle">Shape the future of real estate. Build your career with purpose, innovation, and heart.</p>
    </div>
  </section>
  <section class="careers-values">
    <div class="careers-values__container">
      <h2>Why Join Us?</h2>
      <div class="careers-values__grid">
        <div class="careers-value">
          <span class="careers-value__icon">🌱</span>
          <h3>Personal Growth</h3>
          <p>We invest in your development, offering mentorship, learning, and real opportunities to advance.</p>
        </div>
        <div class="careers-value">
          <span class="careers-value__icon">🤝</span>
          <h3>Meaningful Impact</h3>
          <p>Your work helps families find homes, agents build careers, and communities thrive. Every day, you make a difference.</p>
        </div>
        <div class="careers-value">
          <span class="careers-value__icon">💡</span>
          <h3>Innovative Spirit</h3>
          <p>We're reimagining real estate with technology, creativity, and a passion for better experiences.</p>
        </div>
      </div>
    </div>
  </section>
  <section class="careers-cta">
    <div class="careers-cta__content">
      <h2>Ready to make your mark?</h2>
      <p>Join a team that values your story and empowers your future.</p>
      <a href="mailto:careers@realcity.com" class="careers-cta__button">See Open Roles</a>
    </div>
  </section>
</template>

<script setup>
import PublicHeader from '@/components/PublicHeader.vue';
import { useFixedHeader } from '@/composables/useFixedHeader';

const { isHeaderFixed } = useFixedHeader('hero-section');
</script>

<style scoped>
.careers-hero {
  background: linear-gradient(120deg, #e3f0ff 0%, #f7f8fa 100%);
  padding: 120px 0 40px 0;
  text-align: center;
}
.careers-hero__title {
  font-size: 2.6rem;
  font-weight: 800;
  color: #003366;
  margin-bottom: 0.5rem;
}
.careers-hero__subtitle {
  font-size: 1.25rem;
  color: #0052a5;
  font-weight: 500;
}
.careers-values__container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 16px 32px 16px;
  text-align: center;
}
.careers-values__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  margin-top: 2.5rem;
}
.careers-value {
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
.careers-value__icon {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}
.careers-value h3 {
  font-size: 1.18rem;
  font-weight: 700;
  color: #0052a5;
  margin: 0 0 0.2rem 0;
}
.careers-value p {
  color: #444;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
}
.careers-cta {
  background: #0052a5;
  color: #fff;
  padding: 48px 0;
  text-align: center;
}
.careers-cta__content h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
}
.careers-cta__content p {
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}
.careers-cta__button {
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
.careers-cta__button:hover {
  background: #003366;
  color: #fff;
}
@media (max-width: 900px) {
  .careers-values__grid {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
}
</style>
