<template>
  <div class="sidebar">
    <!-- Search Section -->
    <div class="search-section">
      <div class="search-container">
        <i class="fas fa-search search-icon"></i>
        <input
          v-model="searchQuery"
          placeholder="Search"
          class="search-input"
        />
      </div>
    </div>

    <!-- People Section -->
    <div class="people-section">
      <h3 class="section-title">People</h3>

      <div class="users-list">
        <div
          v-for="user in filteredUsers"
          :key="user.id"
          @click="selectUser(user)"
          :class="['user-item', { 'active': isActiveUser(user) }]"
        >
          <div class="user-avatar">
            <img :src="user.avatar" :alt="user.name" />
          </div>
          <div class="user-info">
            <div class="user-header">
              <h4>{{ user.name }}</h4>
              <span class="message-time">{{ user.lastMessageTime }}</span>
            </div>
            <p class="last-message">{{ user.lastMessage }}</p>
            <div class="message-indicators">
              <span v-if="user.unreadCount" class="unread-count">{{ user.unreadCount }}</span>
              <i v-if="user.isRead" class="fas fa-check-double read-indicator"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useChatStore } from "../stores/chatStore";

const store = useChatStore();
const emit = defineEmits(['user-selected']);
const searchQuery = ref("");

// Mock data to match the image
const mockUsers = [
  {
    id: 1,
    name: 'Anil',
    lastMessage: "April fool's day",
    lastMessageTime: 'Today, 9:52pm',
    avatar: 'path/to/anil-avatar.jpg',
    isRead: true,
    unreadCount: 0
  },
  {
    id: 2,
    name: 'Chuuthiya',
    lastMessage: 'Baag',
    lastMessageTime: 'Today, 12:11pm',
    avatar: 'path/to/chuuthiya-avatar.jpg',
    unreadCount: 1
  },
  // Add more mock users as needed
];

const filteredUsers = computed(() =>
  mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const isActiveUser = (user) => {
  return store.activeChat?.id === user.id;
};

const selectUser = (user) => {
  store.setActiveChat(user);
  emit('user-selected', user);
};
</script>

<style scoped>
.sidebar {
  width: 360px;
  background-color: #fff;
  border-right: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.search-section {
  padding: 20px;
}

.search-container {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #8e8e8e;
  font-size: 16px;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 45px;
  border: none;
  border-radius: 25px;
  font-size: 15px;
  background-color: #f5f5f5;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: #8e8e8e;
}

.section-title {
  padding: 0 20px;
  margin: 10px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.users-list {
  padding: 0 10px;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 12px 10px;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 2px;
}

.user-item:hover {
  background-color: #f5f5f5;
}

.user-avatar {
  width: 45px;
  height: 45px;
  margin-right: 12px;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
  position: relative;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.user-header h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
}

.message-time {
  font-size: 12px;
  color: #8e8e8e;
}

.last-message {
  margin: 0;
  font-size: 13px;
  color: #8e8e8e;
  line-height: 1.3;
}

.message-indicators {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.unread-count {
  background-color: #ff3b30;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.read-indicator {
  color: #0a84ff;
  font-size: 12px;
}
</style>

