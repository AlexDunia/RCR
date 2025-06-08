<template>
  <div class="all-agents-page">
    <GlobalHeader />
    <!-- Hero Section -->
    <div class="agents-hero world-class-hero">
      <div class="hero-text-find-agent">
      <h2 class="agents-hero__title">Find Agent</h2>
      <p class="agents-hero__caption">Easily search, filter, and connect with the best real estate agents for your needs.</p>
    </div>
    </div>
    <!-- Main Content -->
    <section class="agents-content">
      <div class="main-container">
        <!-- Search and Filter Bar -->
        <div class="agents-search-bar">
          <div class="search-input-group">
            <div class="search-input-wrapper search-input-wrapper--main">
              <span class="search-icon">
                <i class="fas fa-search"></i>
              </span>
              <input
                type="text"
                v-model="searchQuery"
                class="search-input"
                placeholder="Search agents by name, location, or specialty..."
                @input="handleSearch"
              >
            </div>
            <button class="search-btn" @click="handleSearch">
              <i class="fas fa-search"></i>
              Search
            </button>
          </div>
        </div>

        <div class="content-wrapper content-wrapper--no-sidebar">
          <!-- Agents Grid -->
          <div class="agents-grid">
            <div v-if="filteredAgents.length === 0" class="no-results">
              <img src="@/assets/no-results.svg" alt="No results found" class="no-results__img">
              <h3>No agents found</h3>
              <p>Try adjusting your search criteria</p>
            </div>

            <div
              v-for="agent in filteredAgents"
              :key="agent.id"
              class="agent-card"
            >
              <div class="agent-card__img-container">
                <img :src="agent.avatar || agent.profilePicture" :alt="agent.name" class="agent-card__img">
              </div>

              <h3 class="agent-card__name">{{ agent.name }}</h3>
              <a class="agent-card__email" :href="'mailto:' + agent.email">{{ agent.email }}</a>
              <a class="agent-card__phone" :href="'tel:' + agent.phone">M: {{ agent.phone }}</a>

              <div class="agent-card__specialty">{{ agent.title }}</div>

              <div class="agent-card__location">
                <i class="fas fa-map-marker-alt"></i>
                {{ agent.location }}
              </div>

              <button class="contact-btn" @click="openContactModal(agent)">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Agent Modal -->
    <div v-if="showContactModal" class="modal-overlay" @click="closeContactModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeContactModal">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-header">
          <div class="modal-agent-info">
            <div class="modal-agent-avatar">
              <img :src="selectedAgent?.avatar || selectedAgent?.profilePicture" :alt="selectedAgent?.name">
            </div>
            <div class="modal-agent-details">
              <h2>Contact {{ selectedAgent?.name }}</h2>
              <p class="modal-agent-title">{{ selectedAgent?.title }}</p>
              <p class="modal-agent-email">
                <i class="fas fa-envelope"></i>
                {{ selectedAgent?.email }}
              </p>
            </div>
          </div>
        </div>

        <form @submit.prevent="submitContactForm" class="contact-form">
          <div class="form-group">
            <label>
              <span>Name</span>
              <input
                type="text"
                v-model="contactForm.name"
                required
                placeholder="Enter your full name"
              >
            </label>
          </div>

          <div class="form-group">
            <label>
              <span>Email</span>
              <input
                type="email"
                v-model="contactForm.email"
                required
                placeholder="Enter your email address"
              >
            </label>
          </div>

          <div class="form-group">
            <label>
              <span>Phone</span>
              <input
                type="tel"
                v-model="contactForm.phone"
                placeholder="Enter your phone number (optional)"
              >
            </label>
          </div>

          <div class="form-group">
            <label>
              <span>Message</span>
              <textarea
                v-model="contactForm.message"
                required
                placeholder="Write your message here..."
                rows="4"
              ></textarea>
            </label>
          </div>

          <button type="submit" class="submit-btn">
            <i class="fas fa-paper-plane"></i>
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAgentStore } from '@/stores/agentStore';
import GlobalHeader from '@/components/GlobalHeader.vue';

const agentStore = useAgentStore();

// Search and filter state
const searchQuery = ref('');
const showContactModal = ref(false);
const selectedAgent = ref(null);

// Contact form state
const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});

// Add these computed properties and methods after the languages array
const agents = ref([]);

onMounted(async () => {
  // Fetch agents when component mounts
  await agentStore.fetchAgents();
  agents.value = agentStore.getAllAgents();
});

