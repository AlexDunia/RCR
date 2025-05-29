<template>
  <div class="terms-container">
    <GlobalHeader />

    <!-- Hero Section with 3D Effect -->
    <div class="hero-section">
      <div class="hero-content about-aligned-container">
        <div class="hero-flex">
          <div class="hero-left">
            <div class="hero-badge">Legal Information</div>
            <h1 class="hero-title">Terms & Conditions</h1>
            <p class="hero-subtitle">Your guide to understanding our commitment to transparency and your rights as a user.</p>
            <div class="hero-cta">
              <button class="scroll-indicator">
                <span>Scroll to explore</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-container about-aligned-container">
      <div class="terms-content">
        <!-- Introduction Section -->
        <section id="introduction" class="terms-section animate-section">
          <div class="section-header">
            <div class="section-accent"></div>
            <h2 class="section-title">Introduction</h2>
          </div>
          <div class="story-content">
            <div class="content-card">
              <p>Welcome to Real City Realty. These terms and conditions outline the rules and regulations for the use of our website and services.</p>
              <p>By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Real City Realty's website if you do not accept all of the terms and conditions stated on this page.</p>
            </div>
          </div>
        </section>

        <!-- Key Terms Section -->
        <section id="key-terms" class="terms-section animate-section">
          <div class="section-header">
            <div class="section-accent"></div>
            <h2 class="section-title">Key Terms</h2>
          </div>
          <div class="terms-grid">
            <div class="term-card">
              <div class="card-icon">📝</div>
              <div class="card-content">
                <h3>Definitions</h3>
                <ul>
                  <li>"Website" refers to Real City Realty</li>
                  <li>"Service" refers to our real estate platform</li>
                  <li>"User" refers to you, our valued client</li>
                </ul>
              </div>
            </div>
            <div class="term-card">
              <div class="card-icon">🔒</div>
              <div class="card-content">
                <h3>Privacy Policy</h3>
                <p>Your privacy is our priority. Our comprehensive Privacy Policy ensures your data is protected and used responsibly.</p>
              </div>
            </div>
            <div class="term-card">
              <div class="card-icon">📋</div>
              <div class="card-content">
                <h3>User Responsibilities</h3>
                <p>Maintain account security and provide accurate information. Your cooperation helps us serve you better.</p>
              </div>
            </div>
            <div class="term-card">
              <div class="card-icon">⚖️</div>
              <div class="card-content">
                <h3>Legal Compliance</h3>
                <p>We maintain the highest standards of legal compliance to ensure a safe and trustworthy platform.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Detailed Terms Section -->
        <section id="detailed-terms" class="terms-section animate-section">
          <div class="section-header">
            <div class="section-accent"></div>
            <h2 class="section-title">Detailed Terms</h2>
          </div>
          <div class="detailed-terms">
            <div class="term-block">
              <div class="term-number">01</div>
              <div class="term-content">
                <h3>Intellectual Property</h3>
                <p>Our platform's content and functionality are protected by international intellectual property laws, ensuring your trust and security.</p>
              </div>
            </div>
            <div class="term-block">
              <div class="term-number">02</div>
              <div class="term-content">
                <h3>User Accounts</h3>
                <p>Your account security is paramount. We provide robust protection while you maintain control of your information.</p>
              </div>
            </div>
            <div class="term-block">
              <div class="term-number">03</div>
              <div class="term-content">
                <h3>Service Usage</h3>
                <p>We continuously improve our services to provide you with the best possible experience in real estate.</p>
              </div>
            </div>
            <div class="term-block">
              <div class="term-number">04</div>
              <div class="term-content">
                <h3>Limitation of Liability</h3>
                <p>We maintain clear boundaries to ensure sustainable service delivery while protecting all parties involved.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="terms-section cta-section animate-section">
          <div class="cta-content">
            <h2>Questions About Our Terms?</h2>
            <p>Our legal team is here to help you understand our terms and conditions better.</p>
            <button class="cta-button">
              <span>Contact Legal Team</span>
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
      document.querySelector('.terms-content')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
</script>

<style scoped>
.terms-container {
  width: 100%;
  min-height: 100vh;
  background: #fff;
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
  padding: 3rem 0 2.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
  overflow: hidden;
  margin-top: 64px;
}

.hero-badge {
  display: inline-block;
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
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
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #4b5563;
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
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%);
  animation: float 6s ease-in-out infinite;
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
  top: 40%;
  right: 20%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 40%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.terms-section {
  margin-bottom: 4rem;
  background: #fff;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.terms-section:hover {
  transform: translateY(-4px);
}

.section-header {
  margin-bottom: 2rem;
}

.section-accent {
  width: 48px;
  height: 4px;
  background: linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%);
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
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.term-card {
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.term-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.05);
  border-color: #2563eb;
}

.card-icon {
  font-size: 2.5rem;
  background: rgba(37, 99, 235, 0.1);
  width: 64px;
  height: 64px;
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

.card-content p, .card-content li {
  color: #4b5563;
  line-height: 1.6;
}

.detailed-terms {
  display: grid;
  gap: 2rem;
}

.term-block {
  display: flex;
  gap: 2rem;
  background: #f8fafc;
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.term-block:hover {
  transform: translateX(8px);
  border-color: #2563eb;
}

.term-number {
  font-size: 2rem;
  font-weight: 800;
  color: #2563eb;
  opacity: 0.5;
}

.term-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.term-content p {
  color: #4b5563;
  line-height: 1.6;
}

.cta-section {
  text-align: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
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
  background: #2563eb;
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
  background: #1d4ed8;
  transform: translateY(-2px);
}

.scroll-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  transition: all 0.3s ease;
}

.scroll-indicator:hover {
  background: rgba(37, 99, 235, 0.1);
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
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .terms-section {
    padding: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .term-block {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .terms-section {
    padding: 1.5rem;
  }
}
</style>
