<template>
  <div class="messages-container">
    <div class="messages-wrapper">
      <!-- Mobile toggle button -->
      <button class="mobile-toggle" @click="toggleSidebar" v-if="isMobile">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <!-- Contacts sidebar -->
      <div class="contacts-sidebar" :class="{ 'show': showSidebar }">
        <div class="sidebar-header">
          <h2>Messages</h2>
          <button class="close-sidebar" @click="toggleSidebar" v-if="isMobile">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="search-box">
          <input type="text" v-model="searchQuery" placeholder="Search contacts..." />
          <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <div class="contacts-list">
          <div
            v-for="contact in filteredContacts"
            :key="contact.id"
            class="contact-item"
            :class="{ active: activeContact?.id === contact.id }"
            @click="selectContact(contact)"
          >
            <div class="contact-avatar">
              <img :src="contact.avatar" :alt="contact.name" @error="handleImageError" />
              <span :class="['status-indicator', contact.status]"></span>
            </div>
            <div class="contact-info">
              <div class="contact-name">{{ contact.name }}</div>
              <div class="contact-role">{{ contact.role }}</div>
            </div>
            <div class="contact-meta">
              <span class="time">{{ contact.lastMessageTime }}</span>
              <span v-if="contact.unreadCount" class="unread-count">{{ contact.unreadCount }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat area -->
      <div class="chat-area" :class="{ 'sidebar-open': showSidebar && isMobile }">
        <div class="chat-header">
          <div class="chat-contact">
            <div class="contact-avatar">
              <img :src="activeContact.avatar" :alt="activeContact.name" @error="handleImageError" />
              <span :class="['status-indicator', activeContact.status]"></span>
            </div>
            <div class="contact-info">
              <div class="contact-name">{{ activeContact.name }}</div>
              <div class="contact-role">{{ activeContact.role }} • {{ activeContact.status === 'online' ? 'Active now' : 'Offline' }}</div>
            </div>
          </div>
          <div class="chat-actions">
            <button class="action-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>

        <div class="messages-list">
          <div class="message-date-separator">
            <span>{{ currentDate }}</span>
          </div>

          <div
            v-for="message in activeContact.messages"
            :key="message.id"
            :class="['message-item', message.type]"
          >
            <div v-if="message.type === 'received'" class="message-avatar">
              <img :src="activeContact.avatar" :alt="activeContact.name" @error="handleImageError" />
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <p>{{ message.text }}</p>
              </div>
              <div class="message-time">{{ message.time }}</div>
            </div>
          </div>
        </div>

        <div class="message-input">
          <button class="attachment-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
          </button>
          <input
            type="text"
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="Type a message..."
          />
          <button class="send-button" @click="sendMessage">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Overlay for mobile -->
    <div class="sidebar-overlay" v-if="showSidebar && isMobile" @click="toggleSidebar"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const searchQuery = ref('');
const newMessage = ref('');

const contacts = ref([
  {
    id: 1,
    name: 'John Smith',
    role: 'Real Estate Agent',
    status: 'online',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessageTime: '2h',
    unreadCount: 3,
    messages: [
      {
        id: 1,
        type: 'received',
        text: 'Good morning! I wanted to follow up about the property viewing scheduled for next week.',
        time: '9:32 AM'
      },
      {
        id: 2,
        type: 'sent',
        text: "Hi John! Yes, I'm still available for the viewing. Looking forward to it.",
        time: '9:45 AM'
      },
      {
        id: 3,
        type: 'received',
        text: "Great! I've scheduled a viewing for the property on Lake View Drive for June 12 at 2:00 PM.",
        time: '10:15 AM'
      },
      {
        id: 4,
        type: 'received',
        text: "I'll meet you there. Here's the address: 123 Lake View Drive, Lakeside, CA",
        time: '10:16 AM'
      },
      {
        id: 5,
        type: 'sent',
        text: "Perfect! I'll see you there. Is there anything I should bring or prepare?",
        time: '10:30 AM'
      }
    ]
  },
  {
    id: 2,
    name: 'Mary Johnson',
    role: 'Property Manager',
    status: 'offline',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessageTime: '1d',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        type: 'received',
        text: 'Hello! I wanted to discuss the maintenance schedule for your property.',
        time: '2:15 PM'
      },
      {
        id: 2,
        type: 'sent',
        text: 'Hi Mary, sure! What details do you need to go over?',
        time: '2:30 PM'
      },
      {
        id: 3,
        type: 'received',
        text: 'We need to schedule the annual HVAC maintenance and carpet cleaning.',
        time: '2:35 PM'
      }
    ]
  },
  {
    id: 3,
    name: 'Real City Support',
    role: 'Customer Service',
    status: 'online',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    lastMessageTime: '3d',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        type: 'received',
        text: 'Welcome to Real City! How can we assist you today?',
        time: '11:00 AM'
      },
      {
        id: 2,
        type: 'sent',
        text: 'I need help updating my profile information.',
        time: '11:05 AM'
      },
      {
        id: 3,
        type: 'received',
        text: "I'll be happy to help you with that. Which information would you like to update?",
        time: '11:07 AM'
      }
    ]
  }
]);