// Computed property for filtered agents
const filteredAgents = computed(() => {
  let filtered = agents.value;

  // Sanitize input for security
  const sanitize = (str) => str.replace(/[^a-zA-Z0-9\s\-.,]/g, "");

  // Filter by search query
  if (searchQuery.value) {
    const query = sanitize(searchQuery.value.toLowerCase());
    filtered = filtered.filter(agent =>
      agent.name.toLowerCase().includes(query) ||
      agent.location.toLowerCase().includes(query) ||
      agent.specialties.some(s => s.toLowerCase().includes(query))
    );
  }

  return filtered;
});

function handleSearch() {
  // The computed property will automatically update
}

function openContactModal(agent) {
  selectedAgent.value = agent;
  showContactModal.value = true;
}

function closeContactModal() {
  showContactModal.value = false;
  selectedAgent.value = null;
}

function submitContactForm() {
  // Handle form submission here
  console.log('Form submitted:', contactForm.value);
  closeContactModal();
}
</script>

<style scoped>
.all-agents-page {
  min-height: 100vh;
  background: #f8fafc;
  padding-top: 80px; /* 64px header + extra space */
}

/* Hero Section */
.agents-hero {
  padding: 24px 32px 36px 32px;
  background: linear-gradient(120deg, #f0fdfa 0%, #f8fafc 100%);
  border: 1px solid #d1fae5;
  box-shadow: 0 2px 12px rgba(0, 124, 240, 0.04);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.agents-hero__title {
  font-size: calc(2rem - 1.5px);
  font-weight: 700;
  color: #0e3a5e;
  margin-bottom: 4px;
  font-family: 'Poppins', sans-serif;
}

.agents-hero__caption {
  color: #64748b;
  font-size: calc(1.08rem - 1.5px);
  margin: 0;
}

/* Search Bar */
.agents-search-bar {
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  margin-bottom: 40px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.search-input-group {
  display: grid;
  grid-template-columns: 1.5fr auto;
  gap: 20px;
  align-items: center;
}

.search-input-wrapper {
  position: relative;
  background: #f8fafc;
  border-radius: 14px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.search-input-wrapper:hover,
.search-input-wrapper:focus-within {
  background: #fff;
  border-color: #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.search-input-wrapper:focus-within .search-icon {
  color: #0066cc;
}

.search-input {
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #1e293b;
  outline: none;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: #94a3b8;
  transition: color 0.3s ease;
}

.search-input:focus::placeholder {
  color: #64748b;
}

.search-btn {
  background: linear-gradient(135deg, #0066cc 0%, #0052a5 100%);
  color: #fff;
  border: none;
  padding: 16px 32px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.15);
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 102, 204, 0.25);
}

/* Main Content */
.content-wrapper {
  display: grid;
  gap: 40px;
  align-items: start;
}

/* Filters Sidebar */
.agents-filters {
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 24px;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.filter-group {
  margin-bottom: 28px;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 18px;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 16px;
  background: #0066cc;
  border-radius: 2px;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.filter-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-left: 36px;
  transition: all 0.2s ease;
}

.filter-option:hover .filter-label {
  color: #0066cc;
}

.filter-option input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #f1f5f9;
  border-radius: 6px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.filter-option:hover .checkmark {
  background-color: #e2e8f0;
  border-color: #cbd5e1;
}

.filter-option input:checked ~ .checkmark {
  background-color: #0066cc;
  border-color: #0066cc;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.filter-option input:checked ~ .checkmark:after {
  display: block;
}

.filter-label {
  font-size: 0.95rem;
  color: #64748b;
  transition: all 0.2s ease;
}

/* Agents Grid */
.agents-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 16px 0;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.agent-card {
  background: #fff;
  text-align: left;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  max-width: 250px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  padding-bottom: 12px;
}

.agent-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  border-color: rgba(0, 102, 204, 0.1);
}

.agent-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.agent-card__img-container {
  width: 100%;
  height: 180px;
  overflow: hidden;
  position: relative;
  margin: 0 0 16px 0;
  background: #f8fafc;
}

.agent-card:hover .agent-card__img-container {
  border-color: #0066cc;
}

.agent-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  transform-origin: center;
}

.agent-card:hover .agent-card__img {
  transform: scale(1.05);
}

.agent-card__name {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
  font-family: 'Poppins', sans-serif;
  line-height: 1.3;
  padding: 0 16px;
  letter-spacing: -0.3px;
}

.agent-card__email,
.agent-card__phone {
  color: #64748b;
  font-size: 0.8rem;
  text-decoration: none;
  transition: all 0.2s ease;
  line-height: 1.4;
  padding: 2px 16px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.agent-card__email::before,
.agent-card__phone::before {
  content: '';
  display: block;
  width: 14px;
  height: 14px;
  background-color: #e2e8f0;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.agent-card__email:hover,
.agent-card__phone:hover {
  color: #0066cc;
}

.agent-card__email:hover::before,
.agent-card__phone:hover::before {
  background-color: #0066cc;
  transform: scale(1.1);
}

.agent-card__email:hover,
.agent-card__phone:hover {
  color: #0066cc;
}

.agent-card__specialty {
  color: #1e293b;
  font-size: 0.8rem;
  margin: 12px 0 6px;
  line-height: 1.4;
  font-weight: 500;
  padding: 0 16px;
}

.agent-card__location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.8rem;
  padding: 6px 16px;
  width: 100%;
}

.agent-card__location i {
  color: #0066cc;
  font-size: 0.9rem;
}

.contact-btn {
  background: #0066cc;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 12px 16px 0;
  position: relative;
  overflow: hidden;
}

.contact-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contact-btn:hover {
  background: #005bb8;
  transform: translateY(-1px);
}

.contact-btn:hover::before {
  opacity: 1;
}

.contact-btn:hover {
  background: #0052a5;
  transform: translateY(-2px);
}

@media (max-width: 1400px) {
  .agents-grid {
    grid-template-columns: repeat(4, 1fr);
    max-width: 1200px;
    gap: 20px;
  }
}

@media (max-width: 1200px) {
  .agents-grid {
    grid-template-columns: repeat(3, 1fr);
    max-width: 960px;
  }
}

@media (max-width: 992px) {
  .agents-grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 720px;
  }
  .main-container {
    width: 95%;
  }
}

@media (max-width: 768px) {
  .agents-grid {
    grid-template-columns: repeat(1, 1fr);
    max-width: 400px;
  }
  
  .agent-card {
    max-width: 100%;
  }

  .agent-card__img-container {
    height: 240px;
  }
  
  .main-container {
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
  }
}

/* No Results */
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.no-results__img {
  width: 140px;
  height: 140px;
  margin-bottom: 28px;
  opacity: 0.8;
}

.no-results h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 12px;
  font-family: 'Poppins', sans-serif;
}

.no-results p {
  color: #64748b;
  margin: 0;
  font-size: 1.1rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}

.modal-content {
  background: #fff;
  border-radius: 24px;
  width: 100%;
  max-width: 560px;
  position: relative;
  overflow: hidden;
}

.modal-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: #f1f5f9;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;
  z-index: 2;
}

