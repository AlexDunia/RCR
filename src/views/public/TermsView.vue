<template>
  <div class="terms-container">
    <GlobalHeader />
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Terms & Conditions</h1>
        <p class="hero-subtitle">Please read these terms carefully before using our services. By accessing our platform, you agree to be bound by these terms.</p>
      </div>
    </div>

    <div class="main-container">
      <!-- Main Content Section -->
      <div class="terms-content">
        <div class="content-wrapper">
          <!-- Introduction Section -->
          <section class="terms-section">
            <h2 class="section-title">Introduction</h2>
            <div class="story-content">
              <p>Welcome to Real City Realty. These terms and conditions outline the rules and regulations for the use of our website and services.</p>
              <p>By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Real City Realty's website if you do not accept all of the terms and conditions stated on this page.</p>
            </div>
          </section>

          <!-- Key Terms Section -->
          <section class="terms-section">
            <h2 class="section-title">Key Terms</h2>
            <div class="terms-grid">
              <div class="term-card">
                <span class="term-icon">📝</span>
                <h3>Definitions</h3>
                <p>"Website" refers to Real City Realty, accessible from realcityrealty.com</p>
                <p>"Service" refers to the Company's website and real estate services</p>
                <p>"User" refers to the individual accessing or using the Service</p>
              </div>
              <div class="term-card">
                <span class="term-icon">🔒</span>
                <h3>Privacy Policy</h3>
                <p>Your use of our Service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.</p>
              </div>
              <div class="term-card">
                <span class="term-icon">📋</span>
                <h3>User Responsibilities</h3>
                <p>Users must provide accurate information and maintain the security of their accounts. Users are responsible for all activities that occur under their account.</p>
              </div>
              <div class="term-card">
                <span class="term-icon">⚖️</span>
                <h3>Legal Compliance</h3>
                <p>Users must comply with all applicable laws and regulations while using our Service. Any violation may result in immediate termination of access.</p>
              </div>
            </div>
          </section>

          <!-- Detailed Terms Section -->
          <section class="terms-section">
            <h2 class="section-title">Detailed Terms</h2>
            <div class="detailed-terms">
              <div class="term-block">
                <h3>1. Intellectual Property</h3>
                <p>The Service and its original content, features, and functionality are owned by Real City Realty and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
              </div>
              <div class="term-block">
                <h3>2. User Accounts</h3>
                <p>When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the security of your account and password.</p>
              </div>
              <div class="term-block">
                <h3>3. Service Usage</h3>
                <p>Our Service is provided "as is" and "as available" without any warranties, expressed or implied. We reserve the right to modify or discontinue the Service at any time.</p>
              </div>
              <div class="term-block">
                <h3>4. Limitation of Liability</h3>
                <p>In no event shall Real City Realty be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
              </div>
            </div>
          </section>

          <!-- Contact Section -->
          <section class="terms-section cta-section">
            <h2>Questions About Our Terms?</h2>
            <p>If you have any questions about these Terms and Conditions, please contact our legal team.</p>
            <button class="cta-button">Contact Legal Team</button>
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
.terms-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f9fafb;
}

.hero-section {
  position: relative;
  height: 60vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
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

.terms-content {
  padding: 4rem 0;
}

.content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.terms-section {
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

.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.term-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.term-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.term-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.term-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
}

.term-card p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.detailed-terms {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
}

.term-block {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.term-block h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.term-block p {
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

  .terms-content {
    padding: 2rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .terms-grid {
    grid-template-columns: 1fr;
  }

  .cta-section {
    padding: 3rem 1rem;
  }
}
</style>
