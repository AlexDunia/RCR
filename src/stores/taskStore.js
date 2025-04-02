import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTaskStore = defineStore('taskStore', () => {
  // State
  const tasks = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const expiredTaskNotifications = ref([])

  // Load tasks from localStorage on initialization
  const initTasks = () => {
    isLoading.value = true
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
      tasks.value = storedTasks
    } catch (err) {
      console.error('Failed to load tasks from localStorage:', err)
      error.value = 'Failed to load tasks'
    } finally {
      isLoading.value = false
    }
  }

  // Initialize store
  initTasks()

  // Watch for changes and persist to localStorage
  watch(tasks, (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }, { deep: true })

  // Getters
  const getTaskById = (id) => {
    return tasks.value.find(task => task.id === parseInt(id))
  }

  const getTasksByClient = (clientId) => {
    return tasks.value.filter(task =>
      task.clients.includes(parseInt(clientId))
    )
  }

  const getTasksByAgent = (agentId) => {
    return tasks.value.filter(task =>
      task.agents.includes(parseInt(agentId))
    )
  }

  const getTasksByStatus = (status) => {
    return tasks.value.filter(task => task.status === status)
  }

  const getDraftTasks = () => {
    return getTasksByStatus('draft')
  }

  const getInProgressTasks = () => {
    return getTasksByStatus('in_progress')
  }

  const getScheduledTasks = () => {
    return getTasksByStatus('scheduled')
  }

  const getCompletedTasks = () => {
    return getTasksByStatus('completed')
  }

  const getPendingTasks = () => {
    return getTasksByStatus('pending')
  }

  const getOverdueTasks = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return tasks.value.filter(task => {
      if (task.status !== 'pending' && task.status !== 'in_progress') return false

      const endDate = new Date(task.endDate)
      endDate.setHours(0, 0, 0, 0)

      return endDate < today
    })
  }

  // Check if a task has expired (current time > end time)
  const isTaskExpired = (task) => {
    if (!task.endDate || !task.endTime) return false

    const now = new Date()
    const endDateTime = new Date(`${task.endDate}T${task.endTime}`)

    return now > endDateTime
  }

  // Check active tasks for expiration
  const checkTaskTimers = () => {
    const activeStatuses = ['in_progress', 'scheduled']
    const activeTasks = tasks.value.filter(task => activeStatuses.includes(task.status))

    activeTasks.forEach(task => {
      if (isTaskExpired(task) && !task.timerStopped) {
        // Mark task as timer stopped to avoid repeated notifications
        updateTask(task.id, { timerStopped: true })

        // Add notification
        expiredTaskNotifications.value.push({
          id: Date.now(),
          taskId: task.id,
          message: `Task timer has automatically stopped as the due date and time have been reached.`,
          read: false,
          timestamp: new Date().toISOString()
        })
      }
    })

    return expiredTaskNotifications.value
  }

  // Clear a specific notification
  const clearNotification = (notificationId) => {
    expiredTaskNotifications.value = expiredTaskNotifications.value.filter(
      notification => notification.id !== notificationId
    )
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    expiredTaskNotifications.value = []
  }

  // Actions
  function createTask(task) {
    isLoading.value = true
    error.value = null

    try {
      const newTask = {
        id: generateTaskId(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        startedAt: null,
        agents: [],
        agentDetails: [],
        clients: [],
        clientDetails: [],
        attachments: [],
        timerStopped: false,
        ...task
      }

      tasks.value.push(newTask)
      return newTask.id
    } catch (err) {
      console.error('Failed to create task:', err)
      error.value = 'Failed to create task'
      return null
    } finally {
      isLoading.value = false
    }
  }

  function updateTask(id, updates) {
    isLoading.value = true
    error.value = null

    try {
      const index = tasks.value.findIndex(task => task.id === parseInt(id))

      if (index !== -1) {
        tasks.value[index] = {
          ...tasks.value[index],
          ...updates,
          updatedAt: new Date().toISOString()
        }
        return true
      }

      return false
    } catch (err) {
      console.error('Failed to update task:', err)
      error.value = 'Failed to update task'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function deleteTask(id) {
    isLoading.value = true
    error.value = null

    try {
      const index = tasks.value.findIndex(task => task.id === parseInt(id))

      if (index !== -1) {
        tasks.value.splice(index, 1)
        return true
      }

      return false
    } catch (err) {
      console.error('Failed to delete task:', err)
      error.value = 'Failed to delete task'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function completeTask(id) {
    isLoading.value = true
    error.value = null

    try {
      const task = tasks.value.find(task => task.id === parseInt(id))

      if (task) {
        task.status = 'completed'
        task.completedAt = new Date().toISOString()
        task.updatedAt = new Date().toISOString()

        // Also store in completedTasks localStorage for legacy support
        localStorage.setItem('completedTasks', JSON.stringify(task))
        return true
      }

      return false
    } catch (err) {
      console.error('Failed to complete task:', err)
      error.value = 'Failed to complete task'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function startTask(id) {
    isLoading.value = true
    error.value = null

    try {
      const task = tasks.value.find(task => task.id === parseInt(id))

      if (task) {
        task.status = 'in_progress'
        task.startedAt = new Date().toISOString()
        task.updatedAt = new Date().toISOString()

        // For legacy support
        localStorage.setItem('currentTaskDetail', JSON.stringify(task))
        return true
      }

      return false
    } catch (err) {
      console.error('Failed to start task:', err)
      error.value = 'Failed to start task'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function scheduleTask(id) {
    isLoading.value = true
    error.value = null

    try {
      const task = tasks.value.find(task => task.id === parseInt(id))

      if (task) {
        task.status = 'scheduled'
        task.updatedAt = new Date().toISOString()
        return true
      }

      return false
    } catch (err) {
      console.error('Failed to schedule task:', err)
      error.value = 'Failed to schedule task'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function saveAsDraft(task) {
    isLoading.value = true
    error.value = null

    try {
      const newTask = {
        id: generateTaskId(),
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        startedAt: null,
        agents: [],
        agentDetails: [],
        clients: [],
        clientDetails: [],
        attachments: [],
        ...task
      }

      tasks.value.push(newTask)
      return newTask.id
    } catch (err) {
      console.error('Failed to save draft:', err)
      error.value = 'Failed to save draft'
      return null
    } finally {
      isLoading.value = false
    }
  }

  function clearAllDrafts() {
    isLoading.value = true
    error.value = null

    try {
      tasks.value = tasks.value.filter(task => task.status !== 'draft')
      return true
    } catch (err) {
      console.error('Failed to clear drafts:', err)
      error.value = 'Failed to clear drafts'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Helper method to generate unique task ID
  function generateTaskId() {
    return Math.max(0, ...tasks.value.map(task => task.id)) + 1
  }

  return {
    // State
    tasks,
    isLoading,
    error,
    expiredTaskNotifications,

    // Initialization
    initTasks,

    // Getters
    getTaskById,
    getTasksByClient,
    getTasksByAgent,
    getTasksByStatus,
    getDraftTasks,
    getInProgressTasks,
    getScheduledTasks,
    getCompletedTasks,
    getPendingTasks,
    getOverdueTasks,
    isTaskExpired,

    // Actions
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    startTask,
    scheduleTask,
    saveAsDraft,
    clearAllDrafts,
    checkTaskTimers,
    clearNotification,
    clearAllNotifications
  }
})
