<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="closeModal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div class="agent-profile-header" :class="{ 'connected': agent.isConnected }">
        <div class="header-bg-pattern"></div>
        <div class="profile-banner">
          <div class="profile-avatar-wrapper">
            <div class="profile-avatar">
              <img :src="agent.avatar" :alt="agent.name" @error="handleImageError">
            </div>
            <div v-if="agent.isConnected" class="network-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Connected
            </div>
          </div>

          <div class="profile-info">
            <div class="name-section">
              <h2>{{ agent.name }}</h2>
              <span v-if="agent.isVerified" class="verified-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0EA5E9">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <p class="profile-title">{{ agent.title }}</p>
            <div class="profile-meta">
              <div class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {{ agent.location }}
              </div>
              <div class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ agent.yearsOfExperience }}+ Years
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-content">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div class="stat-value">{{ agent.stats?.propertiesSold || 0 }}</div>
            <div class="stat-label">Properties Sold</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div class="stat-value">{{ agent.stats?.activeListings || 0 }}</div>
            <div class="stat-label">Active Listings</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div class="stat-value">{{ agent.stats?.averageRating || 0 }}</div>
            <div class="stat-label">Rating</div>
          </div>
        </div>

        <div class="content-sections">
          <div class="info-section">
            <h3>About</h3>
            <p>{{ agent.bio }}</p>
          </div>

          <div class="two-column-grid">
            <div class="info-section">
              <h3>Specialties</h3>
              <div class="tags-grid">
                <span v-for="specialty in agent.specialties" :key="specialty" class="tag">
                  {{ specialty }}
                </span>
              </div>
            </div>

            <div class="info-section">
              <h3>Languages</h3>
              <div class="tags-grid">
                <span v-for="language in agent.languages" :key="language" class="tag">
                  {{ language }}
                </span>
              </div>
            </div>
          </div>

          <div class="contact-section">
            <h3>Contact Information</h3>
            <div class="contact-grid">
              <div class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <div class="contact-info">
                  <label>Phone</label>
                  <span>{{ agent.phone }}</span>
                </div>
              </div>
              <div class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <div class="contact-info">
                  <label>Email</label>
                  <span>{{ agent.email }}</span>
                </div>
              </div>
              <div class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <div class="contact-info">
                  <label>Company</label>
                  <span>{{ agent.companyName }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

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

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const handleImageError = (event) => {
  // Set a default avatar image on error
  event.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(props.agent.name);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
  animation: fadeIn 0.3s ease-out;
  font-family: 'Poppins', sans-serif;
}

.modal-content {
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  margin: 24px;
  background-color: #ffffff;
  border-radius: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-close {
  position: fixed;
  top: 32px;
  right: calc(5% + 24px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
  z-index: 1010;
  backdrop-filter: blur(8px);
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.agent-profile-header {
  background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
  padding: 32px 24px;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1005;
}

.header-bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 150%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% -50%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
  opacity: 0.5;
  pointer-events: none;
}

.agent-profile-header.connected {
  background: linear-gradient(135deg, #0369A1 0%, #0C4A6E 100%);
}

.profile-banner {
  position: relative;
  display: flex;
  gap: 24px;
  align-items: center;
}

.profile-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.profile-avatar {
  width: 84px;
  height: 84px;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: white;
  transition: transform 0.3s ease;
}

.profile-avatar:hover {
  transform: translateY(-2px);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.network-badge {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(16, 185, 129, 0.9);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.name-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.name-section h2 {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  color: white;
  letter-spacing: -0.3px;
  line-height: 1.2;
}

.verified-badge {
  display: flex;
  align-items: center;
  margin-top: 2px;
}

.profile-title {
  font-size: 14px;
  opacity: 0.9;
  margin: 0 0 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.profile-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.meta-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.profile-content {
  padding: 24px;
  background: #F8FAFC;
}

.content-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 4px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: rgba(14, 165, 233, 0.2);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.1);
}

.stat-icon {
  color: #0EA5E9;
  margin-bottom: 12px;
  opacity: 0.9;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 4px;
  letter-spacing: -0.5px;
}

.stat-label {
  font-size: 13px;
  color: #64748B;
  font-weight: 500;
}

.info-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.info-section:hover {
  border-color: rgba(14, 165, 233, 0.2);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.1);
}

.info-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 16px;
  letter-spacing: -0.3px;
}

.info-section p {
  font-size: 14px;
  line-height: 1.6;
  color: #475569;
  margin: 0;
}

.two-column-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.tags-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: rgba(14, 165, 233, 0.08);
  color: #0284C7;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid rgba(14, 165, 233, 0.1);
}

.tag:hover {
  background: rgba(14, 165, 233, 0.12);
  transform: translateY(-1px);
}

.contact-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #475569;
  padding: 16px;
  border-radius: 8px;
  background: rgba(248, 250, 252, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.contact-item:hover {
  background: rgba(248, 250, 252, 0.8);
  transform: translateY(-1px);
  border-color: rgba(14, 165, 233, 0.2);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-info label {
  font-size: 12px;
  color: #64748B;
  font-weight: 500;
}

.contact-info span {
  font-size: 14px;
  color: #0F172A;
  font-weight: 500;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-content {
    margin: 16px;
    max-height: 95vh;
  }

  .modal-close {
    top: 24px;
    right: 24px;
  }

  .agent-profile-header {
    padding: 24px 20px;
  }

  .profile-banner {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .profile-info {
    text-align: center;
  }

  .profile-meta {
    justify-content: center;
  }

  .name-section {
    justify-content: center;
  }

  .stats-grid,
  .two-column-grid,
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .info-section,
  .contact-section {
    padding: 20px;
  }

  .contact-item {
    padding: 12px;
  }
}
</style>
