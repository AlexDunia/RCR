<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="closeModal">&times;</button>

      <div class="agent-profile-header">
        <div class="profile-banner">
          <div class="profile-avatar">
            <img :src="agent.avatar" :alt="agent.name" @error="handleImageError">
          </div>
          <div class="profile-info">
            <h2>{{ agent.name }}</h2>
            <p class="profile-title">{{ agent.title || 'Real Estate Agent' }}</p>
            <div class="profile-meta">
              <div class="meta-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ agent.location }}</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-briefcase"></i>
                <span>{{ agent.experience }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="profile-actions">
          <button
            v-if="!agent.isConnected"
            class="btn-connect"
            @click="requestConnection"
          >
            <i class="fas fa-user-plus"></i>
            Connect
          </button>
          <button
            v-else
            class="btn-message"
            @click="startChat"
          >
            <i class="fas fa-comment"></i>
            Message
          </button>
        </div>
      </div>

      <div class="profile-content">
        <div class="content-section">
          <h3><i class="fas fa-user"></i> About</h3>
          <p>{{ agent.bio || 'No bio available' }}</p>
        </div>

        <div class="content-section" v-if="agent.specialties?.length">
          <h3><i class="fas fa-star"></i> Specialties</h3>
          <div class="specialties-list">
            <span
              v-for="specialty in agent.specialties"
              :key="specialty"
              class="specialty-tag"
            >
              {{ specialty }}
            </span>
          </div>
        </div>

        <div class="content-section" v-if="agent.languages?.length">
          <h3><i class="fas fa-language"></i> Languages</h3>
          <div class="languages-list">
            <span
              v-for="language in agent.languages"
              :key="language"
              class="language-tag"
            >
              {{ language }}
            </span>
          </div>
        </div>

        <div class="content-section" v-if="agent.isConnected">
          <h3><i class="fas fa-address-card"></i> Contact Information</h3>
          <div class="contact-info">
            <div class="info-item">
              <i class="fas fa-envelope"></i>
              <span>{{ agent.email }}</span>
            </div>
            <div class="info-item">
              <i class="fas fa-phone"></i>
              <span>{{ agent.phone }}</span>
            </div>
            <div class="info-item" v-if="agent.alternatePhone">
              <i class="fas fa-phone-alt"></i>
              <span>{{ agent.alternatePhone }}</span>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h3><i class="fas fa-building"></i> Company Information</h3>
          <div class="company-info">
            <p class="company-name">{{ agent.companyName || 'Independent Agent' }}</p>
            <p class="company-description">{{ agent.companyDescription || 'No company description available' }}</p>
          </div>
        </div>

        <div class="content-section" v-if="agent.achievements?.length">
          <h3><i class="fas fa-trophy"></i> Achievements</h3>
          <div class="achievements-list">
            <div
              v-for="achievement in agent.achievements"
              :key="achievement.id"
              class="achievement-item"
            >
              <i :class="achievement.icon"></i>
              <div class="achievement-details">
                <h4>{{ achievement.title }}</h4>
                <p>{{ achievement.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="content-section stats-section">
          <h3><i class="fas fa-chart-line"></i> Performance Stats</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value">{{ agent.stats?.propertiesSold || 0 }}</div>
              <div class="stat-label">Properties Sold</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ agent.stats?.activeListings || 0 }}</div>
              <div class="stat-label">Active Listings</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ agent.stats?.averageRating || '0.0' }}</div>
              <div class="stat-label">Average Rating</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ agent.stats?.yearsOfExperience || 0 }}+</div>
              <div class="stat-label">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useAgentStore } from '@/stores/agentStore';

const router = useRouter();
const agentStore = useAgentStore();

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  agent: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'connect']);

const closeModal = () => {
  emit('close');
};

const requestConnection = () => {
  emit('connect', props.agent.id);
};

const startChat = () => {
  router.push(`/client-messages?agent=${props.agent.id}`);
};

const handleImageError = (event) => {
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(props.agent.name)}&background=0D47A1&color=fff`;
  event.target.src = fallbackUrl;
};
</script>

<style scoped>
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
  backdrop-filter: blur(4px);
}

.modal-content {
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  background-color: white;
  border-radius: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.modal-close:hover {
  background-color: white;
  color: #333;
  transform: scale(1.1);
}

.agent-profile-header {
  background: linear-gradient(135deg, #0a4d8c 0%, #1a4189 100%);
  padding: 32px;
  color: white;
  position: relative;
}

.profile-banner {
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 24px;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 4px;
  color: white;
}

.profile-title {
  font-size: 16px;
  opacity: 0.9;
  margin: 0 0 12px;
}

.profile-meta {
  display: flex;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.meta-item i {
  opacity: 0.8;
}

.profile-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.btn-connect,
.btn-message {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-connect {
  background-color: white;
  color: #0a4d8c;
}

.btn-connect:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-message {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-message:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.profile-content {
  padding: 32px;
}

.content-section {
  margin-bottom: 32px;
}

.content-section:last-child {
  margin-bottom: 0;
}

.content-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a4189;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.content-section h3 i {
  font-size: 16px;
  opacity: 0.8;
}

.specialties-list,
.languages-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.specialty-tag,
.language-tag {
  background-color: #f0f7ff;
  color: #0a4d8c;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  color: #64748b;
}

.info-item i {
  color: #0a4d8c;
}

.company-info {
  background: #f8fafc;
  padding: 16px;
  border-radius: 8px;
}

.company-name {
  font-weight: 600;
  color: #1a4189;
  margin: 0 0 8px;
}

.company-description {
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

.achievements-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.achievement-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
}

.achievement-item i {
  font-size: 24px;
  color: #0a4d8c;
}

.achievement-details h4 {
  margin: 0 0 4px;
  color: #1a4189;
}

.achievement-details p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.stats-section {
  background: #f8fafc;
  padding: 24px;
  border-radius: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 24px;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #0a4d8c;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-height: 90vh;
  }

  .profile-banner {
    flex-direction: column;
    text-align: center;
  }

  .profile-meta {
    justify-content: center;
  }

  .profile-actions {
    justify-content: center;
  }

  .contact-info {
    grid-template-columns: 1fr;
  }
}
</style>
