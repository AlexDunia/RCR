<template>
  <div class="profile-container">
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-info">
        <img
          :src="profileData?.avatar || profileData?.fullName"
          class="profile-avatar"
          alt="Profile Picture"
        />
        <div class="profile-text">
          <h1>{{ profileData?.fullName }}</h1>
          <p>{{ profileData?.role }}</p>
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
            :to="tab.path"
            class="tab-button"
            :class="{ 'tab-active': $route.path === tab.path }"
          >
            {{ tab.name }}
          </router-link>
        </nav>
      </div>
    </div>

    <!-- Profile Bio (default view) -->
    <div v-if="$route.path === '/profile'" class="profile-bio-container">
      <div class="bio-header">
        <h2>Your personal Information</h2>
        <button class="edit-profile-button" @click="navigateToEditProfile">Edit profile</button>
      </div>

      <div class="profile-fields-container">
        <div class="profile-content">
          <div class="field-row">
            <div class="field-item">
              <div class="field-label">Full name</div>
              <div class="field-value">Alex Dunia</div>
            </div>
            <div class="field-item">
              <div class="field-label">Email</div>
              <div class="field-value">helloduniamedia@gmail.com</div>
            </div>
          </div>

          <div class="field-row">
            <div class="field-item">
              <div class="field-label">Phone number</div>
              <div class="field-value">08108725914</div>
            </div>
            <div class="field-item">
              <div class="field-label">Alternate phone number</div>
              <div class="field-value">08108725914</div>
            </div>
          </div>

          <div class="field-row">
            <div class="field-item">
              <div class="field-label">Agency/Company name</div>
              <div class="field-value">Soft branded real estate foundations limited.</div>
            </div>
            <div class="field-item">
              <div class="field-label">Agency/Company description</div>
              <div class="field-value">A real housing estate that wants your convenience, comfort and happiness.</div>
            </div>
          </div>

          <div class="field-row">
            <div class="field-item">
              <div class="field-label">Country of residence</div>
              <div class="field-value">123 Main Street, Los Angeles, CA 90001</div>
            </div>
          </div>
        </div>
        <div class="profile-image">
          <img
            :src="'    https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png  '"
            alt="Profile Photo"
          />
        </div>
      </div>

      <div class="more-section">
        <h2>More</h2>
        <div class="more-fields-grid">
          <div class="field-row">
            <div class="field-item">
              <div class="field-label">RECO number</div>
              <div class="field-value">97639377946139476</div>
            </div>
            <div class="field-item">
              <div class="field-label">TREBB number</div>
              <div class="field-value">97639377946139476</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Other pages content area -->
    <router-view v-else />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useProfileStore } from '@/stores/profile';
import { useRoute, useRouter } from 'vue-router';

const profileStore = useProfileStore();
const $route = useRoute();
const router = useRouter();

const tabs = [
  { id: 'bio', name: 'Bio', path: '/profile' },
  { id: 'listings', name: 'Listings', path: '/profile/listings' },
  { id: 'documents', name: 'Documents', path: '/profile/documents' }
];

// This will be populated from the store
const profileData = computed(() => profileStore.profileData || {
  fullName: 'Alex Dunia',
  role: 'Senior Real Estate Agent',
  avatar: '/path-to-default-avatar.jpg',
  largeAvatar: '/path-to-default-large-avatar.jpg',
  email: 'helloduniamedia@gmail.com',
  phoneNumber: '08108725914',
  alternatePhoneNumber: '08108725914',
  agencyName: 'Soft branded real estate foundations limited.',
  agencyDescription: 'A real housing estate that wants your convenience, comfort and happiness.',
  countryOfResidence: '123 Main Street, Los Angeles, CA 90001',
  recoNumber: '97639377946139476',
  trebbNumber: '97639377946139476'
});

// Load profile data when component mounts
onMounted(() => {
  profileStore.fetchProfileData();
});

// Function to handle edit profile button click
const navigateToEditProfile = () => {
  router.push('/profile/edit');
};
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background-color: #f9fafb;
  font-family: 'Poppins', sans-serif;
}

.profile-header {
  padding: 32px 24px;
  background-color: #fff;
  border-bottom: none;
  position: relative;
}

.profile-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  height: 1px;
  background: rgba(0, 0, 0, 0.15);
  z-index: 1;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1.5px solid #092D66;
  object-fit: cover;
}

