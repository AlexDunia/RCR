<template>
  <div class="all-agents-page">
    <!-- Main Content -->
    <section class="agents-content">
      <div class="boxed-container">
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
            <div class="search-input-wrapper search-input-wrapper--location">
              <span class="search-icon">
                <i class="fas fa-map-marker-alt"></i>
              </span>
              <input
                type="text"
                v-model="locationFilter"
                class="search-input"
                placeholder="Filter by location..."
                @input="handleSearch"
              >
            </div>
            <button class="search-btn" @click="handleSearch">
              <i class="fas fa-search"></i>
              Search
            </button>
          </div>
        </div>

        <div class="content-wrapper">
          <!-- Filters Sidebar -->
          <div class="agents-filters">
            <div class="filter-group">
              <h3 class="filter-title">Specialties</h3>
              <div class="filter-options">
                <label v-for="specialty in specialties" :key="specialty" class="filter-option">
                  <input
                    type="checkbox"
                    v-model="selectedSpecialties"
                    :value="specialty"
                    @change="handleSearch"
                  >
                  <span class="checkmark"></span>
                  <span class="filter-label">{{ specialty }}</span>
                </label>
              </div>
            </div>

            <div class="filter-group">
              <h3 class="filter-title">Experience</h3>
              <div class="filter-options">
                <label v-for="exp in experienceLevels" :key="exp" class="filter-option">
                  <input
                    type="checkbox"
                    v-model="selectedExperience"
                    :value="exp"
                    @change="handleSearch"
                  >
                  <span class="checkmark"></span>
                  <span class="filter-label">{{ exp }}</span>
                </label>
              </div>
            </div>

            <div class="filter-group">
              <h3 class="filter-title">Languages</h3>
              <div class="filter-options">
                <label v-for="lang in languages" :key="lang" class="filter-option">
                  <input
                    type="checkbox"
                    v-model="selectedLanguages"
                    :value="lang"
                    @change="handleSearch"
                  >
                  <span class="checkmark"></span>
                  <span class="filter-label">{{ lang }}</span>
                </label>
              </div>
            </div>
          </div>

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
              @click="viewAgentProfile(agent.id)"
            >
              <div class="agent-card__header">
                <div class="agent-card__img-box">
                  <img :src="agent.avatar || agent.profilePicture" :alt="agent.name" class="agent-card__img">
                </div>
                <div class="agent-card__badges">
                  <span v-if="agent.isVerified" class="agent-badge agent-badge--verified">
                    <i class="fas fa-check-circle"></i> Verified
                  </span>
                  <span v-if="agent.isTopAgent" class="agent-badge agent-badge--top">
                    <i class="fas fa-star"></i> Top Agent
                  </span>
                </div>
              </div>

              <div class="agent-card__content">
                <h3 class="agent-card__name">{{ agent.name }}</h3>
                <p class="agent-card__title">{{ agent.title }}</p>

                <div class="agent-card__stats">
                  <div class="stat">
                    <span class="stat__value">{{ agent.propertiesSold }}</span>
                    <span class="stat__label">Properties Sold</span>
                  </div>
                  <div class="stat">
                    <span class="stat__value">{{ agent.yearsExperience }}</span>
                    <span class="stat__label">Years Experience</span>
                  </div>
                  <div class="stat">
                    <span class="stat__value">{{ agent.rating }}</span>
                    <span class="stat__label">Rating</span>
                  </div>
                </div>

                <div class="agent-card__specialties">
                  <span
                    v-for="specialty in agent.specialties.slice(0, 3)"
                    :key="specialty"
                    class="specialty-tag"
                  >
                    {{ specialty }}
                  </span>
                  <span v-if="agent.specialties.length > 3" class="specialty-tag specialty-tag--more">
                    +{{ agent.specialties.length - 3 }}
                  </span>
                </div>

                <div class="agent-card__location">
                  <i class="fas fa-map-marker-alt"></i>
                  {{ agent.location }}
                </div>
              </div>

              <div class="agent-card__footer">
                <button class="agent-card__contact-btn" @click.stop="contactAgent">
                  <i class="fas fa-envelope"></i>
                  Contact Agent
                </button>
                <button class="agent-card__view-btn" @click.stop="viewAgentProfile(agent.id)">
                  <i class="fas fa-user"></i>
                  View Profile
                </button>
              </div>
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
import { useRouter } from 'vue-router';

const router = useRouter();
const agentStore = useAgentStore();

// Search and filter state
const searchQuery = ref('');
const locationFilter = ref('');
const selectedSpecialties = ref([]);
const selectedExperience = ref([]);
const selectedLanguages = ref([]);
const showContactModal = ref(false);
const selectedAgent = ref(null);

// Contact form state
const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});

// Filter options
const specialties = [
  'Luxury Homes',
  'Commercial Properties',
  'Residential Properties',
  'Investment Properties',
  'First-Time Buyers',
  'Urban Apartments'
];

