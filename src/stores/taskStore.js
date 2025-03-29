import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('taskStore', () => {
  // State
  const tasks = ref([
    {
      id: 301,
      title: 'Review purchase contract',
      description: 'Review the purchase contract for the property at 123 Main St.',
      assignedTo: {
        type: 'client',
        id: 1
      },
      assignedBy: {
        type: 'agent',
        id: 5
      },
      status: 'pending',
      priority: 'high',
      dueDate: '2024-05-20',
      createdAt: '2024-05-10',
      completedAt: null
    },
    {
      id: 302,
      title: 'Submit mortgage pre-approval',
      description: 'Upload mortgage pre-approval document from lender.',
      assignedTo: {
        type: 'client',
        id: 1
      },
      assignedBy: {
        type: 'agent',
        id: 5
      },
      status: 'completed',
      priority: 'high',
      dueDate: '2024-05-15',
      createdAt: '2024-05-10',
      completedAt: '2024-05-14'
    }
  ])

  // Getters
  const getTaskById = (id) => {
    return tasks.value.find(task => task.id === id)
  }

  const getTasksByClient = (clientId) => {
    return tasks.value.filter(task =>
      task.assignedTo.type === 'client' && task.assignedTo.id === clientId
    )
  }

  const getPendingTasks = () => {
    return tasks.value.filter(task => task.status === 'pending')
  }

  const getOverdueTasks = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return tasks.value.filter(task => {
      const dueDate = new Date(task.dueDate)
      dueDate.setHours(0, 0, 0, 0)

      return task.status === 'pending' && dueDate < today
    })
  }

  // Actions
  function createTask(task) {
    const newTask = {
      id: generateTaskId(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      completedAt: null,
      ...task
    }

    tasks.value.push(newTask)
    return newTask.id
  }

  function updateTask(id, updates) {
    const index = tasks.value.findIndex(task => task.id === id)

    if (index !== -1) {
      tasks.value[index] = {
        ...tasks.value[index],
        ...updates
      }
      return true
    }

    return false
  }

  function deleteTask(id) {
    const index = tasks.value.findIndex(task => task.id === id)

    if (index !== -1) {
      tasks.value.splice(index, 1)
      return true
    }

    return false
  }

  function completeTask(id) {
    const task = tasks.value.find(task => task.id === id)

    if (task && task.status === 'pending') {
      task.status = 'completed'
      task.completedAt = new Date().toISOString().split('T')[0]
      return true
    }

    return false
  }

  // Helper method to generate unique task ID
  function generateTaskId() {
    return Math.max(0, ...tasks.value.map(task => task.id)) + 1
  }

  return {
    // State
    tasks,

    // Getters
    getTaskById,
    getTasksByClient,
    getPendingTasks,
    getOverdueTasks,

    // Actions
    createTask,
    updateTask,
    deleteTask,
    completeTask
  }
})
