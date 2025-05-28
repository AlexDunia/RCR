<template>
  <div class="about-container">
  <GlobalHeader />
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">About Real City Realty</h1>
        <p class="hero-subtitle">Building dreams, one home at a time. Discover our story and mission to transform the real estate experience.</p>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="about-content">
      <div class="content-wrapper">
        <!-- Our Story Section -->
        <section class="about-section">
          <h2 class="section-title">Our Story</h2>
          <div class="story-content">
            <p>Founded in 2010, Real City Realty has grown from a small local agency to one of the most trusted names in real estate. Our journey began with a simple mission: to make real estate accessible, transparent, and enjoyable for everyone.</p>
            <p>Today, we're proud to serve thousands of families and individuals, helping them find their perfect homes and make smart real estate investments.</p>
    </div>
  </section>

        <!-- Values Section -->
        <section class="about-section">
          <h2 class="section-title">Our Values</h2>
          <div class="values-grid">
            <div class="value-card">
              <span class="value-icon">🏡</span>
          <h3>People First</h3>
              <p>We put our clients' needs at the heart of everything we do, ensuring personalized service and attention to detail.</p>
        </div>
            <div class="value-card">
              <span class="value-icon">🤝</span>
              <h3>Integrity</h3>
              <p>We believe in honest, transparent communication and ethical business practices in all our dealings.</p>
        </div>
            <div class="value-card">
              <span class="value-icon">💡</span>
              <h3>Innovation</h3>
              <p>We continuously embrace new technologies and methods to improve the real estate experience.</p>
        </div>
            <div class="value-card">
              <span class="value-icon">🌱</span>
              <h3>Sustainability</h3>
              <p>We're committed to promoting sustainable living and environmentally conscious real estate practices.</p>
      </div>
    </div>
  </section>

        <!-- Team Section -->
        <section class="about-section">
          <h2 class="section-title">Our Leadership Team</h2>
          <div class="team-grid">
            <div class="team-card">
              <img src="https://ui-avatars.com/api/?name=John+Doe&background=0066cc&color=fff" alt="John Doe" class="team-avatar">
              <h3>John Doe</h3>
              <p class="team-role">Founder & CEO</p>
              <p class="team-bio">With over 20 years of experience in real estate, John leads our company with vision and passion.</p>
            </div>
            <div class="team-card">
              <img src="https://ui-avatars.com/api/?name=Jane+Smith&background=0066cc&color=fff" alt="Jane Smith" class="team-avatar">
              <h3>Jane Smith</h3>
              <p class="team-role">Chief Operations Officer</p>
              <p class="team-bio">Jane ensures our operations run smoothly while maintaining the highest standards of service.</p>
            </div>
            <div class="team-card">
              <img src="https://ui-avatars.com/api/?name=Mike+Johnson&background=0066cc&color=fff" alt="Mike Johnson" class="team-avatar">
              <h3>Mike Johnson</h3>
              <p class="team-role">Head of Technology</p>
              <p class="team-bio">Mike drives our digital innovation, making real estate more accessible through technology.</p>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="about-section cta-section">
          <h2>Ready to Start Your Journey?</h2>
          <p>Whether you're buying, selling, or investing, we're here to help you achieve your real estate goals.</p>
          <router-link to="/find-agents" class="cta-button">Find Your Agent</router-link>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue';
</script>

<style scoped>
.about-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f9fafb;
}

.hero-section {
  position: relative;
  height: 60vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80');
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

.about-content {
  padding: 4rem 0;
}

.content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.about-section {
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

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.team-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.team-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
}

.team-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.team-role {
  color: #0066cc;
  font-weight: 500;
  margin-bottom: 1rem;
}

.team-bio {
  color: #6b7280;
  line-height: 1.6;
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

  .about-content {
    padding: 2rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .values-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }

  .cta-section {
    padding: 3rem 1rem;
  }
}
</style>