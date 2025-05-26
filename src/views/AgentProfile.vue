<template>
  <div class="agent-profile-page">
    <!-- Hero Section -->
    <section class="agent-hero">
      <div class="agent-hero__overlay"></div>
      <div class="boxed-container">
        <div class="agent-hero__content">
          <div class="agent-hero__left">
            <div class="agent-hero__img-box">
              <img :src="agent?.avatar || agent?.profilePicture" :alt="agent?.name" class="agent-hero__img">
            </div>
            <div class="agent-hero__badges">
              <span v-if="agent?.isVerified" class="agent-badge agent-badge--verified">
                <i class="fas fa-check-circle"></i> Verified
              </span>
              <span v-if="agent?.isTopAgent" class="agent-badge agent-badge--top">
                <i class="fas fa-star"></i> Top Agent
              </span>
            </div>
          </div>
          <div class="agent-hero__right">
            <h1 class="agent-hero__name">{{ agent?.name }}</h1>
            <p class="agent-hero__title">{{ agent?.title }}</p>
            <div class="agent-hero__location">
              <i class="fas fa-map-marker-alt"></i>
              {{ agent?.location }}
            </div>
            <div class="agent-hero__stats">
              <div class="stat">
                <span class="stat__value">{{ agent?.propertiesSold }}</span>
                <span class="stat__label">Properties Sold</span>
              </div>
              <div class="stat">
                <span class="stat__value">{{ agent?.yearsExperience }}</span>
                <span class="stat__label">Years Experience</span>
              </div>
              <div class="stat">
                <span class="stat__value">{{ agent?.rating }}</span>
                <span class="stat__label">Rating</span>
              </div>
            </div>
            <div class="agent-hero__actions">
              <button class="action-btn action-btn--primary" @click="contactAgent">
                Contact Agent
              </button>
              <button class="action-btn action-btn--secondary" @click="scheduleMeeting">
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="agent-content">
      <div class="boxed-container">
        <div class="agent-content__grid">
          <!-- Left Column -->
          <div class="agent-content__left">
            <!-- About Section -->
            <div class="content-card">
              <h2 class="content-card__title">About</h2>
              <p class="content-card__text">{{ agent?.bio }}</p>
            </div>

            <!-- Specialties Section -->
            <div class="content-card">
              <h2 class="content-card__title">Specialties</h2>
              <div class="specialties-grid">
                <div v-for="specialty in agent?.specialties" :key="specialty" class="specialty-card">
                  <i class="fas fa-check-circle"></i>
                  <span>{{ specialty }}</span>
                </div>
              </div>
            </div>

            <!-- Languages Section -->
            <div class="content-card">
              <h2 class="content-card__title">Languages</h2>
              <div class="languages-grid">
                <div v-for="language in agent?.languages" :key="language" class="language-card">
                  <i class="fas fa-language"></i>
                  <span>{{ language }}</span>
                </div>
              </div>
            </div>

            <!-- Recent Listings Section -->
            <div class="content-card">
              <h2 class="content-card__title">Recent Listings</h2>
              <div class="listings-grid">
                <div v-for="listing in agent?.recentListings" :key="listing.id" class="listing-card">
                  <img :src="listing.image" :alt="listing.title" class="listing-card__img">
                  <div class="listing-card__content">
                    <h3 class="listing-card__title">{{ listing.title }}</h3>
                    <p class="listing-card__price">${{ listing.price.toLocaleString() }}</p>
                    <p class="listing-card__location">{{ listing.location }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="agent-content__right">
            <!-- Contact Form Card -->
            <div class="content-card content-card--sticky">
              <h2 class="content-card__title">Contact Agent</h2>
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

            <!-- Reviews Section -->
            <div class="content-card">
              <h2 class="content-card__title">Client Reviews</h2>
              <div class="reviews-list">
                <div v-for="review in agent?.reviews" :key="review.id" class="review-card">
                  <div class="review-card__header">
                    <div class="review-card__user">
                      <img :src="review.userAvatar" :alt="review.userName" class="review-card__avatar">
                      <div class="review-card__user-info">
                        <h4 class="review-card__user-name">{{ review.userName }}</h4>
                        <div class="review-card__rating">
                          <i v-for="n in 5" :key="n"
                             :class="['fas', 'fa-star', { 'active': n <= review.rating }]">
                          </i>
                        </div>
                      </div>
                    </div>
                    <span class="review-card__date">{{ review.date }}</span>
                  </div>
                  <p class="review-card__text">{{ review.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Schedule Meeting Modal -->
    <div v-if="showMeetingModal" class="modal-overlay" @click="closeMeetingModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeMeetingModal">&times;</button>
        <h2>Schedule a Meeting with {{ agent?.name }}</h2>
        <form @submit.prevent="submitMeetingForm" class="meeting-form">
          <div class="form-group">
            <label>Preferred Date</label>
            <input type="date" v-model="meetingForm.date" required>
          </div>
          <div class="form-group">
            <label>Preferred Time</label>
            <input type="time" v-model="meetingForm.time" required>
          </div>
          <div class="form-group">
            <label>Meeting Type</label>
            <select v-model="meetingForm.type" required>
              <option value="video">Video Call</option>
              <option value="phone">Phone Call</option>
              <option value="in-person">In Person</option>
            </select>
          </div>
          <div class="form-group">
            <label>Notes</label>
            <textarea v-model="meetingForm.notes"></textarea>
          </div>
          <button type="submit" class="submit-btn">Schedule Meeting</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAgentStore } from '@/stores/agentStore';

const route = useRoute();
const router = useRouter();
const agentStore = useAgentStore();

const agent = ref(null);
const showMeetingModal = ref(false);

const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});