const experienceLevels = [
  '0-2 years',
  '3-5 years',
  '5-10 years',
  '10+ years'
];

const languages = [
  'English',
  'Spanish',
  'French',
  'Mandarin',
  'Arabic'
];

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

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(agent =>
      agent.name.toLowerCase().includes(query) ||
      agent.location.toLowerCase().includes(query) ||
      agent.specialties.some(s => s.toLowerCase().includes(query))
    );
  }

  // Filter by location
  if (locationFilter.value) {
    const location = locationFilter.value.toLowerCase();
    filtered = filtered.filter(agent =>
      agent.location.toLowerCase().includes(location)
    );
  }

  // Filter by specialties
  if (selectedSpecialties.value.length > 0) {
    filtered = filtered.filter(agent =>
      agent.specialties.some(s => selectedSpecialties.value.includes(s))
    );
  }

  // Filter by experience
  if (selectedExperience.value.length > 0) {
    filtered = filtered.filter(agent => {
      const years = agent.yearsExperience;
      return selectedExperience.value.some(exp => {
        if (exp === '0-2 years') return years <= 2;
        if (exp === '3-5 years') return years >= 3 && years <= 5;
        if (exp === '5-10 years') return years >= 5 && years <= 10;
        if (exp === '10+ years') return years > 10;
        return false;
      });
    });
  }

  return filtered;
});

function handleSearch() {
  // The computed property will automatically update
}

function contactAgent() {
  router.push('/login');
}

function viewAgentProfile(agentId) {
  router.push(`/agent-profile/${Number(agentId)}`);
}
</script>

<style scoped>
.all-agents-page {
  min-height: 100vh;
  background: #f8fafc;
  padding: 40px 0;
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
  grid-template-columns: 1.5fr 1fr auto;
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
  grid-template-columns: 300px 1fr;
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
  gap: 28px;
}

.agent-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.agent-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.agent-card__header {
  padding: 20px;
  text-align: center;
  position: relative;
  background: linear-gradient(to bottom, rgba(240, 249, 255, 0.5), transparent);
}

.agent-card__img-box {
  width: 90px;
  height: 90px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #e0f2fe;
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.1);
  transition: all 0.3s ease;
}

.agent-card:hover .agent-card__img-box {
  transform: scale(1.05);
  border-color: #bae6fd;
}

.agent-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.agent-card:hover .agent-card__img {
  transform: scale(1.1);
}

.agent-card__badges {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 6px;
}

.agent-badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
}

.agent-badge--verified {
  background: #e0f2fe;
  color: #0066cc;
}

.agent-badge--top {
  background: #fef3c7;
  color: #d97706;
}

.agent-card__content {
  padding: 0 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.agent-card__name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 2px;
  font-family: 'Poppins', sans-serif;
}

.agent-card__title {
  color: #64748b;
  margin: 0 0 16px;
  font-size: 0.9rem;
}

.agent-card__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.stat {
  text-align: center;
}

.stat__value {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 2px;
}

.stat__label {
  font-size: 0.75rem;
  color: #64748b;
}

.agent-card__specialties {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.specialty-tag {
  padding: 4px 10px;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 999px;
  font-size: 0.75rem;
  transition: all 0.2s ease;
}

.specialty-tag:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.specialty-tag--more {
  background: #e0f2fe;
  color: #0066cc;
}

.specialty-tag--more:hover {
  background: #bae6fd;
}

.agent-card__location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.85rem;
  /* margin-bottom: 20px; */
}

.agent-card__footer {
  padding: 16px 20px;
  background: #f8fafc;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  /* margin-top: auto; */
  border-top: 1px solid rgba(0, 0, 0, 0.03);
}

.agent-card__contact-btn,
.agent-card__view-btn {
  padding: 12px 18px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.agent-card__contact-btn i,
.agent-card__view-btn i {
  font-size: 1.1em;
  vertical-align: middle;
  line-height: 1;
}

.agent-card__contact-btn {
  background: #0066cc;
  color: #fff;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.15);
}

.agent-card__view-btn {
  background: #fff;
  color: #0066cc;
  border: 1px solid #e0f2fe;
}

.agent-card__contact-btn:hover,
.agent-card__view-btn:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 8px 24px rgba(0,102,204,0.18);
}

@media (max-width: 1400px) {
  .agents-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1200px) {
  .agents-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .agents-filters {
    position: static;
    margin-bottom: 32px;
  }
}

@media (max-width: 768px) {
  .agents-grid {
    grid-template-columns: 1fr;
  }

  .search-input-group {
    grid-template-columns: 1fr;
  }

  .agents-search-bar {
    padding: 24px;
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
  margin: 0;
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
  padding: 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.submit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.2);
}

.submit-btn i {
  font-size: 0.9rem;
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

.boxed-container {
  max-width: 1240px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}
</style>
