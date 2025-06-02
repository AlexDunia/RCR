/**
 * Email validation using RFC 5322 standard
 * This regex provides a good balance between accuracy and complexity
 */
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

/**
 * Password validation
 * Requires:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    errors: {
      length: password.length < minLength,
      uppercase: !hasUpperCase,
      lowercase: !hasLowerCase,
      number: !hasNumbers
    }
  };
};

/**
 * Sanitize input to prevent XSS attacks
 * Removes HTML tags and special characters
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim(); // Remove leading/trailing whitespace
};

/**
 * Validate phone number
 * Accepts formats:
 * - (123) 456-7890
 * - 123-456-7890
 * - 1234567890
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneRegex.test(phone);
};

/**
 * Check if string contains only letters and spaces
 */
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]*$/;
  return nameRegex.test(name);
};

/**
 * Validate URL format
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
