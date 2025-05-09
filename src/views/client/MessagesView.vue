<template>
  <div class="messages-container">
    <h1>Messages</h1>

    <div class="messages-wrapper">
      <!-- Contacts sidebar -->
      <div class="contacts-sidebar">
        <div class="search-box">
          <input type="text" placeholder="Search contacts..." />
          <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <div class="contacts-list">
          <div class="contact-item active">
            <div class="contact-avatar">
              <img src="/images/default-avatar.jpg" alt="John Smith" />
              <span class="status-indicator online"></span>
            </div>
            <div class="contact-info">
              <div class="contact-name">John Smith</div>
              <div class="contact-role">Real Estate Agent</div>
            </div>
            <div class="contact-meta">
              <span class="time">2h</span>
              <span class="unread-count">3</span>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-avatar">
              <img src="/images/default-avatar.jpg" alt="Mary Johnson" />
              <span class="status-indicator offline"></span>
            </div>
            <div class="contact-info">
              <div class="contact-name">Mary Johnson</div>
              <div class="contact-role">Property Manager</div>
            </div>
            <div class="contact-meta">
              <span class="time">1d</span>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-avatar">
              <img src="/images/default-avatar.jpg" alt="Real City Support" />
              <span class="status-indicator online"></span>
            </div>
            <div class="contact-info">
              <div class="contact-name">Real City Support</div>
              <div class="contact-role">Customer Service</div>
            </div>
            <div class="contact-meta">
              <span class="time">3d</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat area -->
      <div class="chat-area">
        <div class="chat-header">
          <div class="chat-contact">
            <div class="contact-avatar">
              <img src="/images/default-avatar.jpg" alt="John Smith" />
              <span class="status-indicator online"></span>
            </div>
            <div class="contact-info">
              <div class="contact-name">John Smith</div>
              <div class="contact-role">Real Estate Agent • Active now</div>
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
            <span>Today</span>
          </div>

          <div class="message-item received">
            <div class="message-avatar">
              <img src="/images/default-avatar.jpg" alt="John Smith" />
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <p>Good morning! I wanted to follow up about the property viewing scheduled for next week.</p>
              </div>
              <div class="message-time">9:32 AM</div>
            </div>
          </div>

          <div class="message-item sent">
            <div class="message-content">
              <div class="message-bubble">
                <p>Hi John! Yes, I'm still available for the viewing. Looking forward to it.</p>
              </div>
              <div class="message-time">9:45 AM</div>
            </div>
          </div>

          <div class="message-item received">
            <div class="message-avatar">
              <img src="/images/default-avatar.jpg" alt="John Smith" />
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <p>Great! I've scheduled a viewing for the property on Lake View Drive for June 12 at 2:00 PM.</p>
              </div>
              <div class="message-time">10:15 AM</div>
            </div>
          </div>

          <div class="message-item received">
            <div class="message-avatar">
              <img src="/images/default-avatar.jpg" alt="John Smith" />
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <p>I'll meet you there. Here's the address: 123 Lake View Drive, Lakeside, CA</p>
              </div>
              <div class="message-time">10:16 AM</div>
            </div>
          </div>

          <div class="message-item sent">
            <div class="message-content">
              <div class="message-bubble">
                <p>Perfect! I'll see you there. Is there anything I should bring or prepare?</p>
              </div>
              <div class="message-time">10:30 AM</div>
            </div>
          </div>
        </div>

        <div class="message-input">
          <button class="attachment-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
          </button>
          <input type="text" placeholder="Type a message..." />
          <button class="send-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Messages view logic could go here
</script>

<style scoped>
.messages-container {
  padding: 24px;
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
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
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* Contacts sidebar styles */
.contacts-sidebar {
  width: 300px;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

.search-box {
  position: relative;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.search-box input {
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.search-button {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
}

.contacts-list {
  flex: 1;
  overflow-y: auto;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background-color 0.2s;
}

.contact-item:hover {
  background-color: #f9f9f9;
}

.contact-item.active {
  background-color: #e6f7ff;
}

.contact-avatar {
  position: relative;
  margin-right: 12px;
}

.contact-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-indicator.online {
  background-color: #52c41a;
}

.status-indicator.offline {
  background-color: #d9d9d9;
}

.contact-info {
  flex: 1;
}

.contact-name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-bottom: 2px;
}

.contact-role {
  font-size: 13px;
  color: #666;
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
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
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
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-date-separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 8px 0;
}

.message-date-separator::before,
.message-date-separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #eee;
}

.message-date-separator span {
  padding: 0 16px;
  font-size: 12px;
  color: #999;
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
  border-radius: 50%;
  object-fit: cover;
}

.message-content {
  display: flex;
  flex-direction: column;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 18px;
  margin-bottom: 4px;
}

.message-item.received .message-bubble {
  background-color: #f5f5f5;
  border-bottom-left-radius: 4px;
}

.message-item.sent .message-bubble {
  background-color: #e6f7ff;
  border-bottom-right-radius: 4px;
  color: #1890ff;
}

.message-bubble p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.message-time {
  font-size: 11px;
  color: #999;
  align-self: flex-end;
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
  padding: 16px;
  border-top: 1px solid #eee;
}

.attachment-button,
.send-button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
  transition: color 0.2s;
}

.attachment-button:hover,
.send-button:hover {
  color: #1890ff;
}

.message-input input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 24px;
  margin: 0 8px;
  font-size: 14px;
}

/* Media Queries */
@media (max-width: 992px) {
  .contacts-sidebar {
    width: 250px;
  }
}

@media (max-width: 768px) {
  .messages-container {
    padding: 16px;
    height: calc(100vh - 140px);
  }

  .messages-wrapper {
    flex-direction: column;
  }

  .contacts-sidebar {
    width: 100%;
    height: 300px;
    border-right: none;
    border-bottom: 1px solid #eee;
  }

  .message-item {
    max-width: 85%;
  }
}
</style>
