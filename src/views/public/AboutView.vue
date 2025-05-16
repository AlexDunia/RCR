<template>
  <section class="about-hero">
    <div class="about-hero__content">
      <h1 class="about-hero__title">Our Story</h1>
      <p class="about-hero__subtitle">Empowering dreams, building communities, and redefining real estate for everyone.</p>
    </div>
  </section>
  <section class="about-mission">
    <div class="about-mission__container">
      <h2>Who We Are</h2>
      <p>
        Real City was founded on a simple belief: finding a home should be a journey of hope, not hassle. We blend technology, heart, and local expertise to help people move forward—whether it's their first apartment, a dream home, or a new investment.
      </p>
      <div class="about-values__grid">
        <div class="about-value">
          <span class="about-value__icon">🏡</span>
          <h3>People First</h3>
          <p>We put people at the center of every decision, every innovation, and every success story.</p>
        </div>
        <div class="about-value">
          <span class="about-value__icon">🚀</span>
          <h3>Relentless Innovation</h3>
          <p>We're always pushing boundaries to make real estate simpler, smarter, and more accessible.</p>
        </div>
        <div class="about-value">
          <span class="about-value__icon">🤲</span>
          <h3>Community Impact</h3>
          <p>We believe in giving back and building neighborhoods where everyone can thrive.</p>
        </div>
      </div>
    </div>
  </section>
  <section class="about-cta">
    <div class="about-cta__content">
      <h2>Let's Move Forward Together</h2>
      <p>Whether you're buying, selling, or dreaming, we're here to help you write your next chapter.</p>
      <router-link to="/find-agents" class="about-cta__button">Meet Our Agents</router-link>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.about-hero {
  background: linear-gradient(120deg, #e3f0ff 0%, #f7f8fa 100%);
  padding: 64px 0 40px 0;
  text-align: center;
}
.about-hero__title {
  font-size: 2.6rem;
  font-weight: 800;
  color: #003366;
  margin-bottom: 0.5rem;
}
.about-hero__subtitle {
  font-size: 1.25rem;
  color: #0052a5;
  font-weight: 500;
}
.about-mission__container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 16px 32px 16px;
  text-align: center;
}
.about-mission__container h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #003366;
  margin-bottom: 1.2rem;
}
.about-mission__container p {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 2.2rem;
}
.about-values__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  margin-top: 1.5rem;
}
.about-value {
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
.about-value__icon {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}
.about-value h3 {
  font-size: 1.18rem;
  font-weight: 700;
  color: #0052a5;
  margin: 0 0 0.2rem 0;
}
.about-value p {
  color: #444;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
}
.about-cta {
  background: #0052a5;
  color: #fff;
  padding: 48px 0;
  text-align: center;
}
.about-cta__content h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
}
.about-cta__content p {
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}
.about-cta__button {
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
.about-cta__button:hover {
  background: #003366;
  color: #fff;
}
@media (max-width: 900px) {
  .about-values__grid {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
}
</style>
