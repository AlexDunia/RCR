<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(true);
const error = ref(null);
const isEditing = ref(false);
const showSaveSuccess = ref(false);

// Agent profile data
const agent = reactive({
  id: 101,
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@realestateagency.com',
  phone: '(555) 123-4567',
  title: 'Senior Real Estate Agent',
  officeLocation: 'Downtown Branch',
  bio: 'Jane is a dedicated real estate professional with over 10 years of experience in residential and commercial properties. She specializes in luxury homes and investment properties, with a strong track record of client satisfaction and successful closings.',
  profileImage: 'https://i.pravatar.cc/300?img=29',
  coverImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
  specialties: ['Luxury Homes', 'Investment Properties', 'First-Time Buyers'],
  languages: ['English', 'Spanish'],
  licenseNumber: 'REA-12345-CA',
  licenseExpiration: '2025-06-30',
  certifications: [
    { name: 'Certified Residential Specialist (CRS)', year: 2018 },
    { name: 'Accredited Buyer\'s Representative (ABR)', year: 2016 }
  ],
  socialMedia: {
    linkedin: 'https://linkedin.com/in/janesmith',
    twitter: 'https://twitter.com/janesmith',
    instagram: 'https://instagram.com/janerealtor'
  },
  statistics: {
    listingsSold: 78,
    averageDaysOnMarket: 32,
    totalSalesVolume: '$42.5M',
    activeListings: 8
  }
});

// Copy of the agent data for editing
const editableAgent = reactive({ ...agent });

onMounted(() => {
  // Simulate loading data from API
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
});

const startEditing = () => {
  // Copy current values to editable form
  Object.assign(editableAgent, agent);
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
};

const saveProfile = () => {
  // Simulate API call to save profile
  isLoading.value = true;

  setTimeout(() => {
    // Update the main agent object with edited values
    Object.assign(agent, editableAgent);
    isLoading.value = false;
    isEditing.value = false;

    // Show success message
    showSaveSuccess.value = true;
    setTimeout(() => {
      showSaveSuccess.value = false;
    }, 3000);
  }, 1000);
};

const addSpecialty = () => {
  editableAgent.specialties.push('');
};

const removeSpecialty = (index) => {
  editableAgent.specialties.splice(index, 1);
};

const addLanguage = () => {
  editableAgent.languages.push('');
};

const removeLanguage = (index) => {
  editableAgent.languages.splice(index, 1);
};

const addCertification = () => {
  editableAgent.certifications.push({ name: '', year: new Date().getFullYear() });
};

const removeCertification = (index) => {
  editableAgent.certifications.splice(index, 1);
};

const navigateToListings = () => {
  router.push('/listings');
};

const navigateToAgentSettings = () => {
  router.push('/agent-settings');
};
</script>

