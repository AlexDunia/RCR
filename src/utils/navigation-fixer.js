/**
 * Navigation Fixer Utility
 *
 * This utility addresses common Vue Router navigation issues that can cause blank screens,
 * especially in complex SPA applications with dynamic components and lazy loading.
 */

import { nextTick } from 'vue';

// Patch history API to catch navigation errors
export function patchHistoryAPI() {
  if (typeof window === 'undefined') return;

  // Store original history methods
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  // Override pushState to add error handling
  window.history.pushState = function(...args) {
    try {
      return originalPushState.apply(this, args);
    } catch (e) {
      console.error('History pushState error:', e);
      window.dispatchEvent(new CustomEvent('router:error', { detail: e }));
      return null;
    }
  };

  // Override replaceState to add error handling
  window.history.replaceState = function(...args) {
    try {
      return originalReplaceState.apply(this, args);
    } catch (e) {
      console.error('History replaceState error:', e);
      window.dispatchEvent(new CustomEvent('router:error', { detail: e }));
      return null;
    }
  };
}

// Enhance router with additional safeguards
export function enhanceRouter(router) {
  if (!router) return;

  // Detect and fix navigation interruptions
  let pendingNavigation = null;
  let navigationTimeout = null;
  const MAX_NAVIGATION_TIME = 2000; // 2 seconds

  // Enhance navigation error handling
  router.onError((error) => {
    console.error('Router navigation error:', error);

    // Try to recover by reloading the current route
    nextTick(() => {
      const currentPath = router.currentRoute.value.fullPath;
      router.replace(currentPath + (currentPath.includes('?') ? '&' : '?') + '_t=' + Date.now());
    });
  });

  // Track navigation start
  router.beforeEach((to, from, next) => {
    clearTimeout(navigationTimeout);

    pendingNavigation = { to, from, time: Date.now() };

    // Set timeout to detect stuck navigation
    navigationTimeout = setTimeout(() => {
      if (pendingNavigation) {
        console.warn('Navigation timeout detected. Attempting recovery...');

        // Force the navigation to complete
        router.replace(to.fullPath + (to.fullPath.includes('?') ? '&' : '?') + '_recovery=1');

        // Clear the pending navigation
        pendingNavigation = null;
      }
    }, MAX_NAVIGATION_TIME);

    next();
  });

  // Track navigation completion
  router.afterEach(() => {
    clearTimeout(navigationTimeout);
    pendingNavigation = null;
  });

  // Clear localStorage navigation state on fresh page load
  window.addEventListener('load', () => {
    sessionStorage.removeItem('navInProgress');
  });

  // Track page visibility changes to detect tab switches
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // Page is now visible, check for broken navigation
      if (pendingNavigation && (Date.now() - pendingNavigation.time > MAX_NAVIGATION_TIME)) {
        console.warn('Detected stale navigation after visibility change, resetting...');
        pendingNavigation = null;

        // Force a refresh of the current route
        const currentPath = router.currentRoute.value.fullPath;
        router.replace(currentPath + (currentPath.includes('?') ? '&' : '?') + '_visibility=1');
      }
    }
  });

  return router;
}

// Function to fix client role navigation issues specifically
export function fixClientRoleNavigation() {
  // Clear any stale navigation data that might be causing issues
  sessionStorage.removeItem('navInProgress');

  // Force Vue to reinitialize the router view rendering
  document.querySelectorAll('.router-view-container').forEach(el => {
    if (el) {
      el.style.display = 'none';
      void el.offsetHeight; // Force reflow
      el.style.display = '';
    }
  });

  // Add a flag to indicate we've fixed the navigation
  localStorage.setItem('navigationFixed', 'true');

  return true;
}

// Function to check and clear any problematic caches
export function clearNavigationCache() {
  // Clear session-level navigation data
  sessionStorage.removeItem('navInProgress');
  sessionStorage.removeItem('lastRoute');

  // Add timestamp to mark when the cache was cleared
  localStorage.setItem('navCacheCleared', Date.now().toString());

  return true;
}
