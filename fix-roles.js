// Simple utility for directly setting roles in localStorage
// You can run this in the browser console to change roles

// Set role to admin
function setAdmin() {
  localStorage.setItem('user_role', 'admin');
  console.log('Role set to admin. Refresh the page to apply changes.');
}

// Set role to agent
function setAgent() {
  localStorage.setItem('user_role', 'agent');
  console.log('Role set to agent. Refresh the page to apply changes.');
}

// Get current role
function getRole() {
  return localStorage.getItem('user_role') || 'admin';
}

// Log current role
console.log('Current role:', getRole());

// Instructions for use
console.log('To change roles:');
console.log('1. Type setAdmin() to set role to admin');
console.log('2. Type setAgent() to set role to agent');
console.log('3. Refresh the page after changing role');

// Export functions to global scope for use in console
window.setAdmin = setAdmin;
window.setAgent = setAgent;
window.getRole = getRole;
