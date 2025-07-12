/**
 * Client Role Navigation Fix
 *
 * This script specifically addresses navigation issues in the client role.
 * It can be imported directly into client-specific components to ensure proper navigation
 * without requiring a full page refresh.
 */

// Track component mount/unmount cycles to detect potential issues
const mountedComponents = new Set();
let navigationAttempts = 0;

/**
 * Apply this fix to client role navigation
 * @param {Object} router - Vue Router instance
 * @param {Object} store - Role store
 * @returns {Function} - Cleanup function
 */
export function applyClientNavFix(router, store) {
  // Only apply if in client role
  if (store?.currentRole !== 'client') {
    return () => {};
  }

  console.log('Applying client navigation fix');

  // Clear any zombie timers or stale navigation state
  clearNavigationState();

  // Handle route changes
  const routeHandler = async (to, from, next) => {
    // Ensure we're in client role
    if (store.currentRole !== 'client') {
      store.setRole('client');
    }

    // Handle old route patterns
    if (to.path.startsWith('/client-')) {
      const newPath = to.path.replace('/client-', '/client/');
      next({ path: newPath, replace: true });
      return;
    }

    // Ensure client routes are under /client/
    if (!to.path.startsWith('/client/') && !to.meta.publicAccess) {
      const newPath = `/client${to.path}`;
      next({ path: newPath, replace: true });
      return;
    }

    // Track navigation attempts
    navigationAttempts++;
    if (navigationAttempts > 10) {
      console.warn('Too many navigation attempts detected');
      clearNavigationState();
      next(false);
      return;
    }

    // Proceed with navigation
    next();
  };

  // Add route handler
  router.beforeEach(routeHandler);

  // Return cleanup function
  return () => {
    router.beforeEach((to, from, next) => next());
    clearNavigationState();
  };
}

/**
 * Clear navigation state
 */
function clearNavigationState() {
  mountedComponents.clear();
  navigationAttempts = 0;
}

/**
 * Track component lifecycle
 * @param {string} componentName - Name of the component
 */
export function trackComponent(componentName) {
  mountedComponents.add(componentName);
  return () => mountedComponents.delete(componentName);
}

/**
 * Clear any stale navigation state that might be causing issues
 */
function clearStaleNavigationState() {
  // Clear session storage navigation markers
  sessionStorage.removeItem('navInProgress');

  // Clear any stale localStorage values that might affect navigation
  const staleKeys = [
    'imagesNeedRefresh',
    'lastPath',
    'pendingRedirect',
    'navFailed'
  ];

  staleKeys.forEach(key => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  });

  // Set a flag to track that we've cleaned up
  localStorage.setItem('navFixApplied', Date.now().toString());

  mountedComponents.clear();
  navigationAttempts = 0;
  localStorage.removeItem('clientNavBroken');
}

/**
 * Emergency function to recover from completely broken navigation
 * Can be called from browser console if all else fails
 */
export function emergencyNavigationReset() {
  console.log('Emergency navigation reset activated');

  // Clear absolutely everything in session storage
  sessionStorage.clear();

  // Clear navigation-related localStorage items
  const navKeys = Object.keys(localStorage).filter(key =>
    key.includes('nav') ||
    key.includes('route') ||
    key.includes('redirect') ||
    key.includes('path')
  );

  navKeys.forEach(key => localStorage.removeItem(key));

  // Force complete page reload
  window.location.href = '/#/client-dashboard?reset=true';

  return 'Navigation emergency reset complete. Page will reload.';
}
