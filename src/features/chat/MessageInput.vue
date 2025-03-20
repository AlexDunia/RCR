<template>
  <div class="message-input">
    <input
      type="text"
      v-model="text"
      @keyup.enter="sendMessage"
      placeholder="Type a message"
      :disabled="isLoading"
    />
    <button @click="sendMessage" :disabled="isLoading">
      {{ isLoading ? 'Sending...' : 'Send' }}
    </button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
});

const text = ref('');
const emit = defineEmits(['send-message']);

const sendMessage = () => {
  if (text.value.trim()) {
    emit('send-message', text.value);
    text.value = '';
  }
};
</script>

<style scoped>
.message-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
}

.message-input button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.message-input button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
