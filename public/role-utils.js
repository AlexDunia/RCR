/**
 * Role Utility Functions
 *
 * This file contains utility functions that can be used from the browser console
 * to quickly switch between different user roles.
 */

// Switch to Client role
function switchToClient() {
  localStorage.setItem('userRole', 'client');
  localStorage.setItem('imagesNeedRefresh', 'true');
  console.log('Role changed to client. Refreshing page...');
  window.location.href = '/client-dashboard';
}

// Switch to Agent role
function switchToAgent() {
  localStorage.setItem('userRole', 'agent');
  localStorage.setItem('imagesNeedRefresh', 'true');
  console.log('Role changed to agent. Refreshing page...');
  window.location.href = '/agent-dashboard';
}

// Switch to Admin role
function switchToAdmin() {
  localStorage.setItem('userRole', 'admin');
  localStorage.setItem('imagesNeedRefresh', 'true');
  console.log('Role changed to admin. Refreshing page...');
  window.location.href = '/admin-dashboard';
}

// Get current role
function getCurrentRole() {
  const role = localStorage.getItem('userRole') || 'client';
  console.log(`Current role: ${role}`);
  return role;
}

// Make functions available globally
window.switchToClient = switchToClient;
window.switchToAgent = switchToAgent;
window.switchToAdmin = switchToAdmin;
window.getCurrentRole = getCurrentRole;

// Instructions for usage
console.log(
  '%cRole Utility Functions',
  'font-size: 16px; font-weight: bold; color: #1a4189;'
);
console.log(
  '%cUse these functions to switch roles:\n' +
  '- switchToClient()\n' +
  '- switchToAgent()\n' +
  '- switchToAdmin()\n' +
  '- getCurrentRole()',
  'font-size: 14px; color: #333;'
);
