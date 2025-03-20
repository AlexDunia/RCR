<template>
  <div class="chat-window">
    <!-- Chat Header -->
    <div class="header">
      <div class="chat-header" v-if="store.activeChat">
        <div class="user-info-section">
          <img :src="store.activeChat.avatar" :alt="store.activeChat.name" class="user-avatar" />
          <div class="user-info">
            <h2>{{ store.activeChat.name }}</h2>
            <span class="last-seen">Online - Last seen, {{ store.activeChat.lastSeen }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Messages Area -->
    <div class="messages" ref="messageContainer">
      <div class="messages-container">
        <div class="message-group" v-for="(group, date) in messageGroups" :key="date">
          <div class="time-stamp">{{ date }}</div>
          <div v-for="message in group" :key="message.id"
            :class="['message-bubble', message.isOwn ? 'own' : 'other']">
            <div class="message-content">{{ message.text }}</div>
            <div class="message-time">{{ message.time }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="message-input-container">
      <input
        type="text"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
        class="message-input"
      />
      <button @click="sendMessage" class="send-button">
        Send
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useChatStore } from "@/stores/chatStore";

const store = useChatStore();
const newMessage = ref('');
const messageContainer = ref(null);

// Mock message groups to match the image
const messageGroups = computed(() => ({
  'Today, 8:30pm': [
    { id: 1, text: 'Hey There!', time: '8:30pm', isOwn: false },
    { id: 2, text: 'How are you?', time: '8:30pm', isOwn: false },
    { id: 3, text: 'Hello!', time: '8:33pm', isOwn: true },
    { id: 4, text: 'I am fine and how are you?', time: '8:34pm', isOwn: true },
    { id: 5, text: 'I am doing well. Can we meet tomorrow?', time: '8:36pm', isOwn: false },
    { id: 6, text: 'Yes Sure!', time: '8:58pm', isOwn: true },
  ]
}));

const sendMessage = () => {
  if (newMessage.value.trim()) {
    // Add message handling logic here
    newMessage.value = '';
    scrollToBottom();
  }
};

const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};
</script>

<style scoped>
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 100%;
}

.header {
  padding: 15px 20px;
  border-bottom: 1px solid #eaeaea;
}

.chat-header {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}

.user-info h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.last-seen {
  font-size: 13px;
  color: #8e8e8e;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #fff;
}

.messages-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.time-stamp {
  text-align: center;
  font-size: 12px;
  color: #8e8e8e;
  margin: 10px 0;
}

.message-bubble {
  max-width: 60%;
  padding: 10px 15px;
  border-radius: 18px;
  position: relative;
}

.message-bubble.other {
  align-self: flex-start;
  background-color: #f0f0f0;
  color: #1a1a1a;
  border-bottom-left-radius: 4px;
}

.message-bubble.own {
  align-self: flex-end;
  background-color: #0a84ff;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-content {
  font-size: 14px;
  line-height: 1.4;
}

.message-time {
  font-size: 11px;
  margin-top: 4px;
  opacity: 0.8;
}

.message-input-container {
  padding: 20px;
  border-top: 1px solid #eaeaea;
  display: flex;
  gap: 10px;
}

.message-input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #eaeaea;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
}

.send-button {
  padding: 0 20px;
  border: none;
  border-radius: 20px;
  background-color: #0a84ff;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.send-button:hover {
  background-color: #0071e3;
}
</style>
