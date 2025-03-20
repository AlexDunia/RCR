/**
 * Task Service
 * Contains business logic for task operations
 */

/**
 * Format a task date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatTaskDate = (dateString) => {
  if (!dateString) return '';

  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format a task time for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted time
 */
export const formatTaskTime = (dateString) => {
  if (!dateString) return '';

  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get task priority class
 * @param {string} priority - Task priority (high, medium, low)
 * @returns {string} CSS class for priority
 */
export const getTaskPriorityClass = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'priority-high';
    case 'medium':
      return 'priority-medium';
    case 'low':
      return 'priority-low';
    default:
      return 'priority-medium';
  }
};

/**
 * Get task status class
 * @param {string} status - Task status
 * @returns {string} CSS class for status
 */
export const getTaskStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'status-completed';
    case 'in progress':
      return 'status-progress';
    case 'scheduled':
      return 'status-scheduled';
    case 'draft':
      return 'status-draft';
    default:
      return '';
  }
};

/**
 * Sort tasks by date (newest first)
 * @param {Array} tasks - Array of task objects
 * @returns {Array} Sorted array of tasks
 */
export const sortTasksByDate = (tasks) => {
  return [...tasks].sort((a, b) =>
    new Date(b.createdAt || b.dueDate) - new Date(a.createdAt || a.dueDate)
  );
};

/**
 * Get upcoming tasks
 * @param {Array} tasks - Array of task objects
 * @param {number} days - Number of days to look ahead
 * @returns {Array} Upcoming tasks
 */
export const getUpcomingTasks = (tasks, days = 7) => {
  const now = new Date();
  const future = new Date();
  future.setDate(future.getDate() + days);

  return tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    return taskDate >= now && taskDate <= future;
  });
};