<template>
  <div class="agent-profile-page">
    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading profile...</p>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else>
      <!-- Success message -->
      <div v-if="showSaveSuccess" class="success-message">
        Profile updated successfully!
      </div>

      <!-- Cover image -->
      <div class="cover-image" :style="{ backgroundImage: `url(${agent.coverImage})` }">
        <div class="edit-cover-btn" v-if="isEditing">
          <button class="btn-secondary">Change Cover</button>
        </div>
      </div>

      <div class="profile-content">
        <!-- Profile header with image and name -->
        <div class="profile-header">
          <div class="profile-image-container">
            <img :src="agent.profileImage" alt="Profile picture" class="profile-image">
            <div class="edit-profile-img-btn" v-if="isEditing">
              <button class="btn-circle">
                <span>Edit</span>
              </button>
            </div>
          </div>

          <div class="profile-info">
            <div v-if="!isEditing" class="agent-name">
              {{ agent.firstName }} {{ agent.lastName }}
            </div>
            <div v-else class="agent-name-edit">
              <div class="form-group">
                <input v-model="editableAgent.firstName" type="text" placeholder="First Name">
              </div>
              <div class="form-group">
                <input v-model="editableAgent.lastName" type="text" placeholder="Last Name">
              </div>
            </div>

            <div v-if="!isEditing" class="agent-title">{{ agent.title }}</div>
            <div v-else class="form-group">
              <input v-model="editableAgent.title" type="text" placeholder="Title">
            </div>

            <div v-if="!isEditing" class="agent-office">
              <span class="label">Office:</span> {{ agent.officeLocation }}
            </div>
            <div v-else class="form-group">
              <label>Office Location</label>
              <input v-model="editableAgent.officeLocation" type="text" placeholder="Office Location">
            </div>
          </div>

          <div class="profile-actions">
            <button v-if="!isEditing" @click="startEditing" class="btn-primary">
              Edit Profile
            </button>
            <div v-else class="edit-actions">
              <button @click="cancelEditing" class="btn-secondary">
                Cancel
              </button>
              <button @click="saveProfile" class="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <!-- Profile details -->
        <div class="profile-details">
          <div class="panel">
            <h3 class="panel-title">Contact Information</h3>

            <div v-if="!isEditing" class="contact-info">
              <div class="info-item">
                <span class="label">Email:</span>
                <span>{{ agent.email }}</span>
              </div>
              <div class="info-item">
                <span class="label">Phone:</span>
                <span>{{ agent.phone }}</span>
              </div>
              <div class="info-item">
                <span class="label">License #:</span>
                <span>{{ agent.licenseNumber }}</span>
              </div>
              <div class="info-item">
                <span class="label">License Expiration:</span>
                <span>{{ new Date(agent.licenseExpiration).toLocaleDateString() }}</span>
              </div>
            </div>

            <div v-else class="contact-info-edit">
              <div class="form-group">
                <label>Email</label>
                <input v-model="editableAgent.email" type="email" placeholder="Email">
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input v-model="editableAgent.phone" type="tel" placeholder="Phone">
              </div>
              <div class="form-group">
                <label>License Number</label>
                <input v-model="editableAgent.licenseNumber" type="text" placeholder="License Number">
              </div>
              <div class="form-group">
                <label>License Expiration</label>
                <input v-model="editableAgent.licenseExpiration" type="date">
              </div>
            </div>
          </div>

          <div class="panel">
            <h3 class="panel-title">About Me</h3>

            <div v-if="!isEditing" class="bio">
              {{ agent.bio }}
            </div>

            <div v-else class="bio-edit">
              <div class="form-group">
                <label>Biography</label>
                <textarea v-model="editableAgent.bio" rows="6" placeholder="Tell clients about yourself"></textarea>
              </div>
            </div>
          </div>

          <div class="panel">
            <h3 class="panel-title">Specialties & Languages</h3>

            <div v-if="!isEditing">
              <div class="specialties-section">
                <h4>Specialties</h4>
                <div class="tag-list">
                  <div v-for="(specialty, index) in agent.specialties" :key="`spec-${index}`" class="tag">
                    {{ specialty }}
                  </div>
                </div>
              </div>

              <div class="languages-section">
                <h4>Languages</h4>
                <div class="tag-list">
                  <div v-for="(language, index) in agent.languages" :key="`lang-${index}`" class="tag">
                    {{ language }}
                  </div>
                </div>
              </div>
            </div>

            <div v-else>
              <div class="specialties-edit">
                <h4>Specialties</h4>
                <div v-for="(specialty, index) in editableAgent.specialties" :key="`spec-edit-${index}`" class="tag-edit">
                  <input v-model="editableAgent.specialties[index]" type="text" placeholder="Specialty">
                  <button @click="removeSpecialty(index)" class="remove-btn">×</button>
                </div>
                <button @click="addSpecialty" class="btn-secondary btn-sm">Add Specialty</button>
              </div>

              <div class="languages-edit">
                <h4>Languages</h4>
                <div v-for="(language, index) in editableAgent.languages" :key="`lang-edit-${index}`" class="tag-edit">
                  <input v-model="editableAgent.languages[index]" type="text" placeholder="Language">
                  <button @click="removeLanguage(index)" class="remove-btn">×</button>
                </div>
                <button @click="addLanguage" class="btn-secondary btn-sm">Add Language</button>
              </div>
            </div>
          </div>

          <div class="panel">
            <h3 class="panel-title">Certifications</h3>

            <div v-if="!isEditing" class="certifications-list">
              <div v-for="(cert, index) in agent.certifications" :key="`cert-${index}`" class="certification-item">
                <div class="cert-name">{{ cert.name }}</div>
                <div class="cert-year">{{ cert.year }}</div>
              </div>
            </div>

            <div v-else class="certifications-edit">
              <div v-for="(cert, index) in editableAgent.certifications" :key="`cert-edit-${index}`" class="certification-edit-item">
                <div class="form-group">
                  <input v-model="editableAgent.certifications[index].name" type="text" placeholder="Certification Name">
                </div>
                <div class="form-group">
                  <input v-model.number="editableAgent.certifications[index].year" type="number" placeholder="Year">
                </div>
                <button @click="removeCertification(index)" class="remove-btn">×</button>
              </div>
              <button @click="addCertification" class="btn-secondary btn-sm">Add Certification</button>
            </div>
          </div>

          <div class="panel">
            <h3 class="panel-title">Social Media</h3>

            <div v-if="!isEditing" class="social-media-links">
              <a v-if="agent.socialMedia.linkedin" :href="agent.socialMedia.linkedin" target="_blank" class="social-link linkedin">
                LinkedIn
              </a>
              <a v-if="agent.socialMedia.twitter" :href="agent.socialMedia.twitter" target="_blank" class="social-link twitter">
                Twitter
              </a>
              <a v-if="agent.socialMedia.instagram" :href="agent.socialMedia.instagram" target="_blank" class="social-link instagram">
                Instagram
              </a>
            </div>

            <div v-else class="social-media-edit">
              <div class="form-group">
                <label>LinkedIn</label>
                <input v-model="editableAgent.socialMedia.linkedin" type="url" placeholder="LinkedIn URL">
              </div>
              <div class="form-group">
                <label>Twitter</label>
                <input v-model="editableAgent.socialMedia.twitter" type="url" placeholder="Twitter URL">
              </div>
              <div class="form-group">
                <label>Instagram</label>
                <input v-model="editableAgent.socialMedia.instagram" type="url" placeholder="Instagram URL">
              </div>
            </div>
          </div>

          <div class="panel">
            <h3 class="panel-title">Performance Statistics</h3>

            <div class="statistics-grid">
              <div class="stat-card">
                <div class="stat-value">{{ agent.statistics.listingsSold }}</div>
                <div class="stat-label">Listings Sold</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">{{ agent.statistics.averageDaysOnMarket }}</div>
                <div class="stat-label">Avg. Days on Market</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">{{ agent.statistics.totalSalesVolume }}</div>
                <div class="stat-label">Sales Volume</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">{{ agent.statistics.activeListings }}</div>
                <div class="stat-label">Active Listings</div>
              </div>
            </div>

            <div class="view-listings-action">
              <button @click="navigateToListings" class="btn-secondary">
                View My Listings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.agent-profile-page {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 40px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #1976d2;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  padding: 20px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 8px;
  text-align: center;
  margin: 20px;
}

