import { validateEmail, validatePassword, validateName } from '@/utils/validators';

const validationService = {
  validateRole(role) {
    const validRoles = ['agent', 'client']; // Only allow agent and client for registration
    return validRoles.includes(role);
  },

  validateSignupForm(formData) {
    const errors = {};

    // Name validation
    if (!formData.name) {
      errors.name = 'Name is required';
    } else if (!validateName(formData.name)) {
      errors.name = 'Name can only contain letters and spaces';
    }

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        errors.password = 'Password must:';
        if (passwordValidation.errors.length) errors.password += '\n- Be at least 8 characters long';
        if (passwordValidation.errors.uppercase) errors.password += '\n- Contain at least one uppercase letter';
        if (passwordValidation.errors.lowercase) errors.password += '\n- Contain at least one lowercase letter';
        if (passwordValidation.errors.number) errors.password += '\n- Contain at least one number';
      }
    }

    // Role validation
    if (!formData.role) {
      errors.role = 'Please select your role';
    } else if (!this.validateRole(formData.role)) {
      errors.role = 'Please select a valid role';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

export default validationService;