const activeContact = ref(contacts.value[0]);

const filteredContacts = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return contacts.value.filter(contact =>
    contact.name.toLowerCase().includes(query) ||
    contact.role.toLowerCase().includes(query)
  );
});

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
});

const setActiveContact = (contact) => {
  console.log('Switching to contact:', contact.name);
  activeContact.value = { ...contact };
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  const message = {
    id: Date.now(),
    type: 'sent',
    text: newMessage.value.trim(),
    time: new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  };

  const currentContact = contacts.value.find(c => c.id === activeContact.value.id);
  if (currentContact) {
    currentContact.messages.push(message);
    activeContact.value = { ...currentContact };
  }

  newMessage.value = '';
};

// Add error handling for broken images
const handleImageError = (event) => {
  event.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(event.target.alt) + '&background=random';
};

// Mobile responsive handling
const isMobile = ref(false);
const showSidebar = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
  if (!isMobile.value) {
    showSidebar.value = false;
  }
};

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
  if (showSidebar.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const selectContact = (contact) => {
  setActiveContact(contact);
  if (isMobile.value) {
    toggleSidebar();
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
.messages-container {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9));
  backdrop-filter: blur(20px);
  border-radius: 0;
  box-shadow: none;
}

h1 {
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.messages-wrapper {
  display: flex;
  flex: 1;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.04),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  overflow: hidden;
  backdrop-filter: blur(10px);
  height: calc(100vh - 80px); /* Adjust for header height */
}

/* Contacts sidebar styles */
.contacts-sidebar {
  width: 320px;
  border-right: 1px solid rgba(238, 238, 238, 0.4);
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  height: 100%;
}

.search-box {
  position: relative;
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(238, 238, 238, 0.4);
}

.search-box input {
  width: 100%;
  padding: 14px 45px 14px 20px;
  border: 1px solid rgba(221, 221, 221, 0.4);
  border-radius: 16px;
  font-size: 15px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #2c3e50;
}

.search-button {
  position: absolute;
  right: 32px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  color: #1890ff;
  background: rgba(24, 144, 255, 0.1);
}

.search-box input:focus {
  outline: none;
  border-color: rgba(24, 144, 255, 0.6);
  box-shadow:
    0 0 0 4px rgba(24, 144, 255, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.04);
  transform: translateY(-1px);
}

.search-box input::placeholder {
  color: #94a3b8;
}

.contacts-list {
  flex: 1;
  overflow-y: auto;
  height: calc(100% - 80px); /* Adjust for search box height */
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(245, 245, 245, 0.4);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.contact-item:hover {
  background-color: rgba(249, 249, 249, 0.9);
  transform: translateX(4px);
}

.contact-item.active {
  background: linear-gradient(
    to right,
    rgba(24, 144, 255, 0.08),
    rgba(24, 144, 255, 0.02)
  );
  border-left: 3px solid #1890ff;
}

.contact-item.active::before {
  content: '';
  position: absolute;
  left: -3px;
  top: 0;
  height: 100%;
  width: 3px;
  background: linear-gradient(to bottom, #1890ff, #096dd9);
}

.contact-avatar {
  position: relative;
  margin-right: 16px;
}

.contact-avatar img {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 0 0 2px rgba(255, 255, 255, 0.6);
  transition: transform 0.3s ease;
  background-color: #f0f2f5;
}

.contact-item:hover .contact-avatar img {
  transform: scale(1.05);
}

.contact-info {
  flex: 1;
  margin-right: 12px;
}

.contact-name {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
  letter-spacing: -0.2px;
}

.contact-role {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.status-indicator.online {
  background-color: #10b981;
}

.status-indicator.offline {
  background-color: #94a3b8;
}

.contact-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.time {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.unread-count {
  font-size: 12px;
  color: white;
  background-color: #1890ff;
  border-radius: 10px;
  padding: 2px 6px;
  min-width: 20px;
  text-align: center;
}

/* Chat area styles */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
  position: relative;
  height: 100%;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(238, 238, 238, 0.4);
  backdrop-filter: blur(8px);
}

.chat-contact {
  display: flex;
  align-items: center;
}

.chat-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.action-button:hover {
  background-color: #f5f5f5;
}

.messages-list {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.5),
    rgba(248, 250, 252, 0.5)
  );
  height: calc(100% - 140px); /* Adjust for header and input area */
}

.message-date-separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
  opacity: 0.8;
}

.message-date-separator::before,
.message-date-separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid rgba(203, 213, 225, 0.4);
}

