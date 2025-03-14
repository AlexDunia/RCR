<template>
  <div class="profile-container">
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-info">
        <img
          :src="profileData.avatar"
          class="profile-avatar"
          alt="Profile Picture"
        />
        <div class="profile-text">
          <h1>{{ profileData.fullName }}</h1>
          <p>{{ profileData.role }}</p>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs-container">
      <div class="tabs-wrapper">
        <nav class="tabs-nav">
          <router-link
            v-for="tab in tabs"
            :key="tab.id"
            :to="{ name: tab.route }"
            class="tab-button"
            :class="{ 'tab-active': $route.name === tab.route }"
          >
            {{ tab.name }}
          </router-link>
        </nav>
      </div>
    </div>

    <!-- Content Area -->
    <router-view v-if="$route.name !== 'profile-bio'" />

    <div v-else class="content-area">
      <div class="content-card">
        <div class="header-content">
          <h2>Your Personal Information</h2>
          <router-link
            to="/profile/edit"
            class="edit-button"
          >
            Edit profile
          </router-link>
        </div>

        <div class="card-body">
          <div class="profile-image-container">
            <img
              :src="profileData.avatar"
              class="large-profile-image"
              alt="Profile Picture"
            />
          </div>

          <div class="info-grid">
            <div class="info-item">
              <h3>Full name</h3>
              <p>{{ profileData.fullName }}</p>
            </div>
            <div class="info-item">
              <h3>Email</h3>
              <p>{{ profileData.email }}</p>
            </div>
            <div class="info-item">
              <h3>Phone number</h3>
              <p>{{ profileData.phoneNumber }}</p>
            </div>
            <div class="info-item">
              <h3>Alternate phone number</h3>
              <p>{{ profileData.alternatePhone }}</p>
            </div>
            <div class="info-item">
              <h3>Agency/Company name</h3>
              <p>{{ profileData.companyName }}</p>
            </div>
            <div class="info-item">
              <h3>Agency/Company description</h3>
              <p>{{ profileData.companyDescription }}</p>
            </div>
            <div class="info-item">
              <h3>Country of residence</h3>
              <p>{{ profileData.address }}</p>
            </div>
          </div>

          <!-- More Section -->
          <div class="more-section">
            <h3>More</h3>
            <div class="info-grid">
              <div class="info-item">
                <h3>RECO number</h3>
                <p>{{ profileData.recoNumber }}</p>
              </div>
              <div class="info-item">
                <h3>TREBB number</h3>
                <p>{{ profileData.trebbNumber }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile'
}
</script>

<script setup>
const tabs = [
  { id: 'bio', name: 'Bio', route: 'profile-bio' },
  { id: 'listings', name: 'Listings', route: 'profile-listings' },
  { id: 'documents', name: 'Documents', route: 'profile-documents' }
]

const profileData = {
  fullName: 'Alex Dunia',
  role: 'Senior Real Estate Agent',
  email: 'helloduniamedia@gmail.com',
  phoneNumber: '08108725914',
  alternatePhone: '08108725914',
  companyName: 'Soft branded real estate foundations limited.',
  companyDescription: 'A real housing estate that wants your convenience, comfort and happiness.',
  address: '123 Main Street, Los Angeles, CA 90001',
  recoNumber: '97639377946139476',
  trebbNumber: '97639377946139476',
  avatar: '/path-to-avatar.jpg'
}
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background-color: #f9fafb;
  font-family: Inter, system-ui, -apple-system, sans-serif;
}

.profile-header {
  padding: 28px 32px 16px;
  background-color: #fff;
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(229, 231, 235, 0.8);
}

.profile-text h1 {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  letter-spacing: -0.025em;
}

.profile-text p {
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
  margin: 2px 0 0;
  font-weight: 400;
}

.tabs-container {
  padding: 0 32px;
  background-color: #fff;
}

.tabs-wrapper {
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
}

.tabs-nav {
  display: flex;
  margin-bottom: -1px;
}

.tab-button {
  margin-right: 32px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
  border: none;
  background: none;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  font-weight: 500;
  transition: all 0.15s ease-in-out;
}

.tab-button:hover {
  color: #374151;
}

.tab-active {
  color: #2563eb;
  font-weight: 500;
  background-color: #f9fafb;
  border-bottom: 2px solid #2563eb;
  border-radius: 6px 6px 0 0;
}

.content-area {
  padding: 24px 32px;
  background-color: #f9fafb;
}

.content-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.header-content {
  background-color: #f3f4f6;
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
}

.header-content h2 {
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  color: #111827;
  margin: 0;
  letter-spacing: -0.025em;
}

.profile-image-container {
  padding: 32px 0;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.large-profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f3f4f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.large-profile-image:hover {
  transform: scale(1.02);
}

.edit-button {
  padding: 8px 16px;
  background-color: #1d4ed8;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.edit-button:hover {
  background-color: #1e40af;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.edit-button:active {
  transform: translateY(0);
}

.card-body {
  padding: 32px 24px;
  background-color: white;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px 64px;
}

.info-item h3 {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 6px;
  letter-spacing: -0.025em;
}

.info-item p {
  font-size: 14px;
  line-height: 20px;
  color: #111827;
  margin: 0;
  font-weight: 400;
}

.more-section {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(229, 231, 235, 0.8);
}

.more-section > h3 {
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 16px;
  letter-spacing: -0.025em;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .profile-header,
  .tabs-container,
  .content-area {
    padding-left: 16px;
    padding-right: 16px;
  }
}

/* Ensure consistent font rendering */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}
</style>
