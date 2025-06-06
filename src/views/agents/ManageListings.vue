<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Loader from '@/ui/Loader.vue';
import { useHeaderStore } from "@/stores/headerStore";

const router = useRouter();
const isLoading = ref(true);

// Set the header title for this page
const headerStore = useHeaderStore();
headerStore.setTitle("Manage Listings");

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 800); // Slightly faster loading for better UX
});

const navigateToAddListing = () => {
  router.push('/add-listing');
};
</script>

<template>
  <div class="manage-listings">
    <div v-if="isLoading" class="loader-container">
      <Loader />
    </div>
    <div v-else class="manage-listings-content">
      <!-- Tab Navigation -->
      <transition name="fade-slide" appear>
        <div class="tab-navigation">
          <div class="tab-item">
            <router-link to="/add-listing" class="special">
              <i class="fas fa-plus-circle"></i> Add Listing
            </router-link>
            <div class="special-underline"></div>
          </div>
          <router-link to="/view-listings">
            <i class="fas fa-home"></i> View Listings
          </router-link>

          <router-link to="/pending-approvals" class="pend">
            <i class="fas fa-clock"></i> Pending Approvals
          </router-link>
          <router-link to="/drafts" class="drafts">
            <i class="fas fa-file-alt"></i> Drafts
          </router-link>
          <div class="tab-underline"></div>
        </div>
      </transition>
      <br/>
      <div class="second-special-underline"></div>

      <!-- Add Property & Search -->
      <transition name="fade-slide" appear>
        <div class="add-property-container" style="transition-delay: 80ms;">
          <div class="add-property">
            <h2>Add a property</h2>
          </div>
          <!-- Search Bar -->
          <div class="search-bar">
            <svg class="search-icon" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="black" stroke-width="1.5" fill="none" />
              <line x1="16" y1="16" x2="22" y2="22" stroke="black" stroke-width="1.5" />
            </svg>
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </transition>

      <transition name="fade-slide" appear>
        <div class='propertystatus' style="transition-delay: 160ms;">
          <p>You currently have no properties on your profile.</p>
        </div>
      </transition>

      <!-- Property Options -->
      <div class="property-options">
        <!-- Create Listing -->
        <transition name="fade-slide" appear>
          <div class="property-card create-listing" style="transition-delay: 240ms;" @click="navigateToAddListing">
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Create listing</p>
            <span>Take the first step to your success</span>
          </div>
        </transition>

        <!-- Saved Draft -->
        <transition name="fade-slide" appear>
          <div class="property-card saved-draft" style="transition-delay: 320ms;">
            <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png" alt="Saved Draft" />
            <div class="draft-overlay">
              <div class="edit-icon">
                <i class="fas fa-pen"></i>
              </div>
              <p>Saved Draft</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Airbnb-inspired smooth animations */
.fade-slide-enter-active {
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: var(--delay, 0s);
}

.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Keeping all existing styles */
.manage-listings {
  padding: 35px;
  max-width: 1000px;
  margin: 0 auto;
}

.tab-navigation .special{
  background:#F0EFEF;
}

.tab-navigation .pend{
  padding-left:15px;
  padding-right:15px;
}

.tab-navigation .drafts{
  padding-left:0px;
  padding-right:0px;
}


/* Tab Navigation */
.tab-navigation {
  display: flex;
  gap: 30px;
  margin-bottom: 10px;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.tab-navigation a {
  padding: 3px 5px;
  font-size: 13.6px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #E2E8F0;
  background: #FCFCFC;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  min-width: 120px;
  width: auto;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
  white-space: nowrap;
  gap: 8px;
}

/* Icons */
.tab-navigation a i {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
}

/* Special Underline */
.special-underline {
  position: absolute;
  bottom: -6px;
  left: 50%;
  top:125%;
  width: 60%;
  height: 0.4px;
  background: linear-gradient(90deg, #0A397B 0%, #074F90 40%);
  transform: translateX(-50%);
  border-radius: 2px;
}


.second-special-underline {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(10, 57, 123, 0.1), rgba(7, 79, 144, 0.1)); /* Lighter gradient */
  border-radius: 1px;
  margin-bottom:10px;
  box-shadow: 0px 1px 3px rgba(10, 57, 123, 0.1);
}

/* Styled Line */
.styled-line {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #0A397B 0%, #074F90 100%);
  margin-top: 10px;
  border-radius: 2px;
}

/* Add Property & Search Container */
.add-property-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap; /* Prevents wrapping */
  gap: 20px; /* Space between elements */
  max-width: 100%;
  overflow: hidden;
}

/* Add Property Section */
.add-property {
  flex-grow: 1; /* Ensures it takes available space without forcing a new line */
  min-width: 200px;
}

.add-property h2 {
  font-size:22px;
  color: rgba(0, 0, 0, 0.6);
  font-weight:550;
  letter-spacing: -0.9px;
}


.search-bar {
  display: flex;
  align-items: center;
  background: #EAE8E8;
  /* No background */
  border-radius: 8px;
  color:rgba(0, 0, 0, 0.4);
  /* Rounded corners */
  padding: 12px 16px;
  width: 430px;
  transition: border 0.2s ease-in-out;
}

/* Apply stroke to the search bar container when focused */
.search-bar:focus-within {
  border: 1.5px solid rgba(0, 102, 255, 0.3);
  /* Soft, light blue */
}

/* Input field: No background, no border */
input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  padding-left:8px;
  font-size: 13px;
}

/* Search Text */
input::placeholder {
  color: rgba(0, 0, 0, 0.3); /* Adjust color */
  font-weight: 500; /* Adjust weight */
}

/* If the text is typed in */
input {
  color: rgba(0, 0, 0, 0.8); /* Adjust color */
  font-weight: 400; /* Adjust weight */
}

/* SVG Search Icon */
.search-icon {
  width: 16px;
  height: 16px;
  font-size:8px;
  color: rgba(0, 0, 0, 0.2);
  font-weight: bold; /* Increase weight */
}

br {
  line-height: 0.1; /* Reduce space between lines */
  opacity: 0.5; /* Lower visibility */
}

/* Property Options */
.property-options {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.propertystatus p{
  font-weight:500;
  font-size:15px;
  color: rgba(0, 0, 0, 0.8);
}

/* Property Cards */
.property-card {
  width: 170px;
  height: 160px;
  border-radius: 10px;
  border: 2px dashed #c3c3c3;
  display: flex;
  margin-right: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: #E4E4E5;
}

.property-card i {
  font-size: 24px;
  color: #0A397B;
  margin-bottom: 8px;
}

.property-card p {
  font-size: 14px;
  font-weight: 500;
}

.property-card span {
  font-size: 12px;
  color: #777;
}

/* Saved Draft */
.saved-draft {
  position: relative;
  width: 190px; /* Set exact width */
  height: 170px; /* Set exact height */
  border-radius: 10px;
  overflow: hidden;
}

.saved-draft img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures full image visibility */
  border-radius: 10px;
}

/* Overlay */
.draft-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Slight dark overlay */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

/* Edit Icon */
.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 35px;
  height: 35px;
  color: #074F90;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-icon i {
  color: #074F90;
  font-size: 16px;
  margin: auto;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
</style>
