/**
 * Force Client Role Script
 * This script forces the client role and clears any cached settings
 */
(function() {
  console.log('Forcing client role...');

  // Clear any cached role data
  localStorage.clear();

  // Set user role to client
  localStorage.setItem('userRole', 'client');

  // Set flags to force reload and refresh images
  localStorage.setItem('needsFullReload', 'true');
  localStorage.setItem('imagesNeedRefresh', 'true');

  // Force a hard reload to bypass cache
  console.log('Reloading with client role (bypassing cache)...');
  window.location.href = '/client-dashboard?t=' + new Date().getTime();
})();
