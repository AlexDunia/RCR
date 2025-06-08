<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="modal-wrapper">
        <div class="mobile-nav-modal">
          <div class="mobile-nav-modal__backdrop" @click="$emit('update:modelValue', false)"></div>
          <div class="mobile-nav-modal__content">
            <button class="mobile-nav-modal__close" @click="$emit('update:modelValue', false)" aria-label="Close navigation">×</button>
            <router-link to="/buy" class="mobile-nav-modal__link" @click="$emit('update:modelValue', false)">Buy</router-link>
            <router-link to="/rent" class="mobile-nav-modal__link" @click="$emit('update:modelValue', false)">Rent</router-link>
            <router-link to="/sell" class="mobile-nav-modal__link" @click="$emit('update:modelValue', false)">Sell</router-link>
            <router-link to="/allagents" class="mobile-nav-modal__link" @click="$emit('update:modelValue', false)">Find Agents</router-link>
            <router-link to="/signup" class="mobile-nav-modal__link" @click="$emit('update:modelValue', false)">Join Us</router-link>
            <div class="mobile-nav-modal__buttons">
              <router-link to="/signup" class="mobile-nav-modal__button" @click="$emit('update:modelValue', false)">Sign up</router-link>
              <router-link to="/login" class="mobile-nav-modal__button mobile-nav-modal__button--primary" @click="$emit('update:modelValue', false)">Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999999;
  display: flex;
  transform: translateZ(0);
  will-change: transform;
  isolation: isolate;
}

.mobile-nav-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999999;
  display: flex;
  transform: translateZ(0);
  will-change: transform;
  isolation: isolate;
}

.mobile-nav-modal__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999999999;
  backdrop-filter: blur(4px);
  transform: translateZ(0);
  will-change: transform;
}

.mobile-nav-modal__content {
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 320px;
  height: 100vh;
  background: #fff;
  z-index: 999999999;
  padding: 64px 24px 24px;
  overflow-y: auto;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  transform: translateZ(0);
  will-change: transform;
}

.mobile-nav-modal__close {
  position: fixed;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  font-size: 32px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999999;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateZ(0);
  will-change: transform;
}

.mobile-nav-modal__link {
  display: block;
  padding: 16px 0;
  color: #333;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid #eee;
  transition: color 0.2s ease;
}

.mobile-nav-modal__link:hover {
  color: #0066cc;
}

.mobile-nav-modal__buttons {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-nav-modal__button {
  display: block;
  padding: 12px 24px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  color: #333;
  transition: all 0.2s ease;
}

.mobile-nav-modal__button:hover {
  background: #f8fafc;
}

.mobile-nav-modal__button--primary {
  background: #0066cc;
  border: none;
  color: #fff;
}

.mobile-nav-modal__button--primary:hover {
  background: #0052a5;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999999999;
  position: relative;
  transform: translateZ(0);
  will-change: transform;
  isolation: isolate;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from .mobile-nav-modal__content {
  transform: translateX(100%);
}

.fade-leave-to .mobile-nav-modal__content {
  transform: translateX(100%);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style> 