<template>
  <div class="about-container">
    <GlobalHeader />
    <div class="main-container about-aligned-container">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-bg-shape hero-bg-shape1"></div>
        <div class="hero-bg-shape hero-bg-shape2"></div>
        <div class="hero-content about-aligned-container">
          <div class="hero-flex">
            <div class="hero-left">
              <h1 class="hero-title-modern">
                <span>About <span class="hero-title-accent">Real City Realty</span></span>
                <div class="hero-underline"></div>
              </h1>
              <p class="hero-subtitle-modern">Building dreams, one home at a time. Discover our story and mission to transform the real estate experience.</p>
              <button class="hero-cta-btn" @click="scrollToStory">Get Started &rarr;</button>
            </div>
            <div class="hero-right">
              <div class="hero-info-card">
                <div class="hero-info-title">Trusted by 10,000+ clients</div>
                <div class="hero-info-rating">Rated 4.9/5 on all major platforms</div>
                <img src="https://www.svgrepo.com/show/331993/saas.svg" alt="SaaS Illustration" class="hero-info-img" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Section -->
      <div class="about-content">
        <div class="content-wrapper">
          <!-- Our Story Section -->
          <section class="about-section story-timeline-section animate-section" id="our-story">
            <h2 class="section-title">Our Story</h2>
            <div class="story-timeline about-aligned-container">
              <div class="story-timeline-center-line"></div>
              <div class="story-timeline-list">
                <div class="story-timeline-item left">
                  <div class="story-timeline-connector left"></div>
                  <div class="story-card-content">
                    <div class="story-card-year">2010</div>
                    <div class="story-card-title">Founded</div>
                    <div class="story-card-desc">Started as a small local agency with a big vision.</div>
                  </div>
                  <div class="story-card-dot"></div>
                </div>
                <div class="story-timeline-item right">
                  <div class="story-card-dot"></div>
                  <div class="story-timeline-connector right"></div>
                  <div class="story-card-content">
                    <div class="story-card-year">2014</div>
                    <div class="story-card-title">First 1,000 Homes</div>
                    <div class="story-card-desc">Celebrated our 1,000th home sold milestone.</div>
                  </div>
                </div>
                <div class="story-timeline-item left">
                  <div class="story-timeline-connector left"></div>
                  <div class="story-card-content">
                    <div class="story-card-year">2018</div>
                    <div class="story-card-title">Expansion</div>
                    <div class="story-card-desc">Expanded to new cities and grew our team of agents.</div>
                  </div>
                  <div class="story-card-dot"></div>
                </div>
                <div class="story-timeline-item right">
                  <div class="story-card-dot"></div>
                  <div class="story-timeline-connector right"></div>
                  <div class="story-card-content">
                    <div class="story-card-year">2023</div>
                    <div class="story-card-title">Today</div>
                    <div class="story-card-desc">Serving thousands of families and individuals, helping them find their perfect homes and make smart real estate investments.</div>
                  </div>
                </div>
              </div>
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
          <section class="about-section team-section-fullwidth">
            <div class="team-section-inner">
              <h2 class="section-title team-title">Our Leadership Team</h2>
              <p class="team-subtext">Meet the people driving our vision and success.</p>
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
  </div>
</template>

<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue';
import { onMounted } from 'vue';

function scrollToStory() {
  const el = document.getElementById('our-story');
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
.about-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f9fafb;
}

.hero-section {
  position: relative;
  height: 60vh;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background: #fff;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 0;
  margin-bottom: 0;
  overflow: hidden;
  margin-top: 64px;
}

