<!-- src/components/Button.vue -->
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'success', 'outline', 'text'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<template>
  <button
    class="custom-button"
    :class="[
      `variant-${variant}`,
      `size-${size}`,
      { 'full-width': fullWidth },
      { 'with-icon': icon },
      { 'disabled': disabled || loading },
      { 'loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <span v-else-if="icon && iconPosition === 'left'" class="button-icon left">{{ icon }}</span>
    <span v-if="label" class="button-label">{{ label }}</span>
    <slot v-else></slot>
    <span v-if="icon && iconPosition === 'right'" class="button-icon right">{{ icon }}</span>
  </button>
</template>

<style scoped>
.custom-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, opacity 0.2s;
  border: none;
  outline: none;
  white-space: nowrap;
  gap: 8px;
}

.custom-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.custom-button.full-width {
  width: 100%;
}

/* Size variations */
.size-small {
  padding: 6px 12px;
  font-size: 12px;
}

.size-medium {
  padding: 8px 16px;
  font-size: 14px;
}

.size-large {
  padding: 10px 20px;
  font-size: 16px;
}

/* Variant styles */
.variant-primary {
  background-color: #1976d2;
  color: white;
}

.variant-primary:hover:not(.disabled) {
  background-color: #1565c0;
}

.variant-secondary {
  background-color: #9e9e9e;
  color: white;
}

.variant-secondary:hover:not(.disabled) {
  background-color: #757575;
}

.variant-danger {
  background-color: #e53935;
  color: white;
}

.variant-danger:hover:not(.disabled) {
  background-color: #d32f2f;
}

.variant-success {
  background-color: #4caf50;
  color: white;
}

.variant-success:hover:not(.disabled) {
  background-color: #388e3c;
}

.variant-outline {
  background-color: transparent;
  border: 1px solid #1976d2;
  color: #1976d2;
}

.variant-outline:hover:not(.disabled) {
  background-color: rgba(25, 118, 210, 0.1);
}

.variant-text {
  background-color: transparent;
  color: #1976d2;
  padding-left: 8px;
  padding-right: 8px;
}

.variant-text:hover:not(.disabled) {
  background-color: rgba(25, 118, 210, 0.1);
}

/* Icon styles */
.button-icon {
  font-size: 18px;
}

/* Loading spinner */
.loading-spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
