<template>
  <div class="agent-profile-page">
    <!-- Hero Section -->
    <section class="agent-hero">
      <div class="agent-hero__overlay"></div>
      <div class="boxed-container">
        <div class="agent-hero__content" v-if="agent">
          <div class="agent-hero__img-box">
            <img :src="agent.avatar || agent.profilePicture" :alt="agent.name" class="agent-hero__img">
          </div>
          <div class="agent-hero__info">
            <h1 class="agent-hero__name">{{ agent.name }}</h1>
            <p class="agent-hero__title">{{ agent.title }}</p>
            <div class="agent-hero__badges">
              <span v-if="agent.isVerified" class="agent-badge agent-badge--verified">
                <i class="fas fa-check-circle"></i> Verified Agent
              </span>
              <span v-if="agent.isTopAgent" class="agent-badge agent-badge--top">
                <i class="fas fa-star"></i> Top Performer
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="agent-content" v-if="agent">
      <div class="boxed-container">
        <div class="agent-grid">
          <!-- Left Column -->
          <div class="agent-main">
            <div class="agent-card">
              <h2>About Me</h2>
              <p class="agent-bio">{{ agent.bio }}</p>

              <div class="agent-stats">
                <div class="stat-item">
                  <span class="stat-value">{{ agent.propertiesSold }}</span>
                  <span class="stat-label">Properties Sold</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ agent.yearsExperience }}+</span>
                  <span class="stat-label">Years Experience</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ agent.rating }}</span>
                  <span class="stat-label">Rating</span>
                </div>
              </div>
            </div>

            <div class="agent-card">
              <h2>Specialties</h2>
              <div class="specialties-grid">
                <div v-for="specialty in agent.specialties" :key="specialty" class="specialty-item">
                  <i class="fas fa-check-circle"></i>
                  <span>{{ specialty }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="agent-sidebar">
            <div class="contact-card">
              <h3>Contact {{ agent.name }}</h3>
              <form @submit.prevent="submitContactForm" class="contact-form">
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" v-model="contactForm.name" required>
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" v-model="contactForm.email" required>
                </div>
                <div class="form-group">
                  <label>Phone</label>
                  <input type="tel" v-model="contactForm.phone">
                </div>
                <div class="form-group">
                  <label>Message</label>
                  <textarea v-model="contactForm.message" required></textarea>
                </div>
                <button type="submit" class="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAgentStore } from '@/stores/agentStore';

const route = useRoute();
const agentStore = useAgentStore();
const agent = ref(null);

const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});

onMounted(async () => {
  const agentId = parseInt(route.params.id);
  await agentStore.fetchAgents();
  agent.value = agentStore.getAgentById(agentId);

  if (agent.value) {
    agent.value = {
      ...agent.value,
      propertiesSold: Math.floor(Math.random() * 50) + 10,
      title: `${agent.value.specialties[0]} Specialist`,
      isVerified: true,
      isTopAgent: agent.value.averageRating >= 4.8
    };
  }
});

function submitContactForm() {
  console.log('Contact form submitted:', {
    agent: agent.value?.name,
    ...contactForm.value
  });
  // Reset form
  contactForm.value = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
}
</script>

<style scoped>
.agent-profile-page {
  min-height: 100vh;
  background: #f8fafc;
}

/* Hero Section */
.agent-hero {
  position: relative;
  background: linear-gradient(135deg, #0066cc 0%, #0052a5 100%);
  padding: 80px 0;
  color: #fff;
}

.agent-hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}

.agent-hero .boxed-container {
  position: relative;
  z-index: 1;
}

.agent-hero__content {
  display: flex;
  align-items: center;
  gap: 32px;
}

.agent-hero__img-box {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.agent-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.agent-hero__info {
  flex: 1;
}

.agent-hero__name {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.agent-hero__title {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 16px;
}

.agent-hero__badges {
  display: flex;
  gap: 12px;
}

.agent-badge {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.agent-badge--verified {
  background: rgba(255, 255, 255, 0.1);
}

.agent-badge--top {
  background: rgba(255, 255, 255, 0.1);
}

/* Main Content */
.agent-content {
  padding: 48px 0;
}

.agent-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
}

.agent-card {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.agent-card h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.agent-bio {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 32px;
}

.agent-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 4px;
}

.stat-label {
  color: #64748b;
  font-size: 0.875rem;
}

.specialties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.specialty-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
}

.specialty-item i {
  color: #0066cc;
}

/* Contact Card */
.contact-card {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 24px;
}

.contact-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 500;
  color: #475569;
}

.form-group input,
.form-group textarea {
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-btn {
  background: #0066cc;
  color: #fff;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  background: #0052a5;
}

/* Responsive Design */
@media (max-width: 900px) {
  .agent-grid {
    grid-template-columns: 1fr;
  }

  .agent-hero__content {
    flex-direction: column;
    text-align: center;
  }

  .agent-hero__badges {
    justify-content: center;
  }
}

.boxed-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
</style>
