<template>
  <div :class="['message-bubble', props.message.sender === 'user' ? 'user' : 'other']">
    {{ props.message.text }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.message-bubble {
  padding: 10px;
  margin: 5px 0;
  border-radius: 10px;
  max-width: 60%;
}

.message-bubble.user {
  background-color: #dcf8c6;
  align-self: flex-end;
}

.message-bubble.other {
  background-color: #007bff;
  color: #fff;
  align-self: flex-start;
}
</style>
