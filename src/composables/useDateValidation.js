import { computed } from 'vue'

/**
 * Composable for date validation throughout the application
 * Provides utilities to prevent selecting past dates
 */
export function useDateValidation() {
  // Get today's date in YYYY-MM-DD format for min attribute
  const todayDate = computed(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })

  /**
   * Ensures a date is not in the past
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {string} - The input date if valid, or today's date if in the past
   */
  const ensureFutureDate = (date) => {
    const today = todayDate.value
    return date < today ? today : date
  }

  /**
   * Validates that a date-time combination is not in the past
   * @param {string} date - Date in YYYY-MM-DD format
   * @param {string} time - Time in HH:MM format
   * @returns {boolean} - True if the date-time is in the future
   */
  const isValidFutureDateTime = (date, time) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dateTime = new Date(`${date} ${time}`)
    return dateTime >= today
  }

  /**
   * Validates that an end date-time is after a start date-time
   * @param {string} startDate - Start date in YYYY-MM-DD format
   * @param {string} startTime - Start time in HH:MM format
   * @param {string} endDate - End date in YYYY-MM-DD format
   * @param {string} endTime - End time in HH:MM format
   * @returns {boolean} - True if end date-time is after start date-time
   */
  const isValidDateTimeRange = (startDate, startTime, endDate, endTime) => {
    const startDateTime = new Date(`${startDate} ${startTime}`)
    const endDateTime = new Date(`${endDate} ${endTime}`)
    return endDateTime > startDateTime
  }

  return {
    todayDate,
    ensureFutureDate,
    isValidFutureDateTime,
    isValidDateTimeRange
  }
}
