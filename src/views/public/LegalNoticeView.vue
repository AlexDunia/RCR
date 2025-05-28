<template>
  <div class="legal-container">
    <GlobalHeader />
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Legal Notice</h1>
        <p class="hero-subtitle">Important legal information about our services, disclaimers, and your rights as a user.</p>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="legal-content">
      <div class="content-wrapper">
        <!-- Introduction Section -->
        <section class="legal-section">
          <h2 class="section-title">Introduction</h2>
          <div class="story-content">
            <p>This Legal Notice contains important information about your use of Real City Realty's services. It outlines our legal obligations, disclaimers, and your rights as a user of our platform.</p>
            <p>By accessing and using our services, you acknowledge that you have read, understood, and agree to be bound by these legal notices.</p>
          </div>
        </section>

        <!-- Key Legal Points Section -->
        <section class="legal-section">
          <h2 class="section-title">Key Legal Points</h2>
          <div class="legal-grid">
            <div class="legal-card">
              <span class="legal-icon">⚖️</span>
              <h3>Legal Status</h3>
              <p>Real City Realty is a registered real estate brokerage operating under applicable state and federal laws.</p>
              <p>Our services are provided in compliance with all relevant real estate regulations.</p>
            </div>
            <div class="legal-card">
              <span class="legal-icon">📋</span>
              <h3>Disclaimer</h3>
              <p>All property information is provided "as is" without warranty of any kind. We make no guarantees about the accuracy of listings.</p>
              <p>Users should verify all information independently.</p>
            </div>
            <div class="legal-card">
              <span class="legal-icon">🔒</span>
              <h3>Intellectual Property</h3>
              <p>All content, trademarks, and intellectual property on our platform are owned by Real City Realty.</p>
              <p>Unauthorized use of our intellectual property is prohibited.</p>
            </div>
            <div class="legal-card">
              <span class="legal-icon">⚠️</span>
              <h3>Limitation of Liability</h3>
              <p>We are not liable for any damages arising from the use of our services or inability to access our platform.</p>
              <p>This includes direct, indirect, or consequential damages.</p>
            </div>
          </div>
        </section>

        <!-- Detailed Legal Section -->
        <section class="legal-section">
          <h2 class="section-title">Detailed Legal Information</h2>
          <div class="detailed-legal">
            <div class="legal-block">
              <h3>1. Company Information</h3>
              <p>Real City Realty is a registered real estate brokerage. Our business address, contact information, and registration details are available upon request. We operate under the laws and regulations of the jurisdictions in which we provide services.</p>
            </div>
            <div class="legal-block">
              <h3>2. Service Disclaimer</h3>
              <p>While we strive to provide accurate and up-to-date information, we make no representations or warranties about the completeness, accuracy, reliability, suitability, or availability of our services. Users should independently verify all information.</p>
            </div>
            <div class="legal-block">
              <h3>3. Third-Party Links</h3>
              <p>Our platform may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party websites. Users access these links at their own risk.</p>
            </div>
            <div class="legal-block">
              <h3>4. Governing Law</h3>
              <p>These legal notices are governed by and construed in accordance with the laws of the jurisdiction in which Real City Realty operates. Any disputes shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.</p>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section class="legal-section cta-section">
          <h2>Need Legal Assistance?</h2>
          <p>If you have any questions about our legal notices or need clarification on any points, please contact our legal team.</p>
          <button class="cta-button">Contact Legal Team</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue';
</script>

<style scoped>
.legal-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f9fafb;
}

.hero-section {
  position: relative;
  height: 60vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
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

.legal-content {
  padding: 4rem 0;
}

.content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.legal-section {
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

.legal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.legal-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.legal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.legal-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.legal-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
}

.legal-card p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.detailed-legal {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
}

.legal-block {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.legal-block h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.legal-block p {
  color: #4b5563;
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

  .legal-content {
    padding: 2rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .legal-grid {
    grid-template-columns: 1fr;
  }

  .cta-section {
    padding: 3rem 1rem;
  }
}
</style> 