.hero-bg-shape {
  position: absolute;
  border-radius: 50%;
  z-index: 0;
  opacity: 0.18;
}
.hero-bg-shape1 {
  width: 340px;
  height: 340px;
  background: #3b82f6;
  top: 40px;
  left: 60vw;
}
.hero-bg-shape2 {
  width: 220px;
  height: 220px;
  background: #60a5fa;
  bottom: -60px;
  right: 10vw;
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

.hero-title-modern {
  font-size: 3rem;
  font-weight: 900;
  color: #2563eb;
  margin-bottom: 0.5rem;
  line-height: 1.1;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  position: relative;
}
.hero-title-accent {
  color: #2563eb;
}
.hero-underline {
  width: 80px;
  height: 6px;
  background: #2563eb;
  border-radius: 3px;
  margin-top: 0.3rem;
}
.hero-subtitle-modern {
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

.hero-right {
  flex: 0 0 340px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  height: 100%;
}
.hero-info-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 32px rgba(59,130,246,0.10);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  min-width: 260px;
  max-width: 320px;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.7rem;
}
.hero-info-title {
  color: #2563eb;
  font-size: 1.15rem;
  font-weight: 700;
}
.hero-info-rating {
  color: #2563eb;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.hero-info-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-top: 0.5rem;
}

@media (max-width: 900px) {
  .hero-flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
  .hero-right {
    width: 100%;
    justify-content: flex-start;
    margin-top: 1.5rem;
  }
}
@media (max-width: 600px) {
  .hero-title-modern {
    font-size: 2rem;
  }
  .hero-info-card {
    min-width: 180px;
    max-width: 100%;
    padding: 1.2rem 1rem 1rem 1rem;
  }
  .hero-bg-shape1, .hero-bg-shape2 {
    display: none;
  }
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
  margin-top: 4rem;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
}

/* Alternating Timeline Styles */
.story-timeline-section {
  position: relative;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.story-timeline {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0 2rem 0;
  box-sizing: border-box;
}
.story-timeline-center-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 2px;
  z-index: 0;
  transform: translateX(-50%);
}
.story-timeline-list {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  position: relative;
  z-index: 1;
}
.story-timeline-item {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  min-height: 120px;
}
.story-timeline-item.left {
  justify-content: flex-start;
}
.story-timeline-item.right {
  justify-content: flex-end;
}
.story-timeline-item.left .story-card-content {
  order: 1;
  margin-right: 32px;
}
.story-timeline-item.left .story-card-dot {
  order: 2;
  margin-left: 0;
  margin-right: 0;
}
.story-timeline-item.right .story-card-dot {
  order: 1;
  margin-right: 0;
  margin-left: 0;
}
.story-timeline-item.right .story-card-content {
  order: 2;
  margin-left: 32px;
}
.story-card-dot {
  width: 18px;
  height: 18px;
  background: #2563eb;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(59,130,246,0.10);
  border: 3px solid #fff;
  z-index: 2;
}
.story-card-content {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(59,130,246,0.07);
  padding: 1.5rem 2rem 1.5rem 2rem;
  min-width: 260px;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.story-card-year {
  color: #2563eb;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}
.story-card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.1rem;
}
.story-card-desc {
  color: #374151;
  font-size: 1rem;
  font-weight: 400;
}
@media (max-width: 900px) {
  .story-timeline {
    max-width: 100%;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .story-timeline-center-line {
    left: 24px;
    transform: none;
  }
  .story-timeline-item.left .story-card-content,
  .story-timeline-item.right .story-card-content {
    margin: 0 0 0 0;
    max-width: 100%;
  }
  .story-timeline-item {
    flex-direction: column;
    align-items: flex-start;
    min-height: 0;
  }
  .story-timeline-item.right {
    justify-content: flex-start;
  }
  .story-timeline-item.left .story-card-dot,
  .story-timeline-item.right .story-card-dot {
    margin: 1rem 0 0 0;
  }
}
@media (max-width: 600px) {
  .story-timeline {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .story-timeline-center-line {
    left: 14px;
    width: 3px;
  }
  .story-card-dot {
    width: 13px;
    height: 13px;
  }
  .story-card-content {
    padding: 1rem 1rem 1rem 1rem;
    min-width: 0;
    max-width: 100%;
  }
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
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
}

.team-card {
  background: #292933;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.12);
  padding: 1.5rem 1.25rem;
  width: 240px;
  text-align: center;
  transition: transform 0.18s, box-shadow 0.18s;
  margin-bottom: 1.5rem;
  border: 1px solid #2e2e38;
}

.team-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 6px 24px rgba(0,0,0,0.18);
}

.team-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 3px solid #0066cc;
}

.team-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.25rem;
}

.team-role {
  color: #4ea1ff;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.98rem;
}

.team-bio {
  color: #b0b3c6;
  font-size: 0.97rem;
  line-height: 1.5;
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
  .hero-title-modern {
    font-size: 2.5rem;
  }

  .hero-subtitle-modern {
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

  .team-grid {
    flex-direction: column;
    align-items: center;
  }

  .team-card {
    width: 100%;
    max-width: 320px;
  }
}

.about-aligned-container {
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  padding: 0 2.5vw;
  box-sizing: border-box;
}

.team-section-fullwidth {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background: #23232b;
  padding: 0;
  margin-top: 4rem;
  margin-bottom: 0;
  box-sizing: border-box;
}

.team-section-inner {
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  padding: 4rem 2.5vw;
  box-sizing: border-box;
  text-align: center;
}

.team-title {
  color: #fff;
  text-align: center;
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
}

.team-subtext {
  color: #b0b3c6;
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
  text-align: center;
}

.story-timeline-connector {
  position: absolute;
  top: 50%;
  width: 48px;
  height: 3px;
  background: #2563eb;
  z-index: 1;
  border-radius: 2px;
}

.story-timeline-item.left .story-timeline-connector.left {
  right: 50%;
  margin-right: 9px;
  transform: translateY(-50%);
}

.story-timeline-item.right .story-timeline-connector.right {
  left: 50%;
  margin-left: 9px;
  transform: translateY(-50%);
}

@media (max-width: 900px) {
  .story-timeline-connector {
    display: none;
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