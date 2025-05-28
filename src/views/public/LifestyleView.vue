<template>
  <div class="lifestyle-container">
    <GlobalHeader />
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Lifestyle & Community</h1>
        <p class="hero-subtitle">Discover the vibrant communities, local amenities, and lifestyle opportunities in your dream neighborhood.</p>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="lifestyle-content">
      <div class="content-wrapper">
        <!-- Introduction Section -->
        <section class="lifestyle-section">
          <h2 class="section-title">Welcome to Our Communities</h2>
          <div class="story-content">
            <p>At Real City Realty, we believe that finding the perfect home goes beyond just the property itself. It's about discovering a community that matches your lifestyle and aspirations.</p>
            <p>Explore our comprehensive guides to help you understand what makes each neighborhood unique and find the perfect place to call home.</p>
          </div>
        </section>

        <!-- Key Features Section -->
        <section class="lifestyle-section">
          <h2 class="section-title">Community Features</h2>
          <div class="lifestyle-grid">
            <div class="lifestyle-card">
              <span class="lifestyle-icon">🏫</span>
              <h3>Education</h3>
              <p>Top-rated schools, universities, and educational institutions in each neighborhood.</p>
              <p>Access to quality education for all ages and learning needs.</p>
            </div>
            <div class="lifestyle-card">
              <span class="lifestyle-icon">🌳</span>
              <h3>Parks & Recreation</h3>
              <p>Beautiful parks, walking trails, and recreational facilities for outdoor activities.</p>
              <p>Perfect for families, fitness enthusiasts, and nature lovers.</p>
            </div>
            <div class="lifestyle-card">
              <span class="lifestyle-icon">🍽️</span>
              <h3>Dining & Entertainment</h3>
              <p>Local restaurants, cafes, and entertainment venues in your area.</p>
              <p>Experience the vibrant food scene and cultural activities.</p>
            </div>
            <div class="lifestyle-card">
              <span class="lifestyle-icon">🚗</span>
              <h3>Transportation</h3>
              <p>Easy access to public transit, major highways, and transportation hubs.</p>
              <p>Convenient commuting options for work and leisure.</p>
            </div>
          </div>
        </section>

        <!-- Detailed Information Section -->
        <section class="lifestyle-section">
          <h2 class="section-title">Living in Our Communities</h2>
          <div class="detailed-lifestyle">
            <div class="lifestyle-block">
              <h3>1. Family-Friendly Areas</h3>
              <p>Discover neighborhoods perfect for families, featuring safe streets, excellent schools, and plenty of activities for children. Our family-friendly communities offer playgrounds, community centers, and family-oriented events throughout the year.</p>
            </div>
            <div class="lifestyle-block">
              <h3>2. Urban Living</h3>
              <p>Experience the excitement of city life with easy access to shopping, dining, and entertainment. Our urban communities offer modern amenities, cultural attractions, and a vibrant social scene for those who love the energy of city living.</p>
            </div>
            <div class="lifestyle-block">
              <h3>3. Suburban Comfort</h3>
              <p>Enjoy the perfect balance of space and convenience in our suburban communities. These areas offer larger properties, peaceful surroundings, and easy access to urban amenities, making them ideal for those seeking a more relaxed lifestyle.</p>
            </div>
            <div class="lifestyle-block">
              <h3>4. Active Adult Communities</h3>
              <p>Find your perfect retirement or active adult community with amenities designed for an active lifestyle. These communities offer social activities, fitness facilities, and maintenance-free living for those looking to enjoy their golden years.</p>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section class="lifestyle-section cta-section">
          <h2>Ready to Find Your Perfect Community?</h2>
          <p>Let our experienced agents help you discover the neighborhood that best matches your lifestyle and preferences.</p>
          <button class="cta-button">Find Your Community</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue';
</script>

<style scoped>
.lifestyle-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f9fafb;
}

.hero-section {
  position: relative;
  height: 60vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
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

.lifestyle-content {
  padding: 4rem 0;
}

.content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.lifestyle-section {
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

.lifestyle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.lifestyle-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.lifestyle-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.lifestyle-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.lifestyle-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
}

.lifestyle-card p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.detailed-lifestyle {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
}

.lifestyle-block {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.lifestyle-block h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.lifestyle-block p {
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

  .lifestyle-content {
    padding: 2rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .lifestyle-grid {
    grid-template-columns: 1fr;
  }

  .cta-section {
    padding: 3rem 1rem;
  }
}
</style> 