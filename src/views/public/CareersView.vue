<template>
  <div class="careers-container">
    <GlobalHeader />
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Join Our Team</h1>
        <p class="hero-subtitle">Build your career with Real City Realty. We're looking for passionate individuals who want to make a difference in real estate.</p>
      </div>
    </div>

    <div class="main-container">
      <!-- Main Content Section -->
      <div class="careers-content">
        <div class="content-wrapper">
          <!-- Why Join Us Section -->
          <section class="careers-section">
            <h2 class="section-title">Why Join Real City Realty?</h2>
            <div class="story-content">
              <p>At Real City Realty, we believe in creating an environment where talent thrives and innovation flourishes. We're not just a real estate company – we're a community of professionals dedicated to transforming the industry.</p>
              <p>Join us and be part of a team that values growth, collaboration, and excellence in everything we do.</p>
            </div>
          </section>

          <!-- Benefits Section -->
          <section class="careers-section">
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
          <section class="careers-section">
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
          <section class="careers-section cta-section">
            <h2>Ready to Start Your Journey?</h2>
            <p>Don't see a position that matches your skills? We're always looking for talented individuals to join our team.</p>
            <button class="cta-button">Send Your Resume</button>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue';
</script>

<style scoped>
.careers-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f9fafb;
}

.hero-section {
  position: relative;
  height: 60vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 0;
  margin-bottom: 0;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4));
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: left;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  max-width: 600px;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 400;
  line-height: 1.5;
  max-width: 500px;
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
}

.careers-content {
  padding: 4rem 0;
}

.content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.careers-section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
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
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.value-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.value-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
}

.value-card p {
  color: #6b7280;
  line-height: 1.6;
}

.positions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.position-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.position-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.position-location {
  color: #0066cc;
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
  color: #0066cc;
  position: absolute;
  left: 0;
}

.apply-button {
  display: inline-block;
  background: #0066cc;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.apply-button:hover {
  background: #0052a5;
}

.cta-section {
  text-align: center;
  background: linear-gradient(135deg, #f7f8fa 0%, #e3f0ff 100%);
  padding: 4rem 2rem;
  border-radius: 12px;
  margin-top: 4rem;
}

.cta-section h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  display: inline-block;
  background: #0066cc;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cta-button:hover {
  background: #0052a5;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .careers-content {
    padding: 2rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .values-grid,
  .positions-grid {
    grid-template-columns: 1fr;
  }

  .cta-section {
    padding: 3rem 1rem;
  }
}
</style>
