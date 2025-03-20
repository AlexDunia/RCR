<!-- src/features/profile/ProfileDisplay.vue -->
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="profile-display">
    <div class="profile-header" v-if="profile">
      <div class="profile-avatar">
        <img :src="profile.avatar" alt="Profile avatar" v-if="profile.avatar" />
        <div class="avatar-placeholder" v-else></div>
      </div>
      <div class="profile-info">
        <h2>{{ profile.name }}</h2>
        <p>{{ profile.email }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-display {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.profile-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #e0e0e0;
}

.profile-info h2 {
  margin-top: 0;
  margin-bottom: 5px;
}

.profile-info p {
  margin: 0;
  color: #666;
}
</style>
