<script setup>
import { ref } from 'vue';
import AnimationWrapper from "@/components/AnimationWrapper.vue";

const pendingListings = ref([
  {
    id: 1,
    title: 'Wilson Creek Villa',
    image: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
    submittedAt: new Date('2023-03-18')
  },
  {
    id: 2,
    title: 'Lakefront Property',
    image: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
    submittedAt: new Date('2023-03-15')
  }
]);

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

const viewDetails = (id) => {
  console.log('Viewing details for pending listing with ID:', id);
};
</script>

<template>
  <div class="pending-listings-container">
    <AnimationWrapper :delay="50">
      <div v-if="pendingListings.length === 0" class="no-listings">
        <p>You have no pending listings.</p>
      </div>
    </AnimationWrapper>
    
    <div v-if="pendingListings.length > 0" class="property-options">
      <AnimationWrapper 
        v-for="(listing, index) in pendingListings" 
        :key="listing.id" 
        :delay="100 + (index * 50)" 
        :distance="20">
        <div class="property-card" @click="viewDetails(listing.id)">
          <img :src="listing.image" :alt="listing.title" />
          <div class="pending-overlay">
            <div class="status-badge">
              <i class="fas fa-clock"></i>
            </div>
            <p>{{ listing.title }}</p>
            <span class="pending-date">Submitted on {{ formatDate(listing.submittedAt) }}</span>
            <div class="status-label">Awaiting Approval</div>
          </div>
        </div>
      </AnimationWrapper>
    </div>
  </div>
</template>

<style scoped>
.pending-listings-container {
  margin-top: 20px;
}

.no-listings {
  text-align: center;
  padding: 30px;
  background-color: #f7f7f7;
  border-radius: 8px;
}

.no-listings p {
  color: #666;
  font-size: 16px;
  font-weight: 500;
}

.property-options {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.property-card {
  position: relative;
  width: 210px;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.property-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.pending-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 10px;
}

.pending-overlay p {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.pending-date {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 10px;
}

.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.status-badge i {
  color: #f0ad4e;
  font-size: 16px;
}

.status-label {
  background-color: rgba(240, 173, 78, 0.8);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style> 