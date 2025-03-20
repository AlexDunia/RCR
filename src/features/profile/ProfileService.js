/**
 * Profile Service
 * Contains business logic for user profile operations
 */

/**
 * Format a user's full name
 * @param {Object} user - User object with first and last name
 * @returns {string} Formatted full name
 */
export const formatUserName = (user) => {
  if (!user) return '';
  return `${user.firstName || ''} ${user.lastName || ''}`.trim();
};

/**
 * Format a phone number for display
 * @param {string} phoneNumber - Raw phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';

  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  return phoneNumber;
};

/**
 * Get the user's profile completion percentage
 * @param {Object} profile - User profile object
 * @returns {number} Completion percentage (0-100)
 */
export const getProfileCompletionPercentage = (profile) => {
  if (!profile) return 0;

  const fields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'bio',
    'avatar',
    'address',
    'licenseNumber'
  ];

  const completedFields = fields.filter(field =>
    profile[field] && profile[field].toString().trim() !== ''
  );

  return Math.round((completedFields.length / fields.length) * 100);
};
