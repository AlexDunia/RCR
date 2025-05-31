<template>
  <div class="agent-profile-container">
    <!-- Back button -->
    <div class="back-nav">
      <button class="back-button" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Favorites
      </button>
    </div>

    <!-- Hero Section -->
    <div class="profile-hero" :class="{ 'limited-view': !isConnected }">
      <div class="hero-content">
        <div class="agent-basic-info">
          <div class="agent-avatar">
            <img :src="agent?.avatar" :alt="agent?.name" @error="handleImageError">
            <div v-if="isConnected" class="connection-badge">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Connected
            </div>
          </div>
          <div class="agent-info">
            <h1>{{ agent?.name }}</h1>
            <div class="agent-meta">
              <span class="experience">{{ agent?.experience }} of experience</span>
              <span class="location">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {{ agent?.location }}
              </span>
              <span class="specialty">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                {{ agent?.specialty }}
              </span>
            </div>
          </div>
        </div>
        <div class="action-buttons">
          <button v-if="!isConnected" class="connect-btn" @click="requestConnection">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M20 8v6M17 11h6"/>
            </svg>
            Connect with Agent
          </button>
          <button v-if="isConnected" class="message-btn" @click="startChat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            Message
          </button>
          <button
            class="favorite-btn active"
            @click="toggleFavorite"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            Remove from Favorites
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="profile-content">
      <!-- Stats Section -->
      <div class="stats-section">
        <div class="stat-card">
          <h3>Properties Sold</h3>
          <div class="stat-value">{{ isConnected ? agent?.stats.propertiesSold : '**' }}</div>
        </div>
        <div class="stat-card">
          <h3>Active Listings</h3>
          <div class="stat-value">{{ isConnected ? agent?.stats.activeListings : '**' }}</div>
        </div>
        <div class="stat-card">
          <h3>Avg. Response Time</h3>
          <div class="stat-value">{{ isConnected ? agent?.stats.avgResponseTime : '**' }}</div>
        </div>
        <div class="stat-card">
          <h3>Client Rating</h3>
          <div class="stat-value">
            <span class="rating">{{ isConnected ? agent?.stats.rating : '**' }}</span>
            <span v-if="isConnected" class="total-reviews">({{ agent?.stats.totalReviews }} reviews)</span>
          </div>
        </div>
      </div>

      <!-- Tabs Section -->
      <div class="tabs-section">
        <div class="tab-buttons">
          <button
            v-for="tab in availableTabs"
            :key="tab.id"
            :class="{ active: currentTab === tab.id }"
            @click="currentTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- About Tab -->
        <div v-if="currentTab === 'about'" class="tab-content">
          <div class="about-section">
            <h2>About {{ agent?.name }}</h2>
            <div v-if="isConnected" class="about-content">
              <p>{{ agent?.about }}</p>
              <div class="specializations">
                <h3>Specializations</h3>
                <div class="tags">
                  <span v-for="spec in agent?.specializations" :key="spec" class="tag">
                    {{ spec }}
                  </span>
                </div>
              </div>
              <div class="languages">
                <h3>Languages</h3>
                <div class="tags">
                  <span v-for="lang in agent?.languages" :key="lang" class="tag">
                    {{ lang }}
                  </span>
                </div>
              </div>
            </div>
            <div v-else class="limited-info">
              <p>Connect with {{ agent?.name }} to view full profile information</p>
              <button class="connect-btn-secondary" @click="requestConnection">
                Request Connection
              </button>
            </div>
          </div>
        </div>

        <!-- Listings Tab -->
        <div v-if="currentTab === 'listings'" class="tab-content">
          <div class="listings-section">
            <h2>Active Listings</h2>
            <div v-if="isConnected" class="listings-grid">
              <div v-for="listing in agent?.listings" :key="listing.id" class="listing-card">
                <img :src="listing.image" :alt="listing.title">
                <div class="listing-info">
                  <h3>{{ listing.title }}</h3>
                  <p class="price">${{ listing.price }}</p>
                  <p class="location">{{ listing.location }}</p>
                  <div class="listing-specs">
                    <span>{{ listing.beds }} beds</span>
                    <span>{{ listing.baths }} baths</span>
                    <span>{{ listing.sqft }} sqft</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="limited-info">
              <p>Connect with {{ agent?.name }} to view their active listings</p>
              <button class="connect-btn-secondary" @click="requestConnection">
                Request Connection
              </button>
            </div>
          </div>
        </div>

        <!-- Reviews Tab -->
        <div v-if="currentTab === 'reviews'" class="tab-content">
          <div class="reviews-section">
            <h2>Client Reviews</h2>
            <div v-if="isConnected" class="reviews-list">
              <div v-for="review in agent?.reviews" :key="review.id" class="review-card">
                <div class="review-header">
                  <div class="reviewer-info">
                    <img :src="review.avatar" :alt="review.name">
                    <div>
                      <h4>{{ review.name }}</h4>
                      <p class="review-date">{{ review.date }}</p>
                    </div>
                  </div>
                  <div class="review-rating">
                    <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= review.rating }">★</span>
                  </div>
                </div>
                <p class="review-text">{{ review.text }}</p>
              </div>
            </div>
            <div v-else class="limited-info">
              <p>Connect with {{ agent?.name }} to read client reviews</p>
              <button class="connect-btn-secondary" @click="requestConnection">
                Request Connection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAgentStore } from '@/stores/agentStore';

const route = useRoute();
const router = useRouter();
const agentStore = useAgentStore();

