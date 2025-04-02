import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

export function useTaskTimer() {
  const taskStore = useTaskStore()
  const timerInterval = ref(null)
  const showNotification = ref(false)
  const currentNotification = ref(null)

  // Start the timer to check tasks every minute
  const startTaskTimerCheck = () => {
    // Immediately check when component mounts
    checkTasks()

    // Then set up interval to check every minute
    timerInterval.value = setInterval(() => {
      checkTasks()
    }, 60000) // Check every minute
  }

  // Check tasks and display notification if needed
  const checkTasks = () => {
    const notifications = taskStore.checkTaskTimers()

    // If there are new notifications and we're not already showing one
    if (notifications.length > 0 && !showNotification.value) {
      currentNotification.value = notifications[notifications.length - 1]
      showNotification.value = true
    }
  }

  // Dismiss current notification
  const dismissNotification = () => {
    if (currentNotification.value) {
      taskStore.clearNotification(currentNotification.value.id)
      showNotification.value = false
      currentNotification.value = null

      // Check if there are more notifications to show
      const remainingNotifications = taskStore.expiredTaskNotifications
      if (remainingNotifications.length > 0) {
        setTimeout(() => {
          currentNotification.value = remainingNotifications[remainingNotifications.length - 1]
          showNotification.value = true
        }, 500) // Small delay before showing next notification
      }
    }
  }

  // Clean up when component unmounts
  onMounted(() => {
    startTaskTimerCheck()
  })

  onBeforeUnmount(() => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
    }
  })

  return {
    showNotification,
    currentNotification,
    dismissNotification
  }
}