.modal-close:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.modal-header {
  background: linear-gradient(135deg, #0066cc 0%, #0052a5 100%);
  padding: 32px;
  color: #fff;
}

.modal-agent-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.modal-agent-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.modal-agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-agent-details h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 4px;
  font-family: 'Poppins', sans-serif;
}

.modal-agent-title {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0 0 8px;
}

.modal-agent-email {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  opacity: 0.9;
}

.contact-form {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label span {
  font-weight: 500;
  color: #1e293b;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  color: #1e293b;
  background: #f8fafc;
}

.form-group input:hover,
.form-group textarea:hover {
  border-color: #cbd5e1;
  background: #f1f5f9;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #0066cc;
  background: #fff;
  outline: none;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #94a3b8;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-btn {
  background: linear-gradient(135deg, #0066cc 0%, #0052a5 100%);
  color: #fff;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.15);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 100%;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 102, 204, 0.25);
  background: linear-gradient(135deg, #0052a5 0%, #003d7a 100%);
}

.submit-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 8px rgba(0, 102, 204, 0.2);
}

@media (max-width: 640px) {
  .modal-content {
    border-radius: 16px;
  }

  .modal-header {
    padding: 24px;
  }

  .modal-agent-avatar {
    width: 60px;
    height: 60px;
  }

  .modal-agent-details h2 {
    font-size: 1.4rem;
  }

  .modal-agent-title {
    font-size: 1rem;
  }

  .contact-form {
    padding: 24px;
    gap: 20px;
  }

  .submit-btn {
    padding: 14px;
  }
}

.main-container {
  width: 89%;
  margin: 0 auto;
  padding-left: 32px;
  padding-right: 32px;
}

.world-class-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(120deg, #0f2027 0%, #2c5364 100%); /* dark blue gradient */

  padding: 64px 40px 56px 40px;
  margin-bottom: 32px;
  box-shadow: 0 8px 40px 0 rgba(0, 102, 204, 0.07);
  text-align: left;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-text-find-agent{
  width:89%;
  margin:auto;

}

.agents-hero__title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
  margin-top: 0;
  z-index: 1;
  letter-spacing: -1px;
  text-shadow: 0 2px 12px rgba(0,0,0,0.18);
  font-family: 'Poppins', sans-serif;
}

.agents-hero__caption {
  color: #e0e7ff;
  font-size: 1.25rem;
  margin: 0;
  z-index: 1;
  max-width: 600px;
  line-height: 1.6;
}
</style>