.profile-text h1 {
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  color: #111827;
  margin: 0;
  letter-spacing: -0.2px;
}

.profile-text p {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #303030;
  margin: 4px 0 0;
  letter-spacing: -0.1px;
}

.tabs-container {
  padding: 20px 24px 0;
  background-color: #fff;
  border-bottom: 1px solid #eeeded;
}

.tabs-wrapper {
  border-bottom: none;
}

.tabs-nav {
  display: flex;
  gap: 12px;
  padding-bottom: 30px;
}

.tab-button {
  padding: 8px 20px;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  margin-right:20px;
  margin-top:1px;
  text-decoration: none;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.15s ease;
}

.tab-button:hover {
  background-color: #f9fafb;
}

.tab-active {
  background-color: #DBDADA;
  color: #074F90;
  border-color: #e5e7eb;
  font-weight: 600;
}

.tab-active:hover {
  background-color: #DBDADA;
  color: #074F90;
}

/* Profile Bio Styles */
.profile-bio-container {
  padding: 24px;
  background-color: #f9fafb;
}

.bio-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 45px;
  background-color: #F2F3F3;
  border: 1px solid #e5e7eb;
  border-radius: 10px 8px 0 0;
  margin-bottom: 0;
}

.bio-header h2 {
  font-size: 16px;
  font-weight: 510;
  color: #191d24;
  margin: 0;
  letter-spacing: -0.1px;
}

.edit-profile-button {
  padding: 8px 10px;
  background-color: #074F90;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  line-height: 22px;
  white-space: nowrap;
  transition: background-color 0.2s ease;
}

.edit-profile-button:hover {
  background-color: #092D66;
}

.edit-profile-button:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.profile-fields-container {
  background-color: white;
  border-radius: 0 0 8px 8px;
  padding: 25px 45px;
  display: flex;
  gap: 24px;
  border: 1px solid #e5e7eb;
  border-top: none;
  justify-content: space-between;
  align-items: flex-start;
}

.profile-content {
  flex: 0 1 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.field-row {
  display: flex;
  gap: 32px;
}

.field-item {
  flex: 0 1 80%;
  min-width: 0;
  margin-bottom: 8px;
}

.field-label {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 8px;
  letter-spacing: -0.1px;
}

.field-value {
  font-size: 15px;
  color: #111827;
  line-height: 20px;
  font-weight: 400;
  letter-spacing: -0.1px;
}

.profile-image {
  width: 250px;
  height: 250px;
  overflow: hidden;
  border-radius: 50%;
  flex-shrink: 0;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-right: 20px;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.more-section {
  margin-top: 16px;
}

.more-section h2 {
  font-size: 16px;
  font-weight: 510;
  color: #191d24;
  margin: 0;
  padding: 10px 45px;
  background-color: #F2F3F3;
  border: 1px solid #e5e7eb;
  border-radius: 10px 8px 0 0;
  letter-spacing: -0.1px;
}

.more-fields-grid {
  background-color: white;
  border-radius: 0 0 8px 8px;
  padding: 25px 45px;
  border: 1px solid #e5e7eb;
  border-top: none;
}

/* Ensure consistent font rendering */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .profile-header {
    padding: 24px 16px;
  }

  .profile-avatar {
    width: 40px;
    height: 40px;
  }

  .profile-text h1 {
    font-size: 18px;
    line-height: 22px;
  }

  .profile-text p {
    font-size: 13px;
    line-height: 18px;
  }

  .tabs-container {
    padding: 16px 16px 0;
  }

  .profile-fields-container {
    padding: 20px;
    gap: 16px;
    flex-direction: column-reverse;
    align-items: center;
  }

  .profile-content {
    flex: 0 1 100%;
    max-width: 100%;
    gap: 24px;
  }

  .profile-image {
    width: 180px;
    height: 180px;
    margin-bottom: 24px;
    margin-right: 0;
  }

  .tab-button {
    padding: 6px 16px;
    font-size: 15px;
  }

  .field-row {
    gap: 24px;
  }

  .profile-content .field-label {
    font-size: 13px;
  }

  .profile-content .field-value {
    font-size: 14px;
    line-height: 19px;
  }

  .more-section h2 {
    padding: 10px 20px;
  }

  .more-fields-grid {
    padding: 20px;
  }
}
</style>
