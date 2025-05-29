<template>
  <div class="privacy-container">
    <GlobalHeader />
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content about-aligned-container">
        <div class="hero-flex">
          <div class="hero-left">
            <div class="hero-badge">
              <span class="badge-icon">🔒</span>
              <span>Privacy First</span>
            </div>
            <h1 class="hero-title">Privacy Policy</h1>
            <p class="hero-subtitle">Your privacy is our top priority. Discover how we protect, use, and empower your data in a transparent and secure way.</p>
            <div class="hero-cta">
              <button class="scroll-indicator">
                <span>Explore our privacy commitment</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="hero-visual">
            <div class="floating-shapes">
              <div class="shape shape-1"></div>
              <div class="shape shape-2"></div>
              <div class="shape shape-3"></div>
              <div class="shape shape-4"></div>
            </div>
            <div class="privacy-shield">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 20L20 50V100C20 150 60 180 100 180C140 180 180 150 180 100V50L100 20Z" fill="url(#shield-gradient)" fill-opacity="0.1"/>
                <path d="M100 20L20 50V100C20 150 60 180 100 180C140 180 180 150 180 100V50L100 20Z" stroke="url(#shield-stroke)" stroke-width="2"/>
                <defs>
                  <linearGradient id="shield-gradient" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#0066CC"/>
                    <stop offset="1" stop-color="#2563EB"/>
                  </linearGradient>
                  <linearGradient id="shield-stroke" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#0066CC"/>
                    <stop offset="1" stop-color="#2563EB"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-container about-aligned-container">
      <div class="privacy-content">
        <!-- Introduction Section -->
        <section id="introduction" class="privacy-section animate-section">
          <div class="section-header">
            <div class="section-accent"></div>
            <h2 class="section-title">Introduction</h2>
          </div>
          <div class="story-content">
            <div class="content-card">
              <p class="highlight-text">At Real City Realty, your privacy is at the core of our values.</p>
              <p>This policy explains how we collect, use, and safeguard your information when you interact with our platform. We believe in complete transparency and are committed to protecting your personal data with the highest standards of security.</p>
              <p>By using our services, you agree to the practices described here. We encourage you to read this policy carefully and reach out with any questions.</p>
            </div>
          </div>
        </section>

        <!-- Key Privacy Points Section -->
        <section id="key-points" class="privacy-section animate-section">
          <div class="section-header">
            <div class="section-accent"></div>
            <h2 class="section-title">Key Privacy Points</h2>
          </div>
          <div class="privacy-grid">
            <div class="privacy-card">
              <div class="card-icon">📊</div>
              <div class="card-content">
                <h3>Information We Collect</h3>
                <ul class="feature-list">
                  <li>Personal details (name, email, phone, address)</li>
                  <li>Usage data and cookies</li>
                  <li>Property preferences and search history</li>
                </ul>
              </div>
            </div>
            <div class="privacy-card">
              <div class="card-icon">🔐</div>
              <div class="card-content">
                <h3>How We Use Your Data</h3>
                <p>We use your data to provide, personalize, and secure our services, and to communicate important updates about your real estate journey.</p>
              </div>
            </div>
            <div class="privacy-card">
              <div class="card-icon">🤝</div>
              <div class="card-content">
                <h3>Data Sharing</h3>
                <p>We only share your data with trusted partners for service delivery. We never sell your personal information to third parties.</p>
              </div>
            </div>
            <div class="privacy-card">
              <div class="card-icon">🔒</div>
              <div class="card-content">
                <h3>Data Security</h3>
                <p>Your data is encrypted, stored securely, and protected by advanced security measures and regular audits.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Detailed Privacy Section -->
        <section id="detailed" class="privacy-section animate-section">
          <div class="section-header">
            <div class="section-accent"></div>
            <h2 class="section-title">Detailed Privacy Information</h2>
          </div>
          <div class="detailed-privacy">
            <div class="privacy-block">
              <div class="block-number">01</div>
              <div class="block-content">
                <h3>Information Collection</h3>
                <p>We collect information you provide directly, such as when you create an account or contact us. This includes your name, email, and other contact details necessary for providing our real estate services.</p>
              </div>
            </div>
            <div class="privacy-block">
              <div class="block-number">02</div>
              <div class="block-content">
                <h3>Cookies & Tracking</h3>
                <p>We use cookies and similar technologies to enhance your experience and analyze site usage. You can manage your cookie preferences at any time through our privacy settings.</p>
              </div>
            </div>
            <div class="privacy-block">
              <div class="block-number">03</div>
              <div class="block-content">
                <h3>Data Retention</h3>
                <p>Your data is retained only as long as necessary for service delivery and legal compliance. You may request deletion of your data at any time through your account settings.</p>
              </div>
            </div>
            <div class="privacy-block">
              <div class="block-number">04</div>
              <div class="block-content">
                <h3>Your Rights</h3>
                <p>You have the right to access, correct, or delete your data, and to object to or restrict certain processing activities. We respect your privacy choices and provide easy-to-use tools to manage your preferences.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="privacy-section cta-section animate-section">
          <div class="cta-content">
            <h2>Questions About Your Privacy?</h2>
            <p>Our dedicated privacy team is here to help you understand how your data is handled and protected.</p>
            <button class="cta-button">
              <span>Contact Privacy Team</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue';
import { onMounted } from 'vue';

onMounted(() => {
  // Intersection Observer for animations
  const sections = document.querySelectorAll('.animate-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      document.querySelector('.privacy-content')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
</script>

<style scoped>
.privacy-container {
  width: 100%;
  min-height: 100vh;
  background: #f9fafb;
  color: #1a1a1a;
}

.about-aligned-container {
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding-left: 32px;
  padding-right: 32px;
  box-sizing: border-box;
}

.hero-section {
  position: relative;
  padding: 4rem 0 3rem;
  background: linear-gradient(135deg, #e0f7fa 0%, #e3eafe 100%);
  overflow: hidden;
  margin-top: 64px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 102, 204, 0.1);
  color: #0066cc;
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(8px);
}

.badge-icon {
  font-size: 1.25rem;
}

.hero-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

.hero-left {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(135deg, #0066cc 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-visual {
  flex: 1;
  position: relative;
  height: 400px;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 102, 204, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%);
  animation: float 6s ease-in-out infinite;
  backdrop-filter: blur(8px);
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 45%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 15%;
  left: 45%;
  animation-delay: 4s;
}

.shape-4 {
  width: 80px;
  height: 80px;
  top: 30%;
  right: 35%;
  animation-delay: 1s;
}

.privacy-shield {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.05); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.quick-nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 80px;
  z-index: 100;
  backdrop-filter: blur(8px);
}

.nav-item {
  padding: 0.75rem 1.5rem;
  color: #4b5563;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-item:hover {
  background: rgba(0, 102, 204, 0.1);
  color: #0066cc;
}

.privacy-section {
  margin-bottom: 4rem;
  background: #fff;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.privacy-section:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.section-header {
  margin-bottom: 2rem;
}

.section-accent {
  width: 48px;
  height: 4px;
  background: linear-gradient(90deg, #0066cc 0%, #2563eb 100%);
  border-radius: 2px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.content-card {
  background: #f8fafc;
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.highlight-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0066cc;
  margin-bottom: 1rem;
}

.privacy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.privacy-card {
  background: #fff;
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.privacy-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.05);
  border-color: #0066cc;
}

.card-icon {
  font-size: 2.5rem;
  background: rgba(0, 102, 204, 0.1);
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
}

.card-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  color: #4b5563;
}

.feature-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #0066cc;
  font-weight: bold;
}

.detailed-privacy {
  display: grid;
  gap: 2rem;
}

.privacy-block {
  display: flex;
  gap: 2rem;
  background: #f8fafc;
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.privacy-block:hover {
  transform: translateX(8px);
  border-color: #0066cc;
  background: #fff;
}

.block-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0066cc;
  opacity: 0.5;
}

.block-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.block-content p {
  color: #4b5563;
  line-height: 1.6;
}

.cta-section {
  text-align: center;
  background: linear-gradient(135deg, #f7f8fa 0%, #e3f0ff 100%);
  padding: 4rem;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #0066cc;
  color: white;
  padding: 1rem 2rem;
  border-radius: 100px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
}

.cta-button:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.2);
}

.scroll-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #0066cc;
  font-weight: 600;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  transition: all 0.3s ease;
}

.scroll-indicator:hover {
  background: rgba(0, 102, 204, 0.1);
  transform: translateY(-2px);
}

/* Animations */
.animate-section {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-section.in-view {
  opacity: 1;
  transform: none;
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }
  .hero-flex {
    flex-direction: column;
    text-align: center;
  }
  .hero-left {
    max-width: 100%;
  }
  .quick-nav {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .privacy-section {
    padding: 2rem;
  }
  .section-title {
    font-size: 2rem;
  }
  .privacy-block {
    flex-direction: column;
    gap: 1rem;
  }
  .quick-nav {
    padding: 0.5rem;
  }
  .nav-item {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .privacy-section {
    padding: 1.5rem;
  }
  .quick-nav {
    display: none;
  }
}
</style>
