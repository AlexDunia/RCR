<template>
  <div class="careers-container">
    <GlobalHeader />
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content about-aligned-container">
        <div class="hero-flex">
          <div class="hero-left">
            <h1 class="hero-title">Join Our Team</h1>
            <p class="hero-subtitle">Build your career with Real City Realty. We're looking for passionate individuals who want to make a difference in real estate.</p>
            <button class="hero-cta-btn" @click="scrollToPositions">See Open Roles &rarr;</button>
          </div>
        </div>
      </div>
    </div>

    <div class="main-container about-aligned-container">
      <!-- Main Content Section -->
      <div class="careers-content">
        <!-- Why Join Us Section -->
        <section class="careers-section animate-section">
          <div class="section-accent"></div>
          <h2 class="section-title">Why Join Real City Realty?</h2>
          <div class="story-content">
            <p>At Real City Realty, we believe in creating an environment where talent thrives and innovation flourishes. We're not just a real estate company – we're a community of professionals dedicated to transforming the industry.</p>
            <p>Join us and be part of a team that values growth, collaboration, and excellence in everything we do.</p>
          </div>
        </section>

        <!-- Benefits Section -->
        <section class="careers-section animate-section">
          <div class="section-accent"></div>
          <h2 class="section-title">Benefits & Perks</h2>
          <div class="values-grid">
            <div class="value-card">
              <span class="value-icon">💼</span>
              <h3>Career Growth</h3>
              <p>Continuous learning opportunities and clear paths for advancement in your career.</p>
            </div>
            <div class="value-card">
              <span class="value-icon">🤝</span>
              <h3>Work-Life Balance</h3>
              <p>Flexible schedules and remote work options to maintain a healthy work-life balance.</p>
            </div>
            <div class="value-card">
              <span class="value-icon">🏆</span>
              <h3>Competitive Benefits</h3>
              <p>Comprehensive health coverage, retirement plans, and performance-based incentives.</p>
            </div>
            <div class="value-card">
              <span class="value-icon">🌱</span>
              <h3>Professional Development</h3>
              <p>Regular training sessions and mentorship programs to enhance your skills.</p>
            </div>
          </div>
        </section>

        <!-- Open Positions Section -->
        <section class="careers-section animate-section" id="open-positions">
          <div class="section-accent"></div>
          <h2 class="section-title">Open Positions</h2>
          <div class="positions-grid">
            <div class="position-card">
              <h3>Real Estate Agent</h3>
              <p class="position-location">Multiple Locations</p>
              <p class="position-description">Join our team of successful agents and help clients find their dream homes.</p>
              <ul class="position-requirements">
                <li>Real estate license required</li>
                <li>2+ years of experience preferred</li>
                <li>Strong communication skills</li>
              </ul>
              <button class="apply-button">Apply Now</button>
            </div>
            <div class="position-card">
              <h3>Property Manager</h3>
              <p class="position-location">Headquarters</p>
              <p class="position-description">Manage our growing portfolio of properties and ensure excellent tenant relations.</p>
              <ul class="position-requirements">
                <li>Property management experience</li>
                <li>Strong organizational skills</li>
                <li>Customer service oriented</li>
              </ul>
              <button class="apply-button">Apply Now</button>
            </div>
            <div class="position-card">
              <h3>Marketing Specialist</h3>
              <p class="position-location">Remote</p>
              <p class="position-description">Create compelling marketing campaigns and drive our digital presence.</p>
              <ul class="position-requirements">
                <li>Marketing degree or equivalent experience</li>
                <li>Social media expertise</li>
                <li>Creative mindset</li>
              </ul>
              <button class="apply-button">Apply Now</button>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="careers-section cta-section animate-section">
          <h2>Ready to Start Your Journey?</h2>
          <p>Don't see a position that matches your skills? We're always looking for talented individuals to join our team.</p>
          <button class="cta-button">Send Your Resume</button>
        </section>
      </div>
    </div>
    <PublicFooter />
  </div>
</template>

<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue';
import PublicFooter from '@/components/PublicFooter.vue';
import { onMounted } from 'vue';

