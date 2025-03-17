<script setup>
import { ref } from 'vue';
import AnimationWrapper from "@/components/AnimationWrapper.vue";

const drafts = ref([
  {
    id: 1,
    title: 'Wilson Creek Villa',
    image: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
    createdAt: new Date('2023-03-15')
  },
  {
    id: 2,
    title: 'Sunset Heights Apartment',
    image: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
    createdAt: new Date('2023-03-10')
  }
]);

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

const editDraft = (id) => {
  console.log('Editing draft with ID:', id);
};
</script>

<template>
  <div class="drafts-container">
    <AnimationWrapper :delay="50">
      <div v-if="drafts.length === 0" class="no-drafts">
        <p>You have no saved drafts.</p>
      </div>
    </AnimationWrapper>
    
    <div v-if="drafts.length > 0" class="property-options">
      <AnimationWrapper 
        v-for="(draft, index) in drafts" 
        :key="draft.id" 
        :delay="100 + (index * 50)"
        :distance="20">
        <div class="property-card saved-draft" @click="editDraft(draft.id)">
          <img :src="draft.image" :alt="draft.title" />
          <div class="draft-overlay">
            <div class="edit-icon">
              <i class="fas fa-pen"></i>
            </div>
            <p>{{ draft.title }}</p>
            <span class="draft-date">Saved on {{ formatDate(draft.createdAt) }}</span>
          </div>
        </div>
      </AnimationWrapper>
    </div>
  </div>
</template>

<style scoped>
.drafts-container {
  margin-top: 20px;
}

.no-drafts {
  text-align: center;
  padding: 30px;
  background-color: #f7f7f7;
  border-radius: 8px;
}

.no-drafts p {
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

.draft-overlay {
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

.draft-overlay p {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.draft-date {
  font-size: 14px;
  opacity: 0.9;
}

.edit-icon {
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

.edit-icon i {
  color: #074F90;
  font-size: 16px;
}
</style> 