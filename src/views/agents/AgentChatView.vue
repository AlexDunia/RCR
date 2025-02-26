<template>
  <div class="agent-view">
    <ChatSidebar :users="clientsAndAdminAndAgents" @user-selected="selectUser" />
    <ChatWindow v-if="activeChat" :chat="activeChat" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useChatStore } from "../../stores/chatStore";
import ChatSidebar from "../../components/ChatSidebar.vue";
import ChatWindow from "../../components/ChatWindow.vue";

const store = useChatStore();
const activeChat = ref(null);

const clientsAndAdminAndAgents = computed(() =>
  store.users.filter(user => user.role === "Client" || user.role === "Admin" || user.role === "Agent")
);

const selectUser = (user) => {
  activeChat.value = user;
  store.setActiveChat(user);
};
</script>
<style scoped>
.agent-view {
  display: flex;
  margin: auto;
  justify-content: space-between;
}
</style>

