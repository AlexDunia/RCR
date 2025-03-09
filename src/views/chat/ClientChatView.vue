<template>
  <div class="client-view">
    <ChatSidebar :users="agents" />
    <ChatWindow />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useChatStore } from "@/stores/chatStore";
import ChatSidebar from "@/components/chat/ChatSidebar.vue";
import ChatWindow from "@/components/chat/ChatWindow.vue";

const store = useChatStore();
const agents = computed(() => store.users.filter(user => user.role === "Agent"));
</script>
