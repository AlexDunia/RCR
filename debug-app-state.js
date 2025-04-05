/**
 * Debug App State
 *
 * This script outputs essential information about the application state
 * focusing on role management and localStorage.
 *
 * Run this in your browser console while the app is running.
 */

// Clear old console output
console.clear();
console.log('%c RCR Application State Debugger ', 'background: #004080; color: white; font-size: 16px; padding: 5px;');
console.log('-'.repeat(80));

// Check localStorage
console.log('%c localStorage State:', 'font-weight: bold; color: #004080;');
console.log('user_role value:', localStorage.getItem('user_role'));
console.log('user_name value:', localStorage.getItem('user_name'));

// Show all localStorage keys
console.log('\nAll localStorage entries:');
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(`${key}: ${localStorage.getItem(key)}`);
}

// Get roleStore if available
console.log('\n%c roleStore State:', 'font-weight: bold; color: #004080;');
try {
  // Try to get store from app instance
  const app = document.querySelector('#app')?.__vue_app__;
  if (app) {
    const pinia = app._context.provides.pinia;
    if (pinia) {
      const roleStore = pinia.state.value.role;
      console.log('roleStore state:', roleStore);
    } else {
      console.log('Pinia not found');
    }
  } else {
    console.log('Vue app instance not found');
  }
} catch (e) {
  console.log('Error accessing roleStore:', e);
}

console.log('\n%c Route and Layout Info:', 'font-weight: bold; color: #004080;');
try {
  // Try to get route information
  const router = window?.$router || window?.router;
  if (router) {
    console.log('Current route:', router.currentRoute.value);
  } else {
    console.log('Router not found in window scope');
  }
} catch (e) {
  console.log('Error accessing router:', e);
}

console.log('-'.repeat(80));
console.log('%c Diagnostics:', 'font-weight: bold; color: #004080;');
console.log(`
1. If localStorage still contains 'user_role', it may interfere with roleStore.
   Run localStorage.clear() to ensure a clean state.

2. Check the admin flag in App.vue - verify its value is correctly set to: ${
  !!document.querySelector('.admin-sidebar') ? 'true (Admin UI)' : 'false (Agent UI)'
}

3. Current sidebar type: ${
  document.querySelector('.admin-sidebar') ? 'Admin Sidebar' :
  document.querySelector('.sidebar') ? 'Agent Sidebar' :
  'No Sidebar Found'
}
`);

console.log('-'.repeat(80));
console.log('To fix issues, try the following:');
console.log(`
1. Clear localStorage: localStorage.clear()
2. Reload page: window.location.reload()
3. Check roleStore implementation in src/stores/roleStore.js
`);
