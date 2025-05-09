/**
 * Script to properly set the client role in localStorage
 * This will ensure the client has proper access to the client dashboard
 */
(function() {
  console.log('Setting client role and permissions...');

  // Set user role to client
  localStorage.setItem('userRole', 'client');

  // Set flag to perform a full reload
  localStorage.setItem('needsFullReload', 'true');

  // Force immediate reload
  console.log('Reloading with client role...');
  window.location.reload(true);
})();