.message-date-separator span {
  padding: 8px 20px;
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.6);
  letter-spacing: 0.3px;
}

.message-item {
  display: flex;
  max-width: 70%;
}

.message-item.received {
  align-self: flex-start;
}

.message-item.sent {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-avatar {
  margin-right: 8px;
}

.message-avatar img {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.message-content {
  display: flex;
  flex-direction: column;
}

.message-bubble {
  padding: 16px 20px;
  border-radius: 20px;
  margin-bottom: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: relative;
  transition: all 0.3s ease;
}

.message-item.received .message-bubble {
  background-color: rgba(248, 250, 252, 0.95);
  border-bottom-left-radius: 6px;
}

.message-item.sent .message-bubble {
  background: linear-gradient(135deg, #1890ff, #096dd9);
  border-bottom-right-radius: 6px;
  color: white;
  box-shadow:
    0 4px 12px rgba(24, 144, 255, 0.2),
    0 0 0 1px rgba(24, 144, 255, 0.1);
}

.message-bubble p {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  font-weight: 400;
}

.message-time {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 6px;
  font-weight: 500;
}

.message-item.received .message-time {
  margin-left: 16px;
}

.message-item.sent .message-time {
  margin-right: 16px;
}

.message-input {
  display: flex;
  align-items: center;
  padding: 24px 32px;
  background: rgba(255, 255, 255, 0.9);
  border-top: 1px solid rgba(238, 238, 238, 0.4);
  backdrop-filter: blur(8px);
}

.message-input input {
  flex: 1;
  padding: 16px 24px;
  border: 1px solid rgba(221, 221, 221, 0.4);
  border-radius: 28px;
  margin: 0 16px;
  font-size: 15px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #2c3e50;
}

.message-input input:focus {
  outline: none;
  border-color: rgba(24, 144, 255, 0.6);
  box-shadow:
    0 0 0 4px rgba(24, 144, 255, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.04);
  transform: translateY(-1px);
}

.attachment-button,
.send-button {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.attachment-button:hover,
.send-button:hover {
  color: #1890ff;
  background: rgba(24, 144, 255, 0.1);
  transform: scale(1.1);
}

.send-button {
  background: #1890ff;
  color: white;
  width: 46px;
  height: 46px;
}

.send-button:hover {
  background: #096dd9;
  color: white;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

/* Scrollbar styling */
.messages-list::-webkit-scrollbar {
  width: 6px;
}

.messages-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 3px;
}

.messages-list::-webkit-scrollbar-thumb {
  background: rgba(203, 213, 225, 0.4);
  border-radius: 3px;
  transition: all 0.3s ease;
}

.messages-list::-webkit-scrollbar-thumb:hover {
  background: rgba(203, 213, 225, 0.6);
}

/* Media Queries */
@media (max-width: 992px) {
  .contacts-sidebar {
    width: 280px;
  }
}

@media (max-width: 768px) {
  .messages-container {
    height: 100%;
  }

  .messages-wrapper {
    flex-direction: column;
    height: 100%;
  }

  .contacts-sidebar {
    width: 100%;
    height: 300px;
    min-height: 300px;
  }

  .contacts-list {
    height: calc(100% - 80px);
  }

  .chat-area {
    height: calc(100% - 300px);
  }

  .messages-list {
    height: calc(100% - 140px);
  }

  .message-item {
    max-width: 90%;
  }

  .chat-header {
    padding: 16px 20px;
  }

  .messages-list {
    padding: 16px;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-item {
  animation: fadeIn 0.3s ease-out;
}

/* Mobile Toggle Button */
.mobile-toggle {
  display: none;
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 100;
  background: white;
  border: none;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.sidebar-header {
  display: none;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(238, 238, 238, 0.4);
  background: white;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.close-sidebar {
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #666;
}

.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 98;
  backdrop-filter: blur(4px);
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .mobile-toggle {
    display: block;
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close-sidebar {
    display: block;
  }

  .contacts-sidebar {
    position: fixed;
    left: -100%;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 320px;
    z-index: 99;
    background: white;
    transition: transform 0.3s ease;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }

  .contacts-sidebar.show {
    transform: translateX(100%);
  }

  .sidebar-overlay.show {
    display: block;
  }

  .chat-area {
    width: 100%;
    padding-top: 60px; /* Space for mobile toggle */
  }

  .chat-area.sidebar-open {
    filter: blur(2px);
    pointer-events: none;
  }

  .messages-wrapper {
    display: block;
  }

  .contacts-list {
    height: calc(100% - 140px); /* Adjust for header and search box */
  }
}

/* Animation for sidebar */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.contacts-sidebar.show {
  animation: slideIn 0.3s ease-out;
}

.sidebar-overlay {
  animation: fadeIn 0.3s ease-out;
}
</style>
