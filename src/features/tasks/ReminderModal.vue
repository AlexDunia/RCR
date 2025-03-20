<!-- ReminderModal.vue -->
<template>
  <div v-if="isOpen" class="reminder-modal__overlay" @click="handleClose">
    <div class="reminder-modal" role="dialog" aria-modal="true" aria-label="Compose reminder modal" @click.stop>
      <!-- Header -->
      <header class="reminder-modal__header">
        <h2 class="reminder-modal__title">Compose a reminder</h2>
        <div class="reminder-modal__controls">
          <button class="reminder-modal__control-btn" aria-label="Minimize">
            <span class="reminder-modal__control-icon">─</span>
          </button>
          <button class="reminder-modal__control-btn" aria-label="Maximize">
            <span class="reminder-modal__control-icon">⛶</span>
          </button>
          <button class="reminder-modal__control-btn" @click="handleClose" aria-label="Close">
            <span class="reminder-modal__control-icon">×</span>
          </button>
        </div>
      </header>

      <!-- Form -->
      <form class="reminder-modal__form" @submit.prevent="handleSend">
        <!-- Recipient -->
        <div class="reminder-modal__form-group">
          <input
            type="email"
            v-model="formData.recipient"
            class="reminder-modal__input"
            placeholder="To"
            readonly
          >
          <div class="reminder-modal__cc-controls">
            <button type="button" class="reminder-modal__cc-btn">Cc</button>
            <button type="button" class="reminder-modal__cc-btn">Bcc</button>
          </div>
        </div>

        <!-- Subject -->
        <div class="reminder-modal__form-group">
          <input
            type="text"
            v-model="formData.subject"
            class="reminder-modal__input"
            placeholder="Tour Reminder from Alex"
            required
          >
        </div>

        <!-- Message -->
        <div class="reminder-modal__form-group">
          <textarea
            v-model="formData.message"
            class="reminder-modal__textarea"
            placeholder="Hi Lucas, here's a reminder of the task on the 20th of December"
            required
          ></textarea>
        </div>

        <!-- Footer -->
        <footer class="reminder-modal__footer">
          <div class="reminder-modal__actions">
            <button type="submit" class="reminder-modal__send-btn">
              Send
            </button>
            <div class="reminder-modal__icons">
              <button type="button" class="reminder-modal__icon-btn" aria-label="More options">
                <span class="reminder-modal__dots">⋮</span>
              </button>
              <button type="button" class="reminder-modal__icon-btn" aria-label="Delete">
                <span class="reminder-modal__trash">🗑</span>
              </button>
            </div>
          </div>
        </footer>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  recipient: {
    type: Object,
    required: true
  },
  taskData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'send'])

const formData = reactive({
  recipient: '',
  subject: '',
  message: ''
})

watch(() => props.recipient, (newRecipient) => {
  if (newRecipient) {
    formData.recipient = newRecipient.email
    formData.subject = `Tour Reminder from Alex`
    formData.message = `Hi ${newRecipient.name}, here's a reminder of the task on the 20th of December`
  }
}, { immediate: true })

const handleClose = () => {
  emit('close')
}

const handleSend = async () => {
  try {
    console.log('Sending reminder:', formData)
    emit('send', formData)
    handleClose()
  } catch (error) {
    console.error('Failed to send reminder:', error)
    alert('Failed to send reminder. Please try again.')
  }
}
</script>

<style scoped>
.reminder-modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.reminder-modal {
  background: #FFFFFF;
  border-radius: 4px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.reminder-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #2D2D2D;
  color: #FFFFFF;
  border-radius: 4px 4px 0 0;
}

.reminder-modal__title {
  font-size: 16px;
  font-weight: normal;
  margin: 0;
  color: #FFFFFF;
}

.reminder-modal__controls {
  display: flex;
  gap: 8px;
}

.reminder-modal__control-btn {
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 18px;
  padding: 0 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.reminder-modal__control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.reminder-modal__form {
  padding: 16px;
  max-width: 480px;
  margin: 0 auto;
}

.reminder-modal__form-group {
  margin-bottom: 16px;
  position: relative;
}

.reminder-modal__input {
  width: 100%;
  padding: 8px 0;
  border: none;
  border-bottom: 1px solid #E0E0E0;
  font-size: 14px;
}

.reminder-modal__input:focus {
  outline: none;
  border-bottom-color: #2563EB;
}

.reminder-modal__cc-controls {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.reminder-modal__cc-btn {
  background: none;
  border: none;
  color: #666666;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
}

.reminder-modal__cc-btn:hover {
  color: #2563EB;
}

.reminder-modal__textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px 0;
  border: none;
  font-size: 14px;
  resize: none;
}

.reminder-modal__textarea:focus {
  outline: none;
}

.reminder-modal__footer {
  padding: 12px 16px;
  border-top: 1px solid #E0E0E0;
  max-width: 480px;
  margin: 0 auto;
}

.reminder-modal__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reminder-modal__send-btn {
  background: #2563EB;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
}

.reminder-modal__send-btn:hover {
  background: #1D4ED8;
}

.reminder-modal__icons {
  display: flex;
  gap: 16px;
}

.reminder-modal__icon-btn {
  background: none;
  border: none;
  color: #666666;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
}

.reminder-modal__icon-btn:hover {
  color: #2563EB;
}

.reminder-modal__dots {
  font-size: 20px;
  line-height: 1;
}

.reminder-modal__trash {
  font-size: 16px;
  line-height: 1;
}

@media (max-width: 640px) {
  .reminder-modal {
    max-width: 95%;
    margin: 16px;
  }
}
</style>
