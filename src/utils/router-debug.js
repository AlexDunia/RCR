/**
 * Router debug utility to help diagnose and fix navigation issues
 */

// Track navigation timing and memory usage
const navigationTimings = [];
const maxNavigationEntries = 20;

// Router debugging hooks
export function setupRouterDebug(router) {
  // Before each navigation
  router.beforeEach((to, from, next) => {
    console.log(`[Router Debug] Navigation started: ${from.path} → ${to.path}`);

    // Track timing
    const timing = {
      from: from.path,
      to: to.path,
      startTime: performance.now(),
      endTime: null,
      duration: null
    };

    navigationTimings.push(timing);

    // Limit the size of the navigation history
    if (navigationTimings.length > maxNavigationEntries) {
      navigationTimings.shift();
    }

    next();
  });

  // After each navigation
  router.afterEach((to, from) => {
    // Find the matching timing entry
    const timing = navigationTimings.find(t =>
      t.from === from.path && t.to === to.path && t.endTime === null);

    if (timing) {
      timing.endTime = performance.now();
      timing.duration = timing.endTime - timing.startTime;
      console.log(`[Router Debug] Navigation completed in ${timing.duration.toFixed(2)}ms`);
    }

    // Check for memory issues and clear unused components
    setTimeout(() => {
      if (window.gc) {
        console.log('[Router Debug] Suggesting garbage collection');
        window.gc();
      }
    }, 500);
  });

  // Handle navigation errors
  router.onError((error) => {
    console.error('[Router Debug] Navigation error:', error);
  });

  return {
    getNavigationTimings: () => [...navigationTimings],
    clearTimings: () => {
      navigationTimings.length = 0;
    }
  };
}

// Detect potential memory leaks from navigation
export function checkMemoryUsage() {
  if (performance && performance.memory) {
    const memory = performance.memory;
    console.log(`[Router Debug] Memory usage:
      Used JS Heap: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB
      JS Heap Limit: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB
      Allocation Rate: ${((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(2)}%
    `);

    // Check if heap usage is concerning
    if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
      console.warn('[Router Debug] Memory usage is high. Consider refreshing the page.');
      return true;
    }
  }
  return false;
}

// Utility to force clear localStorage cache related to navigation
export function clearNavigationCache() {
  localStorage.removeItem('vueRouterCache');
  localStorage.setItem('imagesNeedRefresh', 'true');
  console.log('[Router Debug] Navigation cache cleared');
}