const meetingForm = ref({
  date: '',
  time: '',
  type: 'video',
  notes: ''
});

onMounted(async () => {
  const agentId = route.params.id;
  if (typeof agentStore.fetchAgentById === 'function') {
    agent.value = await agentStore.fetchAgentById(agentId);
  } else {
    // Fallback to getting from all agents
    const allAgents = agentStore.getAllAgents() || [];
    agent.value = allAgents.find(a => a.id === agentId);
  }

  if (!agent.value) {
    router.push('/allagents');
  }
});

const contactAgent = () => {
  // Scroll to contact form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.scrollIntoView({ behavior: 'smooth' });
  }
};

const scheduleMeeting = () => {
  showMeetingModal.value = true;
};

const closeMeetingModal = () => {
  showMeetingModal.value = false;
  meetingForm.value = {
    date: '',
    time: '',
    type: 'video',
    notes: ''
  };
};

const submitContactForm = async () => {
  try {
    // Here you would typically send the contact form data to your backend
    console.log('Contact form submitted:', {
      agentId: agent.value.id,
      ...contactForm.value
    });

    // Show success message
    alert('Message sent successfully!');
    contactForm.value = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  } catch (error) {
    console.error('Error sending message:', error);
    alert('Failed to send message. Please try again.');
  }
};

const submitMeetingForm = async () => {
  try {
    // Here you would typically send the meeting request to your backend
    console.log('Meeting request submitted:', {
      agentId: agent.value.id,
      ...meetingForm.value
    });

    // Show success message
    alert('Meeting request sent successfully!');
    closeMeetingModal();
  } catch (error) {
    console.error('Error scheduling meeting:', error);
    alert('Failed to schedule meeting. Please try again.');
  }
};
</script>

<style scoped>
.agent-profile-page {
  min-height: 100vh;
  background: #f8fafc;
}

/* Hero Section */
.agent-hero {
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000&q=80');
  background-size: cover;
  background-position: center;
  padding: 80px 0;
  color: #fff;
}

.agent-hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
}

.agent-hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 48px;
  align-items: flex-start;
}

.agent-hero__left {
  flex-shrink: 0;
}

.agent-hero__img-box {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.agent-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.agent-hero__badges {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  justify-content: center;
}

.agent-badge {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.agent-badge--verified {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.agent-badge--top {
  background: rgba(245, 158, 11, 0.2);
  color: #fff;
}

.agent-hero__right {
  flex: 1;
}

.agent-hero__name {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 8px;
  font-family: 'Poppins', sans-serif;
}

.agent-hero__title {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 16px;
}

.agent-hero__location {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 1.1rem;
}

.agent-hero__stats {
  display: flex;
  gap: 48px;
  margin-bottom: 32px;
}

.stat {
  text-align: center;
}

.stat__value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat__label {
  font-size: 0.875rem;
  opacity: 0.9;
}

.agent-hero__actions {
  display: flex;
  gap: 16px;
}

.action-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn--primary {
  background: #0066cc;
  color: #fff;
  border: none;
}

.action-btn--primary:hover {
  background: #0052a5;
}

.action-btn--secondary {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.action-btn--secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Main Content */
.agent-content {
  padding: 48px 0;
}

.agent-content__grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
}

/* Content Cards */
.content-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
}

.content-card--sticky {
  position: sticky;
  top: 24px;
}

.content-card__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
}

.content-card__text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #4a5568;
}

/* Specialties Grid */
.specialties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.specialty-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  color: #1a1a1a;
}

.specialty-card i {
  color: #0066cc;
}

/* Languages Grid */
.languages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}

.language-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  color: #1a1a1a;
}

.language-card i {
  color: #0066cc;
}

/* Listings Grid */
.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

.listing-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.listing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.listing-card__img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.listing-card__content {
  padding: 16px;
}

.listing-card__title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.listing-card__price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 8px;
}

.listing-card__location {
  font-size: 0.875rem;
  color: #64748b;
}

/* Contact Form */
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
.form-group textarea,
.form-group select {
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
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  background: #0052a5;
}

/* Reviews List */
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.review-card {
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
}

.review-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.review-card__user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.review-card__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.review-card__user-name {
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.review-card__rating {
  display: flex;
  gap: 4px;
}

.review-card__rating i {
  color: #e2e8f0;
}

.review-card__rating i.active {
  color: #f59e0b;
}

.review-card__date {
  font-size: 0.875rem;
  color: #64748b;
}

.review-card__text {
  font-size: 1rem;
  line-height: 1.6;
  color: #4a5568;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  max-width: 500px;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #64748b;
}

.meeting-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .agent-content__grid {
    grid-template-columns: 1.5fr 1fr;
  }
}

@media (max-width: 900px) {
  .agent-hero__content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .agent-hero__stats {
    justify-content: center;
  }

  .agent-hero__actions {
    justify-content: center;
  }

  .agent-content__grid {
    grid-template-columns: 1fr;
  }

  .content-card--sticky {
    position: static;
  }
}

@media (max-width: 768px) {
  .agent-hero {
    padding: 60px 0;
  }

  .agent-hero__name {
    font-size: 2rem;
  }

  .agent-hero__stats {
    flex-direction: column;
    gap: 24px;
  }

  .specialties-grid,
  .languages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
