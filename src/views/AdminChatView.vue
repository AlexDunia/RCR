<template>
  <div class="admin-view">
    <ChatSidebar :users="clientsAndAgents" />
    <ChatWindow />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useChatStore } from "../stores/chatStore";
import ChatSidebar from "../components/ChatSidebar.vue";
import ChatWindow from "../components/ChatWindow.vue";

const store = useChatStore();
const clientsAndAgents = computed(() =>
  store.users.filter(user => user.role === "Client" || user.role === "Agent")
);
</script>
