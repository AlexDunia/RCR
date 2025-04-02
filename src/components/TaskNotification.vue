<template>
  <div v-if="show" class="notification">
    <div class="notification-content">
      <p>{{ message }}</p>
    </div>
    <button @click="dismiss" class="notification-button">
      OK
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['dismiss'])

const dismiss = () => {
  emit('dismiss')
}
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  max-width: 450px;
  background-color: #e0f7fa;
  color: #006064;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  animation: slide-in 0.3s ease-out;
}

@keyframes slide-in {
  0% {
    transform: translateY(-50px) translateX(-50%);
    opacity: 0;
  }
  100% {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
}

.notification-content {
  flex: 1;
}

.notification-content p {
  margin: 0;
  font-size: 14px;
}

.notification-button {
  margin-left: 16px;
  padding: 8px 16px;
  background-color: #00838f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.notification-button:hover {
  background-color: #006064;
}
</style>
