<template>
  <div :class="['message-bubble', isOwn ? 'own' : 'other']">
    <div class="message-content">
      {{ message.text }}
    </div>
    <div class="message-timestamp">
      {{ formatTimestamp(message.timestamp) }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true
  },
  isOwn: {
    type: Boolean,
    required: true
  }
});

const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style scoped>
.message-bubble {
  display: flex;
  flex-direction: column;
  max-width: 70%;
  margin: 4px 0;
}

.message-content {
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.4;
}

.message-timestamp {
  font-size: 11px;
  color: #8e8e8e;
  margin-top: 2px;
  margin-bottom: 4px;
}

.own {
  align-self: flex-end;
}

.own .message-content {
  background-color: #074F90;
  color: white;
  border-bottom-right-radius: 4px;
}

.own .message-timestamp {
  align-self: flex-end;
  margin-right: 4px;
}

.other {
  align-self: flex-start;
}

.other .message-content {
  background-color: #f0f0f0;
  color: #000;
  border-bottom-left-radius: 4px;
}

.other .message-timestamp {
  align-self: flex-start;
  margin-left: 4px;
}
</style>
