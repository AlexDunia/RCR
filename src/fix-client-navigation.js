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
  clearStaleNavigationState();

  // Track navigation attempts
  const navGuard = router.beforeEach((to, from, next) => {
    navigationAttempts++;

    // Force component remount on navigation if we're seeing problems
    if (navigationAttempts > 3 && mountedComponents.size > 10) {
      console.warn('Detected potential component leak, forcing clean navigation');

      // Add timestamp to force component remount
      const timestamp = Date.now();
      const query = {...to.query, _ts: timestamp};

      // Navigate with clean query to force remount
      next({
        path: to.path,
        query,
        params: to.params,
        replace: true
      });

      // Reset tracking
      mountedComponents.clear();
      navigationAttempts = 0;
    } else {
      next();
    }
  });

  // Track navigation completion
  const afterHook = router.afterEach(() => {
    // Reset navigation attempts counter on successful navigation
    setTimeout(() => {
      navigationAttempts = 0;
    }, 1000);
  });

  // Error recovery
  const errorHook = router.onError(() => {
    // Force component cleanup on error
    mountedComponents.clear();

    // Reset navigation tracking
    navigationAttempts = 0;
  });

  // Remove all client-specific route guards
  return () => {
    router.beforeHooks.splice(router.beforeHooks.indexOf(navGuard), 1);
    router.afterHooks.splice(router.afterHooks.indexOf(afterHook), 1);
    if (errorHook && router.errorHooks) {
      router.errorHooks.splice(router.errorHooks.indexOf(errorHook), 1);
    }
  };
}

/**
 * Track component lifecycle to detect memory leaks and navigation issues
 * @param {string} componentName - Name of the component to track
 */
export function trackComponent(componentName) {
  if (!componentName) return { onMounted: () => {}, onUnmounted: () => {} };

  return {
    onMounted() {
      mountedComponents.add(componentName);
    },
    onUnmounted() {
      mountedComponents.delete(componentName);
    }
  };
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