// State
const currentTab = ref('about');
const agent = ref(null);

// Computed
const isConnected = computed(() => agent.value?.isConnected || false);

const availableTabs = computed(() => [
  { id: 'about', label: 'About' },
  { id: 'listings', label: 'Listings' },
  { id: 'reviews', label: 'Reviews' }
]);

// Methods
const handleImageError = (event) => {
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.value?.name)}&background=0D47A1&color=fff`;
  event.target.src = fallbackUrl;
};

const requestConnection = async () => {
  try {
    await agentStore.sendConnectionRequest(agent.value.id);
    // Show success notification
  } catch (err) {
    console.error('Failed to send connection request:', err);
    // Handle error - could show error notification here
  }
};

const toggleFavorite = async () => {
  try {
    await agentStore.toggleFavorite(agent.value.id);
    // After removing from favorites, go back to favorites page
    goBack();
  } catch (err) {
    console.error('Failed to toggle favorite:', err);
    // Handle error - could show error notification here
  }
};

const startChat = () => {
  router.push(`/client-messages?agent=${agent.value.id}`);
};

const goBack = () => {
  router.push('/client-favourites');
};

// Lifecycle
onMounted(async () => {
  try {
    const agentId = route.params.id;
    agent.value = await agentStore.getAgentProfile(agentId);

    // If agent is not in favorites, redirect to favorites page
    if (!agent.value?.isFavorite) {
      router.push('/client-favourites');
    }
  } catch (err) {
    console.error('Failed to load agent profile:', err);
    // Handle error and redirect if needed
    router.push('/client-favourites');
  }
});
</script>

<style scoped>
.agent-profile-container {
  min-height: 100vh;
  background: #f8fafc;
}

.back-nav {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #64748b;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: #f8fafc;
  color: #0f172a;
  transform: translateY(-1px);
}

.back-button svg {
  width: 20px;
  height: 20px;
}

.profile-hero {
  background: linear-gradient(135deg, #0a4d8c 0%, #1a4189 100%);
  padding: 48px 24px;
  color: white;
}

.profile-hero.limited-view::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.agent-basic-info {
  display: flex;
  gap: 24px;
  align-items: center;
}

.agent-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.connection-badge {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  background: #10b981;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.connection-badge svg {
  width: 14px;
  height: 14px;
}

.agent-info h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
}

.agent-meta {
  display: flex;
  gap: 24px;
  align-items: center;
}

.agent-meta span {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  opacity: 0.9;
}

.agent-meta svg {
  width: 16px;
  height: 16px;
}

.action-buttons {
  display: flex;
  gap: 16px;
}

.action-buttons button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.connect-btn {
  background: #10b981;
  color: white;
}

.connect-btn:hover {
  background: #059669;
}

.message-btn {
  background: white;
  color: #0f172a;
}

.message-btn:hover {
  background: #f1f5f9;
}

.favorite-btn {
  background: #ef4444;
  color: white;
}

.favorite-btn:hover {
  background: #dc2626;
}

.profile-content {
  max-width: 1200px;
  margin: -48px auto 0;
  padding: 0 24px;
  position: relative;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.stat-card h3 {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 8px 0;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
}

.tabs-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.tab-buttons {
  display: flex;
  gap: 16px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 24px;
}

.tab-buttons button {
  padding: 12px 24px;
  background: transparent;
  border: none;
  color: #64748b;
  font-weight: 500;
  cursor: pointer;
  position: relative;
}

.tab-buttons button.active {
  color: #0f172a;
}

.tab-buttons button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #0a4d8c;
}

.tab-content {
  min-height: 400px;
}

.about-section,
.listings-section,
.reviews-section {
  padding: 24px 0;
}

.about-section h2,
.listings-section h2,
.reviews-section h2 {
  margin: 0 0 24px 0;
  font-size: 24px;
  color: #0f172a;
}

.specializations,
.languages {
  margin-top: 24px;
}

.specializations h3,
.languages h3 {
  font-size: 16px;
  color: #0f172a;
  margin: 0 0 16px 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #f1f5f9;
  color: #0f172a;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
}

.limited-info {
  text-align: center;
  padding: 48px;
  background: #f8fafc;
  border-radius: 12px;
}

.limited-info p {
  color: #64748b;
  margin-bottom: 24px;
}

.connect-btn-secondary {
  background: #0a4d8c;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.connect-btn-secondary:hover {
  background: #083b6f;
}

.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.listing-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.listing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.listing-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.listing-info {
  padding: 16px;
}

.listing-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #0f172a;
}

.listing-info .price {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
}

.listing-info .location {
  color: #64748b;
  font-size: 14px;
  margin: 0 0 12px 0;
}

.listing-specs {
  display: flex;
  gap: 16px;
  color: #64748b;
  font-size: 14px;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.review-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.reviewer-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.reviewer-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.reviewer-info h4 {
  margin: 0;
  font-size: 16px;
  color: #0f172a;
}

.review-date {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #64748b;
}

.review-rating {
  color: #f59e0b;
}

.star {
  font-size: 18px;
}

.star.filled {
  color: #f59e0b;
}

.review-text {
  color: #334155;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .agent-basic-info {
    flex-direction: column;
    text-align: center;
  }

  .agent-meta {
    justify-content: center;
    flex-wrap: wrap;
  }

  .action-buttons {
    flex-direction: column;
  }

  .tab-buttons {
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .tab-buttons button {
    white-space: nowrap;
  }
}
</style>
