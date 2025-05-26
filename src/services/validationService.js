const validationService = {
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, and allow special characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{8,}$/;
    return passwordRegex.test(password);
  },

  validateName(name) {
    return name.length >= 2 && name.length <= 50;
  },

  validateRole(role) {
    const validRoles = ['agent', 'client']; // Only allow agent and client for registration
    return validRoles.includes(role);
  },

  validateSignupForm(formData) {
    const errors = {};

    if (!formData.name) {
      errors.name = 'Name is required';
    } else if (!this.validateName(formData.name)) {
      errors.name = 'Name must be between 2 and 50 characters';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!this.validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!this.validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters long and contain uppercase, lowercase, and numbers';
    }

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
