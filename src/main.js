import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import tooltipDirective from './directives/tooltip'
import permissionDirective from './directives/permission'
import { patchHistoryAPI, enhanceRouter } from './utils/navigation-fixer'
import { useRoleStore } from './stores/roleStore'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

// Apply navigation fixes
patchHistoryAPI()
enhanceRouter(router)

const app = createApp(App)
const pinia = createPinia()

// Register global directives
app.directive('tooltip', tooltipDirective)
app.directive('can', permissionDirective)

// Register toast plugin
app.use(ToastPlugin)

// Add global error handler for component rendering issues
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err)
  console.log('Component with error:', vm)
  console.log('Error info:', info)

  // Try to recover from rendering errors by forcing a clean state
  if (err && (err.message.includes('render') || err.message.includes('mount'))) {
    console.warn('Detected render error, attempting recovery...')

    // Give Vue time to stabilize then redirect to recover
    setTimeout(() => {
      const currentPath = router.currentRoute.value.fullPath
      router.replace(currentPath + (currentPath.includes('?') ? '&' : '?') + '_recover=1')
    }, 100)
  }
}

// Mount the app with all plugins
app.use(pinia)
app.use(router)
app.mount('#app')

// Initialize with client role and redirect to client dashboard
const initializeApp = () => {
  const roleStore = useRoleStore()
  const currentRole = localStorage.getItem('userRole')

  // Only set default role if none exists
  if (!currentRole) {
    roleStore.setRole('client')
  }

  // Only redirect to dashboard if not in 'all' role and at root
  if (router.currentRoute.value.path === '/' && roleStore.currentRole !== 'all') {
    const role = roleStore.currentRole
    if (role === 'admin') {
      router.push('/agents')
    } else if (role === 'agent') {
      router.push('/agent-dashboard')
    } else if (role === 'client') {
      router.push('/client-dashboard')
    }
  }
}

// Run initialization after app is mounted
setTimeout(initializeApp, 100)

// Create a global navigation recovery function
window.__recoverNavigation = () => {
  console.log('Manual navigation recovery triggered')
  const currentPath = router.currentRoute.value.fullPath
  router.replace(currentPath + (currentPath.includes('?') ? '&' : '?') + '_manual=1')
  return 'Recovery attempted'
}