.success-message {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  background-color: #e8f5e9;
  color: #2e7d32;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.cover-image {
  height: 250px;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 8px 8px 0 0;
}

.edit-cover-btn {
  position: absolute;
  bottom: 15px;
  right: 15px;
}

.profile-content {
  margin-top: -60px;
  padding: 0 20px;
}

.profile-header {
  display: flex;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  position: relative;
  flex-wrap: wrap;
}

.profile-image-container {
  position: relative;
  margin-right: 20px;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}

.edit-profile-img-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.btn-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #1976d2;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.7rem;
}

.profile-info {
  flex: 1;
  min-width: 200px;
}

.agent-name {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.agent-name-edit {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.agent-title {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 5px;
}

.agent-office {
  font-size: 0.9rem;
  color: #666;
}

.profile-actions {
  display: flex;
  align-items: flex-start;
  margin-left: auto;
}

.edit-actions {
  display: flex;
  gap: 10px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.panel {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.panel-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: 600;
  color: #555;
  font-size: 0.85rem;
  margin-bottom: 3px;
}

.contact-info-edit {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.bio {
  line-height: 1.6;
  color: #333;
}

.specialties-section,
.languages-section {
  margin-bottom: 20px;
}

.specialties-section h4,
.languages-section h4,
.specialties-edit h4,
.languages-edit h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1rem;
  color: #555;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #e3f2fd;
  color: #1565c0;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.specialties-edit,
.languages-edit {
  margin-bottom: 20px;
}

.tag-edit {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.tag-edit input {
  flex: 1;
  margin-right: 10px;
}

.remove-btn {
  background: none;
  border: none;
  color: #f44336;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 5px;
}

.certifications-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.certification-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #f5f5f5;
}

.certification-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.cert-name {
  font-weight: 500;
}

.cert-year {
  color: #666;
}

.certification-edit-item {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  align-items: flex-end;
}

.certification-edit-item .form-group:first-child {
  flex: 2;
}

.certification-edit-item .form-group:nth-child(2) {
  flex: 1;
}

.social-media-links {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.social-link {
  padding: 8px 15px;
  border-radius: 4px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
}

.linkedin {
  background-color: #0077b5;
}

.twitter {
  background-color: #1da1f2;
}

.instagram {
  background-color: #e1306c;
}

.social-media-edit {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: #555;
}

.view-listings-action {
  text-align: center;
  margin-top: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #555;
  font-size: 0.85rem;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
}

.btn-primary {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #1565c0;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-sm {
  font-size: 0.85rem;
  padding: 6px 12px;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
  }

  .profile-image-container {
    margin: 0 auto 20px;
  }

  .profile-info {
    text-align: center;
    margin-bottom: 20px;
  }

  .profile-actions {
    margin: 0 auto;
  }

  .agent-name-edit {
    flex-direction: column;
  }

  .contact-info,
  .contact-info-edit,
  .social-media-edit {
    grid-template-columns: 1fr;
  }
}
</style>
