<template>
  <Transition name="modal">
    <div v-if="modelValue" class="modal-backdrop" @click="close">
      <div class="modal-container" @click.stop>
        <div class="modal-content">
          <h3 class="modal-title">{{ title }}</h3>
          <p class="modal-message">{{ message }}</p>
          <div class="modal-actions">
            <button class="btn-cancel" @click="close">No</button>
            <button class="btn-confirm" :class="type" @click="confirm">{{ confirmText || 'Yes' }}</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  title: String,
  message: String,
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['delete', 'create', 'update', 'default'].includes(value)
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  }
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const confirm = () => {
  emit('confirm');
  emit('update:modelValue', false);
};

const close = () => {
  emit('update:modelValue', false);
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 90%;
}

.modal-content {
  padding: 20px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #333;
}

.modal-message {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel, .btn-confirm {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-cancel {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  color: #666;
}

.btn-cancel:hover {
  background-color: #eee;
}

.btn-confirm {
  background-color: #1a73e8;
  border: none;
  color: white;
}

.btn-confirm:hover {
  background-color: #1557b0;
}

.btn-confirm.delete {
  background-color: #dc3545;
}

.btn-confirm.delete:hover {
  background-color: #c82333;
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
