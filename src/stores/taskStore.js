import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useConnectionStore } from '@/stores/connectionStore'

export const useTaskStore = defineStore('taskStore', () => {
  // Use the connection store
  const connectionStore = useConnectionStore()

  // State
  const tasks = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const expiredTaskNotifications = ref([])

  // Create sample tasks with exactly 2 clients and 2 agents each
  const createSampleTasks = () => {
    console.log('Creating sample tasks with exactly 2 people per task...')

    const sampleTasks = [
      {
        id: 301,
        title: 'Property Viewing - Downtown Condo',
        status: 'scheduled',
        priority: 'high',
        startDate: '2025-04-15',
        startTime: '10:00',
        endDate: '2025-04-15',
        endTime: '11:30',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        startedAt: null,
        clients: [1, 3], // Alex Dunia and Robert Johnson
        clientDetails: [
          {
            id: 1,
            name: 'Alex Dunia',
            email: 'alex.dunia@example.com',
            avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg'
          },
          {
            id: 3,
            name: 'Robert Johnson',
            email: 'robert.johnson@example.com',
            avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_1_gdilxy.jpg'
          }
        ],
        agents: [5, 10], // Sarah Johnson and Jessica Ramirez
        agentDetails: [
          {
            id: 5,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@realestateagency.com',
            avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_3_inul8p.jpg'
          },
          {
            id: 10,
            name: 'Jessica Ramirez',
            email: 'jessica.ramirez@realestateagency.com',
            avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_2_rfyiva.jpg'
          }
        ],
        attachments: [],
        timerStopped: false
      },
      {
        id: 302,
        title: 'Investment Property Consultation',
        status: 'in_progress',
        priority: 'medium',
        startDate: '2025-04-10',
        startTime: '14:00',
        endDate: '2025-04-10',
        endTime: '15:00',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        startedAt: null,
        clients: [2, 6], // Jane Smith and Emily Chen
        clientDetails: [
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg'
          },
          {
            id: 6,
            name: 'Emily Chen',
            email: 'emily.chen@example.com',
            avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_1_gdilxy.jpg'
          }
        ],
        agents: [8, 12], // Michael Chen and David Thompson
        agentDetails: [
          {
            id: 8,
            name: 'Michael Chen',
            email: 'michael.chen@realestateagency.com',
            avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_3_inul8p.jpg'
          },
          {
            id: 12,
            name: 'David Thompson',
            email: 'david.thompson@realestateagency.com',
            avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_2_rfyiva.jpg'
          }
        ],
        attachments: [],
        timerStopped: false
      },
      {
        id: 303,
        title: 'First-time Homebuyer Meeting',
        status: 'completed',
        priority: 'low',
        startDate: '2025-04-05',
        startTime: '09:00',
        endDate: '2025-04-05',
        endTime: '10:00',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        startedAt: new Date().toISOString(),
        clients: [4, 5], // Maria Garcia and James Wilson
        clientDetails: [
          {
            id: 4,
            name: 'Maria Garcia',
            email: 'maria.garcia@example.com',
            avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg'
          },
          {
            id: 5,
            name: 'James Wilson',
            email: 'james.wilson@example.com',
            avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_1_gdilxy.jpg'
          }
        ],
        agents: [15, 5], // Olivia Wilson and Sarah Johnson
        agentDetails: [
          {
            id: 15,
            name: 'Olivia Wilson',
            email: 'olivia.wilson@realestateagency.com',
            avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_3_inul8p.jpg'
          },
          {
            id: 5,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@realestateagency.com',
            avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_2_rfyiva.jpg'
          }
        ],
        attachments: [],
        timerStopped: true
      }
    ];

    // Update the tasks and save to localStorage
    tasks.value = sampleTasks;
    localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    return sampleTasks;
  };

  // Force reset all tasks to the sample tasks (for testing purposes)
  const resetTasks = () => {
    isLoading.value = true;
    try {
      // Clear all existing tasks in localStorage
      localStorage.removeItem('tasks');
      localStorage.removeItem('completedTasks');
      localStorage.removeItem('currentTaskDetail');

      // Create new sample tasks with 2 clients each
      createSampleTasks();
      console.log('Tasks have been reset to sample data with 2 clients per task');
    } catch (err) {
      console.error('Failed to reset tasks:', err);
      error.value = 'Failed to reset tasks';
    } finally {
      isLoading.value = false;
    }
  };

  // Load tasks from localStorage on initialization
  const initTasks = () => {
    isLoading.value = true
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')

      // If there are no tasks or only a few tasks, create sample tasks with limited clients
      if (storedTasks.length < 3) {
        createSampleTasks();
      } else {
        tasks.value = storedTasks
      }
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
    // If clientId is invalid, return empty array
    if (!clientId || isNaN(clientId)) {
      console.warn('Invalid client ID provided to getTasksByClient:', clientId);
      return [];
    }

    // Convert clientId to number for consistent comparison
    const numericClientId = parseInt(clientId);

    // Return tasks where the client ID is included in the clients array
    return tasks.value.filter(task => {
      // Make sure task.clients exists and is an array
      if (!task.clients || !Array.isArray(task.clients)) {
        return false;
      }

      // Check if the client ID is in the task's clients array
      return task.clients.includes(numericClientId);
    });
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
    try {
      // Validate connections between agents and clients
      const areConnected = connectionStore.validateMultipleInteractions(task.agents, task.clients)
      if (!areConnected) {
        throw new Error('Tasks can only be created between connected agents and clients')
      }

      const newTask = {
        id: generateTaskId(),
        status: 'draft',
        ...task,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        startedAt: null,
        timerStopped: false
      }

      tasks.value.push(newTask)
      localStorage.setItem('tasks', JSON.stringify(tasks.value))
      return newTask.id
    } catch (error) {
      console.error('Failed to create task:', error)
      throw error
    }
  }

  function updateTask(id, updates) {
    try {
      const taskIndex = tasks.value.findIndex(task => task.id === id)
      if (taskIndex === -1) {
        throw new Error('Task not found')
      }

      // If agents or clients are being updated, validate connections
      if (updates.agents && updates.clients) {
        const areConnected = connectionStore.validateMultipleInteractions(updates.agents, updates.clients)
        if (!areConnected) {
          throw new Error('Tasks can only be updated between connected agents and clients')
        }
      } else if (updates.agents && tasks.value[taskIndex].clients) {
        const areConnected = connectionStore.validateMultipleInteractions(updates.agents, tasks.value[taskIndex].clients)
        if (!areConnected) {
          throw new Error('Tasks can only be updated between connected agents and clients')
        }
      } else if (updates.clients && tasks.value[taskIndex].agents) {
        const areConnected = connectionStore.validateMultipleInteractions(tasks.value[taskIndex].agents, updates.clients)
        if (!areConnected) {
          throw new Error('Tasks can only be updated between connected agents and clients')
        }
      }

      tasks.value[taskIndex] = {
        ...tasks.value[taskIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      }

      localStorage.setItem('tasks', JSON.stringify(tasks.value))
      return tasks.value[taskIndex]
    } catch (error) {
      console.error('Failed to update task:', error)
      throw error
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

  // Remove an agent from a task
  const removeAgentFromTask = async (taskId, agentId) => {
    try {
      const task = tasks.value.find(t => t.id === taskId);
      if (!task) {
        throw new Error('Task not found');
      }

      // Remove agent from agents array
      task.agents = task.agents.filter(id => id !== agentId);
      // Remove agent from agentDetails array
      task.agentDetails = task.agentDetails.filter(agent => agent.id !== agentId);

      // Update the task in the store
      tasks.value = tasks.value.map(t => t.id === taskId ? task : t);

      // Save to localStorage
      localStorage.setItem('tasks', JSON.stringify(tasks.value));

      return task;
    } catch (error) {
      console.error('Error removing agent from task:', error);
      throw error;
    }
  };

  // Remove a client from a task
  const removeClientFromTask = async (taskId, clientId) => {
    try {
      const task = tasks.value.find(t => t.id === taskId);
      if (!task) {
        throw new Error('Task not found');
      }

      // Remove client from clients array
      task.clients = task.clients.filter(id => id !== clientId);
      // Remove client from clientDetails array
      task.clientDetails = task.clientDetails.filter(client => client.id !== clientId);

      // Update the task in the store
      tasks.value = tasks.value.map(t => t.id === taskId ? task : t);

      // Save to localStorage
      localStorage.setItem('tasks', JSON.stringify(tasks.value));

      return task;
    } catch (error) {
      console.error('Error removing client from task:', error);
      throw error;
    }
  };

  return {
    // State
    tasks,
    isLoading,
    error,
    expiredTaskNotifications,

    // Initialization
    initTasks,
    resetTasks,

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
    clearAllNotifications,
    removeAgentFromTask,
    removeClientFromTask
  }
})