function scrollToPositions() {
  const el = document.getElementById('open-positions');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

onMounted(() => {
  const sections = document.querySelectorAll('.animate-section');
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.01 });
  sections.forEach(section => {
    observer.observe(section);
    // Immediately check if already in view
    const rect = section.getBoundingClientRect();
    if (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    ) {
      section.classList.add('in-view');
    }
  });
});
</script>

<style scoped>
.careers-container {
  width: 100%;
  min-height: 100vh;
  background: #fff;
}

.about-aligned-container {
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  padding: 0 2.5vw;
  box-sizing: border-box;
}

.hero-section {
  position: relative;
  padding: 10rem 0 10rem 0;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background: linear-gradient(90deg, #e3f0ff 0%, #f9fafb 100%);
  display: flex;
  align-items: center;
  padding: 0;
  margin-bottom: 0;
  overflow: hidden;
  margin-top: 64px;
}

/* Remove background image and overlay */
.hero-section::before {
  display: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0 2rem;
  text-align: left;
  display: flex;
  align-items: center;
  height: 100%;
}

.hero-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 70px 0;
}

.hero-left {
  flex: 1 1 0;
  min-width: 0;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 900;
  color: #2563eb;
  margin-bottom: 0.5rem;
  line-height: 1.1;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  position: relative;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #374151;
  font-weight: 400;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
  font-family: 'Inter', system-ui, sans-serif;
}

.hero-cta-btn {
  display: inline-block;
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.15rem;
  border: none;
  box-shadow: 0 4px 16px rgba(59,130,246,0.10);
  cursor: pointer;
  transition: background 0.2s;
}
.hero-cta-btn:hover {
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
}

.careers-content {
  padding: 4rem 0;
}

.careers-section {
  margin-bottom: 3rem;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(59,130,246,0.07);
  padding: 2.5rem 2.5rem 2.5rem 2.5rem;
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
  position: relative;
  box-sizing: border-box;
}

.careers-section:first-of-type {
  margin-top: 0;
  background: #fff;
}

.section-accent {
  width: 48px;
  height: 5px;
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 3px;
  margin-bottom: 1.2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 2rem;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
}

.story-content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
}

.story-content p {
  margin-bottom: 1.5rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.value-card {
  background: linear-gradient(135deg, #f7f8fa 0%, #e3f0ff 100%);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(59,130,246,0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #e0e7ef;
  min-width: 0;
}

.value-card:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 4px 16px rgba(59,130,246,0.13);
}

.value-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.value-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.75rem;
}

.value-card p {
  color: #6b7280;
  line-height: 1.6;
}

.positions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.position-card {
  background: #fff;
  padding: 2rem 1.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(59,130,246,0.08);
  border: 1px solid #e0e7ef;
  transition: box-shadow 0.18s, transform 0.18s;
  min-width: 0;
}
.position-card:hover {
  box-shadow: 0 6px 24px rgba(59,130,246,0.13);
  transform: translateY(-6px) scale(1.03);
}

.position-card h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.5rem;
}

.position-location {
  color: #3b82f6;
  font-weight: 500;
  margin-bottom: 1rem;
}

.position-description {
  color: #4b5563;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.position-requirements {
  list-style-type: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.position-requirements li {
  color: #6b7280;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.position-requirements li::before {
  content: "•";
  color: #2563eb;
  position: absolute;
  left: 0;
}

.apply-button {
  display: inline-block;
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.apply-button:hover {
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
}

.cta-section {
  text-align: center;
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
  color: #fff;
  padding: 4rem 2rem;
  border-radius: 16px;
  margin-top: 4rem;
  box-shadow: 0 2px 12px rgba(59,130,246,0.08);
}

.cta-section h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.125rem;
  color: #e3f0ff;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  display: inline-block;
  background: #fff;
  color: #2563eb;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.cta-button:hover {
  background: #3b82f6;
  color: #fff;
}

@media (max-width: 900px) {
  .hero-flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
  .hero-left {
    width: 100%;
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .hero-title {
    font-size: 2rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .careers-section {
    padding: 1.2rem 0.5rem;
  }
}

/* Animate sections into view */
.animate-section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
.animate-section.in-view {
  opacity: 1;
  transform: none;
}
</style>
