import { defineStore } from 'pinia';

export const useChatStore = defineStore('chatStore', {
  state: () => ({
    users: [
      { id: 'user-1', name: 'John Doe', avatar: 'path/to/avatar1.jpg', status: 'Online', messages: [] },
      { id: 'user-2', name: 'Jane Smith', avatar: 'path/to/avatar2.jpg', status: 'Offline', messages: [] },
      { id: 'user-3', name: 'Alice Johnson', avatar: 'path/to/avatar3.jpg', status: 'Online', messages: [] }
    ],
    activeChat: null
  }),
  actions: {
    setActiveChat(user) {
      this.activeChat = user;
    },
    addMessageToActiveChat(message) {
      if (this.activeChat) {
        if (!this.activeChat.messages) {
          this.activeChat.messages = [];
        }
        this.activeChat.messages.push(message);
      }
    }
  }
});
