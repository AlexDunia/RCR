<template>
  <div class="privacy-container">
    <GlobalHeader />
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Privacy Policy</h1>
        <p class="hero-subtitle">Your privacy is important to us. Learn how we collect, use, and protect your personal information.</p>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="privacy-content">
      <div class="content-wrapper">
        <!-- Introduction Section -->
        <section class="privacy-section">
          <h2 class="section-title">Introduction</h2>
          <div class="story-content">
            <p>At Real City Realty, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
            <p>Please read this privacy policy carefully. By using our services, you consent to the practices described in this policy.</p>
          </div>
        </section>

        <!-- Key Privacy Points Section -->
        <section class="privacy-section">
          <h2 class="section-title">Key Privacy Points</h2>
          <div class="privacy-grid">
            <div class="privacy-card">
              <span class="privacy-icon">📊</span>
              <h3>Information We Collect</h3>
              <p>We collect personal information such as name, email, phone number, and address when you register or use our services.</p>
              <p>We also collect usage data and cookies to improve your experience.</p>
            </div>
            <div class="privacy-card">
              <span class="privacy-icon">🔐</span>
              <h3>How We Use Your Data</h3>
              <p>We use your information to provide and improve our services, communicate with you, and ensure a secure experience.</p>
              <p>Your data helps us personalize your experience and maintain our services.</p>
            </div>
            <div class="privacy-card">
              <span class="privacy-icon">🤝</span>
              <h3>Data Sharing</h3>
              <p>We may share your information with trusted partners and service providers who assist in operating our website and services.</p>
              <p>We never sell your personal information to third parties.</p>
            </div>
            <div class="privacy-card">
              <span class="privacy-icon">🔒</span>
              <h3>Data Security</h3>
              <p>We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.</p>
              <p>Your data is encrypted and stored securely.</p>
            </div>
          </div>
        </section>

        <!-- Detailed Privacy Section -->
        <section class="privacy-section">
          <h2 class="section-title">Detailed Privacy Information</h2>
          <div class="detailed-privacy">
            <div class="privacy-block">
              <h3>1. Information Collection</h3>
              <p>We collect information that you provide directly to us, such as when you create an account, fill out forms, or communicate with us. This may include your name, email address, phone number, and other contact information.</p>
            </div>
            <div class="privacy-block">
              <h3>2. Cookies and Tracking</h3>
              <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.</p>
            </div>
            <div class="privacy-block">
              <h3>3. Data Retention</h3>
              <p>We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your data at any time.</p>
            </div>
            <div class="privacy-block">
              <h3>4. Your Rights</h3>
              <p>You have the right to access, correct, or delete your personal information. You can also object to our processing of your data and request data portability.</p>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section class="privacy-section cta-section">
          <h2>Questions About Your Privacy?</h2>
          <p>If you have any questions about our Privacy Policy or how we handle your data, please contact our privacy team.</p>
          <button class="cta-button">Contact Privacy Team</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue';
</script>

<style scoped>
.privacy-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f9fafb;
}

.hero-section {
  position: relative;
  height: 60vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
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

.privacy-content {
  padding: 4rem 0;
}

.content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.privacy-section {
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

.privacy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.privacy-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.privacy-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.privacy-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.privacy-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
}

.privacy-card p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.detailed-privacy {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
}

.privacy-block {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.privacy-block h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.privacy-block p {
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

  .privacy-content {
    padding: 2rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .privacy-grid {
    grid-template-columns: 1fr;
  }

  .cta-section {
    padding: 3rem 1rem;
  }
}
</style>
