<template>
  <div class="profile-badge" :class="{ 'with-avatar': showAvatar }">
    <div v-if="showAvatar" class="avatar-container">
      <img v-if="profile.avatar" :src="profile.avatar" alt="User avatar" class="avatar" />
      <div v-else class="avatar-placeholder">
        {{ initials }}
      </div>
    </div>
    <div class="profile-info">
      <div class="profile-name">{{ fullName }}</div>
      <div v-if="profile.title" class="profile-title">{{ profile.title }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatUserName } from '../ProfileService';

const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  showAvatar: {
    type: Boolean,
    default: true
  }
});

const fullName = computed(() => formatUserName(props.profile));

const initials = computed(() => {
  if (!props.profile) return '';

  const firstName = props.profile.firstName || '';
  const lastName = props.profile.lastName || '';

  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
});
</script>

<style scoped>
.profile-badge {
  display: flex;
  align-items: center;
}

.with-avatar {
  padding: 0.5rem;
}

.avatar-container {
  width: 40px;
  height: 40px;
  margin-right: 0.75rem;
  border-radius: 50%;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e7eb;
  color: #4b5563;
  font-weight: 600;
  font-size: 0.875rem;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.profile-name {
  font-weight: 500;
  font-size: 0.875rem;
  color: #111827;
}

.profile-title {
  font-size: 0.75rem;
  color: #6b7280;
}
</style>
